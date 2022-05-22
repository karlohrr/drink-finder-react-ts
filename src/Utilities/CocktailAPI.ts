import { Config } from "../Config"
import axios from "axios"

const api = axios.create({
    baseURL: Config.baseURL
});

export interface Ingredient {
    label: string
    value: string
}

export const API = {
    drinksBySingleIngredient: (ingredient: string) => { },
    ingredientList: async (fn: React.Dispatch<React.SetStateAction<Ingredient[]>>) => {
        const res = await api.get('/list.php?i=list');
        const data = res.data.drinks;
        const ing = data.map((n: any) => { return { value: n.strIngredient1, label: n.strIngredient1 }; })
        ing.sort((a: Ingredient, b: Ingredient) => a.label < b.label ? 1 : -1);
        return fn(ing);

    },
    drinkDetails: (id: number) => { }
}