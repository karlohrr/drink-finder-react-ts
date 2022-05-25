import { Config } from "../Config"
import axios from "axios"

const api = axios.create({
    baseURL: Config.baseURL
});

export interface Ingredient {
    label: string
    value: string
}

export interface Drink {
    name: string
    id: string
    imgThumb: string
}

export const API = {
    drinksBySingleIngredient: async (ingredient: string | null, fn: React.Dispatch<React.SetStateAction<Drink[]>>) => {
        if (ingredient === null)
            return;
        const res = await api.get(`filter.php?i=${ingredient}`);
        const data = res.data.drinks;
        const drinks: Drink[] = data.map((n: any) => {
            return {
                name: n.strDrink,
                imgThumb: n.strDrinkThumb,
                id: n.idDrink,
            };
        });
        drinks.sort((a: Drink, b: Drink) => a.name > b.name ? 1 : -1);
        return fn(drinks);
    },
    ingredientList: async (fn: React.Dispatch<React.SetStateAction<Ingredient[]>>) => {
        const res = await api.get('/list.php?i=list');
        const data = res.data.drinks;
        const ing: Ingredient[] = data.map((n: any) => { return { value: n.strIngredient1, label: n.strIngredient1 }; })
        ing.sort((a: Ingredient, b: Ingredient) => a.label > b.label ? 1 : -1);
        return fn(ing);

    },
    drinkDetails: (id: number) => { }
}