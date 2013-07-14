/*
 ieJS 
 (c) 2013 Christian Bodart https://github.com/standardjs/ie
 License: MIT

 @author Christian Bodart <christian.bodart@gmail.com>
 @version 0.0

*/
var DEBUG=!0;
(function(b,a,c,d,e){b.ie=a;a.scope=b;for(var f in c)a[f]=c[f];a.helper=new d;e.createType&&e.createType(Object,d,e);a.factory=arguments.callee})(window,function ie(a,c,d){d=0;for(var e=a.length;d!=e;d++)c&&ie[c].implement.apply(a[d]);return a},{register:function(b,a){if(DEBUG&&b in this)throw Error("ie.define - module ["+b+"] already defined");this[b]="function"==typeof a?a(this):a;this.global&&a.publish&&a.publish(this.scope)},extend:function(b,a){var c=this[b],d=c.implement,e=a.implement;c.implement=
function(){d.apply(this);e.apply(this)}}},function(){},{createType:function(b,a,c){var d;b!=Object&&(a.prototype=new b,a.prototype.constructor=a);for(d in c)a.prototype[d]=c[d]},createFastMapperFunction:function(b){var a=[],c;for(c in b)a.push("t."+c+"=s."+c);a.push("return t");return new Function("t","s",a.join(";"))},functionIsNative:function(b){return/^(\s*function[^\(]*\(\s*\)\s*\{\s*\[native code\]\s*\}\s*)|(\[\w+\s\w+\])$/.test(b)},objectIsNative:function(b){switch(typeof b){case "function":return this.functionIsNative(b);
case "object":return!b.constructor||b.constructor!=Object&&this.functionIsNative(b.constructor)?!0:!1;default:return!0}}});
