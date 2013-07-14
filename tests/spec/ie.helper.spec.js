describe("ie helper tests", function() {
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
it("native functions detection", function () {
    var native = Date,
        nonNative = function () {},
        tricky = function () {'[native code]'}

    expect(ie.helper.functionIsNative(native)).toBe(true,"Date constructor should be detected as native");
    expect(ie.helper.functionIsNative(nonNative)).toBe(false,"scripted function should not be considered native");
    expect(ie.helper.functionIsNative(tricky)).toBe(false,"can we be fooled?");
})
it("native objects detection", function () {
    var native = window,
        literal = {},
        typed = new (function () {})(),
        func = function(){};
      expect(ie.helper.objectIsNative(native)).toBe(true,"window object should be detected as native");
      expect(ie.helper.objectIsNative(literal)).toBe(false,"literal should not be");
      expect(ie.helper.objectIsNative(typed)).toBe(false,"nor should an instance");
      expect(ie.helper.objectIsNative(func)).toBe(false,"just checking!");
      expect(ie.helper.objectIsNative(1)).toBe(true,"just checking!");
      expect(ie.helper.objectIsNative()).toBe(true,"just checking!");
      expect(ie.helper.objectIsNative(JSON)).toBe(false,"this should fail in IE");//fails in everything!
  });

});
