// Claude CLI process manager
// Spawns claude CLI with stream-json output for real-time streaming

const { spawn } = require('child_process');
const crypto = require('crypto');

class ClaudeAgent {
  constructor(cwd, context) {
    this.cwd = cwd;
    this.context = context || '';
    this.sessionId = crypto.randomUUID();
    this.firstMessage = true;
    this.proc = null;
  }

  sendMessage(text, onData) {
    let prompt = text;
    if (this.firstMessage && this.context) {
      prompt = this.context + '\n\n' + text;
    }

    const args = [
      '-p', prompt,
      '--output-format', 'stream-json',
      '--verbose',
    ];

    if (this.firstMessage) {
      args.push('--session-id', this.sessionId);
      this.firstMessage = false;
    } else {
      args.push('--resume', this.sessionId);
    }

    args.push(
      '--allowedTools', 'Read', 'Glob', 'Grep',
      '--dangerously-skip-permissions',
    );

    // Strip CLAUDE_CODE env vars to avoid nested session detection
    const env = { ...process.env };
    delete env.CLAUDECODE;
    delete env.CLAUDE_CODE;

    this.proc = spawn('claude', args, {
      cwd: this.cwd,
      env,
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    let buffer = '';

    this.proc.stdout.on('data', (chunk) => {
      buffer += chunk.toString();
      const lines = buffer.split('\n');
      buffer = lines.pop(); // keep incomplete line

      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const data = JSON.parse(line);
          if (data.type === 'assistant') {
            const texts = (data.message?.content || [])
              .filter(c => c.type === 'text')
              .map(c => c.text);
            if (texts.length) {
              onData({ type: 'text', content: texts.join('') });
            }
          } else if (data.type === 'result') {
            onData({ type: 'done', result: data.result, cost: data.total_cost_usd });
          }
        } catch {}
      }
    });

    let stderr = '';
    this.proc.stderr.on('data', (chunk) => { stderr += chunk.toString(); });

    this.proc.on('close', (code) => {
      // Process remaining buffer
      if (buffer.trim()) {
        try {
          const data = JSON.parse(buffer);
          if (data.type === 'assistant') {
            const texts = (data.message?.content || [])
              .filter(c => c.type === 'text')
              .map(c => c.text);
            if (texts.length) onData({ type: 'text', content: texts.join('') });
          } else if (data.type === 'result') {
            onData({ type: 'done', result: data.result, cost: data.total_cost_usd });
          }
        } catch {}
      }
      if (code !== 0 && stderr) {
        onData({ type: 'error', message: stderr.slice(0, 500) });
      }
      this.proc = null;
    });

    this.proc.on('error', (err) => {
      onData({ type: 'error', message: err.message });
      this.proc = null;
    });
  }

  kill() {
    if (!this.proc) return;
    try { this.proc.kill('SIGTERM'); } catch {}
    const p = this.proc;
    setTimeout(() => {
      try { if (!p.killed) p.kill('SIGKILL'); } catch {}
    }, 2000);
    this.proc = null;
  }
}

module.exports = { ClaudeAgent };
