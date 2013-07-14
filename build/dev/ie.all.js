/**
 * @license ieJS 
 * (c) 2013 Christian Bodart https://github.com/standardjs/ie
 * License: MIT
 *
 * @author Christian Bodart <christian.bodart@gmail.com>
 * @version 0.0
 *
**/
var DEBUG = true;

////////////////////////////////////
(function(scope, ie, ie_static, ie_Helper, ie_Helper_prototype) {
    ie.global = !(document.getElementById("standards.ie").getAttribute("data-global") == "false");
    scope.ie = ie;
    ie.scope = scope;
    for (var i in ie_static) {
        ie[i] = ie_static[i];
    }
    ie.helper = new ie_Helper();
    if (ie_Helper_prototype.createType) {
        ie_Helper_prototype.createType(Object, ie_Helper, ie_Helper_prototype);
    }
    ie.factory = arguments.callee;
})(window, /** public interface
    *   @param {HTMLElement|Array|Collection}
    *   @param {String|String[]} [include] - the modules (must be preloaded) to apply to the elements
    *   @param {String|String[]} [exclude] - modules to exclude from the call
    */
function ie(elementOrCollection, include, exclude) {
    for (var i = 0, l = elementOrCollection.length; i != l; i++) {
        if (include) {
            arguments.callee[include].implement.apply(elementOrCollection[i]);
        }
    }
    return elementOrCollection;
}, /**
    *   members of the (ie) public method
    */
{
    global: true,
    /**
         * registers a module with ie
         * @memberOf {ie}
         * @this {ie}
         * @param {String} a unique name for the module
         * @param {Object|Function}
         */
    register: function ie_register(moduleName, definition) {
        if (DEBUG) {
            if (moduleName in ie) {
                throw new Error("ie.define - module [" + moduleName + "] already defined");
            }
        }
        ie[moduleName] = typeof definition == "function" ? definition(this) : definition;
        if (ie.global && definition.publish) {
            definition.publish(ie.scope);
        }
    },
    /**
         * registers a module with ie
         * @this {ie}
         */
    extend: function ie_extend(moduleName, definition) {
        var existingModule = ie.helper[moduleName], currentImplement = existingModule.implement, newImplement = definition.implement;
        existingModule.implement = function ie_extend_implement() {
            currentImplement.apply(this);
            newImplement.apply(this);
        };
    }
}, /**
     * Constructor for the ie function to use as a helper
     * Accessible for extension/inheritance via ie.instance.constructor
     * @constructor
     * @class
     * @classdesc used to create all the helper methods of the ie function
     /**
     */
function ie_Helper() {}, {
    /**
         * Implements simple prototypical inheritance
         * @memberof! ie_Helper.prototype
         * @param {Constructor} - Constructor for the base type
         * @param {Constructor} - Constructor for the new type
         * @param {object} - properties for the prototype
         */
    createType: function ie_Helper_createType(BaseType, NewType, instance, statics, shared) {
        var property;
        if (BaseType != Object) {
            NewType.prototype = new BaseType();
            NewType.prototype.constructor = NewType;
        }
        for (property in instance) {
            NewType.prototype[property] = instance[property];
        }
        for (property in statics) {
            NewType[property] = statics[property];
        }
        for (property in shared) {
            NewType[property] = NewType.prototype[property] = shared[property];
        }
        return NewType;
    },
    createFastMapperFunction: function ie_Helper_createFastMapperFunction(object) {
        var membersToMap = [];
        for (var i in object) {
            membersToMap.push("t." + i + "=s." + i);
        }
        membersToMap.push("return t");
        return new Function("t", "s", membersToMap.join(";"));
    },
    functionIsNative: function ie_Helper_functionIsNative(func) {
        //firefox native constructors return as objects!
        return /^(\s*function[^\(]*\(\s*\)\s*\{\s*\[native code\]\s*\}\s*)|(\[\w+\s\w+\])$/.test(func);
    },
    /**
         * checks to see if an object is native (but doesn't work on all objects e.g. JSON)
         * @memberof! ie_Helper.prototype
         * @this {ie_Helper}
        */
    objectIsNative: function ie_Helper_objectIsNative(object) {
        switch (typeof object) {
          case "function":
            return this.functionIsNative(object);

          case "object":
            {
                //do the magic here
                if (!object.constructor) return true;
                if (object.constructor != Object && this.functionIsNative(object.constructor)) return true;
                return false;
            }

          default:
            return true;
        }
    }
});

(function(ie_DOMElements_constructor, ie_DOMElements_instance, definitions) {
    var namedConstructors = {}, createType = ie.helper.createType, definition, domElements;
    createType(Object, ie_DOMElements_constructor, ie_DOMElements_instance);
    for (var i = 0; i != definitions.length; i++) {
        definition = definitions[i];
        createType(namedConstructors[definition.parent] || Object, definition.constructor, definition.instance, definition.statics, definition.shared);
        namedConstructors[definition.name] = definition.constructor;
    }
    domElements = new ie_DOMElements_constructor();
    domElements.constructors = namedConstructors;
    ie.register("DOMElements", domElements);
    return domElements;
})(function ie_DOMElements() {}, {
    publish: function ie_domElements_publish() {
        var constructors = this.constructors;
        for (var i in constructors) {
            if (!window[i]) {
                window[i] = constructors[i];
            }
        }
    }
}, [ {
    name: "Node",
    constructor: function IENode() {},
    instance: {},
    statics: {},
    shared: {
        ATTRIBUTE_NODE: 2,
        CDATA_SECTION_NODE: 4,
        COMMENT_NODE: 8,
        DOCUMENT_FRAGMENT_NODE: 11,
        DOCUMENT_NODE: 9,
        DOCUMENT_POSITION_CONTAINED_BY: 16,
        DOCUMENT_POSITION_CONTAINS: 8,
        DOCUMENT_POSITION_DISCONNECTED: 1,
        DOCUMENT_POSITION_FOLLOWING: 4,
        DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32,
        DOCUMENT_POSITION_PRECEDING: 2,
        DOCUMENT_TYPE_NODE: 10,
        ELEMENT_NODE: 1,
        ENTITY_NODE: 6,
        ENTITY_REFERENCE_NODE: 5,
        NOTATION_NODE: 12,
        PROCESSING_INSTRUCTION_NODE: 7,
        TEXT_NODE: 3
    }
}, {
    name: "HTMLElement",
    parent: "Node",
    constructor: function IEHTMLElement() {},
    instance: {},
    statics: {}
} ]);