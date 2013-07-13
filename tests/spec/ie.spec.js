describe("ie global tests", function() {
  var elementArray,
    results,
    arrayLength
  beforeEach(function () {
    elementArray = [document.createElement("div"),document.createElement("span")];
    arrayLength = elementArray.length;
    results = ie(elementArray);
  })
   
  it("should be a global function", function () {
    expect(typeof ie == "function").toBe(true)
  })
  it("the factory method should not be in global scope", function () {
    expect(typeof ie$factory == "undefined").toBe(true)

  })
  it("should return the same object as it is passed", function() {
    expect(results === elementArray).toBe(true)
  })
  it("should not modify the collection's length", function () {
    expect(arrayLength).toEqual(results.length)
  })
  it("should provide access to its helper object", function () {
    expect(typeof ie.helper == "object").toBe(true)
  })
  it("You should be able to redefine ie completely", function () {
    var tempIE = ie;
    ie.factory(window,function newIE() {},function NewIEHelper(){},{createType: function(){}})
    expect(ie === tempIE).toBe(false);
    ie = tempIE;

  })
  


});