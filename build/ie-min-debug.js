var elementInterfaces={A:"Anchor",BR:"BR",DATALIST:"DataList",DL:"DList",FIELDSET:"FieldSet",FRAMESET:"FrameSet",HR:"HR",IFRAME:"IFrame",IMG:"Image",LI:"List",OL:"OList",OPTGROUP:"OptGroup",P:"Paragraph",CAPTION:" TableCaption",TD:"TableDataCell",TH:"TableHeaderCell",COL:"TableCol",COLGROUP:"TableCol",TR:" TableRow",TBODY:"TableSection",THEAD:"TableSection",TFOOR:"TableSection",TEXTAREA:"TextArea",UL:"UList"};/*
 ieJS 
 (c) 2013 Christian Bodart https://github.com/standardjs/ie
 License: MIT

 @author Christian Bodart <christian.bodart@gmail.com>
 @version 0.0

*/
var DEBUG=!0;
(function(c,a,b,d,e){c.ie=a;a.scope=c;for(var f in b)a[f]=b[f];a.helper=new d;e.createType&&e.createType(Object,d,e);a.factory=arguments.callee})(window,function ie(a,b,d){d=0;for(var e=a.length;d!=e;d++)b&&ie[b].implement.apply(a[d]);return a},{register:function(c,a){if(DEBUG&&c in this)throw Error("ie.define - module ["+c+"] already defined");this[c]="function"==typeof a?a(this):a;this.global&&a.publish&&a.publish(this.scope)},extend:function(c,a){var b=this[c],d=b.implement,e=a.implement;b.implement=
function(){d.apply(this);e.apply(this)}}},function(){},{createType:function(c,a,b){var d;c!=Object&&(a.prototype=new c,a.prototype.constructor=a);for(d in b)a.prototype[d]=b[d]},createFastMapperFunction:function(c){var a=[],b;for(b in c)a.push("t."+b+"=s."+b);a.push("return t");return new Function("t","s",a.join(";"))}});
