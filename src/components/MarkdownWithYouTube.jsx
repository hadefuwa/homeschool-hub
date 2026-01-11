import React from 'react';
import ReactMarkdown from 'react-markdown';
import YouTubeEmbed from './YouTubeEmbed';
import { extractYouTubeVideosFromContent } from '../utils/youtube';

/**
 * Markdown component that automatically embeds YouTube videos
 * Replaces YouTube links with embedded video players
 */
function MarkdownWithYouTube({ content }) {
  if (!content) return null;

  // Extract all YouTube videos from content
  const videos = extractYouTubeVideosFromContent(content);
  
  // Process content to replace YouTube links with placeholders
  let processedContent = content;
  const videoMap = new Map();
  
  videos.forEach((video, index) => {
    const placeholder = `\n\n__YOUTUBE_EMBED_${index}__\n\n`;
    videoMap.set(placeholder.trim(), video);
    // Replace the markdown link with placeholder (keep newlines for proper parsing)
    processedContent = processedContent.replace(video.fullMatch, placeholder);
  });

  // Custom renderer for ReactMarkdown that handles YouTube placeholders
  const components = {
    p: ({ children, ...props }) => {
      // Check if paragraph contains YouTube placeholder
      const text = typeof children === 'string' 
        ? children 
        : React.Children.toArray(children).join('');
      
      if (text && text.includes('__YOUTUBE_EMBED_')) {
        const match = text.match(/__YOUTUBE_EMBED_(\d+)__/);
        if (match) {
          const placeholder = match[0];
          const video = videoMap.get(placeholder);
          if (video) {
            return <YouTubeEmbed key={`youtube-${video.id}`} videoId={video.id} />;
          }
        }
      }
      
      // Regular paragraph - check if it's just whitespace or empty
      if (!text || text.trim() === '') {
        return null;
      }
      
      return <p {...props}>{children}</p>;
    },
  };

  return (
    <div className="markdown-content" style={{
      fontSize: '16px',
      lineHeight: '1.8',
      color: '#333',
    }}>
      <ReactMarkdown components={components}>
        {processedContent}
      </ReactMarkdown>
    </div>
  );
}

export default MarkdownWithYouTube;

