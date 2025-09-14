// StackEdit — React Clone (no third-party libraries)
// Single-file React component (default export) built with Tailwind CSS only.
// Features: split editor/preview, toolbar with common markdown buttons, autosave to localStorage, export/import, theme toggle, sync scrolling, live preview using browser built-in APIs only.

import React, { useEffect, useRef, useState } from "react";

export default function StackEditClone() {
  const LOCAL_KEY = "stackedit_clone_content_v1";
  const [md, setMd] = useState("");
  const [showPreview, setShowPreview] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const [split, setSplit] = useState(true);
  const textareaRef = useRef(null);
  const previewRef = useRef(null);

  // initial sample
  const SAMPLE = `# Welcome to StackEdit — React Clone\n\nThis is a **full-featured** inline Markdown editor with a live preview.\n\n- Autosave to localStorage\n- Export / Import\n- Formatting toolbar\n\n\n\n## Code sample\n\n\`console.log('hello world')\`\n\n> This is a quote\n`;

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) setMd(saved);
    else setMd(SAMPLE);

    const theme = localStorage.getItem("stackedit_theme");
    if (theme === "dark") setIsDark(true);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, md);
  }, [md]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("stackedit_theme", isDark ? "dark" : "light");
  }, [isDark]);

  // basic markdown renderer (naive implementation)
  function renderMarkdown(src) {
    let html = src
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/gim, '<b>$1</b>')
      .replace(/\*(.*?)\*/gim, '<i>$1</i>')
      .replace(/`([^`]+)`/gim, '<code>$1</code>')
      .replace(/\n\n/g, '<br/>')
      .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
      .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank">$1</a>')
      .replace(/\!\[(.*?)\]\((.*?)\)/gim, '<img alt="$1" src="$2" />');
    return { __html: html };
  }

  // helpers for formatting
  function insertAround(before, after, placeholder = "text") {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = md.slice(start, end) || placeholder;
    const newMd = md.slice(0, start) + before + selected + after + md.slice(end);
    setMd(newMd);
    requestAnimationFrame(() => {
      const pos = start + before.length + selected.length + after.length;
      ta.focus();
      ta.setSelectionRange(pos, pos);
    });
  }

  // common formatting
  function cmdBold() { insertAround("**", "**"); }
  function cmdItalic() { insertAround("*", "*"); }
  function cmdH1() { insertAround("# ", ""); }
  function cmdCode() { insertAround("`", "`"); }
  function cmdQuote() { insertAround("> ", ""); }
  function cmdLink() { insertAround("[", "](https://)", "label"); }
  function cmdImage() { insertAround("![", "](https://)", "alt text"); }

  // file export/import
  function exportMD() {
    const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.md";
    a.click();
    URL.revokeObjectURL(url);
  }

  function importMD(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => setMd(String(ev.target.result || ""));
    reader.readAsText(f);
  }

  function onEditorScroll() {
    if (!split || !previewRef.current || !textareaRef.current) return;
    const ta = textareaRef.current;
    const pv = previewRef.current;
    const ratio = ta.scrollTop / (ta.scrollHeight - ta.clientHeight || 1);
    pv.scrollTop = ratio * (pv.scrollHeight - pv.clientHeight || 1);
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto py-6 px-4">
        <header className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">StackEdit — React Clone</h1>
          <div className="flex items-center gap-2">
            <button onClick={() => setSplit(s => !s)} className="p-2 rounded bg-gray-200 dark:bg-gray-700">Split</button>
            <button onClick={() => setShowPreview(p => !p)} className="p-2 rounded bg-gray-200 dark:bg-gray-700">Preview</button>
            <button onClick={() => setIsDark(d => !d)} className="p-2 rounded bg-gray-200 dark:bg-gray-700">Theme</button>
            <button onClick={exportMD} className="p-2 rounded bg-gray-200 dark:bg-gray-700">Export</button>
            <label className="cursor-pointer p-2 rounded bg-gray-200 dark:bg-gray-700">
              Import <input type="file" accept=".md,text/markdown" onChange={importMD} className="hidden" />
            </label>
          </div>
        </header>

        {/* toolbar */}
        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-2 rounded shadow-sm mb-3">
          <button onClick={cmdBold} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">B</button>
          <button onClick={cmdItalic} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">I</button>
          <button onClick={cmdH1} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">H1</button>
          <button onClick={cmdCode} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">{`</>`}</button>
          <button onClick={cmdQuote} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">❝</button>
          <button onClick={cmdLink} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">🔗</button>
          <button onClick={cmdImage} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">🖼</button>
        </div>

        {/* editor + preview */}
        <div className={`grid ${split && showPreview ? 'grid-cols-2' : 'grid-cols-1'} gap-4`}>
          <div className="flex flex-col bg-white dark:bg-gray-800 rounded shadow-sm min-h-[60vh]">
            <textarea
              ref={textareaRef}
              value={md}
              onChange={(e) => setMd(e.target.value)}
              onScroll={onEditorScroll}
              className="flex-1 p-4 resize-none outline-none bg-transparent w-full font-mono text-sm leading-relaxed"
              style={{ minHeight: '40vh' }}
            />
          </div>

          {showPreview && (
            <div ref={previewRef} className="prose prose-sm dark:prose-invert p-6 overflow-auto bg-white dark:bg-gray-800 rounded shadow-sm min-h-[60vh]" style={{ minHeight: '40vh' }} dangerouslySetInnerHTML={renderMarkdown(md)} />
          )}
        </div>
      </div>
    </div>
  );
}
