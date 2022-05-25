import React from "react";
import { Drink } from "../Utilities/CocktailAPI";
import { DrinkCard } from "./DrinkCard";

interface Props {
    drinks: Drink[];
}

export const DrinkGrid: React.FC<Props> = ({ drinks }) => {
    return (
        <div className="container">
            <div className="row">
                {drinks.map((drink) => {
                    return <DrinkCard drink={drink} />;
                })}
            </div>
        </div>
    );
};
