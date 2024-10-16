'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { RecipeVersion, useRecipes } from '@/lib/recipe-context';
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

  const recipe = recipes.find((r) => r.id.toString() === id);
  const currentVersion = recipe
    ? recipe.versions[recipe.currentVersion - 1]
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
    const saveTime = now.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const newVersion: RecipeVersion = {
      version: (recipe?.versions.length || 0) + 1,
      title: titleRef.current?.value || '',
      tags: tags,
      ingredients: ingredients,
      processes: processes,
      saveTime: saveTime,
    };

    if (recipe) {
      editRecipe(recipe.id, newVersion);
    }

    router.push(`/recipes/${id}`);
  };

  useEffect(() => {
    if (currentVersion) {
      setTitle(currentVersion.title);
      setTags(currentVersion.tags || []);
      setIngredients(currentVersion.ingredients || []);
      setProcesses(currentVersion.processes || []);
    }
  }, [currentVersion]);

  if (!currentVersion) {
    return <div>레시피를 찾을 수 없습니다.</div>;
  }

  return (
    <>
      <div className='flex items-center justify-center min-h-screen'>
        <form
          onSubmit={changeRecipe}
          className='bg-gray-50 rounded-lg px-40 py-10 shadow-md'
        >
          <div className='text-2xl font-semibold mb-6 text-center'>
            레시피 수정
          </div>
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
