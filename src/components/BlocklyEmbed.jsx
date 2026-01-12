import React, { useState, useEffect } from 'react';

/**
 * Blockly Games Embed Component
 * Renders Blockly Games using an iframe with internet connectivity check for remote URLs
 * Supports both remote URLs and local file paths
 */
function BlocklyEmbed({ url = 'https://blockly.games/?lang=en', width = '100%', height = '600px', isLocal = false }) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isLoading, setIsLoading] = useState(true);

  // Determine if this is a local file path
  const isLocalFile = isLocal || url.startsWith('/') || url.startsWith('./') || url.startsWith('../') || !url.startsWith('http');
  
  // Convert local file paths to use custom protocol in Electron
  const getFinalUrl = () => {
    if (isLocalFile && window.electronAPI) {
      // In Electron, convert /blockly-games/... to blockly://blockly-games/...
      if (url.startsWith('/blockly-games/')) {
        return `blockly://${url.substring(1)}`;
      }
      // Handle other local paths
      if (url.startsWith('/')) {
        return `blockly://${url.substring(1)}`;
      }
    }
    return url;
  };
  
  const finalUrl = getFinalUrl();

  useEffect(() => {
    // For local files, skip internet check
    if (isLocalFile) {
      setIsOnline(true);
      setIsLoading(false);
      return;
    }

    // Check internet connectivity for remote URLs
    const checkOnline = () => setIsOnline(navigator.onLine);
    
    // Listen for online/offline events
    window.addEventListener('online', checkOnline);
    window.addEventListener('offline', checkOnline);

    // Try to fetch the URL to verify connectivity
    fetch(finalUrl, { method: 'HEAD', mode: 'no-cors' })
      .then(() => {
        setIsOnline(true);
        setIsLoading(false);
      })
      .catch(() => {
        // If fetch fails, check navigator.onLine
        setIsOnline(navigator.onLine);
        setIsLoading(false);
      });

    return () => {
      window.removeEventListener('online', checkOnline);
      window.removeEventListener('offline', checkOnline);
    };
  }, [url, isLocalFile, finalUrl]);

  if (isLoading) {
    return (
      <div style={{
        width: '100%',
        height: height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
      }}>
        <p style={{ color: '#666', fontSize: '16px' }}>Loading...</p>
      </div>
    );
  }

  if (!isLocalFile && !isOnline) {
    return (
      <div style={{
        width: '100%',
        height: height,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        padding: '40px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>🌐</div>
        <h3 style={{ color: '#333', marginBottom: '10px' }}>Internet Connection Required</h3>
        <p style={{ color: '#666', fontSize: '16px' }}>
          Sorry, this lesson requires internet connection.
        </p>
        <p style={{ color: '#999', fontSize: '14px', marginTop: '10px' }}>
          Please check your internet connection and try again.
        </p>
      </div>
    );
  }

  // If height is 100%, use flex layout instead of fixed height
  const useFlexHeight = height === '100%';
  
  return (
    <div style={{
      width: '100%',
      ...(useFlexHeight ? {
        flex: 1,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
      } : {
        height: height,
      }),
      position: 'relative',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      backgroundColor: '#fff',
    }}>
      <iframe
        width={width}
        height={height}
        src={finalUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          flex: useFlexHeight ? 1 : undefined,
          minHeight: useFlexHeight ? 0 : undefined,
        }}
        title="Blockly Games"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsOnline(false);
          setIsLoading(false);
        }}
      />
    </div>
  );
}

export default BlocklyEmbed;
