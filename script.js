const form = document.getElementById('volunteerForm');
const messageDiv = document.getElementById('message');


form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    const url = 'https://script.google.com/macros/s/AKfycbzXmYCuNi5zXs2R3WHBbfTF8zvzjI30PKsnyRQFRmofqJYVy1lL0ByEcA-3_Tqz1ejvuQ/exec'; // The URL of your deployed web app

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

const volunteerCountElement = document.getElementById('volunteerCount');

async function updateVolunteerCount() {
    //replace with JQuery AJAX
    const url = 'https://script.google.com/macros/s/AKfycbwoTfFf7cq4gkjZfKgBlgG5GnlUMe2grZLD_Ka_yAfZVETyDg5SjHslrOAE5cExZxr5aQ/exec'; // The URL of your deployed volunteer count web app

    const response = await fetch(url, {
        method: 'GET',
        mode: 'no-cors',
        redirect: "follow"
    });

    if (response.ok) {
        const count = await response.text();
        volunteerCountElement.textContent = count;
    } else {
        volunteerCountElement.textContent = 'Error fetching volunteer count.';
    }
}

// Call the function when the page loads
updateVolunteerCount();

/* NOTE: 
This example works in theory, but the script runs on the hit to the script address, but redirects (302) to another address to show the result.
This behavior is not handled well with this code (throws this error every time: 'Error fetching volunteer count.')
HOWEVER, I ran this as an AJAX call using JQuery and it works fine!

https://www.tutorialsteacher.com/codeeditor?cid=jquery-101

	<script type="text/javascript">
        $(document).ready(function () {
			
		 $('#ajaxBtn').click(function(){
			$.ajax('https://script.google.com/macros/s/AKfycbwoTfFf7cq4gkjZfKgBlgG5GnlUMe2grZLD_Ka_yAfZVETyDg5SjHslrOAE5cExZxr5aQ/exec',   // request url
			{            
				success: function (data, status, xhr) {    // success callback function
						$('p').append(data);
				}
			});
		 });

        });
    </script>

*/