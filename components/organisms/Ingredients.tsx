type IngredientProps = {
  ingredients?: string[];
  onDelete?: (index: number) => void;
};

export default function IngredientList({
  ingredients = [],
  onDelete,
}: IngredientProps) {
  return (
    <ul className='list-disc list-inside mb-4'>
      {ingredients.map((ingredient, index) => (
        <li key={index}>
          <span>{ingredient}</span>
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
