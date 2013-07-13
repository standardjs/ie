/**
 * @license ieJS v1.0.7
 * (c) 2013 Christian Bodart https://github.com/standardjs/ie
 * License: MIT
 *
 * @author Christian Bodart <christian.bodart@gmail.com>
 * @version 0.0
 *
**/



////////////////////////////////////



/**
 * factory method for ie
 * @param {object} scope - window object
 * @param {constructor} Helper - constructs the helper object
 * @param {object} helperProperties - properties to be copied to the prototype of the Helper
 */
(function (scope, ie, Helper, helperProperties) {
    

    scope.ie = ie;

    ie.helper = new Helper();


    if (helperProperties.createType) {
        helperProperties.createType(Object, Helper, helperProperties); //implement inheritance
    }
    ie.factory = arguments.callee;    
})(

    window,

    /** The global method **/
    function ie(elementOrCollection, include, exclude) {
        return elementOrCollection;
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
         * Helper function for simple prototypical inheritance
         * @param BaseType - Constructor for the base type
         * @param NewType - 
         */
        createType: function ie_Helper_createType(BaseType, NewType, prototype) {
            var property;
            if (BaseType != Object) {   
                NewType.prototype = new BaseType();
                NewType.prototype.constructor = NewType;
            }
            for (property in prototype) {
                NewType.prototype[property] = prototype[property]; 
            }
        }

    }
);