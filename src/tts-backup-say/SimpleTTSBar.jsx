import React from 'react';
import { useSimpleTTS } from '../hooks/useSimpleTTS';
import './SimpleTTSBar.css';

/**
 * Simple TTS Control Bar
 */
const SimpleTTSBar = () => {
  const { enabled, speaking, lastText, rate, volume, speak, stop, replay, setRate, setVolume, setEnabled } = useSimpleTTS();
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

          {/* Always show play/stop buttons */}
          {speaking ? (
            <button className="simple-tts-btn simple-tts-stop" onClick={stop}>
              ⏹️ Stop
            </button>
          ) : lastText ? (
            <button className="simple-tts-btn simple-tts-play" onClick={replay}>
              ▶️ Play
            </button>
          ) : null}
        </div>

        <div className="simple-tts-right">
          <label className="simple-tts-toggle">
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
            />
            <span>Auto-read</span>
          </label>
          <button 
            className={`simple-tts-settings ${showSettings ? 'active' : ''}`}
            onClick={() => setShowSettings(!showSettings)}
          >
            ⚙️
          </button>
        </div>
      </div>

      {showSettings && (
        <div className="simple-tts-settings-panel">
          <div className="simple-tts-setting">
            <label>
              Speed: {rate.toFixed(1)}x
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(parseFloat(e.target.value))}
              />
            </label>
          </div>
          <div className="simple-tts-setting">
            <label>
              Volume: {Math.round(volume * 100)}%
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
              />
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleTTSBar;
