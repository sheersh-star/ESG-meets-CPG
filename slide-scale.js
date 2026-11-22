(function () {
  var NATIVE_WIDTH = 1920;

  function scaleAll(root) {
    (root || document).querySelectorAll('.slide-frame').forEach(function (frame) {
      var canvas = frame.querySelector('.slide-canvas');
      if (!canvas) return;
      canvas.style.transform = 'scale(' + (frame.clientWidth / NATIVE_WIDTH) + ')';
    });
  }

  window.scaleSlideFrames = scaleAll;
  window.addEventListener('resize', function () { scaleAll(); });
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { scaleAll(); });
  } else {
    scaleAll();
  }
})();
