import React, { useEffect, useState } from "react";
import "./App.css";
import { IngredientDropdown } from "./Components/IngredientDropdown";
import { API } from "./Utilities/CocktailAPI";
import { Ingredient } from "./Utilities/CocktailAPI";

function App() {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [selectedIngredient, setSelectedIngredient] = useState<string | null>(
        null
    );

    useEffect(() => {
        console.log("loading");
        API.ingredientList(setIngredients);
    }, []);

    return (
        <div className="App">
            <IngredientDropdown
                ingredients={ingredients}
                fnChange={setSelectedIngredient}
            ></IngredientDropdown>
            <div>Selected: {selectedIngredient}</div>
        </div>
    );
}

export default App;
