'use client';

import Button from "@/components/atoms/Button";
import Ingredients from "@/components/molecules/Ingredients";
import LabelInput from "@/components/molecules/LabelInput"
import Process from "@/components/molecules/Process";
import Tags from "@/components/molecules/Tags";
import { useRouter } from "next/navigation";
import { useId, useRef, useState } from "react";

type Recipe = {
    id: string; 
    title: string;
    tags: string[];
    ingredients: string[];
    processes: string[];
}

export default function add() {
    const router = useRouter()

    const [tags, setTags] = useState<string[]>([]); 
    const [ingredients, setIngredients] = useState<string[]>([]); 
    const [processes, setProcesses] = useState<string[]>([]); 

    const titleRef = useRef<HTMLInputElement>(null);
    const tagRef = useRef<HTMLInputElement>(null);
    const ingredientRef = useRef<HTMLInputElement>(null);
    const processRef = useRef<HTMLInputElement>(null);
    
    const newId = useId(); 

    const addTag = () => {
        if (tagRef.current && tagRef.current.value) {
            const newTag = tagRef.current.value;
            setTags((prevTags) => [...prevTags, newTag]); 
            tagRef.current.value = ''; 
        }
    }

    const deleteTag = (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
    }

    const addIngredient = () => {
        if (ingredientRef.current && ingredientRef.current.value) {
            const newIngredient = ingredientRef.current.value;
            setIngredients((prevIngredients) => [...prevIngredients, newIngredient]); 
            ingredientRef.current.value = ''; 
        }
    }

    const deleteIngredient = (index: number) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    }

    const addProcess = () => {
        if (processRef.current && processRef.current.value) {
            const newProcess = processRef.current.value;
            setProcesses((prevProcess) => [...prevProcess, newProcess]); 
            processRef.current.value = ''; 
        }
    }

    const deleteProcess = (index: number) => {
        setProcesses(processes.filter((_, i) => i !== index));
    }

    const addRecipe = (e: React.FormEvent) => {
        e.preventDefault();

        const newRecipe: Recipe = {
            id: newId,
            title: titleRef.current?.value || '',
            tags: tags,
            ingredients: ingredients,
            processes: processes,
        };

        const recipes: Recipe[] = JSON.parse(localStorage.getItem('recipes') || '[]');
        recipes.push(newRecipe);
        localStorage.setItem('recipes', JSON.stringify(recipes));

        router.push('/');
    };



    return <>
    <h1>레시피 추가</h1>
    <form onSubmit={addRecipe}>
        <LabelInput label="레시피 제목" ref={titleRef} buttonClassNames="hidden"/>
        <LabelInput label="태그" ref={tagRef} buttonText="추가" buttonType="button" onClick={addTag}/>
        <Tags tags={tags} onDelete={deleteTag} /> 
        <LabelInput label="재료 목록" ref={ingredientRef} buttonText="추가" buttonType="button" onClick={addIngredient}/>
        <Ingredients ingredients={ingredients} onDelete={deleteIngredient}/>
        <LabelInput label="조리 과정"ref={processRef}  buttonText="추가" buttonType="button" onClick={addProcess}/>
        <Process processes={processes} onDelete={deleteProcess}/>
        <Button type='submit' variant='btn-success'>레시피 저장</Button>
    </form>

    </>
}