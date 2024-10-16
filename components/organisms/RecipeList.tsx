'use client';

import { useRecipes } from '../../lib/recipe-context';
import RecipeItem from './RecipeItem';

export default function RecipeList() {
  const { recipes } = useRecipes();

  if (!recipes || recipes.length === 0) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gray-100'>
        <div className='text-center'>
          <div className='text-9xl py-10'>🥩</div>
          <div className='text-xl font-semibold text-black mb-4'>
            레시피가 없습니다.
          </div>
          <div className='text-xl font-semibold text-black mb-4'>
            지금 바로 레시피를 만들어 주세요!
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ul>
        {recipes.map((recipe) => (
          <RecipeItem key={recipe.id} recipe={recipe} />
        ))}
      </ul>
    </div>
  );
}
