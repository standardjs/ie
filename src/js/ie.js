/**
 * @license ieJS 
 * (c) 2013 Christian Bodart https://github.com/standardjs/ie
 * License: MIT
 *
 * @author Christian Bodart <christian.bodart@gmail.com>
 * @version 0.0
 *
**/

/**@ignore**/
var DEBUG = true;

////////////////////////////////////
(
/**@ignore**/
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

    /** public method
    *   @param {HTMLElement|Array|Collection}
    *   @param {String|String[]} [include] - the modules (must be preloaded) to apply to the elements
    *   @param {String|String[]} [exclude] - modules to exclude from the call
    */

    function ie(elementOrCollection, include, exclude) {
        for (var i=0,l=elementOrCollection.length; i!=l;i++) {
            if (include) {
                ie[include].implement.apply(elementOrCollection[i])
            };
        }
        return elementOrCollection;
    },

    /**
    *   members of the (ie) public method
    */
    { 
        /**
         * registers a module with ie
         * @memberOf {ie}
         * @this {ie}
         * @param {String} a unique name for the module
         * @param {Object|Function}
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
        },
        /**
         * registers a module with ie
         * @this {ie}
         */
        extend: function ie_extend(moduleName,definition) {
            var existingModule = this[moduleName],
                currentImplement = existingModule.implement,
                newImplement = definition.implement;
            existingModule.implement = function () {
                currentImplement.apply(this);
                newImplement.apply(this);
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
        },
        createFastMapperFunction: function ie_Helper_createFastMapperFunction(object) {
            var membersToMap = [];
            for (var i in object) {
                membersToMap.push("t."+i+"=s."+i);
            }
            membersToMap.push('return t')
            return new Function("t","s",membersToMap.join(";"))
        }

    }
);