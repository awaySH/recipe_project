'use client';

import Link from 'next/link';
import { Recipe } from '../../lib/recipe-context';
import Button from '../atoms/Button';
import Tag from './Tags';

type RecipeItemProps = {
  recipe: Recipe;
};

export default function RecipeItem({ recipe }: RecipeItemProps) {
  const currentVersion = recipe.versions[recipe.currentVersion - 1];

  return (
    <section className='m-4 p-4 border rounded-md'>
      <li key={recipe.id} className='flex flex-col gap-2'>
        <h3 className='text-bold text-xl'>{currentVersion.title}</h3>
        <Tag tags={currentVersion.tags} />
        <p>버전: {recipe.currentVersion}</p>
        <p>최종 수정일: {currentVersion.saveTime}</p>
        <Link href={`/recipes/${recipe.id}`} className='w-full'>
          <Button variant='btn-success'>자세히 보기</Button>
        </Link>
      </li>
    </section>
  );
}
