import React, { useState, useEffect, useRef } from 'react';

const CustomEditor = ({ value, onChange, placeholder }) => {
  const [content, setContent] = useState(value || '');
  const editorRef = useRef(null);
  const isComposing = useRef(false);

  // Sync with parent component when value changes externally
  useEffect(() => {
    if (value !== content) {
      setContent(value || '');
    }
  }, [value]);

  // Handle content change and notify parent component
  const handleInput = (e) => {
    if (isComposing.current) return;

    const newValue = editorRef.current.innerHTML;
    setContent(newValue);
    onChange(newValue);
  };

  // Handle IME composition events
  const handleCompositionStart = () => {
    isComposing.current = true;
  };

  const handleCompositionEnd = (e) => {
    isComposing.current = false;
    handleInput(e);
  };

  // Focus the editor when clicked outside the toolbar
  const handleEditorClick = () => {
    editorRef.current.focus();
  };

  // Handle toolbar button clicks
  const handleToolbarAction = (action, value = null) => {
    document.execCommand(action, false, value);
    editorRef.current.focus();
  };

  // Handle paragraph style selection
  const handleParagraphStyle = (e) => {
    const style = e.target.value;
    document.execCommand('formatBlock', false, `<${style}>`);
    editorRef.current.focus();
  };

  // Handle inserting link
  const handleInsertLink = () => {
    const url = prompt('Nhập đường dẫn liên kết:', 'https://');
    if (url) {
      document.execCommand('createLink', false, url);
    }
    editorRef.current.focus();
  };

  // Handle inserting image
  const handleInsertImage = () => {
    const url = prompt('Nhập đường dẫn ảnh:', 'https://');
    if (url) {
      document.execCommand('insertImage', false, url);
    }
    editorRef.current.focus();
  };

  return (
    <div className="border border-gray-300 rounded-md overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center p-2 bg-gray-50 border-b border-gray-300">
        {/* Navigation buttons */}
        <button
          type="button"
          className="p-1 mr-1 text-gray-600 hover:bg-gray-200 rounded"
          onClick={() => handleToolbarAction('undo')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 14 4 9 9 4"></polyline>
            <path d="M4 9h11a4 4 0 0 1 0 8h-1"></path>
          </svg>
        </button>
        <button
          type="button"
          className="p-1 mr-3 text-gray-600 hover:bg-gray-200 rounded"
          onClick={() => handleToolbarAction('redo')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 4 20 9 15 14"></polyline>
            <path d="M4 9h11a4 4 0 1 1 0 8h-1"></path>
          </svg>
        </button>

        {/* Paragraph style dropdown */}
        <select
          className="mr-3 px-2 py-1 border border-gray-300 rounded text-sm"
          onChange={handleParagraphStyle}
          defaultValue="p"
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
          onClick={() => handleToolbarAction('bold')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
            <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
          </svg>
        </button>
        <button
          type="button"
          className="p-1 mr-1 text-gray-600 hover:bg-gray-200 rounded"
          onClick={() => handleToolbarAction('italic')}
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
          onClick={handleInsertLink}
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
          onClick={handleInsertImage}
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
          className="p-1 mr-3 text-gray-600 hover:bg-gray-200 rounded"
          onClick={() => handleToolbarAction('formatBlock', 'blockquote')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>

        {/* Lists */}
        <button
          type="button"
          className="p-1 mr-1 text-gray-600 hover:bg-gray-200 rounded"
          onClick={() => handleToolbarAction('insertUnorderedList')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="8" y1="6" x2="21" y2="6"></line>
            <line x1="8" y1="12" x2="21" y2="12"></line>
            <line x1="8" y1="18" x2="21" y2="18"></line>
            <line x1="3" y1="6" x2="3.01" y2="6"></line>
            <line x1="3" y1="12" x2="3.01" y2="12"></line>
            <line x1="3" y1="18" x2="3.01" y2="18"></line>
          </svg>
        </button>
        <button
          type="button"
          className="p-1 mr-1 text-gray-600 hover:bg-gray-200 rounded"
          onClick={() => handleToolbarAction('insertOrderedList')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="10" y1="6" x2="21" y2="6"></line>
            <line x1="10" y1="12" x2="21" y2="12"></line>
            <line x1="10" y1="18" x2="21" y2="18"></line>
            <path d="M4 6h1v4"></path>
            <path d="M4 10h2"></path>
            <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path>
          </svg>
        </button>

        {/* Indent/Outdent */}
        <button
          type="button"
          className="p-1 mr-1 text-gray-600 hover:bg-gray-200 rounded"
          onClick={() => handleToolbarAction('outdent')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="20" y1="6" x2="9" y2="6"></line>
            <line x1="20" y1="12" x2="9" y2="12"></line>
            <line x1="20" y1="18" x2="9" y2="18"></line>
            <path d="M4 6l3 6-3 6"></path>
          </svg>
        </button>
        <button
          type="button"
          className="p-1 mr-1 text-gray-600 hover:bg-gray-200 rounded"
          onClick={() => handleToolbarAction('indent')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="20" y1="6" x2="9" y2="6"></line>
            <line x1="20" y1="12" x2="9" y2="12"></line>
            <line x1="20" y1="18" x2="9" y2="18"></line>
            <path d="M3 6l3 6-3 6"></path>
          </svg>
        </button>
      </div>

      {/* Editable content area with placeholder */}
      <div className="relative">
        <div
          ref={editorRef}
          className="p-4 outline-none min-h-[200px]"
          contentEditable="true"
          onInput={handleInput}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          onClick={handleEditorClick}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>

        {(!content || content === '<br>' || content === '<p></p>' || content === '<div><br></div>') && (
          <div className="absolute top-0 left-0 p-4 text-gray-400 pointer-events-none">
            {placeholder}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomEditor;
