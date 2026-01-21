import React, { useState, useEffect } from 'react';

/**
 * Component to open GitHub releases page for manual updates
 * Clicking the button opens the GitHub releases page where users can download the latest version
 */
function UpdateChecker() {
  const [updateStatus, setUpdateStatus] = useState(null);
  const [appVersion, setAppVersion] = useState('');
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    // Get current app version
    if (window.electronAPI) {
      window.electronAPI.getAppVersion().then((result) => {
        if (result && result.version) {
          setAppVersion(result.version);
        }
      });
    }
  }, []);

  const checkForUpdates = async () => {
    if (!window.electronAPI) {
      setUpdateStatus('Update check only available in Electron app');
      return;
    }

    setChecking(true);
    setUpdateStatus(null);

    try {
      // Open GitHub releases page directly
      const result = await window.electronAPI.openExternal('https://github.com/hadefuwa/homeschool-hub/releases');
      
      if (result.success) {
        setUpdateStatus('Opening GitHub releases...');
        // Clear status after a moment
        setTimeout(() => {
          setUpdateStatus(null);
        }, 2000);
      } else {
        const errorMsg = result.error || 'Failed to open GitHub releases';
        setUpdateStatus(`Error: ${errorMsg}`);
        console.error('Failed to open GitHub releases:', errorMsg);
      }
    } catch (error) {
      const errorMsg = error.message || 'Unknown error';
      setUpdateStatus(`Error: ${errorMsg}`);
      console.error('Error opening GitHub releases:', error);
    } finally {
      setChecking(false);
    }
  };

  // Listen for download progress (optional - for showing progress bar)
  useEffect(() => {
    if (window.electronAPI && window.electronAPI.onUpdateDownloadProgress) {
      window.electronAPI.onUpdateDownloadProgress((progress) => {
        console.log('Download progress:', progress);
        // You can update UI here to show progress bar
        // setDownloadProgress(progress.percent);
      });

      return () => {
        if (window.electronAPI.removeUpdateDownloadProgressListener) {
          window.electronAPI.removeUpdateDownloadProgressListener();
        }
      };
    }
  }, []);

  if (!window.electronAPI) {
    return null; // Don't show in web mode
  }

  return (
    <div style={{
      padding: '10px',
      fontSize: '12px',
      color: '#666',
      textAlign: 'center',
    }}>
      {appVersion && (
        <div style={{ marginBottom: '5px' }}>
          Version {appVersion}
        </div>
      )}
      <button
        onClick={checkForUpdates}
        disabled={checking}
        style={{
          padding: '5px 10px',
          fontSize: '12px',
          backgroundColor: checking ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: checking ? 'not-allowed' : 'pointer',
        }}
      >
        {checking ? 'Opening...' : 'Check for Updates'}
      </button>
      {updateStatus && (
        <div style={{ marginTop: '5px', fontSize: '11px' }}>
          {updateStatus}
        </div>
      )}
    </div>
  );
}

export default UpdateChecker;
