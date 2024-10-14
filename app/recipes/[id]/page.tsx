'use client';

import { useRecipes } from '@/app/hooks/Recipe-Context';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Timer from '@/components/organisms/Timer';

export default function RecipeDetail() {
  const { id } = useParams();
  const { recipes } = useRecipes();

  const recipeVersions = recipes.find(
    (r) => r[r.length - 1].id.toString() === id
  );
  const recipe = recipeVersions
    ? recipeVersions[recipeVersions.length - 1]
    : null;

  if (!recipe) {
    return <div>레시피를 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <h1>{recipe.title}</h1>
      <h2>조리 타이머</h2>
      <Timer onTimeUp={() => alert('타이머가 끝났습니다!')} />
      <p>태그: {recipe.tags.join(', ')}</p>
      <h2>재료</h2>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h2>조리 과정</h2>
      <ol>
        {recipe.processes.map((process, index) => (
          <li key={index}>{process}</li>
        ))}
      </ol>
      <p>{recipe.saveTime}</p>
      <Link href={`/recipes/edit/${recipe.id}`}>
        <button>수정하기</button>
      </Link>
      <Link href='/'>목록으로</Link>
    </div>
  );
}
