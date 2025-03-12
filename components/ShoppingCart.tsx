'use client' //Lets Next.js know to only render on client side

import React, { useEffect, useState } from "react";
import sumShoppingCart from "../lib/sumShoppingCart";

const ShoppingCart = () => {

    const [shoppingCart, setShoppingCart] = useState([] as any); 

    useEffect(() => {
        const storedCart = localStorage.getItem("shoppingCart");
        const cart = storedCart ? JSON.parse(storedCart) : [];
        setShoppingCart(cart);
        const cartSum = sumShoppingCart(cart);
        localStorage.setItem("cartSum", JSON.stringify(cartSum))
    }, []);

    return (
        <div>
            <h1>Shopping Cart:</h1>
            <ul className= "grid grid-cols-4 gap-4 items-center">
            {
                shoppingCart.map( (item: any, index: any) => (
                <form key={index}>
                <li className="w-52 mx-4" key={index}>
                    <img src={item.thumbnail} alt={item.title} />
                    <div className="p-2 text-sm text-black bg-gray-400">
                        {item.title} <span className="rounded-lg p-1 px-1 ml-2 bg-gray-200">${item.price}</span>
                    </div>
                </li>
                </form>
                ))
            }
            </ul>
        </div>
        )
    }

export default ShoppingCart;