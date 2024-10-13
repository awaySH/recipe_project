import React from 'react';

type TagProps = {
  tags: string[];
  onDelete?: (index: number) => void;
};

const Tag: React.FC<TagProps> = ({ tags, onDelete }) => {
  return (
    <div className='flex flex-wrap gap-2'>
      {tags.map((tag, index) => (
        <span
          key={index}
          className='bg-slate-200 text-gray-600 py-1 px-2 rounded flex items-center'
        >
          {tag}
          {onDelete && (
            <button
              className='ml-2 text-gray-600'
              onClick={() => onDelete(index)}
            >
              ×
            </button>
          )}
        </span>
      ))}
    </div>
  );
};

export default Tag;
