import React from 'react';

type IngredientProps = {
  ingredients?: string[];
  onDelete?: (index: number) => void;
};

export default function IngredientList({
  ingredients = [],
  onDelete,
}: IngredientProps) {
  return (
    <ul className='list-disc'>
      {ingredients.map((ingredient, index) => (
        <li key={index} className='flex items-center py-1'>
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
