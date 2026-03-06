// HTML-aware text manipulation
// Applies plain-text edits to rich HTML while preserving formatting tags

// Map each visible character index to its byte range in the HTML string.
// <br> counts as a visible newline; all other tags are invisible.
// HTML entities (e.g. &amp;) count as one visible character.
function getHtmlCharMap(html) {
  const map = [];
  let i = 0;
  while (i < html.length) {
    if (html[i] === '<') {
      const end = html.indexOf('>', i);
      const tag = end === -1 ? html.slice(i) : html.slice(i, end + 1);
      if (/^<br\s*\/?>$/i.test(tag)) {
        map.push({ start: i, end: end + 1 });
      }
      i = end === -1 ? html.length : end + 1;
    } else if (html[i] === '&') {
      const semi = html.indexOf(';', i);
      const entityEnd = semi === -1 ? i + 1 : semi + 1;
      map.push({ start: i, end: entityEnd });
      i = entityEnd;
    } else {
      map.push({ start: i, end: i + 1 });
      i++;
    }
  }
  return map;
}

// Delete `count` visible characters at visible position `pos`.
// Preserves all HTML tags between/around deleted characters.
function deleteHtmlChars(html, pos, count) {
  const map = getHtmlCharMap(html);
  const end = Math.min(pos + count, map.length);
  if (pos >= map.length || pos >= end) return html;
  let result = '';
  let lastEnd = 0;
  for (let i = pos; i < end; i++) {
    result += html.slice(lastEnd, map[i].start);
    lastEnd = map[i].end;
  }
  return result + html.slice(lastEnd);
}

// Insert plain text before visible position `pos`.
function insertHtmlText(html, pos, text) {
  const map = getHtmlCharMap(html);
  const insertAt = pos < map.length ? map[pos].start : html.length;
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>');
  return html.slice(0, insertAt) + escaped + html.slice(insertAt);
}

// Apply an array of positional text diffs to HTML, preserving formatting.
// diffs: [{type:'delete',pos,count} | {type:'insert',pos,text}]
function applyDiffsToHtml(html, diffs) {
  let result = html;
  for (const diff of diffs) {
    if (diff.type === 'delete') result = deleteHtmlChars(result, diff.pos, diff.count);
    else if (diff.type === 'insert') result = insertHtmlText(result, diff.pos, diff.text);
  }
  return result;
}

// Apply an oldText→newText content change to HTML, preserving formatting.
// Uses minimal prefix/suffix diff so only the changed region is touched.
function applyTextChangeToHtml(html, oldText, newText) {
  if (oldText === newText) return html;
  let p = 0;
  const minLen = Math.min(oldText.length, newText.length);
  while (p < minLen && oldText[p] === newText[p]) p++;
  let oldEnd = oldText.length, newEnd = newText.length;
  while (oldEnd > p && newEnd > p && oldText[oldEnd - 1] === newText[newEnd - 1]) {
    oldEnd--; newEnd--;
  }
  let result = html;
  if (oldEnd > p) result = deleteHtmlChars(result, p, oldEnd - p);
  const ins = newText.slice(p, newEnd);
  if (ins) result = insertHtmlText(result, p, ins);
  return result;
}

module.exports = { applyDiffsToHtml, applyTextChangeToHtml };
