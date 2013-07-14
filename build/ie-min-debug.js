/*
 ieJS v1.0.7
 (c) 2013 Christian Bodart https://github.com/standardjs/ie
 License: MIT

 @author Christian Bodart <christian.bodart@gmail.com>
 @version 0.0

*/
var DEBUG=!0;
(function(c,a,d,b,e){c.ie=a;a.scope=c;for(var f in d)a[f]=d[f];a.helper=new b;e.createType&&e.createType(Object,b,e);a.factory=arguments.callee})(window,function ie(a,d,b){b=0;for(var e=a.length;b!=e;b++)d&&ie[d].implement(a[b]);return a},{register:function(c,a){if(DEBUG&&c in this)throw Error("ie.define - module ["+c+"] already defined");this[c]="function"==typeof a?a(this):a;this.global&&a.publish&&a.publish(this.scope)}},function(){},{createType:function(c,a,d){var b;c!=Object&&(a.prototype=new c,
a.prototype.constructor=a);for(b in d)a.prototype[b]=d[b]}});
