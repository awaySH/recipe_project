'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useRecipes } from '@/lib/recipe-context';
import IngredientList from '@/components/organisms/Ingredients';
import ProcessList from '@/components/organisms/Process';
import Tag from '@/components/organisms/Tags';
import Timer from '@/components/organisms/Timer';

export default function RecipeDetail() {
  const { id } = useParams();
  const { recipes, restoreVersion, deleteRecipe } = useRecipes();

  const recipe = recipes.find((r) => r.id.toString() === id);

  if (!recipe) {
    return <div>레시피를 찾을 수 없습니다.</div>;
  }

  const currentVersion = recipe.versions[recipe.currentVersion - 1];

  return (
    <div className='max-w-4xl mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6'>{currentVersion.title}</h1>

      {/* 1. 타이머 */}
      <section className='bg-gray-50 mb-8 p-4 rounded-lg shadow-md'>
        <h2 className='text-2xl font-semibold mb-4'>조리 타이머</h2>
        <Timer onTimeUp={() => alert('타이머가 끝났습니다!')} />
      </section>

      {/* 2. 현재 대표 버전의 레시피 정보 */}
      <section className='mb-8 p-4 bg-white shadow-md rounded-lg'>
        <h2 className='text-2xl font-semibold mb-4'>
          현재 레시피 (버전 {currentVersion.version})
        </h2>
        <h3 className='text-xl font-semibold mb-2'>태그</h3>
        <Tag tags={currentVersion.tags} />
        <h3 className='text-xl font-semibold mb-2'>재료</h3>
        <IngredientList ingredients={currentVersion.ingredients} />
        <h3 className='text-xl font-semibold mb-2'>조리 과정</h3>
        <ProcessList processes={currentVersion.processes} />
      </section>

      {/* 3. 버전 목록과 버튼 */}
      <section className='mb-8'>
        <h2 className='text-2xl font-semibold mb-4'>버전 히스토리</h2>
        {recipe.versions.map((version, index) => (
          <div key={index} className='mb-4 p-4 bg-gray-50 rounded-lg shadow-md'>
            <div className='flex justify-between items-center'>
              <h3 className='text-xl font-semibold'>
                버전 {version.version} ({version.saveTime})
              </h3>
              <button
                onClick={() => restoreVersion(recipe.id, version.version)}
                className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300'
              >
                이 버전으로 복원
              </button>
            </div>
            <Tag tags={version.tags} />
          </div>
        ))}
      </section>

      <div className='flex gap-4 items-center justify-center'>
        <Link href={`/recipes/edit/${recipe.id}`}>
          <button className='px-4 py-2 bg-main-yellow text-white rounded hover:bg-green-600'>
            수정하기
          </button>
        </Link>
        <Link href={`/`}>
          <button
            className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
            onClick={() => deleteRecipe(+id)}
          >
            삭제하기
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
