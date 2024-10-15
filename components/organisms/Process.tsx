type ProcessProps = {
  processes?: string[];
  onDelete?: (index: number) => void;
};

export default function ProcessList({
  processes = [],
  onDelete,
}: ProcessProps) {
  return (
    <ul className='list-disc'>
      {processes.map((process, index) => (
        <li key={index} className='flex items-center py-1'>
          <span>{process}</span>
          {onDelete && (
            <button
              type='button'
              className='text-red-500 text-xs ml-2'
              onClick={() => onDelete(index)}
            >
              삭제
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
