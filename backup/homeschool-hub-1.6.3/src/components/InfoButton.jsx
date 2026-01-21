import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

/**
 * Info Button Component
 * Shows an info icon button that opens a modal with instructions
 */
function InfoButton({ content, title = 'Instructions' }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!content) return null;

  // Extract content without the main title (first # heading)
  const contentWithoutTitle = content
    .split('\n')
    .filter((line, index, arr) => {
      // Skip the first line if it starts with #
      if (index === 0 && line.trim().startsWith('#')) {
        return false;
      }
      // Skip the next line if it's empty and the first was a title
      if (index === 1 && arr[0].trim().startsWith('#') && line.trim() === '') {
        return false;
      }
      return true;
    })
    .join('\n')
    .trim();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          fontSize: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          zIndex: 1000,
          transition: 'background-color 0.2s',
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'}
        title="Show Instructions"
      >
        ℹ️
      </button>

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
            padding: '20px',
          }}
          onClick={() => setIsOpen(false)}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '30px',
              maxWidth: '600px',
              maxHeight: '80vh',
              overflowY: 'auto',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
            }}>
              <h2 style={{
                margin: 0,
                fontSize: '24px',
                color: '#333',
              }}>
                {title}
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '28px',
                  cursor: 'pointer',
                  color: '#666',
                  padding: '0',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '4px',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#f0f0f0';
                  e.target.style.color = '#333';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#666';
                }}
              >
                ×
              </button>
            </div>
            <div style={{
              fontSize: '16px',
              lineHeight: '1.8',
              color: '#333',
            }}>
              <ReactMarkdown>{contentWithoutTitle}</ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default InfoButton;
