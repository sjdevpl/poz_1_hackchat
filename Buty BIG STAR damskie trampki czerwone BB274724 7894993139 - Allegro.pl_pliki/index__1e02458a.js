!function(e,t){"use strict";!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else{var n=t();for(var o in n)("object"==typeof exports?exports:e)[o]=n[o]}}(t,function(){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="https://assets.allegrostatic.com/opbox-expander/",n(n.s="oid+")}({"oid+":function(e,n,o){o.r(n);var i='[data-role="opbox-expander-content"]',r='[data-role="opbox-expander-body"]',a='[data-role="opbox-expander-expand-button"]',c="data-initial-height",s=function(){function e(t){var n=t.baseNode;!function(t,n){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this),this.baseNode=n,this.contentNode=n.querySelector(r),this.contentWrapper=n.querySelector(i),this.initialHeight=this.contentWrapper.getAttribute(c)}var n;return(n=[{key:"attachTransitionend",value:function(){var e=this;this.contentWrapper.addEventListener("transitionend",function(){e.contentWrapper.classList.contains("_09158_ecrbX")&&(e.contentWrapper.style.maxHeight="none"),e.contentWrapper.style.height="auto"},!1)}},{key:"setInitialHeight",value:function(){this.contentWrapper.style.maxHeight="".concat(this.initialHeight,"px"),this.contentWrapper.style.height="".concat(this.initialHeight,"px")}},{key:"toggleExpanderVisibility",value:function(){this.baseNode.querySelector(i).classList.toggle("_09158_ecrbX"),this.baseNode.querySelector(a).classList.toggle("_lsy4e"),this.baseNode.querySelector('[data-role="opbox-expander-collapse-button"]').classList.toggle("_lsy4e"),this.baseNode.querySelector('[data-role="opbox-expander-footer"]').classList.toggle("_09158_3CcOJ")}},{key:"showExpandButton",value:function(){this.toggleExpanderVisibility(),this.contentWrapper.style.maxHeight="".concat(this.contentNode.clientHeight+41,"px"),this.contentWrapper.style.height="".concat(this.contentNode.clientHeight+41,"px")}},{key:"showCollapseButton",value:function(){var e=this;this.toggleExpanderVisibility(),t.requestAnimationFrame(function(){e.contentWrapper.style.maxHeight="".concat(e.contentNode.clientHeight+41,"px"),e.contentWrapper.style.height="".concat(e.contentNode.clientHeight+41,"px")}),setTimeout(this.setInitialHeight.bind(this),"16")}},{key:"attachClickEvent",value:function(){this.baseNode.querySelector(a).addEventListener("click",this.showExpandButton.bind(this),!0),this.baseNode.querySelector('[data-role="opbox-expander-collapse-button"]').addEventListener("click",this.showCollapseButton.bind(this),!0)}},{key:"init",value:function(){this.attachClickEvent(),this.attachTransitionend()}}])&&function(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}(e.prototype,n),e}();t.opbox.component.init({prototypeName:"allegro.expander"},function(e){e.domNodes.forEach(function(e){return new s({baseNode:e}).init()})})}})})}(0,"undefined"!=typeof window?window:global);