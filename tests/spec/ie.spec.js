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
    ie.factory(window,function newIE() {},{},function NewIEHelper(){},{createType: function(){}})
    expect(ie === tempIE).toBe(false);
    ie = tempIE;

  })
  it ("should be able to register modules", function () {
    ie.register("TestModule",
      function () {
        return {
          publish: function (scope) {
            scope.Tested = {}
          },
          implement: function () {
            this.tested = true;
          }
        }
      }
    );
    ie(elementArray,"TestModule")
    expect(elementArray[0].tested).toBe(true)

  });
  it("mapping function is the same as iteration", function () {
    var obj = {
      foo: "foo",
      Zoo: function () {},
      noo: {},
      loo: 1
    },
      iteratedObj = {};
    for (var i in obj) {
      iteratedObj[i] = obj[i];
    }
    
    function objectsAreTheSame(a,b) {
      for (var p in a) {
        if (a[p] !== b[p]) return false
      }
    for (p in b) {
        if (a[p] !== b[p]) return false
      }
    return true;

    }
    var mapper = ie.helper.createFastMapperFunction(obj),
        newObj = {},
        same = objectsAreTheSame(newObj,obj)
    expect(same).toBe(false,"objects should not have the same properties");
    mapper(newObj,obj);
    same = objectsAreTheSame(newObj,obj)
    expect(same).toBe(true,"objects don't have the same properties")

  });
  


});