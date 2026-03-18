// ── HTML → Markdown conversion ────────────────────────────

function _liToMd(li: Element, indent: string): string {
  let text = '';
  let nested = '';
  for (const c of li.childNodes) {
    if (c.nodeType === Node.ELEMENT_NODE && ((c as Element).tagName === 'UL' || (c as Element).tagName === 'OL'))
      nested += '\n' + _nodeToMd(c, indent + '    ');
    else
      text += _nodeToMd(c, indent);
  }
  return text.trim() + nested.trimEnd();
}

function _nodeToMd(node: Node, indent: string = ''): string {
  if (node.nodeType === Node.TEXT_NODE) return node.textContent!;
  if (node.nodeType !== Node.ELEMENT_NODE) return '';
  const el = node as Element;
  const tag = el.tagName.toLowerCase();
  const inner = (): string => [...el.childNodes].map(c => _nodeToMd(c, indent)).join('');
  switch (tag) {
    case 'strong': case 'b':              return `**${inner()}**`;
    case 'em':     case 'i':              return `*${inner()}*`;
    case 's':      case 'strike': case 'del': return `~~${inner()}~~`;
    case 'code':                          return `\`${inner()}\``;
    case 'a': { const href = el.getAttribute('href') || ''; const t = inner(); return href ? `[${t}](${href})` : t; }
    case 'br':  return '\n';
    case 'h1':  return `# ${inner()}\n\n`;
    case 'h2':  return `## ${inner()}\n\n`;
    case 'h3':  return `### ${inner()}\n\n`;
    case 'h4':  return `#### ${inner()}\n\n`;
    case 'h5':  return `##### ${inner()}\n\n`;
    case 'h6':  return `###### ${inner()}\n\n`;
    case 'ul': {
      let r = '';
      for (const c of el.childNodes) {
        if (c.nodeType !== Node.ELEMENT_NODE) continue;
        const ce = c as Element;
        if (ce.tagName === 'LI') r += `${indent}- ${_liToMd(ce, indent)}\n`;
        else if (ce.tagName === 'UL' || ce.tagName === 'OL') r += _nodeToMd(ce, indent + '    ');
      }
      return r + (indent ? '' : '\n');
    }
    case 'ol': {
      let r = ''; let i = 1;
      for (const c of el.childNodes) {
        if (c.nodeType !== Node.ELEMENT_NODE) continue;
        const ce = c as Element;
        if (ce.tagName === 'LI') r += `${indent}${i++}. ${_liToMd(ce, indent)}\n`;
        else if (ce.tagName === 'UL' || ce.tagName === 'OL') r += _nodeToMd(ce, indent + '    ');
      }
      return r + (indent ? '' : '\n');
    }
    case 'li':  return `${indent}- ${_liToMd(el, indent)}\n`;
    case 'p':   return `${inner()}\n\n`;
    case 'div': {
      if (el.childNodes.length === 1 && el.firstChild?.nodeName === 'BR') return '\n';
      const c = inner(); return c ? `${c}\n` : '';
    }
    default:    return inner();
  }
}

export function htmlToMarkdown(html: string): string {
  const wrap = new DOMParser().parseFromString(`<div>${html}</div>`, 'text/html').body.firstChild!;
  return _nodeToMd(wrap).replace(/\n{3,}/g, '\n\n').trim();
}
