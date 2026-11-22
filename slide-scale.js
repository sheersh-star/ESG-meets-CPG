(function () {
  var NATIVE_WIDTH = 1910;

  function scaleAll() {
    document.querySelectorAll('.slide-frame').forEach(function (frame) {
      var canvas = frame.querySelector('.slide-canvas');
      if (!canvas) return;
      canvas.style.transform = 'scale(' + (frame.clientWidth / NATIVE_WIDTH) + ')';
    });
  }

  window.addEventListener('resize', scaleAll);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scaleAll);
  } else {
    scaleAll();
  }
})();
