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
(
/**
 * factory method for ie
 * @name (anonymous)
 * @function 
 * @param scope - the window object
 * @param ie - the core function
 * @param ie_Helper - the helper type for ie
 * @param ie_Helper_prototype - the properties for the prototype
 */
function (scope, ie, ie_static, ie_Helper, ie_Helper_prototype) {
    
    scope.ie = ie;
    ie.scope = scope;
    for (var i in ie_static) {
        ie[i] = ie_static[i];
    }

    ie.helper = new ie_Helper();


    if (ie_Helper_prototype.createType) {
        ie_Helper_prototype.createType(Object, ie_Helper, ie_Helper_prototype); //implement inheritance
    }
    ie.factory = arguments.callee;    
})(

    window,

    /** public interface
    *   @param {HTMLElement|Array|Collection}
    */

    function ie(elementOrCollection, include, exclude) {
        for (var i=0,l=elementOrCollection.length; i!=l;i++) {
            if (include) {
                ie[include].implement(elementOrCollection[i])
            };
        }
        return elementOrCollection;
    },

    /**
    *
    */
    { 
        /**
         * registers a module with ie
         * @this {ie}
         */
        register: function ie_register(moduleName, definition) {
            if (DEBUG) {
                if (moduleName in this) {
                    throw new Error('ie.define - module ['+moduleName+'] already defined');
                }
            }
            this[moduleName] = typeof definition == "function" ? definition(this) : definition;
            if (this.global && definition.publish) {
                definition.publish(this.scope);
            }
        }
    },


    /**
     * Constructor for the ie function to use as a helper
     * Accessible for extension/inheritance via ie.instance.constructor
     * @constructor
     * @class
     * @classdesc used to create all the helper methods of the ie function
     /**
     */
    function ie_Helper() {},

    {
        /**
         * Implements simple prototypical inheritance
         * @memberof! ie_Helper.prototype
         * @param {Constructor} - Constructor for the base type
         * @param {Constructor} - Constructor for the new type
         * @param {object} - properties for the prototype
         */
        createType: function ie_Helper_createType(BaseType, NewType, NewType_prototype) {
            var property;
            if (BaseType != Object) {   
                NewType.prototype = new BaseType();
                NewType.prototype.constructor = NewType;
            }
            for (property in NewType_prototype) {
                NewType.prototype[property] = NewType_prototype[property]; 
            }
        }

    }
);