import { Fragment } from 'react';

type InlineFormattedTextProps = {
  text: string;
};

export default function InlineFormattedText({
  text,
}: InlineFormattedTextProps) {
  const segments = text.split(/(`[^`]+`)/g).filter(Boolean);

  return (
    <>
      {segments.map((segment, index) => {
        if (segment.startsWith('`') && segment.endsWith('`')) {
          return (
            <code key={`${segment}-${index}`} className="inline-code">
              {segment.slice(1, -1)}
            </code>
          );
        }

        return <Fragment key={`${segment}-${index}`}>{segment}</Fragment>;
      })}
    </>
  );
}
