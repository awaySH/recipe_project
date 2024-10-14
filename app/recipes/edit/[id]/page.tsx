'use client';

import { Recipe, useRecipes } from '@/app/hooks/Recipe-Context';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Button from '@/components/atoms/Button';
import LabelInput from '@/components/molecules/LabelInput';
import Ingredients from '@/components/organisms/Ingredients';
import Process from '@/components/organisms/Process';
import Tags from '@/components/organisms/Tags';

export default function EditRecipe() {
  const router = useRouter();

  const { id } = useParams();
  const { recipes, editRecipe } = useRecipes();

  const [title, setTitle] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [processes, setProcesses] = useState<string[]>([]);

  const titleRef = useRef<HTMLInputElement>(null);
  const tagRef = useRef<HTMLInputElement>(null);
  const ingredientRef = useRef<HTMLInputElement>(null);
  const processRef = useRef<HTMLInputElement>(null);

  const recipeVersions = recipes.find((r) => r[0].id.toString() === id);

  const recipe = recipeVersions
    ? recipeVersions[recipeVersions.length - 1]
    : null;

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

  const changeRecipe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const saveTime = `수정일: ${year}.${month}.${day}일 ${hours}시 ${minutes}분 ${seconds}초`;

    const newRecipe: Recipe = {
      id: +id,
      title: titleRef.current?.value || '',
      tags: tags,
      ingredients: ingredients,
      processes: processes,
      saveTime: saveTime,
    };

    editRecipe(newRecipe);

    router.push(`/recipes/${id}`);
  };

  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title); // recipe.title로 초기값 설정
      setTags(recipe.tags || []);
      setIngredients(recipe.ingredients || []);
      setProcesses(recipe.processes || []);
    }
  }, [recipe]);

  if (!recipe) {
    return <div>레시피를 찾을 수 없습니다.</div>;
  }

  return (
    <>
      <h1>레시피 수정</h1>
      <form onSubmit={changeRecipe}>
        <LabelInput
          label='제목'
          ref={titleRef}
          buttonClassNames='hidden'
          defaultValue={title}
        />
        <LabelInput
          label='태그'
          ref={tagRef}
          buttonText='추가'
          buttonType='button'
          onClick={addTag}
        />
        <Tags tags={tags} onDelete={deleteTag} />
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
        <Button type='submit' variant='btn-success'>
          레시피 저장
        </Button>
      </form>
    </>
  );
}
