(function () {
  "use strict";
  var cfg = window.AWL_CONFIG || {};
  document.querySelectorAll("[data-checkout]").forEach(function (a) { a.href = cfg.CHECKOUT_URL || "#"; });
  var price = document.getElementById("price");
  if (price && cfg.PRICE) price.textContent = cfg.PRICE;
  var yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();

  var list = document.getElementById("curriculum-list");
  if (list && window.CURRICULUM) {
    CURRICULUM.forEach(function (m) {
      var d = document.createElement("details");
      var s = document.createElement("summary");
      var n = document.createElement("span"); n.className = "mn"; n.textContent = m.n;
      var t = document.createElement("span"); t.textContent = m.title;
      s.appendChild(n); s.appendChild(t);
      var p = document.createElement("p"); p.textContent = m.blurb + (m.status === "live" ? " Available now." : "");
      d.appendChild(s); d.appendChild(p);
      list.appendChild(d);
    });
  }
})();
