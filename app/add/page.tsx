'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import Button from '@/components/atoms/Button';
import LabelInput from '@/components/molecules/LabelInput';
import Ingredients from '@/components/organisms/Ingredients';
import Process from '@/components/organisms/Process';
import Tags from '@/components/organisms/Tags';
import { Recipe, RecipeVersion, useRecipes } from '../../lib/recipe-context';

export default function Add() {
  const router = useRouter();
  const { recipes, addRecipe } = useRecipes();

  const [tags, setTags] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [processes, setProcesses] = useState<string[]>([]);

  const titleRef = useRef<HTMLInputElement>(null);
  const tagRef = useRef<HTMLInputElement>(null);
  const ingredientRef = useRef<HTMLInputElement>(null);
  const processRef = useRef<HTMLInputElement>(null);

  const addTag = () => {
    if (tagRef.current && tagRef.current.value) {
      const newTag = tagRef.current.value;
      setTags((prevTags) => [...prevTags, newTag]);
      tagRef.current.value = '';
    }
  };

  const deleteTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const addIngredient = () => {
    if (ingredientRef.current && ingredientRef.current.value) {
      const newIngredient = ingredientRef.current.value;
      setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
      ingredientRef.current.value = '';
    }
  };

  const deleteIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const addProcess = () => {
    if (processRef.current && processRef.current.value) {
      const newProcess = processRef.current.value;
      setProcesses((prevProcess) => [...prevProcess, newProcess]);
      processRef.current.value = '';
    }
  };

  const deleteProcess = (index: number) => {
    setProcesses(processes.filter((_, i) => i !== index));
  };

  const saveRecipe = (e: React.FormEvent) => {
    e.preventDefault();

    const newId = Math.max(...recipes.map((recipe) => recipe.id), 0) + 1;

    const now = new Date();
    const saveTime = now.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const newVersion: RecipeVersion = {
      version: 1,
      title: titleRef.current?.value || '',
      tags: tags,
      ingredients: ingredients,
      processes: processes,
      saveTime: saveTime,
    };

    const newRecipe: Recipe = {
      id: newId,
      versions: [newVersion],
      currentVersion: 1,
    };

    addRecipe(newRecipe);

    router.push('/');
  };

  return (
    <>
      <div className='flex items-center justify-center min-h-screen'>
        <form
          onSubmit={saveRecipe}
          className='bg-gray-50 rounded-lg px-40 py-10 shadow-md'
        >
          <div className='text-2xl font-semibold mb-6 text-center'>
            레시피 추가
          </div>
          <LabelInput
            label='레시피 제목'
            ref={titleRef}
            buttonClassNames='hidden'
          />
          <LabelInput
            label='태그'
            ref={tagRef}
            buttonText='추가'
            buttonType='button'
            onClick={addTag}
          />
          <Tags tags={tags} onDelete={deleteTag} />
          <div className='mt-3'></div>
          <LabelInput
            label='재료 목록'
            ref={ingredientRef}
            buttonText='추가'
            buttonType='button'
            onClick={addIngredient}
          />
          <Ingredients ingredients={ingredients} onDelete={deleteIngredient} />
          <LabelInput
            label='조리 과정'
            ref={processRef}
            buttonText='추가'
            buttonType='button'
            onClick={addProcess}
          />
          <Process processes={processes} onDelete={deleteProcess} />
          <div className=' flex items-center justify-center mt-3'>
            <Button type='submit' variant='success'>
              레시피 저장
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
