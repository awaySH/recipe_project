type TagProps = {
  tags?: string[];
  onDelete?: (index: number) => void;
};

export default function Tag({ tags = [], onDelete }: TagProps) {
  return (
    <div className='flex flex-wrap gap-2 mb-1'>
      {tags.map((tag, index) => (
        <span
          key={index}
          className='bg-slate-400 text-gray-200 px-2 rounded flex items-center'
        >
          #{tag}
          {onDelete && (
            <button
              type='button'
              className='ml-2 text-gray-200'
              onClick={() => onDelete(index)}
            >
              ×
            </button>
          )}
        </span>
      ))}
    </div>
  );
}
