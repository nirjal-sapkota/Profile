(function() {
  // Runtime cleanup for common encoding issues (mojibake) in the exported HTML
  document.addEventListener('DOMContentLoaded', function() {
    try {
      // Replace garbled icon text inside footer social links with accessible glyphs
      document.querySelectorAll('.footer-social-links a').forEach(function(a) {
        var span = a.querySelector('span');
        if (!span) return;
        var txt = span.textContent || '';
        if (/\u00C2|Ã|â|ð|�/.test(txt)) {
          var label = (a.getAttribute('aria-label') || '').toLowerCase();
          if (label.indexOf('email') !== -1) span.innerHTML = '\u2709'; // ✉
          else if (label.indexOf('phone') !== -1) span.innerHTML = '\u1F4DE'; // 📞
          else if (label.indexOf('portfolio') !== -1) span.innerHTML = '\u1F517'; // 🔗
          else if (label.indexOf('resume') !== -1) span.innerHTML = '\u1F4C4'; // 📄
          else span.textContent = '';
        }
      });

      // Replace mojibake in copyright lines like "Â©" -> proper © and remove stray Â
      document.querySelectorAll('.footer-copyright').forEach(function(el) {
        el.innerHTML = el.innerHTML.replace(/Â©/g, '&copy;').replace(/Â/g, '');
      });
    } catch (e) {
      console.error('Runtime cleanup script failed:', e);
    }
  });
})();
