import React from "react";
import Select from "react-select";
import { IngredientOption } from "../Utilities/CocktailAPI";

interface Props {
    ingredients: IngredientOption[];
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
