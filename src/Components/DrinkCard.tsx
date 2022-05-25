import React from "react";
import { Drink } from "../Utilities/CocktailAPI";

interface Props {
    drink: Drink;
}

export const DrinkCard: React.FC<Props> = ({ drink }) => {
    return (
        <div className="col-sm-6 col-md-4 col-lg-3 col-xl-3">
            <h3 className="drinkName">{drink.name}</h3>
            <span>
                <img
                    className="drinkImg"
                    src={drink.imgThumb}
                    alt={drink.name}
                ></img>
            </span>
        </div>
    );
};
