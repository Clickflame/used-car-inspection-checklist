/* Ticks save in this browser only. Nothing is sent anywhere. */
(function () {
  var KEY = "ucic-v1", boxes = [].slice.call(document.querySelectorAll('input[data-k]'));
  var state = {};
  try { state = JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (e) { state = {}; }
  var done = document.querySelector("[data-done]"), fill = document.querySelector("[data-fill]");
  function paint() {
    var n = 0;
    [].forEach.call(document.querySelectorAll("[data-sec]"), function (sec) {
      var all = sec.querySelectorAll("input[data-k]"), got = sec.querySelectorAll("input[data-k]:checked").length;
      n += got;
      sec.querySelector("[data-count]").textContent = got + " of " + all.length;
      sec.classList.toggle("full", got === all.length);
    });
    done.textContent = n;
    fill.style.width = (boxes.length ? (n / boxes.length) * 100 : 0) + "%";
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
  boxes.forEach(function (b) {
    b.checked = !!state[b.dataset.k];
    b.addEventListener("change", function () { if (b.checked) state[b.dataset.k] = 1; else delete state[b.dataset.k]; save(); paint(); });
  });
  [].forEach.call(document.querySelectorAll("[data-print]"), function (el) { el.addEventListener("click", function () { window.print(); }); });
  var reset = document.querySelector("[data-reset]");
  if (reset) reset.addEventListener("click", function () {
    if (!window.confirm("Clear every tick and start over?")) return;
    state = {}; save(); boxes.forEach(function (b) { b.checked = false; }); paint();
  });
  paint();
})();
