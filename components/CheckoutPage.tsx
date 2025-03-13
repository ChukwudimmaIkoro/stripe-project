'use client' //Lets Next.js know to only render on client side

//Functional component that takes in an Amount prop

import React, { useEffect, useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import convertToSubcurrency from "../lib/convertToSubcurrency";

const CheckoutPage = ({ amount }: { amount: number }) => {

    //Set variables to store states of data
    const stripe = useStripe();
    const elements = useElements();

    const [errorMessage, setErrorMessage] = useState<string>();
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);

    // To process payment, create a new PaymentIntent using a clientSecret on load
    // in the API, anytime a new payment option is selected (use useEffect, as it runs 
    // when the component changes)

    // Anytime amount is changed, generate new clientSecret

   useEffect(() => {
    async function fetchData() {
        //Make POST fetch call to API endpoint, sends to PaymentIntent
        const res = await fetch("/api/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
        })
        // Parse the data
        const data = await res.json();
        // Get the clientSecret
        setClientSecret(data.clientSecret);
    }
    fetchData();

   }, [amount]); //Only changes when amount changes

   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        //Prevent early submit 
        event.preventDefault();
        setLoading(true);

        //Check if valid, return with errors if not
        if (!stripe || !elements) {
            return;
        }

        const { error: submitError } = await elements.submit();


        if (submitError) {
            setErrorMessage(submitError.message);
            setLoading(false);
            return;
        }

        //If correct details, confirm payment
        let baseUrl = "" //TODO: ADD VERSEL URL HERE ONCE DEPLOYED!!!
        const env = process.env.NODE_ENV
            if(env == "development"){
                baseUrl = "http://localhost:3000"
            }
            
        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `${baseUrl}/payment-success?amount=${amount}`
            }
        })

        if (error) {
            //Immediate error shown when confirming payment
            setErrorMessage(error.message);
        } else {
            //UI auto closes with success, user is redirected to return url
        }

        setLoading(false);
   };

    //If a clientSecret is present, render out the PaymentElement
    return (
        <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
            {clientSecret && <PaymentElement />} 
            {errorMessage && <div>{errorMessage}</div>}

            <button
                disabled={!stripe || loading}
                className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
            >
                {!loading ? `Pay $${amount}` : "Processing..."}
            </button>
        </form>
        );
    };

export default CheckoutPage;