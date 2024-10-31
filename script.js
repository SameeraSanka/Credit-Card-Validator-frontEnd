//formaing the creadit card number accoding to the card number
function formatCardNumber(cardNumber) {
    cardNumber = cardNumber.replace(/\D/g, ''); 

    if (/^34|37/.test(cardNumber)) {
        return cardNumber.slice(0, 15).replace(/(\d{4})(\d{6})(\d{5})/, '$1-$2-$3');
    } else {
        return cardNumber.slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1-');
    }
}
//if number is past or type then add hyphen 
const cardInput = document.getElementById('cardNumber');
cardInput.addEventListener('input', (e) => {
    e.target.value = formatCardNumber(e.target.value);
});

document.getElementById('cardForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cardNumber = cardInput.value.trim().replace(/-/g, '');
    const resultDiv = document.getElementById('result');
    
    resultDiv.innerHTML = "";

    if (!cardNumber) {
        resultDiv.innerHTML = `<p class="text-danger">Please enter a card number.</p>`;
        return;
    }

    const payload = { cardNumber: cardNumber };
    
    try {
        const response = await fetch('https://localhost:44318/api/CreditCard/validate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (response.ok) {
            resultDiv.innerHTML = `<p class="text-success">This is a Valid Credit Card <br> <span class="text-primary"> <b> ${result.data} </span></p>`;
        } else {
            resultDiv.innerHTML = `<p class="text-danger">${result.message}</p>`;
        }
    } catch (error) {
        resultDiv.innerHTML = `<p class="text-danger">An error occurred: ${error.message}</p>`;
    }
});

const resetButton = document.querySelector('button[type="reset"]');
resetButton.addEventListener('click', () => {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = "";
});