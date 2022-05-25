import React, { useEffect, useState } from "react";
import "./App.css";
import { IngredientDropdown } from "./Components/IngredientDropdown";
import { API, Drink } from "./Utilities/CocktailAPI";
import { Ingredient } from "./Utilities/CocktailAPI";
import "bootstrap/dist/css/bootstrap.min.css";
import { DrinkGrid } from "./Components/DrinkGrid";

function App() {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [selectedIngredient, setSelectedIngredient] = useState<string | null>(
        null
    );
    const [drinks, setDrinks] = useState<Drink[]>([]);

    useEffect(() => {
        API.ingredientList(setIngredients);
    }, []);

    return (
        <div className="App">
            <IngredientDropdown
                ingredients={ingredients}
                fnChange={setSelectedIngredient}
            ></IngredientDropdown>
            <button
                className="btn btn-primary"
                onClick={() => {
                    API.drinksBySingleIngredient(selectedIngredient, setDrinks);
                }}
            >
                Find Drinks
            </button>
            <DrinkGrid drinks={drinks} />
        </div>
    );
}

export default App;
