/**
 * Extract YouTube video ID from various YouTube URL formats
 * @param {string} url - YouTube URL
 * @returns {string|null} - YouTube video ID or null if not found
 */
export function extractYouTubeVideoId(url) {
  if (!url) return null;

  // Remove any markdown link formatting
  url = url.replace(/\[.*?\]\(/, '').replace(/\)$/, '');

  // Pattern 1: https://www.youtube.com/watch?v=VIDEO_ID
  let match = url.match(/(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/);
  if (match) return match[1];

  // Pattern 2: https://youtu.be/VIDEO_ID
  match = url.match(/(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (match) return match[1];

  // Pattern 3: https://www.youtube.com/embed/VIDEO_ID
  match = url.match(/(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
  if (match) return match[1];

  // Pattern 4: https://www.youtube.com/v/VIDEO_ID
  match = url.match(/(?:youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/);
  if (match) return match[1];

  return null;
}

/**
 * Extract all YouTube video IDs from markdown content
 * @param {string} content - Markdown content
 * @returns {Array<{id: string, url: string, index: number}>} - Array of video info
 */
export function extractYouTubeVideosFromContent(content) {
  if (!content) return [];

  const videos = [];
  
  // Pattern to match YouTube links in markdown: [text](youtube_url)
  const youtubeLinkPattern = /\[([^\]]+)\]\((https?:\/\/[^\)]*youtube[^\)]+)\)/gi;
  let match;

  while ((match = youtubeLinkPattern.exec(content)) !== null) {
    const url = match[2];
    const videoId = extractYouTubeVideoId(url);
    
    if (videoId) {
      videos.push({
        id: videoId,
        url: url,
        fullMatch: match[0],
        index: match.index,
      });
    }
  }

  // Also check for direct YouTube URLs in the content
  const directUrlPattern = /(https?:\/\/[^\s\)]*youtube[^\s\)]+)/gi;
  while ((match = directUrlPattern.exec(content)) !== null) {
    const url = match[1];
    const videoId = extractYouTubeVideoId(url);
    
    if (videoId && !videos.some(v => v.id === videoId)) {
      videos.push({
        id: videoId,
        url: url,
        fullMatch: match[0],
        index: match.index,
      });
    }
  }

  return videos;
}

/**
 * Get YouTube embed URL from video ID
 * @param {string} videoId - YouTube video ID
 * @param {object} options - Embed options
 * @returns {string} - YouTube embed URL
 */
export function getYouTubeEmbedUrl(videoId, options = {}) {
  if (!videoId) return null;

  const params = new URLSearchParams();
  
  if (options.autoplay) params.append('autoplay', '1');
  if (options.loop) params.append('loop', '1');
  if (options.playlist) params.append('playlist', options.playlist);
  if (options.start) params.append('start', options.start);
  if (options.end) params.append('end', options.end);
  if (options.mute) params.append('mute', '1');
  
  // Enable modest branding and other privacy features
  params.append('modestbranding', '1');
  params.append('rel', '0'); // Don't show related videos from other channels
  
  const queryString = params.toString();
  return `https://www.youtube.com/embed/${videoId}${queryString ? '?' + queryString : ''}`;
}



