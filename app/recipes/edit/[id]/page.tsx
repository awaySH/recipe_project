'use client';

import { useRecipes } from '@/app/hooks/Recipe-Context';
import { useParams } from 'next/navigation';

export default function EditRecipe() {
  const { id } = useParams();
  const { recipes } = useRecipes();

  const recipeVersions = recipes.find(
    (r) => r[r.length - 1].id.toString() === id
  );
  const recipe = recipeVersions
    ? recipeVersions[recipeVersions.length - 1]
    : null;

  if (!recipe) {
    return <div>레시피를 찾을 수 없습니다.</div>;
  }

  return <div>{recipe.title} 수정 페이지 입니당!</div>;
}
