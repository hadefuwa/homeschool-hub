import React from 'react';
import { useEdgeTTS } from '../hooks/useEdgeTTS';
import './SimpleTTSBar.css';

/**
 * Modern TTS Control Bar with Edge TTS
 * Features natural neural voices
 */
const SimpleTTSBar = () => {
  const { 
    enabled, 
    speaking, 
    lastText, 
    rate, 
    pitch,
    currentVoice,
    voices,
    speak, 
    stop, 
    replay, 
    setRate, 
    setPitch,
    setVoice,
    setEnabled 
  } = useEdgeTTS();
  
  const [showSettings, setShowSettings] = React.useState(false);

  return (
    <div className="simple-tts-bar">
      <div className="simple-tts-content">
        <div className="simple-tts-left">
          <span className="simple-tts-icon">
            {speaking ? '🔊' : enabled ? '🔉' : '🔇'}
          </span>
          <span className="simple-tts-status">
            {speaking ? 'Speaking...' : enabled ? 'Ready (Edge TTS)' : 'Disabled'}
          </span>

          {/* Always show play/stop buttons */}
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

      {/* Settings Panel */}
      {showSettings && (
        <div className="simple-tts-settings-panel">
          <div className="simple-tts-setting">
            <label htmlFor="tts-voice">
              Voice:
              <span className="simple-tts-voice-info">
                {voices.find(v => v.name === currentVoice)?.description || ''}
              </span>
            </label>
            <select 
              id="tts-voice"
              value={currentVoice} 
              onChange={(e) => setVoice(e.target.value)}
              className="simple-tts-select"
            >
              {voices.map(voice => (
                <option key={voice.name} value={voice.name}>
                  {voice.language} - {voice.gender} ({voice.description})
                </option>
              ))}
            </select>
          </div>

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
            <label htmlFor="tts-pitch">
              Pitch: {pitch > 0 ? '+' : ''}{pitch}Hz
            </label>
            <input 
              id="tts-pitch"
              type="range" 
              min="-10" 
              max="10" 
              step="1" 
              value={pitch} 
              onChange={(e) => setPitch(parseInt(e.target.value))}
              className="simple-tts-slider"
            />
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

export default SimpleTTSBar;
