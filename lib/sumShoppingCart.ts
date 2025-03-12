//Helper function to sum the prices of objects in user's shopping cart.

function sumShoppingCart(shoppingCart: any) {
    let sum = 0.00;

    shoppingCart.map((item : any) => {
        sum += item.price
    })
    return Math.round(sum *100) / 100;
}

export default sumShoppingCart;