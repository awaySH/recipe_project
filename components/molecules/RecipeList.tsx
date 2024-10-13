'use client';

import React from 'react';
import { useRecipes } from '../../app/hooks/Recipe-Context';
import RecipeItem from './RecipeItem';

const RecipeList: React.FC = () => {
  const { recipes } = useRecipes();

  return (
    <div>
      <h2>레시피 목록</h2>
      <ul>
        {recipes.map((recipe) => (
          <RecipeItem key={recipe.id} recipe={recipe} /> // RecipeItem 사용
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
