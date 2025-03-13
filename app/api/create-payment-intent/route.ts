//API endpoint file to process PaymentIntent to create clientSecret, accepts only POST requests
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

//Setup Stripe, call from dependency and invoke with secret key on server


export async function POST(request: NextRequest) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
    //Use try catch when dealing with async
    try {
        // Get the amount passed in by the user
        const { amount } = await request.json();

        //Get payment intent to tell Stripe we are making a payment to Stripe account
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            automatic_payment_methods: { enabled: true }, //Auto detects payment methods from user browser
        });

        //Send back client secret, and return response
        return NextResponse.json({ clientSecret: paymentIntent.client_secret })

    } catch (error) {
        console.error("Internal Error", error);
        //Handles other errors (like network or parsing issues)
        return NextResponse.json(
            { error: `Internal Server Error: ${error}` }, 
            { status: 500 }
        );
    }

}