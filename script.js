const form = document.getElementById('volunteerForm');
const messageDiv = document.getElementById('message');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    // You can add validation here if needed

    const message = `Thank you, ${name}, for volunteering! We'll contact you at ${email}.`;

    messageDiv.textContent = message;
    form.reset();
});

const form = document.getElementById('volunteerForm');
const messageDiv = document.getElementById('message');

form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    const url = 'https://script.google.com/macros/s/AKfycbwIepBTETi5Q6g69_QIi9nJyFaujEtBCkpP1LpRzpxZhCMuUtXfrBrkEBHiu9FJ-YkWzQ/exec'; // The URL of your deployed web app

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`
    });

    if (response.ok) {
        const message = await response.text();
        messageDiv.textContent = message;
        form.reset();
    } else {
        messageDiv.textContent = 'Error submitting the form.';
    }
});
