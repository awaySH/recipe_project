'use client';

import Link from 'next/link';
import React from 'react';
import { Recipe } from '../../app/hooks/Recipe-Context';
import Button from '../atoms/Button';
import Tag from './Tags';

const RecipeItem: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  return (
    <section className='m-4 p-4 border rounded-md'>
      <li key={recipe.id} className='flex flex-col gap-2'>
        <h3 className='text-bold text-xl'>{recipe.title}</h3>
        <Tag tags={recipe.tags} />
        <Link href={`/recipes/${recipe.id}`} className='w-full'>
          <Button variant='btn-success'>자세히 보기</Button>
        </Link>
      </li>
    </section>
  );
};

export default RecipeItem;
