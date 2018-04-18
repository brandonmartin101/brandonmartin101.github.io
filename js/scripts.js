// attempt to wake all heroku dynos that are linked by the site
var wakeUrls = [
    'https://cryptic-reef-39583.herokuapp.com/',
    'https://bpm-ghost.herokuapp.com/',
    'https://bpm-react-todo.herokuapp.com/',
    'https://bpm-vue-imgur.herokuapp.com/',
    'https://bpm-wordpress.herokuapp.com/'
];
// ping them one by one
for (var i = 0; i < wakeUrls.length; i++) {
    document.getElementById('page-top').insertAdjacentHTML('beforeend', '<script src="' + wakeUrls[i] + '"></script>');
}

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