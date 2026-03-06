// Claude CLI process manager
// Spawns claude CLI with stream-json output for real-time streaming

const { spawn } = require('child_process');
const crypto = require('crypto');

class ClaudeAgent {
  constructor(cwd, context, mcpConfigPath) {
    this.cwd = cwd;
    this.context = context || '';
    this.mcpConfigPath = mcpConfigPath || null;
    this.sessionId = crypto.randomUUID();
    this.firstMessage = true;
    this.proc = null;
  }

  sendMessage(text, onData) {
    console.log('[claude] ← user:', text);

    let prompt = text;
    if (this.firstMessage && this.context) {
      prompt = this.context + '\n\n' + text;
    }

    const args = [
      '-p', prompt,
      '--output-format', 'stream-json',
      '--verbose',
      '--model', 'haiku',
    ];

    if (this.firstMessage) {
      args.push('--session-id', this.sessionId);
      this.firstMessage = false;
    } else {
      args.push('--resume', this.sessionId);
    }

    args.push(
      '--allowedTools', 'Read', 'Glob', 'Grep', 'mcp__notebound-display__display_webpage', 'mcp__notebound-display__refresh_webpage', 'mcp__notebound-display__close_webpage',
      '--dangerously-skip-permissions',
    );

    if (this.mcpConfigPath) {
      args.push('--strict-mcp-config', '--mcp-config', this.mcpConfigPath);
    }

    // Strip CLAUDE_CODE env vars to avoid nested session detection
    const env = { ...process.env };
    delete env.CLAUDECODE;
    delete env.CLAUDE_CODE;

    const cmdStr = ['claude', ...args].map(a => /[\s"']/.test(a) ? JSON.stringify(a) : a).join(' ');
    console.log('[claude] $', cmdStr);

    this.proc = spawn('claude', args, {
      cwd: this.cwd,
      env,
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    let buffer = '';

    this.proc.stdout.on('data', (chunk) => {
      const raw = chunk.toString();
      console.log('[claude] raw stdout (%d bytes):', raw.length, raw.slice(0, 300));
      buffer += raw;
      const lines = buffer.split('\n');
      buffer = lines.pop(); // keep incomplete line

      for (const line of lines) {
        if (!line.trim()) continue;
        try {
          const data = JSON.parse(line);
          if (data.type === 'assistant') {
            const content = data.message?.content || [];
            const texts = content.filter(c => c.type === 'text').map(c => c.text);
            const toolUses = content.filter(c => c.type === 'tool_use');
            if (texts.length) {
              console.log('[claude] → text:', texts.join('').slice(0, 200));
              onData({ type: 'text', content: texts.join('') });
            }
            if (toolUses.length) {
              for (const tu of toolUses) {
                console.log('[claude] → tool_use:', tu.name, JSON.stringify(tu.input).slice(0, 200));
                onData({ type: 'tool_use', tool: tu.name, input: tu.input });
              }
            }
          } else if (data.type === 'result') {
            console.log('[claude] → done, cost:', data.total_cost_usd, 'result:', (data.result || '').slice(0, 200));
            onData({ type: 'done', result: data.result, cost: data.total_cost_usd });
          }
        } catch {}
      }
    });

    let stderr = '';
    this.proc.stderr.on('data', (chunk) => {
      const s = chunk.toString();
      stderr += s;
      if (s.trim()) console.log('[claude] stderr:', s.trim().slice(0, 300));
    });

    this.proc.on('close', (code) => {
      console.log('[claude] process closed, code:', code);
      // Process remaining buffer
      let gotResult = false;
      if (buffer.trim()) {
        try {
          const data = JSON.parse(buffer);
          if (data.type === 'assistant') {
            const content = data.message?.content || [];
            const texts = content.filter(c => c.type === 'text').map(c => c.text);
            if (texts.length) onData({ type: 'text', content: texts.join('') });
          } else if (data.type === 'result') {
            onData({ type: 'done', result: data.result, cost: data.total_cost_usd });
            gotResult = true;
          }
        } catch {}
      }
      if (code !== 0 && stderr) {
        onData({ type: 'error', message: stderr.slice(0, 500) });
      } else if (!gotResult) {
        // Ensure streaming always ends
        onData({ type: 'done', result: '', cost: null });
      }
      this.proc = null;
    });

    this.proc.on('error', (err) => {
      console.error('[claude] spawn error:', err.message);
      onData({ type: 'error', message: err.message });
      this.proc = null;
    });
  }

  interrupt() {
    if (!this.proc) return;
    const p = this.proc;
    this.proc = null;
    try { p.kill('SIGINT'); } catch {}
    setTimeout(() => {
      try { if (!p.killed) p.kill('SIGKILL'); } catch {}
    }, 500);
  }

  kill() {
    this.interrupt();
  }
}

module.exports = { ClaudeAgent };
