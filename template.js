// ==UserScript==
// @name         Orbitum
// @namespace    https://orbitum.space/
// @version      0.1
// @description  Orbitum pour JVC
// @author       Haz
// @match        https://www.jeuxvideo.com/*
// @match        https://m.jeuxvideo.com/*
// @icon         https://orbitum.space/favicon.ico
// @downloadURL  https://github.com/hazae41/orbitum-jvc/raw/master/dist/script.user.js
// @updateURL    https://github.com/hazae41/orbitum-jvc/raw/master/dist/script.user.js
// @grant        GM.xmlHttpRequest
// @connect      orbitum.space
// ==/UserScript==

const style = document.createElement('style');
style.textContent = `TEMPLATE_STYLE`;
document.head.appendChild(style);

