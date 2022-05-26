import React from "react";
import { Drink } from "../Utilities/CocktailAPI";
import { DrinkCard } from "./DrinkCard";

interface Props {
    drinks: Drink[];
    detailsFn: (id: string) => void;
}

export const DrinkGrid: React.FC<Props> = ({ drinks, detailsFn }) => {
    return (
        <div className="container">
            <div className="row">
                {drinks.map((drink) => {
                    return (
                        <DrinkCard
                            key={drink.id}
                            drink={drink}
                            detailsFn={() => {
                                detailsFn(drink.id);
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
};
