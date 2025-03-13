//Helper function to sum the prices of objects in user's shopping cart.
import { Product } from "./typeDefinitions";

function sumShoppingCart(shoppingCart: Product[]) {
    let sum = 0.00;

    shoppingCart.map((item : Product) => {
        sum += item.price
    })
    return Math.round(sum *100) / 100;
}

export default sumShoppingCart;