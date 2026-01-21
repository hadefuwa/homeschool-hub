import React from 'react';
import ReactMarkdown from 'react-markdown';
import YouTubeEmbed from './YouTubeEmbed';
import InteractiveQuestion from './InteractiveQuestion';
import { extractYouTubeVideosFromContent } from '../utils/youtube';
import { speak } from '../utils/textToSpeech';

/**
 * Markdown component that automatically embeds YouTube videos
 * Replaces YouTube links with embedded video players
 */
function MarkdownWithYouTube({ content, removeTitle = true, onQuestionAnswer }) {
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
  
  // Helper function to remove title from content if needed
  const removeTitleFromContent = (contentText) => {
    if (!removeTitle) return contentText;
    
    const lines = contentText.split('\n');
    let titleRemoved = false;
    return lines
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
  };

  // Helper function to split content and insert YouTube embeds
  const processContentWithVideos = (contentText, segmentStartIndex = 0, isFirstSegment = false) => {
    // Filter videos that are within this segment
    const segmentEndIndex = segmentStartIndex + contentText.length;
    const segmentVideos = videos
      .filter(video => video.index >= segmentStartIndex && video.index < segmentEndIndex)
      .map(video => ({
        ...video,
        // Adjust index to be relative to segment start
        relativeIndex: video.index - segmentStartIndex,
      }))
      .sort((a, b) => a.relativeIndex - b.relativeIndex);

    if (segmentVideos.length === 0) {
      return [{
        type: 'markdown',
        content: isFirstSegment ? removeTitleFromContent(contentText) : contentText,
      }];
    }
    
    const elements = [];
    let lastIndex = 0;
    let titleRemoved = false;

    segmentVideos.forEach((video) => {
      // Add markdown content before this video
      if (video.relativeIndex > lastIndex) {
        const beforeContent = contentText.substring(lastIndex, video.relativeIndex);
        const processedContent = isFirstSegment && !titleRemoved 
          ? removeTitleFromContent(beforeContent)
          : beforeContent;
        
        if (isFirstSegment) titleRemoved = true;
        
        if (processedContent.trim()) {
          elements.push({
            type: 'markdown',
            content: processedContent,
          });
        }
      }
      
      // Add YouTube embed
      elements.push({
        type: 'youtube',
        videoId: video.id,
      });
      
      // Move past the YouTube link
      lastIndex = video.relativeIndex + video.fullMatch.length;
    });
    
    // Add remaining markdown content
    if (lastIndex < contentText.length) {
      const remainingContent = contentText.substring(lastIndex);
      if (remainingContent.trim()) {
        elements.push({
          type: 'markdown',
          content: remainingContent,
        });
      }
    }
    
    // If no videos were found in this segment, just return the markdown
    if (elements.length === 0) {
      return [{
        type: 'markdown',
        content: isFirstSegment ? removeTitleFromContent(contentText) : contentText,
      }];
    }
    
    return elements;
  };

  // Split content into segments (markdown, questions, and YouTube videos)
  const segments = [];
  let lastIndex = 0;
  let isFirstSegment = true;
  
  if (questionMatches.length > 0) {
    questionMatches.forEach((qm) => {
      // Add markdown content before this question (may include YouTube videos)
      if (qm.index > lastIndex) {
        const segmentContent = content.substring(lastIndex, qm.index);
        const processedElements = processContentWithVideos(segmentContent, lastIndex, isFirstSegment);
        segments.push(...processedElements);
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
      const processedElements = processContentWithVideos(segmentContent, lastIndex, isFirstSegment);
      segments.push(...processedElements);
    }
  } else {
    // No questions, just render all content with YouTube videos
    const processedElements = processContentWithVideos(content, 0, true);
    segments.push(...processedElements);
  }

  // Helper function to extract dinosaur name from text context
  const extractDinosaurName = (text, emojiIndex) => {
    // Look for text before the emoji, typically in format "**Name** 🦖" or "Name 🦖"
    const beforeEmoji = text.substring(0, emojiIndex).trim();
    
    // Remove markdown formatting (**bold**, *italic*, etc.)
    let name = beforeEmoji
      .replace(/\*\*/g, '') // Remove bold
      .replace(/\*/g, '')    // Remove italic
      .replace(/#{1,6}\s*/g, '') // Remove headers
      .trim();
    
    // Extract the last word or phrase (the dinosaur name)
    // Handle cases like "**T-Rex** 🦖" -> "T-Rex"
    const words = name.split(/\s+/);
    if (words.length > 0) {
      const lastWord = words[words.length - 1];
      // Remove any trailing punctuation
      name = lastWord.replace(/[.,;:!?]+$/, '');
    }
    
    return name || 'dinosaur';
  };

  // Helper function to process text and make emojis clickable
  const processTextWithClickableEmojis = (text) => {
    if (!text || typeof text !== 'string') return text;
    
    // Emoji regex pattern (covers most emojis including 🦖, 🦕, 🦏)
    const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{27FF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]/gu;
    const parts = [];
    let lastIndex = 0;
    let match;
    
    while ((match = emojiRegex.exec(text)) !== null) {
      // Add text before emoji
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      
      // Add clickable emoji
      const emoji = match[0];
      const dinosaurName = extractDinosaurName(text, match.index);
      
      parts.push(
        <span
          key={`emoji-${match.index}`}
          onClick={async (e) => {
            e.preventDefault();
            e.stopPropagation();
            try {
              await speak(dinosaurName, { volume: 1.0, rate: 0.8, pitch: 1.1 });
            } catch (error) {
              console.error('Error speaking dinosaur name:', error);
            }
          }}
          style={{
            cursor: 'pointer',
            userSelect: 'none',
            display: 'inline-block',
            transition: 'transform 0.1s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          {emoji}
        </span>
      );
      
      lastIndex = match.index + emoji.length;
    }
    
    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    
    return parts.length > 0 ? parts : text;
  };

  // Custom renderer for ReactMarkdown
  const components = {
    p: ({ children, ...props }) => {
      // Regular paragraph - check if it's just whitespace or empty
      const text = typeof children === 'string' 
        ? children 
        : React.Children.toArray(children).join('');
      
      if (!text || text.trim() === '') {
        return null;
      }
      
      // Process text to make emojis clickable
      const processedChildren = typeof children === 'string' 
        ? processTextWithClickableEmojis(children)
        : React.Children.map(children, (child) => {
            if (typeof child === 'string') {
              return processTextWithClickableEmojis(child);
            }
            return child;
          });
      
      return <p {...props}>{processedChildren}</p>;
    },
    strong: ({ children, ...props }) => {
      // Process bold text for emojis
      const processedChildren = typeof children === 'string' 
        ? processTextWithClickableEmojis(children)
        : React.Children.map(children, (child) => {
            if (typeof child === 'string') {
              return processTextWithClickableEmojis(child);
            }
            return child;
          });
      
      return <strong {...props}>{processedChildren}</strong>;
    },
    text: ({ children, ...props }) => {
      // Process text nodes for emojis
      if (typeof children === 'string') {
        return <>{processTextWithClickableEmojis(children)}</>;
      }
      return <>{children}</>;
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
                questionId={segment.questionIndex}
                question={question.question}
                options={question.options}
                correctIndex={question.correctIndex}
                explanation={question.explanation}
                onAnswer={onQuestionAnswer}
              />
            );
          }
          return null;
        } else if (segment.type === 'youtube') {
          return (
            <YouTubeEmbed 
              key={`youtube-${segment.videoId}-${idx}`} 
              videoId={segment.videoId} 
            />
          );
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

