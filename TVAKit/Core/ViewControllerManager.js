var ViewControllerManager=(function(){var ViewControllerManager=function(){this.ViewControllers={};this.__TemplateLoader=new Template();this.__classDefinitions={};};ViewControllerManager.prototype={newClassDef:function(name,classDef){if(this.__classDefinitions.hasOwnProperty(name)){return;}
if(typeof classDef=="object"){$base=classDef._extends_;if(typeof $base=="string"){if(this.__classDefinitions.hasOwnProperty($base)){$base=this.__classDefinitions[$base];}}
if(!$base){$base=ViewController;}
classDef._extends_=$base;if(classDef._init_){classDef.___lostinit=classDef._init_;classDef._init_=(function(bs){return function(){bs.call(this,arguments[0]);classDef.___lostinit(arguments[0]);};})($base);}else if(classDef._extends_){classDef._init_=(function(bs){return function(){bs.call(this,arguments[0]);};}($base));}
this.__classDefinitions[name]=Class.create(classDef);}
else
this.__classDefinitions[name]=classDef;},create:function(classDef,args){if(!this.__classDefinitions.hasOwnProperty(classDef)){return null;}
var name=args.name||args.template;if(this.ViewControllers.hasOwnProperty(name)){return this.ViewControllers[name];}
args.engine=this.__TemplateLoader;var vc=new this.__classDefinitions[classDef](args);vc.load();this.ViewControllers[name]=vc;return this.ViewControllers[name];},find:function(name){if(this.ViewControllers.hasOwnProperty(name)){return this.ViewControllers[name];}
return null;},findClass:function(name){if(this.__classDefinitions.hasOwnProperty(name)){return this.__classDefinitions[name];}
return null;},unload:function(name){this.ViewControllers[name].unload();this.ViewControllers[name]=undefined;},clone:function(sourceVC,newVC){sourceVC=this.find(sourceVC);var cloneVC=newVC||sourceVC.name+'_clone_'+new Date().getTime();var events={};for(var event in sourceVC.viewEvents)
{if(sourceVC.viewEvents.hasOwnProperty(event))
{var obj=sourceVC.viewEvents[event];events[event]=[];for(var i in obj)
{if(obj.hasOwnProperty(i))
{if(event==='tvaKey')
{events[event][i]='#'+cloneVC+', '+obj[i].callback;}
else
{events[event][i]=obj[i].element+', '+obj[i].callback;}}}}}
var args={name:cloneVC,template:sourceVC.template,events:events};var vc=this.create(sourceVC.name+'VC',args);vc.rootID='#'+cloneVC;vc.cloned=true;return vc;}};return new ViewControllerManager();})();