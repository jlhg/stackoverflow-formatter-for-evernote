// ==UserScript==
// @name         PTT reformat for Evernote
// @namespace    https://greasyfork.org/zh-TW/users/79288
// @version      1.2
// @description  原始的 PTT 網頁用 Evernote Web Clipper 擷取，圖片會跑版，此為替換原本的自動開圖區塊
// @author       jlhg
// @match        https://www.ptt.cc/bbs/*/*.html
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  ['.jpg', '.JPG', '.png', '.PNG'].forEach(function(ext) {
    let images = document.querySelectorAll('a[href$="' + ext + '"]');
    for (let i = 0; i < images.length; i++) {
      let imageUrl = images[i].href;
      imageUrl = imageUrl.replace('https://i.imgur', 'http://i.imgur');
      imageUrl = imageUrl.replace('https://imgur', 'http://imgur');
      images[i].innerHTML += '<br><img src="' + imageUrl + '"><br>';
      images[i].style.boxShadow = 'none';
    }
  });

  let images = document.querySelectorAll('a[href^="https://imgur.com/"]');
  for (let i = 0; i < images.length; i++) {
    if (images[i].href.indexOf("https://imgur.com/a/") >= 0 || /\.(jpg|png)$/i.test(images[i].href)) {
      continue;
    }

    images[i].innerHTML += '<br><img src="' + images[i].href.replace('https://imgur.com/', 'http://i.imgur.com/') + '.jpg"><br>';
    images[i].style.boxShadow = 'none';
  }

  let richcontents = document.querySelectorAll('.richcontent');
  for (let i = 0; i < richcontents.length; i++) {
    richcontents[i].remove();
  }
})();
