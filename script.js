/* 全域互動：jQuery */
$(function(){

  // 平滑滾動（導覽）
  $('a[href^="#"]').on('click', function(e){
    var target = this.hash;
    if (target.length) {
      e.preventDefault();
      $('html,body').animate({scrollTop: $(target).offset().top - 70}, 600);
    }
  });

  // 漢堡選單（行動裝置）
  $('.hamburger').on('click', function(){
    $('.nav').toggle();
  });

  // 回到頂端按鈕顯示
  $(window).on('scroll', function(){
    if ($(this).scrollTop() > 220) $('#backToTop').fadeIn();
    else $('#backToTop').fadeOut();
  });
  $('#backToTop').on('click', function(){
    $('html,body').animate({scrollTop:0}, 600);
  });

  // 關鍵字篩選（上方輸入框）
  function filterAllKeywords(q){
    var ql = q.trim().toLowerCase();

    // 篩選 skills chips
    if (ql === '') {
      $('.chip').show();
    } else {
      $('.chip').each(function(){
        var t = $(this).text().toLowerCase();
        if (t.indexOf(ql) !== -1) $(this).show();
        else $(this).hide();
      });
    }

    // 篩選 projects（依 data-keywords）
    $('.project-card').each(function(){
      var kws = ($(this).attr('data-keywords')||'').toLowerCase();
      if (ql === '' || kws.indexOf(ql) !== -1) $(this).show();
      else $(this).hide();
    });
  }

  $('#quick-filter').on('input', function(){
    filterAllKeywords($(this).val());
  });

  // 也支援按下 Enter 將結果捲到第一個 visible 專案（方便）
  $('#quick-filter').on('keypress', function(e){
    if (e.key === 'Enter') {
      var first = $('.project-card:visible').first();
      if (first.length) $('html,body').animate({scrollTop: first.offset().top - 80}, 500);
    }
  });

  // 點擊 chip 直接以該字做篩選
  $(document).on('click', '.chip', function(){
    var t = $(this).text();
    $('#quick-filter').val(t);
    filterAllKeywords(t);
    var first = $('.project-card:visible').first();
    if (first.length) $('html,body').animate({scrollTop: first.offset().top - 80}, 500);
  });

  // 複製 Email（Clipboard）
  $('#copy-email').on('click', function(){
    var email = $('#email-text').text().trim();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(function(){
        alert('已複製 Email：' + email);
      }, function(){
        fallbackCopy(email);
      });
    } else {
      fallbackCopy(email);
    }

    function fallbackCopy(text){
      var ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        alert('已複製 Email：' + text);
      } catch (err) {
        alert('無法複製，請手動複製：' + text);
      }
      document.body.removeChild(ta);
    }
  });

});
