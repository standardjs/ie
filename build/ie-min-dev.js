var elementInterfaces = {A:"Anchor", BR:"BR", DATALIST:"DataList", DL:"DList", FIELDSET:"FieldSet", FRAMESET:"FrameSet", HR:"HR", IFRAME:"IFrame", IMG:"Image", LI:"List", OL:"OList", OPTGROUP:"OptGroup", P:"Paragraph", CAPTION:" TableCaption", TD:"TableDataCell", TH:"TableHeaderCell", COL:"TableCol", COLGROUP:"TableCol", TR:" TableRow", TBODY:"TableSection", THEAD:"TableSection", TFOOR:"TableSection", TEXTAREA:"TextArea", UL:"UList"};
/*
 ieJS 
 (c) 2013 Christian Bodart https://github.com/standardjs/ie
 License: MIT

 @author Christian Bodart <christian.bodart@gmail.com>
 @version 0.0

*/
var DEBUG = true;
(function(scope, ie, ie_static, ie_Helper, ie_Helper_prototype) {
  scope.ie = ie;
  ie.scope = scope;
  for(var i in ie_static) {
    ie[i] = ie_static[i]
  }
  ie.helper = new ie_Helper;
  if(ie_Helper_prototype.createType) {
    ie_Helper_prototype.createType(Object, ie_Helper, ie_Helper_prototype)
  }
  ie.factory = arguments.callee
})(window, function ie(elementOrCollection, include, exclude) {
  for(var i = 0, l = elementOrCollection.length;i != l;i++) {
    if(include) {
      ie[include].implement.apply(elementOrCollection[i])
    }
  }
  return elementOrCollection
}, {register:function ie_register(moduleName, definition) {
  if(DEBUG) {
    if(moduleName in this) {
      throw new Error("ie.define - module [" + moduleName + "] already defined");
    }
  }
  this[moduleName] = typeof definition == "function" ? definition(this) : definition;
  if(this.global && definition.publish) {
    definition.publish(this.scope)
  }
}, extend:function ie_extend(moduleName, definition) {
  var existingModule = this[moduleName], currentImplement = existingModule.implement, newImplement = definition.implement;
  existingModule.implement = function() {
    currentImplement.apply(this);
    newImplement.apply(this)
  }
}}, function ie_Helper() {
}, {createType:function ie_Helper_createType(BaseType, NewType, NewType_prototype) {
  var property;
  if(BaseType != Object) {
    NewType.prototype = new BaseType;
    NewType.prototype.constructor = NewType
  }
  for(property in NewType_prototype) {
    NewType.prototype[property] = NewType_prototype[property]
  }
}, createFastMapperFunction:function ie_Helper_createFastMapperFunction(object) {
  var membersToMap = [];
  for(var i in object) {
    membersToMap.push("t." + i + "=s." + i)
  }
  membersToMap.push("return t");
  return new Function("t", "s", membersToMap.join(";"))
}});

