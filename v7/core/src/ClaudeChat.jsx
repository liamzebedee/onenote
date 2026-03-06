import { useRef, useEffect, useLayoutEffect, useCallback } from 'preact/hooks';
import { claudeChat, sendClaudeMessage, closeClaudeChat, updateClaudeChatPosition, displayPanel } from './store.js';

function renderMarkdown(text) {
  // Code blocks
  let html = text.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    return `<pre class="cc-code-block"><code>${escHtml(code.trimEnd())}</code></pre>`;
  });
  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Italic
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  // Unordered lists
  html = html.replace(/^[•\-\*] (.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>${m}</ul>`);
  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');
  // Line breaks
  html = html.replace(/\n/g, '<br/>');
  return html;
}

function escHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function ClaudeChat() {
  const chat = claudeChat.value;
  if (!chat.active) return null;

  const inputRef = useRef(null);
  const messagesRef = useRef(null);
  const dragRef = useRef(null);

  // Auto-scroll on new messages
  useLayoutEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [chat.messages.length, chat.messages[chat.messages.length - 1]?.content]);

  // Drag handling
  const onDragStart = useCallback((e) => {
    e.preventDefault();
    const startX = e.clientX, startY = e.clientY;
    const origX = chat.position.x, origY = chat.position.y;

    function onMove(e2) {
      updateClaudeChatPosition(
        origX + (e2.clientX - startX),
        origY + (e2.clientY - startY)
      );
    }
    function onUp() {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
    }
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
  }, [chat.position.x, chat.position.y]);

  function handleSend() {
    const text = inputRef.current?.value?.trim();
    if (!text) return;
    inputRef.current.value = '';
    sendClaudeMessage(text);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div
      class="claude-chat"
      style={{ left: chat.position.x + 'px', top: chat.position.y + 'px' }}
    >
      <div class="cc-titlebar" onPointerDown={onDragStart} ref={dragRef}>
        <span class="cc-title">Claude</span>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <button
            class="cc-test"
            onClick={() => { if (!chat.streaming) sendClaudeMessage('Write a tiny, self-contained HTML page (with inline CSS, make it look nice) and display it using the display_webpage tool. Keep it under 2 seconds.'); }}
            disabled={chat.streaming}
            title="Test display panel"
          >test</button>
          <button
            class="cc-test"
            onClick={() => {
              displayPanel.value = { ...displayPanel.value, active: true, uri: 'file:///tmp/notebound-img-test.html' };
            }}
            title="Test iframe with local file + images"
          >iframe</button>
          <button class="cc-close" onClick={closeClaudeChat}>x</button>
        </div>
      </div>
      <div class="cc-messages" ref={messagesRef}>
        {chat.messages.map((msg, i) => (
          <div key={i} class={`cc-msg cc-msg--${msg.role}`}>
            {msg.role === 'assistant'
              ? <div class="cc-bubble cc-bubble--assistant" dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content || '') }} />
              : <div class="cc-bubble cc-bubble--user">{msg.content}</div>
            }
          </div>
        ))}
        {chat.streaming && (
          <div class="cc-typing">
            <span class="cc-typing-dot" /><span class="cc-typing-dot" /><span class="cc-typing-dot" />
          </div>
        )}
        {chat.error && <div class="cc-error">{chat.error}</div>}
      </div>
      <div class="cc-input-bar">
        <textarea
          ref={inputRef}
          class="cc-input"
          placeholder="Ask about your notebook..."
          onKeyDown={handleKeyDown}
          rows={1}
          onInput={e => {
            e.target.style.height = 'auto';
            e.target.style.height = Math.min(e.target.scrollHeight, 80) + 'px';
          }}
        />
        <button class="cc-send" onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
