'use client';

import React from 'react';
import { useRecipes } from '../../app/hooks/Recipe-Context';
import RecipeItem from './RecipeItem';

const RecipeList: React.FC = () => {
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
};

export default RecipeList;
