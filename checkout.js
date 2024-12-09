document.addEventListener('DOMContentLoaded', () => {
    const order = JSON.parse(localStorage.getItem('currentOrder')) || {};
    const orderDetails = document.getElementById('orderDetails');
    const summaryTotal = document.getElementById('summaryTotal');

    // Load order summary
    let total = 0;
    for (const item in order) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${capitalizeFirstLetter(item)}</td>
            <td>${order[item].quantity}</td>
            <td>$${order[item].price.toFixed(2)}</td>
        `;
        orderDetails.appendChild(row);
        total += order[item].price;
    }
    summaryTotal.textContent = `$${total.toFixed(2)}`;

    // Handle Pay button
    payButton.addEventListener('click', () => {
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const address = document.getElementById('address').value.trim();
        const paymentMethod = document.getElementById('paymentMethod').value;
    
        // Regular expression for email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        if (!fullName || !email || !address || !paymentMethod) {
            alert('Please fill out all fields.');
            return;
        }
    
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
    
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 3);
    
        alert(`Thank you for your purchase, ${fullName}!\nYour order will be delivered by ${deliveryDate.toDateString()}.`);
        localStorage.removeItem('currentOrder');
        window.location.href = 'home.html';
    });
    
    
    // phone number validation

    const telePhoneInput = document.getElementById('telePhone');

    telePhoneInput.addEventListener('input', (e) => {
        // Remove any non-digit characters
        e.target.value = e.target.value.replace(/\D/g, '');

        // Limit to 10 digits
        if (e.target.value.length > 10) {
            e.target.value = e.target.value.slice(0, 10);
        }
    });

    // Utility function
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});
