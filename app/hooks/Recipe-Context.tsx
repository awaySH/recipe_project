'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Recipe = {
  id: number;
  title: string;
  tags: string[];
  ingredients: string[];
  processes: string[];
};

type RecipeContextType = {
  recipes: Recipe[];
  addRecipe: (recipe: Recipe) => void;
};

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const RecipeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem('recipes') || '[]');
    setRecipes(storedRecipes);
  }, []);

  const addRecipe = (recipe: Recipe) => {
    const updatedRecipes = [...recipes, recipe];
    setRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
  };

  return (
    <RecipeContext.Provider value={{ recipes, addRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
};
