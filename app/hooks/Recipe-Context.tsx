'use client';

import React, { createContext, useContext, useEffect, useReducer } from 'react';

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
  deleteRecipe: (id: number) => void;
};

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

type Action =
  | { type: 'ADD_RECIPE'; recipe: Recipe }
  | { type: 'EDIT_RECIPE'; recipe: Recipe }
  | { type: 'DELETE_RECIPE'; id: number }
  | { type: 'RESTORE_RECIPE'; updatedVersions: Recipe[] }
  | { type: 'SET_RECIPES'; recipes: Recipe[][] };

const recipeReducer = (state: Recipe[][], action: Action): Recipe[][] => {
  switch (action.type) {
    case 'ADD_RECIPE':
      return [...state, [action.recipe]];
    case 'EDIT_RECIPE':
      return state.map((recipeArray) =>
        recipeArray[0].id === action.recipe.id
          ? [...recipeArray, action.recipe]
          : recipeArray
      );
    case 'DELETE_RECIPE':
      return state.filter((recipeArray) => recipeArray[0].id !== action.id);
    case 'RESTORE_RECIPE':
      return state.map((recipeArray) =>
        recipeArray[0].id === action.updatedVersions[0].id
          ? action.updatedVersions
          : recipeArray
      );
    case 'SET_RECIPES':
      return action.recipes;
    default:
      return state;
  }
};

export const RecipeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [recipes, dispatch] = useReducer(recipeReducer, []);

  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem('recipes') || '[]');
    dispatch({ type: 'SET_RECIPES', recipes: storedRecipes });
  }, []);

  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  const addRecipe = (newRecipe: Recipe) => {
    dispatch({ type: 'ADD_RECIPE', recipe: newRecipe });
  };

  const editRecipe = (newRecipe: Recipe) => {
    dispatch({ type: 'EDIT_RECIPE', recipe: newRecipe });
  };

  const restoreRecipe = (updatedVersions: Recipe[]) => {
    dispatch({ type: 'RESTORE_RECIPE', updatedVersions });
  };

  const deleteRecipe = (id: number) => {
    dispatch({ type: 'DELETE_RECIPE', id });
  };

  return (
    <RecipeContext.Provider
      value={{ recipes, addRecipe, editRecipe, deleteRecipe, restoreRecipe }}
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
