'use client';

import React, { createContext, useContext, useEffect, useReducer } from 'react';

export type RecipeVersion = {
  version: number;
  title: string;
  tags: string[];
  ingredients: string[];
  processes: string[];
  saveTime: string;
};

export type Recipe = {
  id: number;
  versions: RecipeVersion[];
  currentVersion: number;
};

type RecipeContextType = {
  recipes: Recipe[];
  addRecipe: (recipe: Recipe) => void;
  editRecipe: (id: number, newVersion: RecipeVersion) => void;
  restoreVersion: (id: number, versionNumber: number) => void;
  deleteRecipe: (id: number) => void;
};

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

type Action =
  | { type: 'ADD_RECIPE'; recipe: RecipeVersion }
  | { type: 'EDIT_RECIPE'; id: number; newVersion: RecipeVersion }
  | { type: 'DELETE_RECIPE'; id: number }
  | { type: 'RESTORE_VERSION'; id: number; versionNumber: number }
  | { type: 'SET_RECIPES'; recipes: Recipe[] };

const recipeReducer = (state: Recipe[], action: Action): Recipe[] => {
  switch (action.type) {
    case 'ADD_RECIPE':
      return [
        ...state,
        { id: state.length + 1, versions: [action.recipe], currentVersion: 1 },
      ];
    case 'EDIT_RECIPE':
      return state.map((recipe) =>
        recipe.id === action.id
          ? {
              ...recipe,
              versions: [...recipe.versions, action.newVersion],
              currentVersion: recipe.versions.length + 1,
            }
          : recipe
      );
    case 'DELETE_RECIPE':
      return state.filter((recipe) => recipe.id !== action.id);
    case 'RESTORE_VERSION':
      return state.map((recipe) =>
        recipe.id === action.id
          ? { ...recipe, currentVersion: action.versionNumber }
          : recipe
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
  const initialState = JSON.parse(localStorage.getItem('recipes') || '[]');
  const [recipes, dispatch] = useReducer(recipeReducer, initialState);

  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem('recipes') || '[]');
    dispatch({ type: 'SET_RECIPES', recipes: storedRecipes });
  }, []);

  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  const addRecipe = (newRecipe: Recipe) => {
    dispatch({ type: 'ADD_RECIPE', recipe: newRecipe.versions[0] });
  };

  const editRecipe = (id: number, newVersion: RecipeVersion) => {
    dispatch({ type: 'EDIT_RECIPE', id, newVersion });
  };

  const restoreVersion = (id: number, versionNumber: number) => {
    dispatch({ type: 'RESTORE_VERSION', id, versionNumber });
  };

  const deleteRecipe = (id: number) => {
    dispatch({ type: 'DELETE_RECIPE', id });
  };

  return (
    <RecipeContext.Provider
      value={{ recipes, addRecipe, editRecipe, deleteRecipe, restoreVersion }}
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
