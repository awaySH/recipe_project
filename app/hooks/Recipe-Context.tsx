'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Recipe = {
  id: number;
  title: string;
  tags: string[];
  ingredients: string[];
  processes: string[];
  saveTime: string;
};

type RecipeContextType = {
  recipes: Recipe[][];
  addRecipe: (recipe: Recipe) => void;
  editRecipe: (recipe: Recipe) => void;
  restoreRecipe: (updatedVersions: Recipe[]) => void;
};

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const RecipeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [recipes, setRecipes] = useState<Recipe[][]>([]);

  const addRecipe = (newRecipe: Recipe) => {
    const updatedRecipes = [...recipes, [newRecipe]];
    setRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
  };

  const editRecipe = (newRecipe: Recipe) => {
    const newRecipes = recipes.map((recipeArray) => {
      if (recipeArray[0].id.toString() === newRecipe.id.toString()) {
        return [...recipeArray, newRecipe];
      }
      return recipeArray;
    });

    setRecipes(newRecipes);
    localStorage.setItem('recipes', JSON.stringify(newRecipes));
  };

  const restoreRecipe = (updatedVersions: Recipe[]) => {
    const newRecipes = recipes.map((recipeArray) => {
      if (recipeArray[0].id === updatedVersions[0].id) {
        return updatedVersions;
      }
      return recipeArray;
    });

    setRecipes(newRecipes);
    localStorage.setItem('recipes', JSON.stringify(newRecipes));
  };

  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem('recipes') || '[]');
    setRecipes(storedRecipes);
  }, []);

  return (
    <RecipeContext.Provider
      value={{ recipes, addRecipe, editRecipe, restoreRecipe }}
    >
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
