require("dotenv").config();
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);

exports.handler = async function(event, context){
    if(event.body){
        const {cart, shippingFee, totalPrice} = JSON.parse(event.body);
        
        const calculateOrderAmount = () => {
            return totalPrice + shippingFee;
        }

        try {
            // Create a PaymentIntent with the order amount and currency
            const paymentIntent = await stripe.paymentIntents.create({
                amount: calculateOrderAmount(),
                currency: "usd",
                shipping: {
                    name: 'Jenny Rosen',
                    address: {
                      line1: '510 Townsend St',
                      postal_code: '98140',
                      city: 'San Francisco',
                      state: 'CA',
                      country: 'US',
                    },
                },
                description: 'Software development services'
            })

            return {
                statusCode: 200,
                body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: error.message }),
            }
        }
    }

    return {
        statusCode: 200,
        body: 'Create Payment Intent'
    }
}