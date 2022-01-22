// ==UserScript==
// @author           Jane Doe <jane@doe.com>
// @contributors     John Doe <john@doe.com>
// @description      template repository for userscripters' projects
// @grant            none
// @homepage         https://github.com/userscripters/template#readme
// @match            https://*.askubuntu.com/*
// @match            https://*.mathoverflow.net/*
// @match            https://*.serverfault.com/*
// @match            https://*.stackapps.com/*
// @match            https://*.stackexchange.com/*
// @match            https://*.stackoverflow.com/*
// @name             Template
// @namespace        userscripters
// @run-at           document-start
// @source           git+https://github.com/userscripters/template.git
// @supportURL       https://github.com/userscripters/template/issues
// @version          0.1.0
// ==/UserScript==

"use strict";
(function (_w, d) {
    var test = d.getElementById("test");
    if (!test)
        return;
    Stacks.showModal(test);
})(window, document);
