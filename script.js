// Order storage
let order = {};

// Function to add items to the order
function addToOrder() {
    const form = document.getElementById('medicineForm');
    order = {}; // Reset the order to avoid duplicates

    Array.from(form.elements).forEach(item => {
        if (item.type === 'number' && item.value > 0) {
            const name = item.name.toLowerCase(); // Normalize name for consistent lookup
            order[name] = {
                quantity: parseInt(item.value),
                price: calculatePrice(name, parseInt(item.value))
            };
        }
    });

    updateOrderTable();
}

// Function to calculate item price based on name and quantity
function calculatePrice(name, quantity) {
    const prices = {
        ibuprofen: 5,
        aspirin: 3,
        tramadol: 8,
        morphine: 20,
        naproxen: 6,
        amoxicillin: 10,
        ciprofloxacin: 15,
        metronidazole: 12,
        azithromycin: 18,
        doxycycline: 14,
        fluoxetine: 25,
        sertraline: 30,
        amitriptyline: 22,
        citalopram: 28,
        escitalopram: 32,
        diphenhydramine: 5,
        loratadine: 7,
        cetirizine: 6,
        fexofenadine: 9,
        amlodipine: 12,
        lisinopril: 15,
        losartan: 18,
        metoprolol: 10,
        hydrochlorothiazide: 8, // Ensure spelling matches input
    };

    // Lookup the price based on the normalized name and multiply by quantity
    return (prices[name] || 0) * quantity;
}

// Function to update the order table with items
function updateOrderTable() {
    const orderTable = document.getElementById('orderItems');
    orderTable.innerHTML = ''; // Clear the table before updating
    let total = 0;

    for (const item in order) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${capitalizeFirstLetter(item)}</td>
            <td>${order[item].quantity}</td>
            <td>$${order[item].price.toFixed(2)}</td>
            <td><button onclick="removeItem('${item}')">Remove</button></td>
        `;
        orderTable.appendChild(row);
        total += order[item].price;
    }

    document.getElementById('totalPrice').textContent = `$${total.toFixed(2)}`;
}

// Function to remove an item from the order
function removeItem(itemName) {
    if (order[itemName]) {
        delete order[itemName];
        updateOrderTable();
    }
}

// Function to save the order as a favorite in local storage
function saveFavorite() {
    if (Object.keys(order).length === 0) {
        alert('No items in the order to save.');
        return;
    }
    localStorage.setItem('favoriteOrder', JSON.stringify(order));
    alert('Order saved as favorite');
}

// Function to apply favorite order from local storage
function applyFavorite() {
    const favorite = JSON.parse(localStorage.getItem('favoriteOrder') || '{}');
    if (Object.keys(favorite).length === 0) {
        alert('No favorite order found.');
        return;
    }
    order = favorite;
    updateOrderTable();
}

// Function to clear favorite order from local storage
function clearFavorite() {
    if (!localStorage.getItem('favoriteOrder')) {
        alert('No favorite order to clear.');
        return;
    }
    localStorage.removeItem('favoriteOrder');
    alert('Favorite order cleared');
}

// Function to navigate to the checkout page
function proceedToCheckout() {
    if (Object.keys(order).length === 0) {
        alert('No items in the order to proceed.');
        return;
    }
    localStorage.setItem('currentOrder', JSON.stringify(order));
    window.location.href = 'checkout.html';
}

// Utility function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Reset all number inputs and localStorage current order to 0 on page load
window.onload = function () {
    // Reset all number inputs to 0
    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(input => {
        input.value = 0;
    });

    // Reset currentOrder in localStorage to an empty object
    localStorage.setItem('currentOrder', JSON.stringify({}));

    // Clear the order table and total price display
    document.getElementById('orderItems').innerHTML = '';
    document.getElementById('totalPrice').textContent = '$0.00';
};
