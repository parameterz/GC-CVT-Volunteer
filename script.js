// from ChatGPT
const volunteerCountElement = $('#volunteerCount');
const volunteersDesired = 8;

async function updateVolunteerCount() {
    const url = 'https://script.google.com/macros/s/AKfycbwoTfFf7cq4gkjZfKgBlgG5GnlUMe2grZLD_Ka_yAfZVETyDg5SjHslrOAE5cExZxr5aQ/exec'; // The URL of your deployed volunteer count web app

    try {
        const count = await $.get(url);
        volunteerCountElement.text(count);
        if(volunteersDesired-count >1){
            var str = `We still need ${volunteersDesired-count} volunteers.`;
            $("#stillNeeded").text(str);
        } else if (volunteersDesired-count == 1) {
            var str = "We only need one more volunteer- it could be you!";
            $("#stillNeeded").text(str);
        } else if(volunteersDesired-count <= 0) {
            $("#stillNeeded").text('we have all the models we need- thank you!');
            $('#volunteerForm').hide();
        }
    } catch (error) {
        volunteerCountElement.text('Error fetching volunteer count.');
    }
}

$(document).ready(function () {
    $("#volunteersDesired").text(volunteersDesired);

    $('#volunteerForm').submit(async function (event) {
        event.preventDefault();
    
        const name = $('#name').val();
        const email = $('#email').val();
        const date = Date();
    
        const url = 'https://script.google.com/macros/s/AKfycby5f08V3mKtF7wb2L4aRGvyk3Oqam9rtzKINVinOb1USsEUiUGhJ30oYz_lbMTQYWucSg/exec'; // The URL of your deployed web app
    
        // Check if the email already exists
        const existingEmails = await $.get('https://script.google.com/macros/s/AKfycbwoTfFf7cq4gkjZfKgBlgG5GnlUMe2grZLD_Ka_yAfZVETyDg5SjHslrOAE5cExZxr5aQ/exec');
        if (existingEmails.includes(email)) {
            $('#message').text('You have already signed up.');
            return; // Stop form submission
        }
    
        try {
            const response = await $.post(url, {
                name: name,
                email: email,
                date: date
            });
    
            if (response === "Volunteer added successfully.") {
                $('#message').text(response + ' Thank you for volunteering!! We will contact you soon.');
                $('#volunteerForm').hide(); // hide the form
                $('#count').hide(); // hide the description
    
            } else {
                $('#message').text('Error submitting the form.');
            }
        } catch (error) {
            $('#message').text('Error submitting the form.');
        }
    });
        /*     $('#volunteerForm').submit(async function (event) {
        event.preventDefault();

        const name = $('#name').val();
        const email = $('#email').val();
        const date = Date();

        const url = 'https://script.google.com/macros/s/AKfycby5f08V3mKtF7wb2L4aRGvyk3Oqam9rtzKINVinOb1USsEUiUGhJ30oYz_lbMTQYWucSg/exec'; // The URL of your deployed web app

        try {
            const response = await $.post(url, {
                name: name,
                email: email,
                date: date
            });

            if (response === "Volunteer added successfully.") {
                $('#message').text(response + ' Thank you for volunteering!! We will contact you soon.');
                $('#volunteerForm').hide();// hide the form
                $('#count').hide(); // hide the description

            } else {
                $('#message').text('Error submitting the form.');
            }
        } catch (error) {
            $('#message').text('Error submitting the form.');
        }
    });
 */
    updateVolunteerCount(); // Update the count when the page loads
});



