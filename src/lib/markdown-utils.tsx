import React from 'react';

interface MarkdownContentProps {
  content: string | null | undefined;
  className?: string;
}

/**
 * Simple Markdown renderer component
 * Converts basic markdown syntax to HTML
 */
export function MarkdownContent({ content, className = '' }: MarkdownContentProps) {
  // Handle null, undefined, or empty content
  if (!content) {
    return null;
  }

  const renderMarkdown = (text: string) => {
    // Split by newlines to handle paragraphs
    const paragraphs = text.split('\n\n');
    
    return paragraphs.map((paragraph, pIndex) => {
      // Handle bold text **text**
      let processedText: (string | React.ReactElement)[] = [paragraph];
      
      // Process bold
      processedText = processedText.reduce<(string | React.ReactElement)[]>((acc, item) => {
        if (typeof item !== 'string') {
          acc.push(item);
          return acc;
        }
        const parts = item.split(/(\*\*.*?\*\*)/g);
        parts.forEach((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            acc.push(<strong key={`bold-${pIndex}-${i}`}>{part.slice(2, -2)}</strong>);
          } else if (part) {
            acc.push(part);
          }
        });
        return acc;
      }, []);
      
      // Process italic *text*
      processedText = processedText.reduce<(string | React.ReactElement)[]>((acc, item) => {
        if (typeof item !== 'string') {
          acc.push(item);
          return acc;
        }
        const parts = item.split(/(\*[^*]+?\*)/g);
        parts.forEach((part, i) => {
          if (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**')) {
            acc.push(<em key={`italic-${pIndex}-${i}`}>{part.slice(1, -1)}</em>);
          } else if (part) {
            acc.push(part);
          }
        });
        return acc;
      }, []);
      
      // Handle links [text](url)
      processedText = processedText.reduce<(string | React.ReactElement)[]>((acc, item) => {
        if (typeof item !== 'string') {
          acc.push(item);
          return acc;
        }
        const parts = item.split(/(\[.*?\]\(.*?\))/g);
        parts.forEach((part, i) => {
          const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
          if (linkMatch) {
            acc.push(
              <a
                key={`link-${pIndex}-${i}`}
                href={linkMatch[2]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C89E4F] hover:underline"
              >
                {linkMatch[1]}
              </a>
            );
          } else if (part) {
            acc.push(part);
          }
        });
        return acc;
      }, []);
      
      // Check if paragraph is a list item
      const lines = paragraph.split('\n');
      const isListItem = lines.every(line => line.trim().match(/^[-*]\s/));
      
      if (isListItem) {
        return (
          <ul key={`list-${pIndex}`} className="list-disc list-inside space-y-2 mb-4">
            {lines.map((line, lineIndex) => (
              <li key={`list-item-${pIndex}-${lineIndex}`}>
                {line.replace(/^[-*]\s/, '')}
              </li>
            ))}
          </ul>
        );
      }
      
      return (
        <p key={`para-${pIndex}`} className="mb-4 last:mb-0">
          {processedText}
        </p>
      );
    });
  };

  return (
    <div className={`markdown-content ${className}`}>
      {renderMarkdown(content)}
    </div>
  );
}

