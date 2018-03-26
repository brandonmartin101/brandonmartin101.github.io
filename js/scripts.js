var baseUrl = "https://cryptic-reef-39583.herokuapp.com/";
// wake heroku dyno for contact form
var xhr = new XMLHttpRequest();
xhr.open('GET', baseUrl);
xhr.onload = function () {
    if (xhr.status === 200) {
        console.log('dyno is awake');
    } else {
        console.log('dyno did not respond');
    }
}
xhr.send();

// check form and ping Heroku app to process email
$("#submit-btn").click(function () {
    var contact = {
        "name": encodeURIComponent($("#name").val()),
        "email": encodeURIComponent($("#email").val()),
        "phone": ($("#phone").val()) ? encodeURIComponent($("#phone").val()) : "no phone",
        "message": encodeURIComponent($("#message").val())
    }
    console.log(contact);
    if (contact.name && contact.email && contact.message) {
        event.preventDefault();
        console.log("tests passed");
        // AJAX
        var queryString = contact.name + "/" + contact.email + "/" + contact.message + "/" + contact.phone
        $.ajax({
            url: baseUrl + queryString
        }).done(function (data) {
            console.log("request completed");
            console.log(data);
            $("#btnSubmit").attr("disabled", false);
            $('#success').html("<div class='alert alert-success'>");
            $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
            $('#success > .alert-success').append("<strong>Your message has been sent. I'll be in touch soon!</strong>");
            $('#success > .alert-success').append('</div>');
        }).fail(function (data) {
            console.log("an error occurred:", data);
            $('#success').html("<div class='alert alert-danger'>");
            $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
            $('#success > .alert-danger').append("<strong>Sorry " + name + ", it seems that my mail server is not responding. Please try again later!");
            $('#success > .alert-danger').append('</div>');
        });
    }
});