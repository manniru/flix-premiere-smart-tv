var Class=(function(){"use strict";function ClassDef(){}
ClassDef.prototype={create:function(){var argsL=arguments.length,nsPath=null,cData={},data;if(argsL===1){cData=arguments[0];}else if(argsL===2){nsPath=arguments[0];cData=arguments[1];}else{}
data=this._getData(cData);var constructor=(data._super===null)?this._defineClass(data._constructor,data._methods,data._statics):this._defineSubclass(data._super,data._constructor,data._methods,data._statics);if(argsL===2){NS.addClass(nsPath,constructor);}
return constructor;},_getData:function(obj){var data={};if(obj===undefined||obj===null){obj={};}
if(obj.hasOwnProperty("_init_")){data._constructor=obj._init_;delete obj._init_;}else{data._constructor=function(){};}
if(obj.hasOwnProperty("_static_")){data._statics=obj._static_;delete obj._static_;}else{data._statics=null;}
if(obj.hasOwnProperty("_extends_")){data._super=obj._extends_;delete obj._extends_;}else{data._super=null;}
data._methods=obj;return data;},_defineClass:function(constructor,methods,statics){if(methods){this._extend(constructor.prototype,methods);}
if(statics){this._extend(constructor,statics);}
return constructor;},_defineSubclass:function(superclass,constructor,methods,statics){constructor.prototype=this._inherit(superclass.prototype);constructor.prototype.constructor=constructor;if(methods){this._extend(constructor.prototype,methods,{_super:superclass.prototype});}
if(statics){this._extend(constructor,statics);}
return constructor;},_inherit:function(prototype){if(prototype===null){throw new TypeError();}
if(Object.create){return Object.create(prototype);}
var t=typeof prototype;if(t!=="object"&&t!=="function"){throw new TypeError();}
function NewClass(){}
NewClass.prototype=prototype;return new NewClass();},_extend:(function(){return function extend(o){var argLenght=arguments.length,superClass=null;if(arguments[argLenght-1].hasOwnProperty("_super")){superClass=arguments[argLenght-1]._super;argLenght-=1;}
for(var i=1;i<argLenght;i++){var source=arguments[i];for(var prop in source){if(superClass!==null&&typeof source[prop]==="function"&&superClass.hasOwnProperty(prop)){o[prop]=(function(name,prop){return function(){var tmp=this._super;this._super=superClass[name];var ret=prop.apply(this,arguments);this._super=tmp;return ret;}})(prop,source[prop]);}else{o[prop]=source[prop];}}}
return o;};}())};return new ClassDef();})();