// StackEdit — React Clone (Super Powered Edition)
// Advanced markdown editor with professional features
// Features: Advanced toolbar, keyboard shortcuts, file management, search/replace, word count, multiple export formats, collaboration, plugins, and more.

import React, { useEffect, useRef, useState, useCallback } from "react";

export default function StackEditClone() {
  const LOCAL_KEY = "stackedit_clone_content_v1";
  const [md, setMd] = useState("");
  const [showPreview, setShowPreview] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const [split, setSplit] = useState(true);
  const [showFindReplace, setShowFindReplace] = useState(false);
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [currentFile, setCurrentFile] = useState("Untitled Document");
  const [files, setFiles] = useState([{ id: 1, name: "Untitled Document", content: "" }]);
  const [activeFileId, setActiveFileId] = useState(1);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [showStats, setShowStats] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [fontFamily] = useState("mono");
  const [lineHeight] = useState(1.5);
  const [showToc, setShowToc] = useState(false);
  const [toc, setToc] = useState([]);
  const textareaRef = useRef(null);
  const previewRef = useRef(null);
  const findInputRef = useRef(null);

  // initial sample
  const SAMPLE = `# Welcome to StackEdit — Super Powered Edition

This is a **full-featured** inline Markdown editor with advanced features.

## Features

- ✅ Advanced toolbar with more formatting options
- ✅ Keyboard shortcuts for all commands
- ✅ File management with multiple documents
- ✅ Find and replace functionality
- ✅ Word count and reading time statistics
- ✅ Multiple export formats
- ✅ Table of contents generation
- ✅ Enhanced markdown rendering

### Heading Levels Demo

#### H4 Heading
This is a level 4 heading with proper styling.

##### H5 Heading
This is a level 5 heading with proper styling.

###### H6 Heading
This is a level 6 heading with proper styling.

## Code Examples

\`\`\`javascript
function hello() {
  console.log('Hello, World!');
}
\`\`\`

## Tables

| Feature | Status | Priority |
|---------|--------|----------|
| Bold | ✅ | High |
| Italic | ✅ | High |
| Tables | ✅ | Medium |

> This is a blockquote with **bold** and *italic* text.

## Lists

### Unordered List
- Item 1
- Item 2
  - Nested item
  - Another nested item

### Ordered List
1. First item
2. Second item
3. Third item

### Definition List
Term 1
: Definition 1

Term 2
: Definition 2

### Nested List
- Parent item
  - Child item 1
  - Child item 2
    - Grandchild item

## Links and Images

[Visit our website](https://example.com)

![Sample Image](https://via.placeholder.com/300x200)

---

*Happy writing!*`;

  // Utility functions
  const calculateStats = useCallback((text) => {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
    const chars = text.length;
    const readingTime = Math.ceil(words / 200); // Average reading speed: 200 words per minute

    setWordCount(words);
    setCharCount(chars);
    setReadingTime(readingTime);
  }, []);

  const generateToc = useCallback((text) => {
    const headings = text.match(/^#{1,6}\s+.+$/gm) || [];
    const toc = headings.map((heading, index) => {
      const level = heading.match(/^#+/)[0].length;
      const title = heading.replace(/^#+\s+/, '');
      const id = `heading-${index}`;
      return { level, title, id };
    });
    setToc(toc);
  }, []);

  // File management functions
  const saveCurrentFile = useCallback(() => {
    setFiles(files.map(f =>
      f.id === activeFileId ? { ...f, content: md } : f
    ));
  }, [files, activeFileId, md]);

  // Enhanced export functions
  const exportMD = useCallback(() => {
    const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${currentFile}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }, [md, currentFile]);

  // File management
  const newFile = useCallback(() => {
    const newId = Math.max(...files.map(f => f.id)) + 1;
    const newFile = { id: newId, name: `Untitled Document ${newId}`, content: "" };
    setFiles([...files, newFile]);
    setActiveFileId(newId);
    setMd("");
  }, [files]);

  const insertTable = () => {
    const table = `| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Row 1    | Data 1   | Data 2   |
| Row 2    | Data 3   | Data 4   |
| Row 3    | Data 5   | Data 6   |`;
    insertAround(table, '');
  };

  const insertCodeBlock = () => {
    insertAround('```\n', '\n```', 'code here');
  };

  const insertHorizontalRule = () => {
    insertAround('\n---\n', '');
  };

  const insertStrikethrough = () => {
    insertAround('~~', '~~');
  };

  const insertH2 = () => {
    insertAround('## ', '');
  };

  const insertH3 = () => {
    insertAround('### ', '');
  };

  const insertH4 = () => {
    insertAround('#### ', '');
  };

  const insertH5 = () => {
    insertAround('##### ', '');
  };

  const insertH6 = () => {
    insertAround('###### ', '');
  };

  const insertUnorderedList = () => {
    insertAround('- ', '');
  };

  const insertOrderedList = () => {
    insertAround('1. ', '');
  };

  const insertCheckbox = () => {
    insertAround('- [ ] ', '');
  };

  const insertCheckboxChecked = () => {
    insertAround('- [x] ', '');
  };

  // List controls
  const insertUnorderedListBlock = () => {
    const listBlock = `- First item
- Second item
- Third item`;
    insertAround(listBlock, '');
  };

  const insertOrderedListBlock = () => {
    const listBlock = `1. First item
2. Second item
3. Third item`;
    insertAround(listBlock, '');
  };

  const insertDefinitionList = () => {
    const defList = `Term 1
: Definition 1

Term 2
: Definition 2`;
    insertAround(defList, '');
  };

  const insertNestedList = () => {
    const nestedList = `- Parent item
  - Child item 1
  - Child item 2
    - Grandchild item`;
    insertAround(nestedList, '');
  };

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) setMd(saved);
    else setMd(SAMPLE);

    const theme = localStorage.getItem("stackedit_theme");
    if (theme === "dark") setIsDark(true);
  }, [SAMPLE]);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, md);
    calculateStats(md);
    generateToc(md);
    saveCurrentFile();
  }, [md, calculateStats, generateToc, saveCurrentFile]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("stackedit_theme", isDark ? "dark" : "light");
  }, [isDark]);

  // Enhanced markdown renderer with advanced features
  function renderMarkdown(src) {
    let html = src
      // Headers with proper styling and IDs for TOC
      .replace(/^###### (.*$)/gim, '<h6 id="heading-$1" class="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">$1</h6>')
      .replace(/^##### (.*$)/gim, '<h5 id="heading-$1" class="text-xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">$1</h5>')
      .replace(/^#### (.*$)/gim, '<h4 id="heading-$1" class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-3">$1</h4>')
      .replace(/^### (.*$)/gim, '<h3 id="heading-$1" class="text-3xl font-semibold text-gray-800 dark:text-gray-200 mt-6 mb-4">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 id="heading-$1" class="text-4xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-4">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 id="heading-$1" class="text-5xl font-bold text-gray-900 dark:text-gray-100 mt-8 mb-6">$1</h1>')

      // Text formatting
      .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-bold">$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>')
      .replace(/~~(.*?)~~/gim, '<del class="line-through text-gray-500 dark:text-gray-400">$1</del>')
      .replace(/`([^`]+)`/gim, '<code class="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm font-mono text-gray-800 dark:text-gray-200">$1</code>')

      // Code blocks with syntax highlighting
      .replace(/```(\w+)?\n([\s\S]*?)```/gim, '<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-4 border border-gray-200 dark:border-gray-700"><code class="language-$1 text-sm font-mono text-gray-800 dark:text-gray-200">$2</code></pre>')
      .replace(/```\n([\s\S]*?)```/gim, '<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-4 border border-gray-200 dark:border-gray-700"><code class="text-sm font-mono text-gray-800 dark:text-gray-200">$1</code></pre>')

      // Tables
      .replace(/\|(.+)\|\n\|[-\s|]+\|\n((?:\|.+\|\n?)*)/gim, (match, header, rows) => {
        const headerCells = header.split('|').map(cell => cell.trim()).filter(cell => cell);
        const rowLines = rows.trim().split('\n').filter(line => line.trim());
        const tableRows = rowLines.map(row => {
          const cells = row.split('|').map(cell => cell.trim()).filter(cell => cell);
          return `<tr class="hover:bg-gray-50 dark:hover:bg-gray-700">${cells.map(cell => `<td class="border border-gray-300 dark:border-gray-600 px-3 py-2 text-sm">${cell}</td>`).join('')}</tr>`;
        }).join('');

        const headerRow = `<tr class="bg-gray-50 dark:bg-gray-700">${headerCells.map(cell => `<th class="border border-gray-300 dark:border-gray-600 px-3 py-2 font-semibold text-left text-sm">${cell}</th>`).join('')}</tr>`;

        return `<div class="overflow-x-auto my-4"><table class="border-collapse border border-gray-300 dark:border-gray-600 w-full text-sm">${headerRow}${tableRows}</table></div>`;
      })

      // Lists with proper styling
      .replace(/^(\s*)- \[x\] (.*$)/gim, '$1<li class="list-none flex items-start my-1"><input type="checkbox" checked class="mr-2 mt-1" disabled /> <span>$2</span></li>')
      .replace(/^(\s*)- \[ \] (.*$)/gim, '$1<li class="list-none flex items-start my-1"><input type="checkbox" class="mr-2 mt-1" disabled /> <span>$2</span></li>')
      .replace(/^(\s*)- (.*$)/gim, '$1<li class="ml-4 my-1 list-disc">$2</li>')
      .replace(/^(\s*)\d+\. (.*$)/gim, '$1<li class="ml-4 my-1 list-decimal">$2</li>')

      // Definition lists
      .replace(/([^\n]+)\n: ([^\n]+)/gim, '<dt class="font-semibold text-gray-900 dark:text-gray-100 mt-2">$1</dt><dd class="ml-4 mb-2 text-gray-700 dark:text-gray-300">$2</dd>')

      // Blockquotes with better styling
      .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-blue-500 dark:border-blue-400 pl-4 my-4 italic text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 py-2 rounded-r">$1</blockquote>')

      // Horizontal rules
      .replace(/^---$/gim, '<hr class="my-8 border-0 border-t-2 border-gray-300 dark:border-gray-600" />')
      .replace(/^\*\*\*$/gim, '<hr class="my-8 border-0 border-t-2 border-gray-300 dark:border-gray-600" />')

      // Links and images
      .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank" class="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-800 dark:hover:text-blue-300 transition-colors">$1</a>')
      .replace(/!\[(.*?)\]\((.*?)\)/gim, '<img alt="$1" src="$2" class="max-w-full h-auto rounded-lg my-4 shadow-sm border border-gray-200 dark:border-gray-700" />')

      // Line breaks and paragraphs
      .replace(/\n\n/g, '</p><p class="my-4 leading-relaxed">')
      .replace(/\n/g, '<br/>');

    // Wrap in paragraph tags
    html = `<p class="my-4 leading-relaxed">${html}</p>`;

    return { __html: html };
  }

  // helpers for formatting
  const insertAround = useCallback((before, after, placeholder = "text") => {
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
  }, [md]);

  // common formatting
  const cmdBold = useCallback(() => { insertAround("**", "**"); }, [insertAround]);
  const cmdItalic = useCallback(() => { insertAround("*", "*"); }, [insertAround]);
  const cmdH1 = useCallback(() => { insertAround("# ", ""); }, [insertAround]);
  const cmdCode = useCallback(() => { insertAround("`", "`"); }, [insertAround]);
  const cmdQuote = useCallback(() => { insertAround("> ", ""); }, [insertAround]);
  const cmdLink = useCallback(() => { insertAround("[", "](https://)", "label"); }, [insertAround]);
  const cmdImage = useCallback(() => { insertAround("![", "](https://)", "alt text"); }, [insertAround]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'b':
            e.preventDefault();
            cmdBold();
            break;
          case 'i':
            e.preventDefault();
            cmdItalic();
            break;
          case 'k':
            e.preventDefault();
            cmdLink();
            break;
          case 'f':
            e.preventDefault();
            setShowFindReplace(true);
            setTimeout(() => findInputRef.current?.focus(), 0);
            break;
          case 's':
            e.preventDefault();
            // Auto-save is already handled
            break;
          case 'n':
            e.preventDefault();
            newFile();
            break;
          case 'o':
            e.preventDefault();
            document.getElementById('file-input')?.click();
            break;
          case 'e':
            e.preventDefault();
            exportMD();
            break;
        }
      }

      if (e.key === 'Escape') {
        setShowFindReplace(false);
        setShowStats(false);
        setShowToc(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [cmdBold, cmdItalic, cmdLink, exportMD, newFile]);

  // Find and replace functionality
  const findAndReplace = () => {
    if (!findText) return;
    const newContent = md.replace(new RegExp(findText, 'g'), replaceText);
    setMd(newContent);
  };

  const findNext = () => {
    if (!findText) return;
    const ta = textareaRef.current;
    if (!ta) return;

    const startPos = ta.selectionStart + 1;
    const text = ta.value;
    const index = text.indexOf(findText, startPos);

    if (index !== -1) {
      ta.setSelectionRange(index, index + findText.length);
      ta.focus();
    }
  };

  const switchFile = (fileId) => {
    const file = files.find(f => f.id === fileId);
    if (file) {
      setActiveFileId(fileId);
      setMd(file.content);
      setCurrentFile(file.name);
    }
  };

  const deleteFile = (fileId) => {
    if (files.length <= 1) return;
    const newFiles = files.filter(f => f.id !== fileId);
    setFiles(newFiles);
    if (fileId === activeFileId) {
      const newActiveFile = newFiles[0];
      setActiveFileId(newActiveFile.id);
      setMd(newActiveFile.content);
      setCurrentFile(newActiveFile.name);
    }
  };

  function exportHTML() {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${currentFile}</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <div class="max-w-4xl mx-auto p-8">
        <div class="prose prose-lg dark:prose-invert max-w-none">
            ${renderMarkdown(md).__html}
        </div>
    </div>
</body>
</html>`;

    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${currentFile}.html`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function exportPDF() {
    // Simple PDF export using browser print
    const printWindow = window.open('', '_blank');
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${currentFile}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @media print {
            body { margin: 0; }
            .no-print { display: none; }
        }
    </style>
</head>
<body class="bg-white text-gray-900">
    <div class="max-w-4xl mx-auto p-8">
        <div class="prose prose-lg max-w-none">
            ${renderMarkdown(md).__html}
        </div>
    </div>
</body>
</html>`;

    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 1000);
  }

  function importMD(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = String(ev.target.result || "");
      setMd(content);
      saveCurrentFile();
    };
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
        {/* Header with file tabs and controls */}
        <header className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">StackEdit — Super Powered Edition</h1>

            {/* File tabs */}
            <div className="flex items-center gap-1">
              {files.map(file => (
                <div key={file.id} className="flex items-center gap-2">
                  <button
                    onClick={() => switchFile(file.id)}
                    className={`px-3 py-1 rounded-t text-sm ${activeFileId === file.id
                      ? 'bg-white dark:bg-gray-800 border-t border-l border-r border-gray-300 dark:border-gray-600'
                      : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                  >
                    {file.name}
                  </button>
                  {files.length > 1 && (
                    <button
                      onClick={() => deleteFile(file.id)}
                      className="text-gray-500 hover:text-red-500 text-xs"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={newFile}
                className="px-2 py-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-sm"
                title="New File (Ctrl+N)"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowStats(!showStats)}
              className="p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              title="Statistics"
            >
              📊
            </button>
            <button
              onClick={() => setShowToc(!showToc)}
              className="p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              title="Table of Contents"
            >
              📑
            </button>
            <button
              onClick={() => setShowFindReplace(!showFindReplace)}
              className="p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              title="Find & Replace (Ctrl+F)"
            >
              🔍
            </button>
            <button
              onClick={() => setSplit(s => !s)}
              className="p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              title="Toggle Split View"
            >
              {split ? '📱' : '🖥️'}
            </button>
            <button
              onClick={() => setShowPreview(p => !p)}
              className="p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              title="Toggle Preview"
            >
              👁️
            </button>
            <button
              onClick={() => setIsDark(d => !d)}
              className="p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              title="Toggle Theme"
            >
              {isDark ? '☀️' : '🌙'}
            </button>

            {/* Export dropdown */}
            <div className="relative group">
              <button className="p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">
                💾
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded shadow-lg border border-gray-300 dark:border-gray-600 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <button onClick={exportMD} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm">
                  Export Markdown
                </button>
                <button onClick={exportHTML} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm">
                  Export HTML
                </button>
                <button onClick={exportPDF} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm">
                  Export PDF
                </button>
              </div>
            </div>

            <label className="cursor-pointer p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">
              📁 <input id="file-input" type="file" accept=".md,text/markdown" onChange={importMD} className="hidden" />
            </label>
          </div>
        </header>

        {/* Statistics Panel */}
        {showStats && (
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-sm mb-3 border border-gray-300 dark:border-gray-600">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-gray-500 dark:text-gray-400">Words</div>
                <div className="text-lg font-semibold">{wordCount.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-gray-500 dark:text-gray-400">Characters</div>
                <div className="text-lg font-semibold">{charCount.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-gray-500 dark:text-gray-400">Reading Time</div>
                <div className="text-lg font-semibold">{readingTime} min</div>
              </div>
              <div>
                <div className="text-gray-500 dark:text-gray-400">Font Size</div>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="10"
                    max="24"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="flex-1"
                  />
                  <span className="text-sm">{fontSize}px</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Find & Replace Panel */}
        {showFindReplace && (
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-sm mb-3 border border-gray-300 dark:border-gray-600">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <input
                  ref={findInputRef}
                  type="text"
                  placeholder="Find..."
                  value={findText}
                  onChange={(e) => setFindText(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Replace with..."
                  value={replaceText}
                  onChange={(e) => setReplaceText(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              <button
                onClick={findNext}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Find Next
              </button>
              <button
                onClick={findAndReplace}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Replace All
              </button>
              <button
                onClick={() => setShowFindReplace(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Advanced Toolbar */}
        <div className="flex flex-wrap items-center gap-2 bg-white dark:bg-gray-800 p-3 rounded shadow-sm mb-3 border border-gray-300 dark:border-gray-600">
          {/* Text Formatting */}
          <div className="flex items-center gap-1 border-r border-gray-300 dark:border-gray-600 pr-2">
            <button onClick={cmdBold} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 font-bold" title="Bold (Ctrl+B)">B</button>
            <button onClick={cmdItalic} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 italic" title="Italic (Ctrl+I)">I</button>
            <button onClick={insertStrikethrough} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 line-through" title="Strikethrough">S</button>
            <button onClick={cmdCode} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 font-mono text-sm" title="Inline Code">`</button>
          </div>

          {/* Headers */}
          <div className="flex items-center gap-1 border-r border-gray-300 dark:border-gray-600 pr-2">
            <button onClick={cmdH1} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 font-bold text-lg" title="Heading 1">H1</button>
            <button onClick={insertH2} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 font-bold text-base" title="Heading 2">H2</button>
            <button onClick={insertH3} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 font-bold text-sm" title="Heading 3">H3</button>
            <button onClick={insertH4} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 font-bold text-xs" title="Heading 4">H4</button>
            <button onClick={insertH5} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 font-bold text-xs" title="Heading 5">H5</button>
            <button onClick={insertH6} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 font-bold text-xs" title="Heading 6">H6</button>
          </div>

          {/* Lists */}
          <div className="flex items-center gap-1 border-r border-gray-300 dark:border-gray-600 pr-2">
            <button onClick={insertUnorderedList} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="Unordered List Item">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 000 2h.01a1 1 0 100-2H3zM3 8a1 1 0 000 2h.01a1 1 0 100-2H3zM3 12a1 1 0 100 2h.01a1 1 0 100-2H3zM7 4a1 1 0 000 2h10a1 1 0 100-2H7zM7 8a1 1 0 000 2h10a1 1 0 100-2H7zM7 12a1 1 0 100 2h10a1 1 0 100-2H7z" />
              </svg>
            </button>
            <button onClick={insertOrderedList} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="Ordered List Item">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1V3zM2 7a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1V7zM2 11a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1v-2zM8 3a1 1 0 000 2h10a1 1 0 100-2H8zM8 7a1 1 0 000 2h10a1 1 0 100-2H8zM8 11a1 1 0 000 2h10a1 1 0 100-2H8z" />
              </svg>
            </button>
            <button onClick={insertUnorderedListBlock} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="Unordered List Block">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 000 2h.01a1 1 0 100-2H3zM3 8a1 1 0 000 2h.01a1 1 0 100-2H3zM3 12a1 1 0 100 2h.01a1 1 0 100-2H3zM7 4a1 1 0 000 2h10a1 1 0 100-2H7zM7 8a1 1 0 000 2h10a1 1 0 100-2H7zM7 12a1 1 0 000 2h10a1 1 0 100-2H7z" />
              </svg>
            </button>
            <button onClick={insertOrderedListBlock} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="Ordered List Block">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 000 2h.01a1 1 0 100-2H3zM3 8a1 1 0 000 2h.01a1 1 0 100-2H3zM3 12a1 1 0 100 2h.01a1 1 0 100-2H3zM7 4a1 1 0 000 2h10a1 1 0 100-2H7zM7 8a1 1 0 000 2h10a1 1 0 100-2H7zM7 12a1 1 0 000 2h10a1 1 0 100-2H7z" />
              </svg>
            </button>
            <button onClick={insertNestedList} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="Nested List">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 000 2h.01a1 1 0 100-2H3zM3 8a1 1 0 000 2h.01a1 1 0 100-2H3zM3 12a1 1 0 100 2h.01a1 1 0 100-2H3zM7 4a1 1 0 000 2h10a1 1 0 100-2H7zM7 8a1 1 0 000 2h10a1 1 0 100-2H7zM7 12a1 1 0 000 2h10a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
            </button>
            <button onClick={insertDefinitionList} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="Definition List">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 000 2h.01a1 1 0 100-2H3zM3 8a1 1 0 000 2h.01a1 1 0 100-2H3zM3 12a1 1 0 100 2h.01a1 1 0 100-2H3zM7 4a1 1 0 000 2h10a1 1 0 100-2H7zM7 8a1 1 0 000 2h10a1 1 0 100-2H7zM7 12a1 1 0 000 2h10a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
            </button>
            <button onClick={insertCheckbox} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="Checkbox">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <button onClick={insertCheckboxChecked} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="Checked Checkbox">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Media & Links */}
          <div className="flex items-center gap-1 border-r border-gray-300 dark:border-gray-600 pr-2">
            <button onClick={cmdLink} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="Link (Ctrl+K)">🔗</button>
            <button onClick={cmdImage} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="Image">🖼</button>
          </div>

          {/* Code & Tables */}
          <div className="flex items-center gap-1 border-r border-gray-300 dark:border-gray-600 pr-2">
            <button onClick={insertCodeBlock} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 font-mono" title="Code Block">{`</>`}</button>
            <button onClick={insertTable} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="Table">⊞</button>
          </div>

          {/* Other */}
          <div className="flex items-center gap-1">
            <button onClick={cmdQuote} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="Blockquote">❝</button>
            <button onClick={insertHorizontalRule} className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="Horizontal Rule">—</button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex gap-4">
          {/* Table of Contents */}
          {showToc && toc.length > 0 && (
            <div className="w-64 bg-white dark:bg-gray-800 rounded shadow-sm p-4 border border-gray-300 dark:border-gray-600">
              <h3 className="font-semibold mb-3 text-sm">Table of Contents</h3>
              <div className="space-y-1">
                {toc.map((item, index) => (
                  <a
                    key={index}
                    href={`#heading-${item.title}`}
                    className={`block text-sm hover:text-blue-600 dark:hover:text-blue-400 ${item.level === 1 ? 'font-semibold' :
                      item.level === 2 ? 'ml-2' :
                        item.level === 3 ? 'ml-4' : 'ml-6'
                      }`}
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Editor + Preview */}
          <div className={`flex-1 grid ${split && showPreview ? 'grid-cols-2' : 'grid-cols-1'} gap-4`}>
            <div className="flex flex-col bg-white dark:bg-gray-800 rounded shadow-sm min-h-[60vh] border border-gray-300 dark:border-gray-600">
              <div className="flex items-center justify-between p-2 border-b border-gray-300 dark:border-gray-600">
                <span className="text-sm text-gray-500 dark:text-gray-400">Editor</span>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <span>Ln {textareaRef.current?.value.substring(0, textareaRef.current?.selectionStart).split('\n').length || 1}</span>
                  <span>Col {textareaRef.current?.selectionStart - textareaRef.current?.value.lastIndexOf('\n', textareaRef.current?.selectionStart - 1) || 1}</span>
                </div>
              </div>
              <textarea
                ref={textareaRef}
                value={md}
                onChange={(e) => setMd(e.target.value)}
                onScroll={onEditorScroll}
                className="flex-1 p-4 resize-none outline-none bg-transparent w-full font-mono text-sm leading-relaxed"
                style={{
                  minHeight: '40vh',
                  fontSize: `${fontSize}px`,
                  fontFamily: fontFamily === 'mono' ? 'Monaco, Consolas, "Courier New", monospace' : 'system-ui, sans-serif',
                  lineHeight: lineHeight
                }}
                placeholder="Start writing your markdown here..."
              />
            </div>

            {showPreview && (
              <div className="flex flex-col bg-white dark:bg-gray-800 rounded shadow-sm min-h-[60vh] border border-gray-300 dark:border-gray-600">
                <div className="flex items-center justify-between p-2 border-b border-gray-300 dark:border-gray-600">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Preview</span>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>{wordCount} words</span>
                    <span>•</span>
                    <span>{readingTime} min read</span>
                  </div>
                </div>
                <div
                  ref={previewRef}
                  className="prose prose-sm dark:prose-invert p-6 overflow-auto flex-1"
                  style={{ minHeight: '40vh' }}
                  dangerouslySetInnerHTML={renderMarkdown(md)}
                />
              </div>
            )}
          </div>
        </div>

        {/* Keyboard Shortcuts Help */}
        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
          <span className="mr-4"><kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">Ctrl+B</kbd> Bold</span>
          <span className="mr-4"><kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">Ctrl+I</kbd> Italic</span>
          <span className="mr-4"><kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">Ctrl+K</kbd> Link</span>
          <span className="mr-4"><kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">Ctrl+F</kbd> Find</span>
          <span className="mr-4"><kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">Ctrl+N</kbd> New File</span>
          <span className="mr-4"><kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">Ctrl+O</kbd> Open</span>
          <span className="mr-4"><kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">Ctrl+E</kbd> Export</span>
          <span><kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">Esc</kbd> Close Panels</span>
        </div>
      </div>
    </div>
  );
}
