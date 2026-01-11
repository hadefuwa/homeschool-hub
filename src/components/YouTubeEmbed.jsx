import React from 'react';

/**
 * YouTube Embed Component
 * Renders a YouTube video using an iframe
 */
function YouTubeEmbed({ videoId, width = '100%', height = '400px', options = {} }) {
  if (!videoId) return null;

  // Build embed URL with options
  const embedUrl = (() => {
    const params = new URLSearchParams();
    
    if (options.autoplay) params.append('autoplay', '1');
    if (options.loop) params.append('loop', '1');
    if (options.playlist) params.append('playlist', options.playlist);
    if (options.start) params.append('start', options.start);
    if (options.end) params.append('end', options.end);
    if (options.mute) params.append('mute', '1');
    
    // Privacy and UX options
    params.append('modestbranding', '1');
    params.append('rel', '0'); // Don't show related videos from other channels
    
    const queryString = params.toString();
    return `https://www.youtube.com/embed/${videoId}${queryString ? '?' + queryString : ''}`;
  })();

  return (
    <div style={{
      width: '100%',
      maxWidth: '800px',
      margin: '20px auto',
      position: 'relative',
      paddingBottom: '56.25%', // 16:9 aspect ratio
      height: 0,
      overflow: 'hidden',
    }}>
      <iframe
        width={width}
        height={height}
        src={embedUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
        title={`YouTube video player - ${videoId}`}
      />
    </div>
  );
}

export default YouTubeEmbed;

