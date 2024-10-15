'use client';

import { useRecipes } from '../../lib/recipe-context';
import RecipeItem from './RecipeItem';

export default function RecipeList() {
  const { recipes } = useRecipes();

  if (!recipes || recipes.length === 0) {
    return <div>레시피가 없습니다.</div>;
  }

  return (
    <div>
      <h2>레시피 목록</h2>
      <ul>
        {recipes.map((recipe) => (
          <RecipeItem key={recipe.id} recipe={recipe} />
        ))}
      </ul>
    </div>
  );
}
