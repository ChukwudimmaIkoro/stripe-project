//Helper function to convert USD to cents

function convertToSubcurrency(amount: number, factor = 100) {
    return Math.round(amount * factor);
}

export default convertToSubcurrency;