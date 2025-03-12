'use client' //Lets Next.js know to only render on client side

import React, { useEffect, useState } from "react";
import data from "../app/dummy-data.json"

const Dashboard = () => {

    const [productList, setProductList] = useState(data.products)
    const [shoppingCart, setShoppingCart] = useState([] as any); //useState<Product[]>([]);


    const handleSubmit = (event : any, index : any) => {
        event.preventDefault();
        //Add to shopping cart object
        setShoppingCart((prev : any) => [...prev, productList[index]]);
    };

    useEffect(() => {
        localStorage.clear(); //Ensure empty cart
    }, []);

    useEffect(() => {
        localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart))
    }, [shoppingCart]);
    

    return (
        <div>
            <h1>Products</h1>
            <ul className= "grid grid-cols-4 gap-4 items-center">
            {
                productList.map( (item: any, index: any) => (
                <form key={index} onSubmit={e => handleSubmit(e, index)}>
                <li className="w-52 mx-4" key={index}>
                    <img src={item.thumbnail} alt={item.title} />
                    <div className="p-2 text-sm text-black bg-gray-400">
                        {item.title} <span className="rounded-lg p-1 px-1 ml-2 bg-gray-200">${item.price}</span>
                    </div>
                    <div className="p-1 text-xs text-black bg-gray-400">
                        {item.description}
                    </div>
                    <button 
                        className="text-white p-1 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
                    >
                        Add to Cart
                    </button>
                </li>
                </form>
                ))
            }
            </ul>
        </div>
        )
    }

export default Dashboard;