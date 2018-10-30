// Modal toggle; this will not work in IE, and I'm okay with that
(() => {
  let links = document.querySelectorAll('.portfolio-link');
  for (let link of links) {
    link.addEventListener('click', () => {
      link.className = (link.className === 'portfolio-link') ? 'portfolio-link active' : 'portfolio-link';
    });
  }
})();

// TypeForm Integration
(function () {
  var qs, js, q, s, d = document,
    gi = d.getElementById,
    ce = d.createElement,
    gt = d.getElementsByTagName,
    id = "typef_orm_share",
    b = "https://embed.typeform.com/";
  if (!gi.call(d, id)) {
    js = ce.call(d, "script");
    js.id = id;
    js.src = b + "embed.js";
    q = gt.call(d, "script")[0];
    q.parentNode.insertBefore(js, q)
  }
})();