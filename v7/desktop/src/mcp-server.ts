#!/usr/bin/env node
// Notebound Display MCP Server
// Spawned by Claude CLI as a stdio MCP server.
// Communicates with Electron main process via Unix domain socket.

import net from 'net';

const SOCKET_PATH = process.env.NOTEBOUND_SOCKET;
if (!SOCKET_PATH) {
  process.stderr.write('NOTEBOUND_SOCKET env var not set\n');
  process.exit(1);
}

interface McpToolDef {
  name: string;
  description: string;
  inputSchema: {
    type: string;
    properties: Record<string, { type: string; description?: string }>;
    required?: string[];
  };
}

interface JsonRpcRequest {
  jsonrpc?: string;
  id?: number | string | null;
  method: string;
  params?: Record<string, unknown>;
}

interface DisplayAppCommand {
  action: string;
  uri?: string;
}

// Send a command to Electron main process via Unix socket (fire and forget)
function sendToApp(command: DisplayAppCommand): Promise<{ ok: boolean }> {
  return new Promise((resolve, reject) => {
    const client = net.createConnection(SOCKET_PATH!, () => {
      client.end(JSON.stringify(command) + '\n');
      resolve({ ok: true });
    });
    client.on('error', (err) => reject(err));
    setTimeout(() => { client.destroy(); reject(new Error('timeout')); }, 3000);
  });
}

// MCP protocol over stdio
const TOOLS: McpToolDef[] = [
  {
    name: 'display_webpage',
    description: 'Open a webpage in the Notebound display panel. Use this to show HTML files, web pages, or any URI to the user. The panel appears as a floating window in the app.',
    inputSchema: {
      type: 'object',
      properties: {
        uri: { type: 'string', description: 'The URI to display (file:// or http(s)://)' },
      },
      required: ['uri'],
    },
  },
  {
    name: 'refresh_webpage',
    description: 'Refresh the currently displayed webpage in the Notebound display panel.',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'close_webpage',
    description: 'Close the Notebound display panel.',
    inputSchema: { type: 'object', properties: {} },
  },
];

let buffer = '';

process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk: string) => {
  buffer += chunk;
  const lines = buffer.split('\n');
  buffer = lines.pop()!;
  for (const line of lines) {
    if (!line.trim()) continue;
    try {
      handleMessage(JSON.parse(line) as JsonRpcRequest);
    } catch (err) {
      process.stderr.write('parse error: ' + (err as Error).message + '\n');
    }
  }
});

function respond(id: number | string | null | undefined, result: unknown): void {
  const msg = JSON.stringify({ jsonrpc: '2.0', id, result }) + '\n';
  process.stdout.write(msg);
}

function respondError(id: number | string | null | undefined, code: number, message: string): void {
  const msg = JSON.stringify({ jsonrpc: '2.0', id, error: { code, message } }) + '\n';
  process.stdout.write(msg);
}

async function handleMessage(msg: JsonRpcRequest): Promise<void> {
  const { id, method, params } = msg;

  if (method === 'initialize') {
    respond(id, {
      protocolVersion: '2024-11-05',
      capabilities: { tools: {} },
      serverInfo: { name: 'notebound-display', version: '1.0.0' },
    });
    return;
  }

  if (method === 'notifications/initialized') {
    // No response needed for notifications
    return;
  }

  if (method === 'tools/list') {
    respond(id, { tools: TOOLS });
    return;
  }

  if (method === 'tools/call') {
    const toolName = (params?.name as string) || '';
    const args = (params?.arguments as Record<string, string>) || {};

    try {
      if (toolName === 'display_webpage') {
        let uri = args.uri;
        if (uri.startsWith('/')) {
          uri = 'file://' + uri;
        }
        await sendToApp({ action: 'open', uri });
        respond(id, {
          content: [{ type: 'text', text: `Opened ${args.uri} in display panel.` }],
        });
      } else if (toolName === 'refresh_webpage') {
        await sendToApp({ action: 'refresh' });
        respond(id, {
          content: [{ type: 'text', text: 'Refreshed display panel.' }],
        });
      } else if (toolName === 'close_webpage') {
        await sendToApp({ action: 'close' });
        respond(id, {
          content: [{ type: 'text', text: 'Closed display panel.' }],
        });
      } else {
        respondError(id, -32601, `Unknown tool: ${toolName}`);
      }
    } catch (err) {
      respond(id, {
        content: [{ type: 'text', text: `Error: ${(err as Error).message}` }],
        isError: true,
      });
    }
    return;
  }

  // Unknown method
  if (id != null) {
    respondError(id, -32601, `Unknown method: ${method}`);
  }
}
