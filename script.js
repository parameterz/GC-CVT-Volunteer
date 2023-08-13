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
