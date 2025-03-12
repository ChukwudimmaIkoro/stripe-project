'use client' //Lets Next.js know to only render on client side

//Functional component that takes in an Amount prop

import Link from "next/link";
import Dashboard from "../components/Dashboard";

export default function Home() {

    return (

        <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 
        rounded-mg bg-gradient-to-tr from-blue-500 to purple-500">
          <div className="mb-10">
            <h1 className="text-4xl font-extrabold mb-2">Cozy Threads</h1>
            <h2 className="text-2xl">
                <Dashboard />
                <Link href="/shopping-cart">Go to Cart</Link>
            </h2>
          </div>
        </main>

        );
    };