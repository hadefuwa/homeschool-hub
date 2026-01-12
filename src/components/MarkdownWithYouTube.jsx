import React from 'react';
import ReactMarkdown from 'react-markdown';
import YouTubeEmbed from './YouTubeEmbed';
import InteractiveQuestion from './InteractiveQuestion';
import { extractYouTubeVideosFromContent } from '../utils/youtube';

/**
 * Markdown component that automatically embeds YouTube videos
 * Replaces YouTube links with embedded video players
 */
function MarkdownWithYouTube({ content, removeTitle = true }) {
  if (!content) return null;

  // Extract all YouTube videos from content
  const videos = extractYouTubeVideosFromContent(content);
  
  // Extract interactive questions from content
  const questionRegex = /<!-- QUESTION_START -->\s*([\s\S]*?)\s*<!-- OPTIONS -->\s*([\s\S]*?)\s*<!-- CORRECT -->\s*(\d+)\s*(?:<!-- EXPLANATION -->\s*([\s\S]*?))?\s*<!-- QUESTION_END -->/g;
  const questions = [];
  const questionMatches = [];
  let match;
  
  // Reset regex lastIndex to ensure we get all matches
  questionRegex.lastIndex = 0;
  
  while ((match = questionRegex.exec(content)) !== null) {
    const questionIndex = questions.length;
    questions.push({
      question: match[1].trim(),
      options: match[2].split('|').map(opt => opt.trim()),
      correctIndex: parseInt(match[3]),
      explanation: match[4] ? match[4].trim() : null,
    });
    
    questionMatches.push({
      fullMatch: match[0],
      index: match.index,
      questionIndex: questionIndex,
    });
  }
  
  // Process content to replace YouTube links with placeholders
  const videoMap = new Map();
  
  videos.forEach((video, index) => {
    const placeholder = `\n\n__YOUTUBE_EMBED_${index}__\n\n`;
    videoMap.set(placeholder.trim(), video);
  });

  // Helper function to process a content segment (replace videos, remove title if needed)
  const processSegment = (segmentContent, isFirstSegment = false) => {
    // Replace YouTube videos with placeholders
    let processed = segmentContent;
    videos.forEach((video, index) => {
      const placeholder = `\n\n__YOUTUBE_EMBED_${index}__\n\n`;
      processed = processed.replace(video.fullMatch, placeholder);
    });
    
    // Remove title from first segment if needed
    if (removeTitle && isFirstSegment) {
      const lines = processed.split('\n');
      let titleRemoved = false;
      processed = lines
        .filter((line, index) => {
          // Skip the first line if it starts with #
          if (!titleRemoved && line.trim().startsWith('#')) {
            titleRemoved = true;
            return false;
          }
          // Skip the next line if it's empty and we just removed a title
          if (titleRemoved && index === 1 && line.trim() === '') {
            return false;
          }
          return true;
        })
        .join('\n')
        .trim();
    }
    
    return processed;
  };

  // Split content into segments (markdown and questions)
  const segments = [];
  let lastIndex = 0;
  let isFirstSegment = true;
  
  if (questionMatches.length > 0) {
    questionMatches.forEach((qm) => {
      // Add markdown content before this question
      if (qm.index > lastIndex) {
        const segmentContent = content.substring(lastIndex, qm.index);
        segments.push({
          type: 'markdown',
          content: processSegment(segmentContent, isFirstSegment),
        });
        isFirstSegment = false;
      }
      
      // Add question
      segments.push({
        type: 'question',
        questionIndex: qm.questionIndex,
      });
      
      lastIndex = qm.index + qm.fullMatch.length;
    });
    
    // Add remaining markdown content
    if (lastIndex < content.length) {
      const segmentContent = content.substring(lastIndex);
      segments.push({
        type: 'markdown',
        content: processSegment(segmentContent, isFirstSegment),
      });
    }
  } else {
    // No questions, just render all content
    segments.push({
      type: 'markdown',
      content: processSegment(content, true),
    });
  }

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
      {segments.map((segment, idx) => {
        if (segment.type === 'question') {
          const question = questions[segment.questionIndex];
          if (question) {
            return (
              <InteractiveQuestion
                key={`question-${segment.questionIndex}-${idx}`}
                question={question.question}
                options={question.options}
                correctIndex={question.correctIndex}
                explanation={question.explanation}
              />
            );
          }
          return null;
        } else {
          return (
            <ReactMarkdown key={`markdown-${idx}`} components={components}>
              {segment.content}
            </ReactMarkdown>
          );
        }
      })}
    </div>
  );
}

export default MarkdownWithYouTube;

