// ==UserScript==
// @name         notranslate-防止chrome翻译代码段和公式
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  A tampermonkey script aims to prevent unnecessary translation of code segment and math equations.
// @author       winding
// @supportURL   https://github.com/windingwind/notranslate/README.md
// @include      *
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';
    /* You can add your settings here.
       "type" can be "id", "class", or "element".
       "param" is how you  trace the target element.
    */
    const behaviorList = [
        {
            'type':'class',
            'param':'prettyprint',
        },
        {
            'type':'class',
            'param':'mjx-chtml',
        },
        {
            'type':'class',
            'param':'katex--display',
        },
        {
            'type':'class',
            'param':'syntaxhighlighter',
        },
    ];
    function addNotranslate (selector, loop, interval) {
        $(selector).attr("class", function(i,origValue){
            return origValue + " notranslate";
        });
    }
    function run () {
        console.log($);
        for(let i = 0; i < behaviorList.length; i++) {
            //console.log(behaviorList[i]);
            let selector = '';
            switch (behaviorList[i].type){
                case 'class':
                    selector = "."+behaviorList[i].param;
                    break;
                case 'id':
                    selector = "#"+behaviorList[i].param;
                    break;
                case 'element':
                    selector = behaviorList[i].param;
                    break;
            }
            addNotranslate(selector, behaviorList[i].loop, behaviorList[i].interval);
        }
    }
    function main(){
        $(function(){
            $("body").keyup(function(event){
                if (event.ctrlKey && event.keyCode === 81){
                    if(confirm('Will add "notranslate" to some elements on his page. Continue?')){
                        run();
                        console.log('finish');
                    }
                }
            });
        });
    }
    main();
})();
