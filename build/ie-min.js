/*
 ieJS 
 (c) 2013 Christian Bodart https://github.com/standardjs/ie
 License: MIT

 @author Christian Bodart <christian.bodart@gmail.com>
 @version 0.0

*/
(function(b,a,c,d,e){b.g=a;a.scope=b;for(var f in c)a[f]=c[f];a.f=new d;e.b&&e.b(Object,d,e);a.factory=arguments.callee})(window,function g(a,c){for(var d=0,e=a.length;d!=e;d++)c&&g[c].a.apply(a[d]);return a},{i:function(b,a){if(b in this)throw Error("ie.define - module ["+b+"] already defined");this[b]="function"==typeof a?a(this):a;this.global&&a.d&&a.d(this.scope)},extend:function(b,a){var c=this[b],d=c.a,e=a.a;c.a=function(){d.apply(this);e.apply(this)}}},function(){},{b:function(b,a,c){var d;
b!=Object&&(a.prototype=new b,a.prototype.constructor=a);for(d in c)a.prototype[d]=c[d]},e:function(b){var a=[],c;for(c in b)a.push("t."+c+"=s."+c);a.push("return t");return new Function("t","s",a.join(";"))},c:function(b){return/^(\s*function[^\(]*\(\s*\)\s*\{\s*\[native code\]\s*\}\s*)|(\[\w+\s\w+\])$/.test(b)},h:function(b){switch(typeof b){case "function":return this.c(b);case "object":return!b.constructor||b.constructor!=Object&&this.c(b.constructor)?!0:!1;default:return!0}}});
