import React, { useState, useEffect, useRef } from 'react';

const TextareaEditor = ({ value, onChange, placeholder }) => {
  const [content, setContent] = useState(value || '');
  const [history, setHistory] = useState([value || '']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const textareaRef = useRef(null);
  const isTyping = useRef(false);
  const typingTimeout = useRef(null);

  // Sync with parent component when value changes externally
  useEffect(() => {
    if (value !== content) {
      setContent(value || '');
      setHistory([value || '']);
      setHistoryIndex(0);
    }
  }, [value]);

  // Add to history after typing stops
  const addToHistory = (newContent) => {
    // If we're not at the end of the history, truncate
    const newHistory = history.slice(0, historyIndex + 1);

    // Only add if different from the last entry
    if (newContent !== newHistory[newHistory.length - 1]) {
      setHistory([...newHistory, newContent]);
      setHistoryIndex(newHistory.length);
    }
  };

  // Handle content change and notify parent component
  const handleChange = (e) => {
    const newValue = e.target.value;
    setContent(newValue);
    onChange(newValue);

    // Track for history
    isTyping.current = true;

    // Clear any existing timeout
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    // Set new timeout
    typingTimeout.current = setTimeout(() => {
      if (isTyping.current) {
        addToHistory(newValue);
        isTyping.current = false;
      }
    }, 500); // Add to history after 500ms of no typing
  };

  // Handle undo
  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const previousContent = history[newIndex];
      setContent(previousContent);
      onChange(previousContent);
      setHistoryIndex(newIndex);

      // Focus the textarea after undo
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  };

  // Handle redo
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      const nextContent = history[newIndex];
      setContent(nextContent);
      onChange(nextContent);
      setHistoryIndex(newIndex);

      // Focus the textarea after redo
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }
    };
  }, []);

  return (
    <div className="border border-gray-300 rounded-md overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center p-2 bg-gray-50 border-b border-gray-300">
        {/* Undo/Redo buttons */}
        <button
          type="button"
          className={`p-1 mr-1 hover:bg-gray-200 rounded ${historyIndex > 0 ? 'text-gray-700' : 'text-gray-400 cursor-not-allowed'}`}
          onClick={handleUndo}
          disabled={historyIndex === 0}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 3L4 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 7H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
        <button
          type="button"
          className={`p-1 mr-3 hover:bg-gray-200 rounded ${historyIndex < history.length - 1 ? 'text-gray-700' : 'text-gray-400 cursor-not-allowed'}`}
          onClick={handleRedo}
          disabled={historyIndex >= history.length - 1}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 7H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Paragraph style dropdown */}
        <select
          className="mr-3 px-2 py-1 border border-gray-300 rounded text-sm"
        >
          <option value="p">Paragraph</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="pre">Preformatted</option>
        </select>

        {/* Text formatting */}
        <button
          type="button"
          className="p-1 mr-1 text-gray-600 hover:bg-gray-200 rounded"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
            <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
          </svg>
        </button>
        <button
          type="button"
          className="p-1 mr-1 text-gray-600 hover:bg-gray-200 rounded"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="4" x2="10" y2="4"></line>
            <line x1="14" y1="20" x2="5" y2="20"></line>
            <line x1="15" y1="4" x2="9" y2="20"></line>
          </svg>
        </button>

        {/* Insert Link */}
        <button
          type="button"
          className="p-1 mr-1 text-gray-600 hover:bg-gray-200 rounded"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
          </svg>
        </button>

        {/* Insert Image */}
        <button
          type="button"
          className="p-1 mr-1 text-gray-600 hover:bg-gray-200 rounded"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
        </button>

        {/* Insert Table */}
        <button
          type="button"
          className="p-1 mr-1 text-gray-600 hover:bg-gray-200 rounded"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="3" y1="9" x2="21" y2="9"></line>
            <line x1="3" y1="15" x2="21" y2="15"></line>
            <line x1="9" y1="3" x2="9" y2="21"></line>
            <line x1="15" y1="3" x2="15" y2="21"></line>
          </svg>
        </button>

        {/* Quote */}
        <button
          type="button"
          className="p-1 mr-1 text-gray-600 hover:bg-gray-200 rounded"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>

        {/* Removed lists and indent/outdent buttons */}
      </div>

      {/* Textarea editor area */}
      <textarea
        ref={textareaRef}
        className="w-full p-4 outline-none min-h-[200px] border-0 resize-none"
        value={content}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextareaEditor;
