/*
 ieJS v1.0.7
 (c) 2013 Christian Bodart https://github.com/standardjs/ie
 License: MIT

 @author Christian Bodart <christian.bodart@gmail.com>
 @version 0.0

*/
var DEBUG=!0;(function(b,a,c,d,e){b.ie=a;a.scope=b;for(var f in c)a[f]=c[f];a.helper=new d;e.createType&&e.createType(Object,d,e);a.factory=arguments.callee})(window,function(b,a,c){return b},{register:function(b,a){if(DEBUG&&b in this)throw Error("ie.define - module ["+b+"] already defined");this[b]=a;this.global&&a.publish&&a.publish(this.scope)}},function(){},{createType:function(b,a,c){var d;b!=Object&&(a.prototype=new b,a.prototype.constructor=a);for(d in c)a.prototype[d]=c[d]}});
