// MarkdownProX — Advanced Markdown Editor
// Professional markdown editor with powerful features
// Features: Advanced toolbar, keyboard shortcuts, file management, search/replace, word count, multiple export formats, real-time preview, and more.

import React, { useEffect, useRef, useState, useCallback } from "react";

export default function MarkdownProX() {
  const LOCAL_KEY = "markdownprox_content_v1";
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
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [focusMode, setFocusMode] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [commandQuery, setCommandQuery] = useState('');
  const textareaRef = useRef(null);
  const previewRef = useRef(null);
  const findInputRef = useRef(null);
  const commandInputRef = useRef(null);

  // initial sample
  const SAMPLE = `# Welcome to MarkdownProX

This is a **professional** markdown editor with powerful features and advanced capabilities.

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

  const insertTable = useCallback(() => {
    const table = `| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Row 1    | Data 1   | Data 2   |
| Row 2    | Data 3   | Data 4   |
| Row 3    | Data 5   | Data 6   |`;
    insertAround(table, '');
  }, [insertAround]);

  const insertCodeBlock = () => {
    insertAround('```\n', '\n```', 'code here');
  };

  const insertHorizontalRule = () => {
    insertAround('\n---\n', '');
  };

  const insertStrikethrough = () => {
    insertAround('~~', '~~');
  };

  const insertH2 = useCallback(() => {
    insertAround('## ', '');
  }, [insertAround]);

  const insertH3 = useCallback(() => {
    insertAround('### ', '');
  }, [insertAround]);

  const insertH4 = () => {
    insertAround('#### ', '');
  };

  const insertH5 = () => {
    insertAround('##### ', '');
  };

  const insertH6 = () => {
    insertAround('###### ', '');
  };

  const insertUnorderedList = useCallback(() => {
    insertAround('- ', '');
  }, [insertAround]);

  const insertOrderedList = () => {
    insertAround('1. ', '');
  };

  const insertCheckbox = () => {
    insertAround('- [ ] ', '');
  };

  const insertCheckboxChecked = () => {
    insertAround('- [x] ', '');
  };

  // Advanced features
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  }, []);

  const toggleFocusMode = useCallback(() => {
    setFocusMode(!focusMode);
  }, [focusMode]);

  const duplicateLine = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const text = ta.value;
    const lineStart = text.lastIndexOf('\n', start - 1) + 1;
    const lineEnd = text.indexOf('\n', start);
    const line = text.slice(lineStart, lineEnd === -1 ? text.length : lineEnd);
    const newText = text.slice(0, lineEnd === -1 ? text.length : lineEnd) + '\n' + line + text.slice(lineEnd === -1 ? text.length : lineEnd);
    setMd(newText);
  }, []);

  const moveLineUp = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const text = ta.value;
    const lines = text.split('\n');
    const lineIndex = text.substring(0, start).split('\n').length - 1;

    if (lineIndex > 0) {
      [lines[lineIndex - 1], lines[lineIndex]] = [lines[lineIndex], lines[lineIndex - 1]];
      const newText = lines.join('\n');
      setMd(newText);
    }
  }, []);

  const moveLineDown = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const text = ta.value;
    const lines = text.split('\n');
    const lineIndex = text.substring(0, start).split('\n').length - 1;

    if (lineIndex < lines.length - 1) {
      [lines[lineIndex], lines[lineIndex + 1]] = [lines[lineIndex + 1], lines[lineIndex]];
      const newText = lines.join('\n');
      setMd(newText);
    }
  }, []);

  const insertTimestamp = () => {
    const now = new Date();
    const timestamp = now.toLocaleString();
    insertAround(timestamp, '');
  };

  const insertDate = () => {
    const today = new Date().toLocaleDateString();
    insertAround(today, '');
  };

  const insertTime = () => {
    const now = new Date().toLocaleTimeString();
    insertAround(now, '');
  };

  const insertEmoji = (emoji) => {
    insertAround(emoji, '');
  };

  const insertHighlight = () => {
    insertAround('==', '==');
  };


  const insertTaskList = () => {
    const taskList = `- [ ] Task 1\n- [ ] Task 2\n- [x] Completed task`;
    insertAround(taskList, '');
  };

  const insertCollapsible = () => {
    const collapsible = `<details>\n<summary>Click to expand</summary>\n\nContent goes here...\n\n</details>`;
    insertAround(collapsible, '');
  };

  const insertAlert = (type) => {
    const alerts = {
      info: `> [!INFO]\n> This is an informational alert.`,
      warning: `> [!WARNING]\n> This is a warning alert.`,
      error: `> [!ERROR]\n> This is an error alert.`,
      success: `> [!SUCCESS]\n> This is a success alert.`
    };
    insertAround(alerts[type], '');
  };

  const insertBadge = () => {
    const badge = `![badge](https://img.shields.io/badge/Status-Ready-green)`;
    insertAround(badge, '');
  };

  const insertProgress = () => {
    const progress = `Progress: [████████░░] 80%`;
    insertAround(progress, '');
  };

  const insertVideo = () => {
    const video = `<video controls>\n  <source src="movie.mp4" type="video/mp4">\n  Your browser does not support the video tag.\n</video>`;
    insertAround(video, '');
  };

  const insertAudio = () => {
    const audio = `<audio controls>\n  <source src="audio.mp3" type="audio/mpeg">\n  Your browser does not support the audio element.\n</audio>`;
    insertAround(audio, '');
  };

  const insertMathInline = () => {
    insertAround('$', '$');
  };

  const insertMathBlock = () => {
    const mathBlock = `$$\n\\begin{equation}\n  E = mc^2\n\\end{equation}\n$$`;
    insertAround(mathBlock, '');
  };

  const insertMermaid = () => {
    const mermaid = `\`\`\`mermaid\ngraph TD\n    A[Start] --> B{Decision}\n    B -->|Yes| C[Action 1]\n    B -->|No| D[Action 2]\n    C --> E[End]\n    D --> E\n\`\`\``;
    insertAround(mermaid, '');
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

    const theme = localStorage.getItem("markdownprox_theme");
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
    localStorage.setItem("markdownprox_theme", isDark ? "dark" : "light");
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

  // common formatting
  const cmdBold = useCallback(() => { insertAround("**", "**"); }, [insertAround]);
  const cmdItalic = useCallback(() => { insertAround("*", "*"); }, [insertAround]);
  const cmdH1 = useCallback(() => { insertAround("# ", ""); }, [insertAround]);
  const cmdCode = useCallback(() => { insertAround("`", "`"); }, [insertAround]);
  const cmdQuote = useCallback(() => { insertAround("> ", ""); }, [insertAround]);
  const cmdLink = useCallback(() => { insertAround("[", "](https://)", "label"); }, [insertAround]);
  const cmdImage = useCallback(() => { insertAround("![", "](https://)", "alt text"); }, [insertAround]);

  // Command palette - defined after all functions
  const commands = [
    { name: 'Bold', action: cmdBold, shortcut: 'Ctrl+B' },
    { name: 'Italic', action: cmdItalic, shortcut: 'Ctrl+I' },
    { name: 'Heading 1', action: cmdH1, shortcut: 'Ctrl+1' },
    { name: 'Heading 2', action: insertH2, shortcut: 'Ctrl+2' },
    { name: 'Heading 3', action: insertH3, shortcut: 'Ctrl+3' },
    { name: 'Code Block', action: insertCodeBlock, shortcut: 'Ctrl+Shift+C' },
    { name: 'Table', action: insertTable, shortcut: 'Ctrl+T' },
    { name: 'Link', action: cmdLink, shortcut: 'Ctrl+K' },
    { name: 'Image', action: cmdImage, shortcut: 'Ctrl+Shift+I' },
    { name: 'Unordered List', action: insertUnorderedList, shortcut: 'Ctrl+U' },
    { name: 'Ordered List', action: insertOrderedList, shortcut: 'Ctrl+O' },
    { name: 'Checkbox', action: insertCheckbox, shortcut: 'Ctrl+Shift+X' },
    { name: 'Blockquote', action: cmdQuote, shortcut: 'Ctrl+Shift+Q' },
    { name: 'Horizontal Rule', action: insertHorizontalRule, shortcut: 'Ctrl+Shift+H' },
    { name: 'Strikethrough', action: insertStrikethrough, shortcut: 'Ctrl+Shift+S' },
    { name: 'Highlight', action: insertHighlight, shortcut: 'Ctrl+Shift+H' },
    { name: 'Math Inline', action: insertMathInline, shortcut: 'Ctrl+Shift+M' },
    { name: 'Math Block', action: insertMathBlock, shortcut: 'Ctrl+Shift+B' },
    { name: 'Mermaid Diagram', action: insertMermaid, shortcut: 'Ctrl+Shift+D' },
    { name: 'Timestamp', action: insertTimestamp, shortcut: 'Ctrl+Shift+T' },
    { name: 'Date', action: insertDate, shortcut: 'Ctrl+Shift+D' },
    { name: 'Time', action: insertTime, shortcut: 'Ctrl+Shift+T' },
    { name: 'Duplicate Line', action: duplicateLine, shortcut: 'Ctrl+D' },
    { name: 'Move Line Up', action: moveLineUp, shortcut: 'Alt+Up' },
    { name: 'Move Line Down', action: moveLineDown, shortcut: 'Alt+Down' },
    { name: 'Toggle Focus Mode', action: toggleFocusMode, shortcut: 'F11' },
    { name: 'Toggle Fullscreen', action: toggleFullscreen, shortcut: 'F12' },
    { name: 'Find & Replace', action: () => setShowFindReplace(true), shortcut: 'Ctrl+F' },
    { name: 'Export Markdown', action: exportMD, shortcut: 'Ctrl+E' },
    { name: 'New File', action: newFile, shortcut: 'Ctrl+N' },
    { name: 'Open File', action: () => document.getElementById('file-input')?.click(), shortcut: 'Ctrl+O' }
  ];

  const filteredCommands = commands.filter(cmd =>
    cmd.name.toLowerCase().includes(commandQuery.toLowerCase())
  );

  const executeCommand = (command) => {
    command.action();
    setShowCommandPalette(false);
    setCommandQuery('');
  };

  // Enhanced keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Command palette (Ctrl/Cmd + P)
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        setShowCommandPalette(true);
        setTimeout(() => commandInputRef.current?.focus(), 0);
        return;
      }

      // Focus mode (F11)
      if (e.key === 'F11') {
        e.preventDefault();
        toggleFocusMode();
        return;
      }

      // Fullscreen (F12)
      if (e.key === 'F12') {
        e.preventDefault();
        toggleFullscreen();
        return;
      }

      // Help (F1)
      if (e.key === 'F1') {
        e.preventDefault();
        setShowHelp(true);
        return;
      }

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
          case '1':
            e.preventDefault();
            cmdH1();
            break;
          case '2':
            e.preventDefault();
            insertH2();
            break;
          case '3':
            e.preventDefault();
            insertH3();
            break;
          case 'u':
            e.preventDefault();
            insertUnorderedList();
            break;
          case 't':
            e.preventDefault();
            insertTable();
            break;
          case 'd':
            e.preventDefault();
            duplicateLine();
            break;
        }
      }

      // Alt key combinations
      if (e.altKey) {
        switch (e.key) {
          case 'ArrowUp':
            e.preventDefault();
            moveLineUp();
            break;
          case 'ArrowDown':
            e.preventDefault();
            moveLineDown();
            break;
        }
      }

      if (e.key === 'Escape') {
        setShowFindReplace(false);
        setShowStats(false);
        setShowToc(false);
        setShowCommandPalette(false);
        setShowHelp(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [cmdBold, cmdItalic, cmdLink, exportMD, newFile, cmdH1, insertH2, insertH3, insertUnorderedList, insertTable, duplicateLine, moveLineUp, moveLineDown, toggleFocusMode, toggleFullscreen]);

  // Auto-save functionality
  useEffect(() => {
    setIsSaving(true);
    const timer = setTimeout(() => {
      setLastSaved(new Date());
      setIsSaving(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [md]);

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
        {/* Header with file tabs and controls - Sticky */}
        <header className="sticky top-0 z-40 backdrop-blur-md bg-white/90 dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-700 shadow-sm mb-4">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">MX</span>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  MarkdownProX
                </h1>
              </div>

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
          </div>
        </header>

        {/* Command Palette */}
        {showCommandPalette && (
          <div className="fixed inset-0 bg-black/50 flex items-start justify-center pt-20 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl mx-4">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <input
                  ref={commandInputRef}
                  type="text"
                  placeholder="Type a command or search..."
                  value={commandQuery}
                  onChange={(e) => setCommandQuery(e.target.value)}
                  className="w-full text-lg bg-transparent outline-none text-gray-900 dark:text-gray-100"
                  autoFocus
                />
              </div>
              <div className="max-h-96 overflow-y-auto">
                {filteredCommands.map((command, index) => (
                  <button
                    key={index}
                    onClick={() => executeCommand(command)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-between"
                  >
                    <span className="font-medium">{command.name}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{command.shortcut}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Help Modal */}
        {showHelp && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[80vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Keyboard Shortcuts & Help</h2>
                  <button
                    onClick={() => setShowHelp(false)}
                    className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Text Formatting</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span>Bold</span><kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">Ctrl+B</kbd></div>
                    <div className="flex justify-between"><span>Italic</span><kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">Ctrl+I</kbd></div>
                    <div className="flex justify-between"><span>Heading 1</span><kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">Ctrl+1</kbd></div>
                    <div className="flex justify-between"><span>Heading 2</span><kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">Ctrl+2</kbd></div>
                    <div className="flex justify-between"><span>Heading 3</span><kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">Ctrl+3</kbd></div>
                    <div className="flex justify-between"><span>Link</span><kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">Ctrl+K</kbd></div>
                    <div className="flex justify-between"><span>Code Block</span><kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">Ctrl+Shift+C</kbd></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">Navigation & Actions</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span>Find & Replace</span><kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">Ctrl+F</kbd></div>
                    <div className="flex justify-between"><span>New File</span><kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">Ctrl+N</kbd></div>
                    <div className="flex justify-between"><span>Open File</span><kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">Ctrl+O</kbd></div>
                    <div className="flex justify-between"><span>Export</span><kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">Ctrl+E</kbd></div>
                    <div className="flex justify-between"><span>Command Palette</span><kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">Ctrl+P</kbd></div>
                    <div className="flex justify-between"><span>Focus Mode</span><kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">F11</kbd></div>
                    <div className="flex justify-between"><span>Fullscreen</span><kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">F12</kbd></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">Line Operations</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span>Duplicate Line</span><kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">Ctrl+D</kbd></div>
                    <div className="flex justify-between"><span>Move Line Up</span><kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">Alt+↑</kbd></div>
                    <div className="flex justify-between"><span>Move Line Down</span><kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">Alt+↓</kbd></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">Advanced Features</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span>Insert Timestamp</span><kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">Ctrl+Shift+T</kbd></div>
                    <div className="flex justify-between"><span>Insert Date</span><kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">Ctrl+Shift+D</kbd></div>
                    <div className="flex justify-between"><span>Math Inline</span><kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">Ctrl+Shift+M</kbd></div>
                    <div className="flex justify-between"><span>Mermaid Diagram</span><kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">Ctrl+Shift+D</kbd></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

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

        {/* Enhanced Advanced Toolbar - Sticky */}
        <div className="sticky top-20 z-30 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-sm mb-4 border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Main Toolbar */}
          <div className="flex flex-wrap items-center gap-1 p-3 border-b border-gray-200 dark:border-gray-700">
            {/* Text Formatting */}
            <div className="flex items-center gap-1 border-r border-gray-300 dark:border-gray-600 pr-2">
              <button onClick={cmdBold} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 font-bold" title="Bold (Ctrl+B)">B</button>
              <button onClick={cmdItalic} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 italic" title="Italic (Ctrl+I)">I</button>
              <button onClick={insertStrikethrough} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 line-through" title="Strikethrough">S</button>
              <button onClick={cmdCode} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 font-mono text-sm" title="Inline Code">`</button>
            </div>

            {/* Headers */}
            <div className="flex items-center gap-1 border-r border-gray-300 dark:border-gray-600 pr-2">
              <button onClick={cmdH1} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 font-bold text-lg" title="Heading 1">H1</button>
              <button onClick={insertH2} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 font-bold text-base" title="Heading 2">H2</button>
              <button onClick={insertH3} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 font-bold text-sm" title="Heading 3">H3</button>
              <button onClick={insertH4} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 font-bold text-xs" title="Heading 4">H4</button>
              <button onClick={insertH5} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 font-bold text-xs" title="Heading 5">H5</button>
              <button onClick={insertH6} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 font-bold text-xs" title="Heading 6">H6</button>
            </div>

            {/* Lists */}
            <div className="flex items-center gap-1 border-r border-gray-300 dark:border-gray-600 pr-2">
              <button onClick={insertUnorderedList} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="Unordered List Item">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 000 2h.01a1 1 0 100-2H3zM3 8a1 1 0 000 2h.01a1 1 0 100-2H3zM3 12a1 1 0 100 2h.01a1 1 0 100-2H3zM7 4a1 1 0 000 2h10a1 1 0 100-2H7zM7 8a1 1 0 000 2h10a1 1 0 100-2H7zM7 12a1 1 0 100 2h10a1 1 0 100-2H7z" />
                </svg>
              </button>
              <button onClick={insertOrderedList} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="Ordered List Item">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1V3zM2 7a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1V7zM2 11a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 01-1-1v-2zM8 3a1 1 0 000 2h10a1 1 0 100-2H8zM8 7a1 1 0 000 2h10a1 1 0 100-2H8zM8 11a1 1 0 000 2h10a1 1 0 100-2H8z" />
                </svg>
              </button>
              <button onClick={insertUnorderedListBlock} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="Unordered List Block">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 000 2h.01a1 1 0 100-2H3zM3 8a1 1 0 000 2h.01a1 1 0 100-2H3zM3 12a1 1 0 100 2h.01a1 1 0 100-2H3zM7 4a1 1 0 000 2h10a1 1 0 100-2H7zM7 8a1 1 0 000 2h10a1 1 0 100-2H7zM7 12a1 1 0 000 2h10a1 1 0 100-2H7z" />
                </svg>
              </button>
              <button onClick={insertOrderedListBlock} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="Ordered List Block">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 000 2h.01a1 1 0 100-2H3zM3 8a1 1 0 000 2h.01a1 1 0 100-2H3zM3 12a1 1 0 100 2h.01a1 1 0 100-2H3zM7 4a1 1 0 000 2h10a1 1 0 100-2H7zM7 8a1 1 0 000 2h10a1 1 0 100-2H7zM7 12a1 1 0 000 2h10a1 1 0 100-2H7z" />
                </svg>
              </button>
              <button onClick={insertNestedList} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="Nested List">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 000 2h.01a1 1 0 100-2H3zM3 8a1 1 0 000 2h.01a1 1 0 100-2H3zM3 12a1 1 0 100 2h.01a1 1 0 100-2H3zM7 4a1 1 0 000 2h10a1 1 0 100-2H7zM7 8a1 1 0 000 2h10a1 1 0 100-2H7zM7 12a1 1 0 000 2h10a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
              </button>
              <button onClick={insertDefinitionList} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="Definition List">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 000 2h.01a1 1 0 100-2H3zM3 8a1 1 0 000 2h.01a1 1 0 100-2H3zM3 12a1 1 0 100 2h.01a1 1 0 100-2H3zM7 4a1 1 0 000 2h10a1 1 0 100-2H7zM7 8a1 1 0 000 2h10a1 1 0 100-2H7zM7 12a1 1 0 000 2h10a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
              </button>
              <button onClick={insertCheckbox} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="Checkbox">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button onClick={insertCheckboxChecked} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="Checked Checkbox">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* Media & Links */}
            <div className="flex items-center gap-1 border-r border-gray-300 dark:border-gray-600 pr-2">
              <button onClick={cmdLink} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="Link (Ctrl+K)">🔗</button>
              <button onClick={cmdImage} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="Image">🖼</button>
            </div>

            {/* Code & Tables */}
            <div className="flex items-center gap-1 border-r border-gray-300 dark:border-gray-600 pr-2">
              <button onClick={insertCodeBlock} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 font-mono" title="Code Block">{`</>`}</button>
              <button onClick={insertTable} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="Table">⊞</button>
            </div>

            {/* Advanced Features */}
            <div className="flex items-center gap-1 border-r border-gray-300 dark:border-gray-600 pr-2">
              <button onClick={insertHighlight} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="Highlight">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
              <button onClick={insertMathInline} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="Math Inline">∑</button>
              <button onClick={insertMathBlock} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="Math Block">∫</button>
              <button onClick={insertMermaid} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="Mermaid Diagram">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            {/* Time & Date */}
            <div className="flex items-center gap-1 border-r border-gray-300 dark:border-gray-600 pr-2">
              <button onClick={insertTimestamp} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="Insert Timestamp">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <button onClick={insertDate} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="Insert Date">📅</button>
              <button onClick={insertTime} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="Insert Time">🕐</button>
            </div>

            {/* Line Operations */}
            <div className="flex items-center gap-1 border-r border-gray-300 dark:border-gray-600 pr-2">
              <button onClick={duplicateLine} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="Duplicate Line (Ctrl+D)">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
              <button onClick={moveLineUp} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="Move Line Up (Alt+↑)">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                </svg>
              </button>
              <button onClick={moveLineDown} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="Move Line Down (Alt+↓)">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Emoji Picker */}
            <div className="flex items-center gap-1 border-r border-gray-300 dark:border-gray-600 pr-2">
              <div className="relative group">
                <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="Insert Emoji">😀</button>
                <div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 p-2">
                  <div className="grid grid-cols-8 gap-1">
                    {['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏'].map(emoji => (
                      <button
                        key={emoji}
                        onClick={() => insertEmoji(emoji)}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-lg"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Other */}
            <div className="flex items-center gap-1">
              <button onClick={cmdQuote} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="Blockquote">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
              <button onClick={insertHorizontalRule} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700" title="Horizontal Rule">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                </svg>
              </button>
            </div>
          </div>

          {/* Secondary Toolbar - Advanced Features */}
          <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-50 dark:bg-gray-900/50">
            <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
              <span className="font-medium">Quick Insert:</span>
            </div>
            <button onClick={insertTaskList} className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800" title="Task List">Tasks</button>
            <button onClick={insertCollapsible} className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded hover:bg-green-200 dark:hover:bg-green-800" title="Collapsible">Collapse</button>
            <button onClick={() => insertAlert('info')} className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800" title="Info Alert">Info</button>
            <button onClick={() => insertAlert('warning')} className="px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded hover:bg-yellow-200 dark:hover:bg-yellow-800" title="Warning Alert">Warning</button>
            <button onClick={() => insertAlert('error')} className="px-2 py-1 text-xs bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-800" title="Error Alert">Error</button>
            <button onClick={() => insertAlert('success')} className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded hover:bg-green-200 dark:hover:bg-green-800" title="Success Alert">Success</button>
            <button onClick={insertBadge} className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded hover:bg-purple-200 dark:hover:bg-purple-800" title="Badge">Badge</button>
            <button onClick={insertProgress} className="px-2 py-1 text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded hover:bg-indigo-200 dark:hover:bg-indigo-800" title="Progress Bar">Progress</button>
            <button onClick={insertVideo} className="px-2 py-1 text-xs bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-300 rounded hover:bg-pink-200 dark:hover:bg-pink-800" title="Video">Video</button>
            <button onClick={insertAudio} className="px-2 py-1 text-xs bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded hover:bg-orange-200 dark:hover:bg-orange-800" title="Audio">Audio</button>
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

        {/* Enhanced Status Bar */}
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                {isSaving ? (
                  <>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                    <span className="text-gray-600 dark:text-gray-400">Saving...</span>
                  </>
                ) : lastSaved ? (
                  <>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600 dark:text-gray-400">Saved {lastSaved.toLocaleTimeString()}</span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-gray-600 dark:text-gray-400">Auto-save enabled</span>
                  </>
                )}
              </div>
              {fullscreen && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600 dark:text-gray-400">Fullscreen Mode</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <span className="text-gray-500 dark:text-gray-400">Words:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">{wordCount.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 dark:text-gray-400">Characters:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">{charCount.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 dark:text-gray-400">Reading time:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">{readingTime} min</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
              <span><kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">Ctrl+P</kbd> Command Palette</span>
              <span><kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">F1</kbd> Help</span>
              <span><kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">F11</kbd> Focus</span>
              <span><kbd className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">F12</kbd> Fullscreen</span>
            </div>
          </div>
        </div>
      </div>

      {/* Beautiful Footer */}
      <footer className="mt-12 border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">MX</span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Made with <span className="text-red-500 animate-pulse">❤️</span> by <span className="font-semibold text-blue-600 dark:text-blue-400">Pankaj</span>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <span>© {new Date().getFullYear()} MarkdownProX</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Powered by React & Tailwind CSS</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Version 2.0</span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              A powerful markdown editor with advanced features • Built with modern web technologies
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
