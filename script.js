// from ChatGPT
const volunteerCountElement = $('#volunteerCount');
const volunteersDesired = 8;

async function updateVolunteerCount() {
    const url = 'https://script.google.com/macros/s/AKfycbwoTfFf7cq4gkjZfKgBlgG5GnlUMe2grZLD_Ka_yAfZVETyDg5SjHslrOAE5cExZxr5aQ/exec'; // The URL of your deployed volunteer count web app

    try {
        const count = await $.get(url);
        volunteerCountElement.text(count);
        $("#needed").text(volunteersDesired-count);
        if(volunteersDesired-count <= 0) {
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

        try {
            const response = await $.post(url, {
                name: name,
                email: email,
                date: date
            });

            if (response === "Volunteer added successfully.") {
                $('#message').text(response);
                $('#volunteerForm')[0].reset();
                updateVolunteerCount(); // Update the count after successful submission
            } else {
                $('#message').text('Error submitting the form.');
            }
        } catch (error) {
            $('#message').text('Error submitting the form.');
        }
    });

    updateVolunteerCount(); // Update the count when the page loads
});



