/*
 ieJS 
 (c) 2013 Christian Bodart https://github.com/standardjs/ie
 License: MIT

 @author Christian Bodart <christian.bodart@gmail.com>
 @version 0.0

*/
(function(c,a,b,d,e){c.f=a;a.scope=c;for(var f in b)a[f]=b[f];a.e=new d;e.b&&e.b(Object,d,e);a.factory=arguments.callee})(window,function g(a,b){for(var d=0,e=a.length;d!=e;d++)b&&g[b].a.apply(a[d]);return a},{g:function(c,a){if(c in this)throw Error("ie.define - module ["+c+"] already defined");this[c]="function"==typeof a?a(this):a;this.global&&a.c&&a.c(this.scope)},extend:function(c,a){var b=this[c],d=b.a,e=a.a;b.a=function(){d.apply(this);e.apply(this)}}},function(){},{b:function(c,a,b){var d;
c!=Object&&(a.prototype=new c);for(d in b)a.prototype[d]=b[d]},d:function(c){var a=[],b;for(b in c)a.push("t."+b+"=s."+b);a.push("return t");return new Function("t","s",a.join(";"))}});
