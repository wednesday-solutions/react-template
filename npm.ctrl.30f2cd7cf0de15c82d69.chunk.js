"use strict";(self.webpackChunkreact_template=self.webpackChunkreact_template||[]).push([[9178],{7440:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.numberInputToObject=t.parseIntFromHex=t.convertHexToDecimal=t.convertDecimalToHex=t.rgbaToArgbHex=t.rgbaToHex=t.rgbToHex=t.hsvToRgb=t.rgbToHsv=t.hslToRgb=t.rgbToHsl=t.rgbToRgb=void 0;var n=r(64104);function o(e,t,r){return r<0&&(r+=1),r>1&&(r-=1),r<1/6?e+6*r*(t-e):r<.5?t:r<2/3?e+(t-e)*(2/3-r)*6:e}function a(e){return Math.round(255*parseFloat(e)).toString(16)}function i(e){return parseInt(e,16)}t.rgbToRgb=function(e,t,r){return{r:255*n.bound01(e,255),g:255*n.bound01(t,255),b:255*n.bound01(r,255)}},t.rgbToHsl=function(e,t,r){e=n.bound01(e,255),t=n.bound01(t,255),r=n.bound01(r,255);var o=Math.max(e,t,r),a=Math.min(e,t,r),i=0,s=0,u=(o+a)/2;if(o===a)s=0,i=0;else{var h=o-a;switch(s=u>.5?h/(2-o-a):h/(o+a),o){case e:i=(t-r)/h+(t<r?6:0);break;case t:i=(r-e)/h+2;break;case r:i=(e-t)/h+4}i/=6}return{h:i,s,l:u}},t.hslToRgb=function(e,t,r){var a,i,s;if(e=n.bound01(e,360),t=n.bound01(t,100),r=n.bound01(r,100),0===t)i=r,s=r,a=r;else{var u=r<.5?r*(1+t):r+t-r*t,h=2*r-u;a=o(h,u,e+1/3),i=o(h,u,e),s=o(h,u,e-1/3)}return{r:255*a,g:255*i,b:255*s}},t.rgbToHsv=function(e,t,r){e=n.bound01(e,255),t=n.bound01(t,255),r=n.bound01(r,255);var o=Math.max(e,t,r),a=Math.min(e,t,r),i=0,s=o,u=o-a,h=0===o?0:u/o;if(o===a)i=0;else{switch(o){case e:i=(t-r)/u+(t<r?6:0);break;case t:i=(r-e)/u+2;break;case r:i=(e-t)/u+4}i/=6}return{h:i,s:h,v:s}},t.hsvToRgb=function(e,t,r){e=6*n.bound01(e,360),t=n.bound01(t,100),r=n.bound01(r,100);var o=Math.floor(e),a=e-o,i=r*(1-t),s=r*(1-a*t),u=r*(1-(1-a)*t),h=o%6;return{r:255*[r,s,i,i,u,r][h],g:255*[u,r,r,s,i,i][h],b:255*[i,i,u,r,r,s][h]}},t.rgbToHex=function(e,t,r,o){var a=[n.pad2(Math.round(e).toString(16)),n.pad2(Math.round(t).toString(16)),n.pad2(Math.round(r).toString(16))];return o&&a[0].startsWith(a[0].charAt(1))&&a[1].startsWith(a[1].charAt(1))&&a[2].startsWith(a[2].charAt(1))?a[0].charAt(0)+a[1].charAt(0)+a[2].charAt(0):a.join("")},t.rgbaToHex=function(e,t,r,o,i){var s=[n.pad2(Math.round(e).toString(16)),n.pad2(Math.round(t).toString(16)),n.pad2(Math.round(r).toString(16)),n.pad2(a(o))];return i&&s[0].startsWith(s[0].charAt(1))&&s[1].startsWith(s[1].charAt(1))&&s[2].startsWith(s[2].charAt(1))&&s[3].startsWith(s[3].charAt(1))?s[0].charAt(0)+s[1].charAt(0)+s[2].charAt(0)+s[3].charAt(0):s.join("")},t.rgbaToArgbHex=function(e,t,r,o){return[n.pad2(a(o)),n.pad2(Math.round(e).toString(16)),n.pad2(Math.round(t).toString(16)),n.pad2(Math.round(r).toString(16))].join("")},t.convertDecimalToHex=a,t.convertHexToDecimal=function(e){return i(e)/255},t.parseIntFromHex=i,t.numberInputToObject=function(e){return{r:e>>16,g:(65280&e)>>8,b:255&e}}},18898:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.names=void 0,t.names={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",goldenrod:"#daa520",gold:"#ffd700",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavenderblush:"#fff0f5",lavender:"#e6e6fa",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#663399",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"}},11976:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.isValidCSSUnit=t.stringInputToObject=t.inputToRGB=void 0;var n=r(7440),o=r(18898),a=r(64104);t.inputToRGB=function(e){var t={r:0,g:0,b:0},r=1,o=null,i=null,s=null,u=!1,h=!1;return"string"==typeof e&&(e=f(e)),"object"==typeof e&&(l(e.r)&&l(e.g)&&l(e.b)?(t=n.rgbToRgb(e.r,e.g,e.b),u=!0,h="%"===String(e.r).substr(-1)?"prgb":"rgb"):l(e.h)&&l(e.s)&&l(e.v)?(o=a.convertToPercentage(e.s),i=a.convertToPercentage(e.v),t=n.hsvToRgb(e.h,o,i),u=!0,h="hsv"):l(e.h)&&l(e.s)&&l(e.l)&&(o=a.convertToPercentage(e.s),s=a.convertToPercentage(e.l),t=n.hslToRgb(e.h,o,s),u=!0,h="hsl"),Object.prototype.hasOwnProperty.call(e,"a")&&(r=e.a)),r=a.boundAlpha(r),{ok:u,format:e.format||h,r:Math.min(255,Math.max(t.r,0)),g:Math.min(255,Math.max(t.g,0)),b:Math.min(255,Math.max(t.b,0)),a:r}};var i="(?:[-\\+]?\\d*\\.\\d+%?)|(?:[-\\+]?\\d+%?)",s="[\\s|\\(]+("+i+")[,|\\s]+("+i+")[,|\\s]+("+i+")\\s*\\)?",u="[\\s|\\(]+("+i+")[,|\\s]+("+i+")[,|\\s]+("+i+")[,|\\s]+("+i+")\\s*\\)?",h={CSS_UNIT:new RegExp(i),rgb:new RegExp("rgb"+s),rgba:new RegExp("rgba"+u),hsl:new RegExp("hsl"+s),hsla:new RegExp("hsla"+u),hsv:new RegExp("hsv"+s),hsva:new RegExp("hsva"+u),hex3:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,hex4:/^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex8:/^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/};function f(e){if(0===(e=e.trim().toLowerCase()).length)return!1;var t=!1;if(o.names[e])e=o.names[e],t=!0;else if("transparent"===e)return{r:0,g:0,b:0,a:0,format:"name"};var r=h.rgb.exec(e);return r?{r:r[1],g:r[2],b:r[3]}:(r=h.rgba.exec(e))?{r:r[1],g:r[2],b:r[3],a:r[4]}:(r=h.hsl.exec(e))?{h:r[1],s:r[2],l:r[3]}:(r=h.hsla.exec(e))?{h:r[1],s:r[2],l:r[3],a:r[4]}:(r=h.hsv.exec(e))?{h:r[1],s:r[2],v:r[3]}:(r=h.hsva.exec(e))?{h:r[1],s:r[2],v:r[3],a:r[4]}:(r=h.hex8.exec(e))?{r:n.parseIntFromHex(r[1]),g:n.parseIntFromHex(r[2]),b:n.parseIntFromHex(r[3]),a:n.convertHexToDecimal(r[4]),format:t?"name":"hex8"}:(r=h.hex6.exec(e))?{r:n.parseIntFromHex(r[1]),g:n.parseIntFromHex(r[2]),b:n.parseIntFromHex(r[3]),format:t?"name":"hex"}:(r=h.hex4.exec(e))?{r:n.parseIntFromHex(r[1]+r[1]),g:n.parseIntFromHex(r[2]+r[2]),b:n.parseIntFromHex(r[3]+r[3]),a:n.convertHexToDecimal(r[4]+r[4]),format:t?"name":"hex8"}:!!(r=h.hex3.exec(e))&&{r:n.parseIntFromHex(r[1]+r[1]),g:n.parseIntFromHex(r[2]+r[2]),b:n.parseIntFromHex(r[3]+r[3]),format:t?"name":"hex"}}function l(e){return Boolean(h.CSS_UNIT.exec(String(e)))}t.stringInputToObject=f,t.isValidCSSUnit=l},38365:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.legacyRandom=t.fromRatio=void 0;var n=r(12409),o=r(64104);t.fromRatio=function(e,t){var r={r:o.convertToPercentage(e.r),g:o.convertToPercentage(e.g),b:o.convertToPercentage(e.b)};return void 0!==e.a&&(r.a=Number(e.a)),new n.TinyColor(r,t)},t.legacyRandom=function(){return new n.TinyColor({r:Math.random(),g:Math.random(),b:Math.random()})}},12409:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.tinycolor=t.TinyColor=void 0;var n=r(7440),o=r(18898),a=r(11976),i=r(64104),s=function(){function e(t,r){var o;if(void 0===t&&(t=""),void 0===r&&(r={}),t instanceof e)return t;"number"==typeof t&&(t=n.numberInputToObject(t)),this.originalInput=t;var i=a.inputToRGB(t);this.originalInput=t,this.r=i.r,this.g=i.g,this.b=i.b,this.a=i.a,this.roundA=Math.round(100*this.a)/100,this.format=null!==(o=r.format)&&void 0!==o?o:i.format,this.gradientType=r.gradientType,this.r<1&&(this.r=Math.round(this.r)),this.g<1&&(this.g=Math.round(this.g)),this.b<1&&(this.b=Math.round(this.b)),this.isValid=i.ok}return e.prototype.isDark=function(){return this.getBrightness()<128},e.prototype.isLight=function(){return!this.isDark()},e.prototype.getBrightness=function(){var e=this.toRgb();return(299*e.r+587*e.g+114*e.b)/1e3},e.prototype.getLuminance=function(){var e=this.toRgb(),t=e.r/255,r=e.g/255,n=e.b/255;return.2126*(t<=.03928?t/12.92:Math.pow((t+.055)/1.055,2.4))+.7152*(r<=.03928?r/12.92:Math.pow((r+.055)/1.055,2.4))+.0722*(n<=.03928?n/12.92:Math.pow((n+.055)/1.055,2.4))},e.prototype.getAlpha=function(){return this.a},e.prototype.setAlpha=function(e){return this.a=i.boundAlpha(e),this.roundA=Math.round(100*this.a)/100,this},e.prototype.toHsv=function(){var e=n.rgbToHsv(this.r,this.g,this.b);return{h:360*e.h,s:e.s,v:e.v,a:this.a}},e.prototype.toHsvString=function(){var e=n.rgbToHsv(this.r,this.g,this.b),t=Math.round(360*e.h),r=Math.round(100*e.s),o=Math.round(100*e.v);return 1===this.a?"hsv("+t+", "+r+"%, "+o+"%)":"hsva("+t+", "+r+"%, "+o+"%, "+this.roundA+")"},e.prototype.toHsl=function(){var e=n.rgbToHsl(this.r,this.g,this.b);return{h:360*e.h,s:e.s,l:e.l,a:this.a}},e.prototype.toHslString=function(){var e=n.rgbToHsl(this.r,this.g,this.b),t=Math.round(360*e.h),r=Math.round(100*e.s),o=Math.round(100*e.l);return 1===this.a?"hsl("+t+", "+r+"%, "+o+"%)":"hsla("+t+", "+r+"%, "+o+"%, "+this.roundA+")"},e.prototype.toHex=function(e){return void 0===e&&(e=!1),n.rgbToHex(this.r,this.g,this.b,e)},e.prototype.toHexString=function(e){return void 0===e&&(e=!1),"#"+this.toHex(e)},e.prototype.toHex8=function(e){return void 0===e&&(e=!1),n.rgbaToHex(this.r,this.g,this.b,this.a,e)},e.prototype.toHex8String=function(e){return void 0===e&&(e=!1),"#"+this.toHex8(e)},e.prototype.toRgb=function(){return{r:Math.round(this.r),g:Math.round(this.g),b:Math.round(this.b),a:this.a}},e.prototype.toRgbString=function(){var e=Math.round(this.r),t=Math.round(this.g),r=Math.round(this.b);return 1===this.a?"rgb("+e+", "+t+", "+r+")":"rgba("+e+", "+t+", "+r+", "+this.roundA+")"},e.prototype.toPercentageRgb=function(){var e=function(e){return Math.round(100*i.bound01(e,255))+"%"};return{r:e(this.r),g:e(this.g),b:e(this.b),a:this.a}},e.prototype.toPercentageRgbString=function(){var e=function(e){return Math.round(100*i.bound01(e,255))};return 1===this.a?"rgb("+e(this.r)+"%, "+e(this.g)+"%, "+e(this.b)+"%)":"rgba("+e(this.r)+"%, "+e(this.g)+"%, "+e(this.b)+"%, "+this.roundA+")"},e.prototype.toName=function(){if(0===this.a)return"transparent";if(this.a<1)return!1;for(var e="#"+n.rgbToHex(this.r,this.g,this.b,!1),t=0,r=Object.entries(o.names);t<r.length;t++){var a=r[t],i=a[0];if(e===a[1])return i}return!1},e.prototype.toString=function(e){var t=Boolean(e);e=null!=e?e:this.format;var r=!1,n=this.a<1&&this.a>=0;return t||!n||!e.startsWith("hex")&&"name"!==e?("rgb"===e&&(r=this.toRgbString()),"prgb"===e&&(r=this.toPercentageRgbString()),"hex"!==e&&"hex6"!==e||(r=this.toHexString()),"hex3"===e&&(r=this.toHexString(!0)),"hex4"===e&&(r=this.toHex8String(!0)),"hex8"===e&&(r=this.toHex8String()),"name"===e&&(r=this.toName()),"hsl"===e&&(r=this.toHslString()),"hsv"===e&&(r=this.toHsvString()),r||this.toHexString()):"name"===e&&0===this.a?this.toName():this.toRgbString()},e.prototype.toNumber=function(){return(Math.round(this.r)<<16)+(Math.round(this.g)<<8)+Math.round(this.b)},e.prototype.clone=function(){return new e(this.toString())},e.prototype.lighten=function(t){void 0===t&&(t=10);var r=this.toHsl();return r.l+=t/100,r.l=i.clamp01(r.l),new e(r)},e.prototype.brighten=function(t){void 0===t&&(t=10);var r=this.toRgb();return r.r=Math.max(0,Math.min(255,r.r-Math.round(-t/100*255))),r.g=Math.max(0,Math.min(255,r.g-Math.round(-t/100*255))),r.b=Math.max(0,Math.min(255,r.b-Math.round(-t/100*255))),new e(r)},e.prototype.darken=function(t){void 0===t&&(t=10);var r=this.toHsl();return r.l-=t/100,r.l=i.clamp01(r.l),new e(r)},e.prototype.tint=function(e){return void 0===e&&(e=10),this.mix("white",e)},e.prototype.shade=function(e){return void 0===e&&(e=10),this.mix("black",e)},e.prototype.desaturate=function(t){void 0===t&&(t=10);var r=this.toHsl();return r.s-=t/100,r.s=i.clamp01(r.s),new e(r)},e.prototype.saturate=function(t){void 0===t&&(t=10);var r=this.toHsl();return r.s+=t/100,r.s=i.clamp01(r.s),new e(r)},e.prototype.greyscale=function(){return this.desaturate(100)},e.prototype.spin=function(t){var r=this.toHsl(),n=(r.h+t)%360;return r.h=n<0?360+n:n,new e(r)},e.prototype.mix=function(t,r){void 0===r&&(r=50);var n=this.toRgb(),o=new e(t).toRgb(),a=r/100;return new e({r:(o.r-n.r)*a+n.r,g:(o.g-n.g)*a+n.g,b:(o.b-n.b)*a+n.b,a:(o.a-n.a)*a+n.a})},e.prototype.analogous=function(t,r){void 0===t&&(t=6),void 0===r&&(r=30);var n=this.toHsl(),o=360/r,a=[this];for(n.h=(n.h-(o*t>>1)+720)%360;--t;)n.h=(n.h+o)%360,a.push(new e(n));return a},e.prototype.complement=function(){var t=this.toHsl();return t.h=(t.h+180)%360,new e(t)},e.prototype.monochromatic=function(t){void 0===t&&(t=6);for(var r=this.toHsv(),n=r.h,o=r.s,a=r.v,i=[],s=1/t;t--;)i.push(new e({h:n,s:o,v:a})),a=(a+s)%1;return i},e.prototype.splitcomplement=function(){var t=this.toHsl(),r=t.h;return[this,new e({h:(r+72)%360,s:t.s,l:t.l}),new e({h:(r+216)%360,s:t.s,l:t.l})]},e.prototype.onBackground=function(t){var r=this.toRgb(),n=new e(t).toRgb();return new e({r:n.r+(r.r-n.r)*r.a,g:n.g+(r.g-n.g)*r.a,b:n.b+(r.b-n.b)*r.a})},e.prototype.triad=function(){return this.polyad(3)},e.prototype.tetrad=function(){return this.polyad(4)},e.prototype.polyad=function(t){for(var r=this.toHsl(),n=r.h,o=[this],a=360/t,i=1;i<t;i++)o.push(new e({h:(n+i*a)%360,s:r.s,l:r.l}));return o},e.prototype.equals=function(t){return this.toRgbString()===new e(t).toRgbString()},e}();t.TinyColor=s,t.tinycolor=function(e,t){return void 0===e&&(e=""),void 0===t&&(t={}),new s(e,t)}},30817:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0})},9584:function(e,t,r){var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),o=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||n(t,e,r)};Object.defineProperty(t,"__esModule",{value:!0});var a=r(12409);o(r(12409),t),o(r(18898),t),o(r(87133),t),o(r(65965),t),o(r(38365),t),o(r(11976),t),o(r(87764),t),o(r(30817),t),o(r(7440),t),t.default=a.tinycolor},87764:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.bounds=t.random=void 0;var n=r(12409);function o(e){e>=334&&e<=360&&(e-=360);for(var r=0,n=t.bounds;r<n.length;r++){var o=i(n[r]);if(o.hueRange&&e>=o.hueRange[0]&&e<=o.hueRange[1])return o}throw Error("Color not found")}function a(e,t){if(void 0===t)return Math.floor(e[0]+Math.random()*(e[1]+1-e[0]));var r=e[1]||1,n=e[0]||0,o=(t=(9301*t+49297)%233280)/233280;return Math.floor(n+o*(r-n))}function i(e){var t=e.lowerBounds[0][0],r=e.lowerBounds[e.lowerBounds.length-1][0],n=e.lowerBounds[e.lowerBounds.length-1][1],o=e.lowerBounds[0][1];return{name:e.name,hueRange:e.hueRange,lowerBounds:e.lowerBounds,saturationRange:[t,r],brightnessRange:[n,o]}}t.random=function e(r){if(void 0===r&&(r={}),void 0!==r.count&&null!==r.count){var s=r.count,u=[];for(r.count=void 0;s>u.length;)r.count=null,r.seed&&(r.seed+=1),u.push(e(r));return r.count=s,u}var h=function(e,r){var o=a(function(e){var r=parseInt(e,10);if(!Number.isNaN(r)&&r<360&&r>0)return[r,r];if("string"==typeof e){var o=t.bounds.find((function(t){return t.name===e}));if(o){var a=i(o);if(a.hueRange)return a.hueRange}var s=new n.TinyColor(e);if(s.isValid){var u=s.toHsv().h;return[u,u]}}return[0,360]}(e),r);return o<0&&(o=360+o),o}(r.hue,r.seed),f=function(e,t){if("monochrome"===t.hue)return 0;if("random"===t.luminosity)return a([0,100],t.seed);var r=o(e).saturationRange,n=r[0],i=r[1];switch(t.luminosity){case"bright":n=55;break;case"dark":n=i-10;break;case"light":i=55}return a([n,i],t.seed)}(h,r),l={h,s:f,v:function(e,t,r){var n=function(e,t){for(var r=o(e).lowerBounds,n=0;n<r.length-1;n++){var a=r[n][0],i=r[n][1],s=r[n+1][0],u=r[n+1][1];if(t>=a&&t<=s){var h=(u-i)/(s-a);return h*t+(i-h*a)}}return 0}(e,t),i=100;switch(r.luminosity){case"dark":i=n+20;break;case"light":n=(i+n)/2;break;case"random":n=0,i=100}return a([n,i],r.seed)}(h,f,r)};return void 0!==r.alpha&&(l.a=r.alpha),new n.TinyColor(l)},t.bounds=[{name:"monochrome",hueRange:null,lowerBounds:[[0,0],[100,0]]},{name:"red",hueRange:[-26,18],lowerBounds:[[20,100],[30,92],[40,89],[50,85],[60,78],[70,70],[80,60],[90,55],[100,50]]},{name:"orange",hueRange:[19,46],lowerBounds:[[20,100],[30,93],[40,88],[50,86],[60,85],[70,70],[100,70]]},{name:"yellow",hueRange:[47,62],lowerBounds:[[25,100],[40,94],[50,89],[60,86],[70,84],[80,82],[90,80],[100,75]]},{name:"green",hueRange:[63,178],lowerBounds:[[30,100],[40,90],[50,85],[60,81],[70,74],[80,64],[90,50],[100,40]]},{name:"blue",hueRange:[179,257],lowerBounds:[[20,100],[30,86],[40,80],[50,74],[60,60],[70,52],[80,44],[90,39],[100,35]]},{name:"purple",hueRange:[258,282],lowerBounds:[[20,100],[30,87],[40,79],[50,70],[60,65],[70,59],[80,52],[90,45],[100,42]]},{name:"pink",hueRange:[283,334],lowerBounds:[[20,100],[30,90],[40,86],[60,84],[80,80],[90,75],[100,73]]}]},87133:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.mostReadable=t.isReadable=t.readability=void 0;var n=r(12409);function o(e,t){var r=new n.TinyColor(e),o=new n.TinyColor(t);return(Math.max(r.getLuminance(),o.getLuminance())+.05)/(Math.min(r.getLuminance(),o.getLuminance())+.05)}function a(e,t,r){var n,a;void 0===r&&(r={level:"AA",size:"small"});var i=o(e,t);switch((null!==(n=r.level)&&void 0!==n?n:"AA")+(null!==(a=r.size)&&void 0!==a?a:"small")){case"AAsmall":case"AAAlarge":return i>=4.5;case"AAlarge":return i>=3;case"AAAsmall":return i>=7;default:return!1}}t.readability=o,t.isReadable=a,t.mostReadable=function e(t,r,i){void 0===i&&(i={includeFallbackColors:!1,level:"AA",size:"small"});for(var s=null,u=0,h=i.includeFallbackColors,f=i.level,l=i.size,d=0,c=r;d<c.length;d++){var g=c[d],b=o(t,g);b>u&&(u=b,s=new n.TinyColor(g))}return a(t,s,{level:f,size:l})||!h?s:(i.includeFallbackColors=!1,e(t,["#fff","#000"],i))}},65965:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.toMsFilter=void 0;var n=r(7440),o=r(12409);t.toMsFilter=function(e,t){var r=new o.TinyColor(e),a="#"+n.rgbaToArgbHex(r.r,r.g,r.b,r.a),i=a,s=r.gradientType?"GradientType = 1, ":"";if(t){var u=new o.TinyColor(t);i="#"+n.rgbaToArgbHex(u.r,u.g,u.b,u.a)}return"progid:DXImageTransform.Microsoft.gradient("+s+"startColorstr="+a+",endColorstr="+i+")"}},64104:(e,t)=>{function r(e){return"string"==typeof e&&-1!==e.indexOf(".")&&1===parseFloat(e)}function n(e){return"string"==typeof e&&-1!==e.indexOf("%")}Object.defineProperty(t,"__esModule",{value:!0}),t.pad2=t.convertToPercentage=t.boundAlpha=t.isPercentage=t.isOnePointZero=t.clamp01=t.bound01=void 0,t.bound01=function(e,t){r(e)&&(e="100%");var o=n(e);return e=360===t?e:Math.min(t,Math.max(0,parseFloat(e))),o&&(e=parseInt(String(e*t),10)/100),Math.abs(e-t)<1e-6?1:e=360===t?(e<0?e%t+t:e%t)/parseFloat(String(t)):e%t/parseFloat(String(t))},t.clamp01=function(e){return Math.min(1,Math.max(0,e))},t.isOnePointZero=r,t.isPercentage=n,t.boundAlpha=function(e){return e=parseFloat(e),(isNaN(e)||e<0||e>1)&&(e=1),e},t.convertToPercentage=function(e){return e<=1?100*Number(e)+"%":e},t.pad2=function(e){return 1===e.length?"0"+e:String(e)}}}]);
//# sourceMappingURL=npm.ctrl.30f2cd7cf0de15c82d69.chunk.js.map