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
    <section className='m-4 p-4 shadow-md rounded-md'>
      <li key={recipe.id} className='font-semibold flex flex-col gap-2'>
        <div className='font-bold text-xl'>{currentVersion.title}</div>
        <Tag tags={currentVersion.tags} />
        <div>버전: {recipe.currentVersion}</div>
        <div>최종 수정일: {currentVersion.saveTime}</div>
        <Link href={`/recipes/${recipe.id}`} className='w-full'>
          <Button variant='subsuccess'>자세히 보기</Button>
        </Link>
      </li>
    </section>
  );
}
