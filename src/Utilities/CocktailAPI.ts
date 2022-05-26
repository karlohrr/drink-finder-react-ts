import { Config } from "../Config"
import axios from "axios"

const api = axios.create({
    baseURL: Config.baseURL
});

export interface IngredientOption {
    label: string
    value: string
}

export interface Drink {
    name: string
    id: string
    imgThumb: string
}

export interface DrinkDetailData {
    name: string
    id: string
    imgThumb: string
    instructions: string
    glass: string
    isAlcoholic: boolean
    ingredients: Ingredient[]
}

export interface Ingredient {
    name: string
    measurement: string
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
    ingredientList: async (fn: React.Dispatch<React.SetStateAction<IngredientOption[]>>) => {
        const res = await api.get('/list.php?i=list');
        const data = res.data.drinks;
        const ing: IngredientOption[] = data.map((n: any) => { return { value: n.strIngredient1, label: n.strIngredient1 }; })
        ing.sort((a: IngredientOption, b: IngredientOption) => a.label > b.label ? 1 : -1);
        return fn(ing);

    },
    drinkDetails: async (id: string | null, fn: React.Dispatch<React.SetStateAction<DrinkDetailData | null>>) => {
        if (id === null)
            return;
        const res = await api.get(`lookup.php?i=${id}`);
        const raw = res.data.drinks[0];
        const details: DrinkDetailData = {
            name: raw.strDrink,
            id: raw.idDrink,
            imgThumb: raw.strDrinkThumb,
            instructions: raw.strInstructions,
            glass: raw.strGlass,
            isAlcoholic: raw.strAlcoholic === "Alcoholic" ? true : false,
            ingredients: getIngredients(raw)
        }
        return fn(details);
    }
}
const getIngredients = (drink: any) => {
    const maxNumbOfIngredients = 15;
    const namePrefix = "strIngredient";
    const measurePrefix = "strMeasure";
    let ingredients: Ingredient[] = [];
    for (let i = 1; i <= maxNumbOfIngredients; i++) {
        if (!drink[`${namePrefix}${i}`]) break;
        const name = drink[`${namePrefix}${i}`];
        const measurement = drink[`${measurePrefix}${i}`]
            ? `${drink[`${measurePrefix}${i}`]}`
            : "";
        ingredients.push({ name: name, measurement: measurement });
    }
    return ingredients;
}