/* SITE LOAD SCRIPT */
// attempt to wake all heroku dynos that are linked by the site
var wakeUrls = [
  'https://cryptic-reef-39583.herokuapp.com/',
  'https://bpm-ghost.herokuapp.com/',
  'https://bpm-react-todo.herokuapp.com/',
  'https://bpm-vue-imgur.herokuapp.com/',
  'https://bpm-wordpress.herokuapp.com/'
];
// ping them one by one
for (var i = 0; i < wakeUrls.length; i++) document.querySelector('body').insertAdjacentHTML('beforeend',
  '<script src="' + wakeUrls[i] + '">');

/* CONTACT FORM SCRIPT */
// check form and ping Heroku app to process email
document.getElementById('submit-btn').addEventListener('click', function (e) {
  document.querySelector('.contact-section .form-result > div').classList.remove('show');
  document.querySelector('.contact-section .loading-icon').classList.add('show');
  var baseUrl = "https://cryptic-reef-39583.herokuapp.com/";
  var contact = {
    'name': encodeURIComponent(document.getElementById('name').value),
    'email': encodeURIComponent(document.getElementById('email').value),
    'phone': (document.getElementById('phone').value) ? encodeURIComponent(document.getElementById(
      'phone').value) : 'no phone',
    'message': encodeURIComponent(document.getElementById('message').value)
  }
  if (contact.name && contact.email && contact.message) {
    event.preventDefault();

    ///////////////// Submit form to Netlify forms /////////////////
    const form = document.getElementById('contact-form');
    let xhr = new XMLHttpRequest();
    xhr.open('POST', form.action);
    xhr.onload = function () {
      document.querySelector('.contact-section .loading-icon').classList.remove('show');
      if (xhr.status === 200) {
        document.querySelector('.contact-section .form-result .success').classList.add(
          'show');
        document.querySelector('.contact-section .form-result .error').classList.remove(
          'show');
      } else {
        document.querySelector('.contact-section .form-result .success').classList.remove(
          'show');
        document.querySelector('.contact-section .form-result .error').classList.add('show');
      }
    }

    ///////////////// Submit form to Heroku mailer /////////////////
    // var queryString = 'brandon-martin-mail' + '/' + contact.name + "/" + contact.email + "/" +
    //   contact.message + "/" +
    //   contact.phone;

    // var xhr = new XMLHttpRequest();
    // xhr.open('GET', baseUrl + queryString);
    // xhr.onload = function () {
    //   document.querySelector('.contact-section .loading-icon').classList.remove('show');
    //   if (xhr.status === 200) {
    //     document.querySelector('.contact-section .form-result .success').classList.add(
    //       'show');
    //     document.querySelector('.contact-section .form-result .error').classList.remove(
    //       'show');
    //   } else {
    //     document.querySelector('.contact-section .form-result .success').classList.remove(
    //       'show');
    //     document.querySelector('.contact-section .form-result .error').classList.add('show');
    //   }
    // }
    // xhr.send();
  } else {
    document.querySelector('.contact-section .loading-icon').classList.remove('show');
    document.querySelector('.contact-section .form-result .error').classList.add('show');
  }
});

/* LAZY LOADING SCRIPT */
// progressive-image.js, v1.2
// by Craig Buckler, @craigbuckler
// MIT License
// with minor edits I made to make it work better with my existing HTML
if (window.addEventListener && window.requestAnimationFrame && document.getElementsByClassName)
  window.addEventListener('load', function () {
    // start
    var pItem = document.getElementsByClassName('progressive replace'),
      pCount, timer;
    window.addEventListener('scroll', scroller, false);
    window.addEventListener('resize', scroller, false);
    if (MutationObserver) {
      var observer = new MutationObserver(function () {
        if (pItem.length !== pCount) inView();
      });
      observer.observe(document.body, {
        subtree: true,
        childList: true,
        attributes: true,
        characterData: true
      });
    }
    // initial check
    inView();
    // throttled scroll/resize
    function scroller() {
      timer = timer || setTimeout(function () {
        timer = null;
        inView();
      }, 300);
    }

    // image in view?
    function inView() {
      if (pItem.length) requestAnimationFrame(function () {
        var wT = window.pageYOffset,
          wB = wT + window.innerHeight,
          cRect, pT, pB, p = 0;
        while (p < pItem.length) {
          cRect = pItem[p].getBoundingClientRect();
          pT = wT + cRect.top;
          pB = pT + cRect.height;
          if (wT <
            pB && wB > pT) {
            loadFullImage(pItem[p]);
            pItem[p].classList.remove('replace');
          } else p++;
        }
        pCount = pItem.length;
      });
    }

    // replace with full image
    function loadFullImage(item) {
      var href = item && (item.getAttribute('data-img-src') || item.href);
      if (!href) return;
      // load image
      var img = new Image();
      if (item.dataset) {
        img.srcset = item.dataset.srcset || '';
        img.sizes = item.dataset.sizes || '';
      }
      img.src = href;
      img.className = 'reveal';
      if (img.complete) addImg();
      else img.onload = addImg;
      // replace image
      function addImg() {
        requestAnimationFrame(function () {
          // disable click
          if (href === item.href) {
            item.style.cursor = 'default';
            item.addEventListener('click', function (e) {
              e.preventDefault();
            }, false);
          }
          // preview image
          var pImg = item.querySelector && item.querySelector('img.preview');
          // add full image
          item.insertBefore(img, pImg && pImg.nextSibling).addEventListener(
            'animationend',
            function () {
              // remove preview image
              if (pImg) {
                img.alt = pImg.alt || '';
                item.removeChild(pImg);
              }
              img.classList.remove('reveal');
            });
        });
      }
    }
  }, false);