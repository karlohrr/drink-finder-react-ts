import React from "react";
import Select from "react-select";
import { Ingredient } from "../Utilities/CocktailAPI";

interface Props {
    ingredients: Ingredient[];
    fnChange: React.Dispatch<React.SetStateAction<string | null>>;
}

export const IngredientDropdown: React.FC<Props> = ({
    ingredients,
    fnChange,
}) => {
    return (
        <Select
            name="ingredients"
            options={ingredients}
            onChange={(selected) => fnChange(selected?.value ?? null)}
        />
    );
};
