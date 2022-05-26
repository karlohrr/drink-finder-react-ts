import React, { useEffect, useState } from "react";
import "./App.css";
import { IngredientDropdown } from "./Components/IngredientDropdown";
import { API, Drink, DrinkDetailData } from "./Utilities/CocktailAPI";
import { IngredientOption } from "./Utilities/CocktailAPI";
import "bootstrap/dist/css/bootstrap.min.css";
import { DrinkGrid } from "./Components/DrinkGrid";
import { DrinkDetails } from "./Components/DrinkDetails";

function App() {
    const [ingredients, setIngredients] = useState<IngredientOption[]>([]);
    const [selectedIngredient, setSelectedIngredient] = useState<string | null>(
        null
    );
    const [drinks, setDrinks] = useState<Drink[]>([]);
    const [selectedDrink, setSelectedDrink] = useState<DrinkDetailData | null>(
        null
    );
    const [showDetails, setShowDetails] = useState(false);
    useEffect(() => {
        API.ingredientList(setIngredients);
    }, []);

    const getDrinkDetails = (id: string) => {
        API.drinkDetails(id, setSelectedDrink);
        setShowDetails(true);
    };
    let Content = showDetails
        ? DrinkDetails({ details: selectedDrink })
        : DrinkGrid({ drinks: drinks, detailsFn: getDrinkDetails });

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
            {Content}
        </div>
    );
}

export default App;
