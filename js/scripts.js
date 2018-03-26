var baseUrl = "https://cryptic-reef-39583.herokuapp.com/";
// wake heroku dyno for contact form
var xhr = new XMLHttpRequest();
xhr.open('GET', baseUrl);
xhr.onload = function () { }
xhr.send();

// check form and ping Heroku app to process email
document.getElementById('submit-btn').addEventListener('click', function (e) {
    var contact = {
        'name': encodeURIComponent(document.getElementById('name').value),
        'email': encodeURIComponent(document.getElementById('email').value),
        'phone': (document.getElementById('phone').value) ? encodeURIComponent(document.getElementById('phone').value) : 'no phone',
        'message': encodeURIComponent(document.getElementById('message').value)
    }
    console.log(contact);
    if (contact.name && contact.email && contact.message) {
        event.preventDefault();
        console.log('tests passed');
        var queryString = 'brandon-martin-mail' + '/' + contact.name + "/" + contact.email + "/" + contact.message + "/" + contact.phone;

        var xhr = new XMLHttpRequest();
        xhr.open('GET', baseUrl + queryString);
        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log('request completed');
            } else {
                console.log('mail error');
            }
        }
        xhr.send();
    }
});