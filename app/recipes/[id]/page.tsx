'use client';

import { useRecipes } from '@/app/hooks/Recipe-Context';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Button from '@/components/atoms/Button';
import Timer from '@/components/organisms/Timer';

export default function RecipeDetail() {
  const { id } = useParams();
  const { recipes, restoreRecipe, deleteRecipe } = useRecipes();
  const router = useRouter();

  const recipeVersions = recipes.find(
    (r) => r[r.length - 1].id.toString() === id
  );
  const recipe = recipeVersions
    ? recipeVersions[recipeVersions.length - 1]
    : null;

  if (!recipe || !recipeVersions) {
    return <div>레시피를 찾을 수 없습니다.</div>;
  }

  const currentVersion = recipeVersions.length;

  const handleRestorePreviousVersion = () => {
    if (recipeVersions.length > 1) {
      const updatedVersions = recipeVersions.slice(0, -1);
      restoreRecipe(updatedVersions);
      router.refresh();
    } else {
      alert('이전 버전이 없습니다.');
    }
  };

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
      <p>
        버전 {currentVersion} ({recipe.saveTime})
      </p>
      {currentVersion > 1 && (
        <button onClick={handleRestorePreviousVersion}>
          이전 버전으로 복원하기
        </button>
      )}
      <div>
        <Link href={`/recipes/edit/${recipe.id}`}>
          <button>수정하기</button>
        </Link>
        <Link href={'/'}>
          <Button onClick={() => deleteRecipe(+id)}>삭제하기</Button>
        </Link>
        <Link href='/'>목록으로</Link>
      </div>
    </div>
  );
}
