'use client'

//Import Stripe dependencies along with other app pages

import CheckoutPage from "../../components/CheckoutPage";
import React, { useEffect, useState } from "react";
import convertToSubcurrency from "../../lib/convertToSubcurrency";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

//Make sure public key is passed in and defined
if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY not defined")
}

//Then, load Stripe into the application. Store the public/secret keys in a secrets file

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

export default function Checkout() {

  const [amount, setAmount] = useState<number>(1.00);

  useEffect(() => {
      const storedCartSum = window.localStorage.getItem("cartSum");
      const cartSum = storedCartSum ? JSON.parse(storedCartSum) : [];
      setAmount(cartSum);
  }, []);

  return (
      <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 
      rounded-mg bg-gradient-to-tr from-blue-500 to purple-500">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold mb-2">Cozy Threads</h1>
          <h2 className="text-2xl">
            has requested
            <span className="font-bold"> ${amount}</span>
          </h2>
        </div>

        {/* Create Elements component for Checkout page with options for amount, 
        look, currency, type, and mode of payment. 
        Amount must be in cents subcurrency (49.99 passed in as)  */}
        <Elements
          stripe={stripePromise}
            options={{
              mode: "payment",
              amount: convertToSubcurrency(amount), // cents
              currency: "usd"
            }}
            >
            <CheckoutPage amount={amount} />
          </Elements>
      </main>
 
  );
}
