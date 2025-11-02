/* 全域互動：jQuery */
$(function(){

  // 平滑滾動（導覽）
  $('a[href^="#"]').on('click', function(e){
    var targetHash = this.hash;
    if (targetHash) {
      var $target = $(targetHash);
      if ($target.length) {
        e.preventDefault();
        $('html,body').animate({scrollTop: $target.offset().top - 70}, 600);
      }
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

    // 篩選 projects（處理有圖片的 .project-card）
    $('.project-card').each(function(){
      var kws = ($(this).attr('data-keywords')||'').toLowerCase();
      if (ql === '' || kws.indexOf(ql) !== -1) $(this).show();
      else $(this).hide();
    });

    // 篩選純文字列表的 .project-item（使用 data-keywords 屬性）
    $('.project-item').each(function(){
      var kws = ($(this).attr('data-keywords')||'').toLowerCase();
      // 若沒有 data-keywords，可以改用文字內容匹配
      var text = $(this).text().toLowerCase();
      var match = (kws && kws.indexOf(ql) !== -1) || (text.indexOf(ql) !== -1);
      if (ql === '' || match) $(this).show();
      else $(this).hide();
    });
  }

  // 綁定輸入框
  $('#quick-filter').on('input', function(){
    filterAllKeywords($(this).val());
  });

  // Enter 鍵：捲到第一個 visible 的專案（支援兩種 selector）
  $('#quick-filter').on('keydown', function(e){
    if (e.key === 'Enter') {
      e.preventDefault();
      var first = $('.project-card:visible, .project-item:visible').first();
      if (first.length) $('html,body').animate({scrollTop: first.offset().top - 80}, 500);
    }
  });

  // 點擊 chip 直接以該字做篩選（並滾動到第一個結果）
  $(document).on('click', '.chip', function(){
    var t = $(this).text();
    $('#quick-filter').val(t);
    filterAllKeywords(t);
    var first = $('.project-card:visible, .project-item:visible').first();
    if (first.length) $('html,body').animate({scrollTop: first.offset().top - 80}, 500);
  });

  // 複製 Email（Clipboard）
  $('#copy-email').on('click', function(){
    var email = $('#email-text').text().trim();
    if (!email) {
      alert('找不到 Email，請檢查 #email-text 元素是否存在並有內容。');
      return;
    }

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
