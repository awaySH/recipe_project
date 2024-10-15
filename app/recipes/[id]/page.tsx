'use client';

import { useRecipes } from '@/app/hooks/Recipe-Context';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Timer from '@/components/organisms/Timer';

export default function RecipeDetail() {
  const { id } = useParams();
  const { recipes, restoreVersion } = useRecipes();

  const recipe = recipes.find((r) => r.id.toString() === id);

  if (!recipe) {
    return <div>레시피를 찾을 수 없습니다.</div>;
  }

  const currentVersion = recipe.versions[recipe.currentVersion - 1];

  return (
    <div className='max-w-4xl mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6'>{currentVersion.title}</h1>

      {/* 1. 타이머 */}
      <section className='mb-8 p-4 bg-gray-100 rounded-lg'>
        <h2 className='text-2xl font-semibold mb-4'>조리 타이머</h2>
        <Timer onTimeUp={() => alert('타이머가 끝났습니다!')} />
      </section>

      {/* 2. 현재 대표 버전의 레시피 정보 */}
      <section className='mb-8 p-4 bg-white shadow-md rounded-lg'>
        <h2 className='text-2xl font-semibold mb-4'>
          현재 레시피 (버전 {currentVersion.version})
        </h2>
        <p className='mb-2'>태그: {currentVersion.tags.join(', ')}</p>
        <h3 className='text-xl font-semibold mb-2'>재료</h3>
        <ul className='list-disc list-inside mb-4'>
          {currentVersion.ingredients.map((ingredient, idx) => (
            <li key={idx}>{ingredient}</li>
          ))}
        </ul>
        <h3 className='text-xl font-semibold mb-2'>조리 과정</h3>
        <ol className='list-decimal list-inside'>
          {currentVersion.processes.map((process, idx) => (
            <li key={idx}>{process}</li>
          ))}
        </ol>
      </section>

      {/* 3. 버전 목록과 버튼 */}
      <section className='mb-8'>
        <h2 className='text-2xl font-semibold mb-4'>버전 히스토리</h2>
        {recipe.versions.map((version, index) => (
          <div key={index} className='mb-4 p-4 bg-gray-50 rounded-lg'>
            <h3 className='text-xl font-semibold mb-2'>
              버전 {version.version} ({version.saveTime})
            </h3>
            <p className='mb-2'>태그: {version.tags.join(', ')}</p>
            <button
              onClick={() => restoreVersion(recipe.id, version.version)}
              className='mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            >
              이 버전으로 복원
            </button>
          </div>
        ))}
      </section>

      <div className='flex gap-4'>
        <Link href={`/recipes/edit/${recipe.id}`}>
          <button className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600'>
            수정하기
          </button>
        </Link>
        <Link href='/'>
          <button className='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600'>
            목록으로
          </button>
        </Link>
      </div>
    </div>
  );
}
