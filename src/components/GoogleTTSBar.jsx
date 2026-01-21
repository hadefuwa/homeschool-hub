import React from 'react';
import { useGoogleTTS } from '../hooks/useGoogleTTS';
import './SimpleTTSBar.css';

/**
 * Google TTS Control Bar
 * Features natural Google Translate voices
 */
const GoogleTTSBar = () => {
  const { 
    enabled,
    autoRead,
    speaking, 
    lastText, 
    rate, 
    speak, 
    stop, 
    replay, 
    setRate, 
    setEnabled,
    setAutoRead
  } = useGoogleTTS();
  
  const [showSettings, setShowSettings] = React.useState(false);

  return (
    <div className="simple-tts-bar">
      <div className="simple-tts-content">
        <div className="simple-tts-left">
          <span className="simple-tts-icon">
            {speaking ? '🔊' : enabled ? '🔉' : '🔇'}
          </span>
          <span className="simple-tts-status">
            {speaking ? 'Speaking...' : enabled ? 'Ready' : 'Disabled'}
          </span>

          {speaking ? (
            <button className="simple-tts-btn simple-tts-stop" onClick={stop} title="Stop speaking">
              ⏹️ Stop
            </button>
          ) : lastText ? (
            <button className="simple-tts-btn simple-tts-play" onClick={replay} title="Replay last text">
              ▶️ Replay
            </button>
          ) : null}
        </div>

        <div className="simple-tts-right">
          <button 
            className="simple-tts-btn simple-tts-settings" 
            onClick={() => setShowSettings(!showSettings)}
            title="TTS Settings"
          >
            ⚙️ Settings
          </button>
          <button 
            className={`simple-tts-btn simple-tts-toggle ${!enabled ? 'disabled' : ''}`}
            onClick={() => setEnabled(!enabled)}
            title={enabled ? 'Disable TTS' : 'Enable TTS'}
          >
            {enabled ? '✅ Enabled' : '❌ Disabled'}
          </button>
        </div>
      </div>

      {showSettings && (
        <div className="simple-tts-settings-panel">
          <div className="simple-tts-setting">
            <label htmlFor="tts-rate">
              Speed: {rate.toFixed(1)}x
            </label>
            <input 
              id="tts-rate"
              type="range" 
              min="0.5" 
              max="2.0" 
              step="0.1" 
              value={rate} 
              onChange={(e) => setRate(parseFloat(e.target.value))}
              className="simple-tts-slider"
            />
          </div>

          <div className="simple-tts-setting">
            <label>
              <input 
                type="checkbox" 
                checked={autoRead} 
                onChange={(e) => setAutoRead(e.target.checked)}
                style={{ marginRight: '8px' }}
              />
              Auto-read lessons
            </label>
          </div>

          <div className="simple-tts-voice-preview">
            <button 
              className="simple-tts-btn simple-tts-test"
              onClick={() => speak('Hello! This is a test of the text to speech voice.')}
              disabled={speaking}
            >
              🎤 Test Voice
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleTTSBar;
