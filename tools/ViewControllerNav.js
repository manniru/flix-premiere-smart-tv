(function(){"use strict";ViewControllerManager.newClassDef("ViewControllerNav",Class.create({_extends_:ViewController,_init_:function(args){ViewController.call(this,args);this.activeChild=null;this.navigation={};},render:function(location)
{this._super(location);},_enableElement:function(element)
{if(this.children[element])this.children[element].view.enable();else if($(this.rootID).find('#'+element).length)
{TVA.setFocus(element);this.activeChild=element;if(this.template==='Grid')
{this.activateParent();}}},_navigate:function(direction,e)
{var nextChild=this.navigation[this.activeChild][direction];if(nextChild){this._enableElement(nextChild);e.stopPropagation();}},setActiveChild:function(childName)
{this.activeChild=childName;if(this.parentVC&&this.parentVC.setActiveChild)this.parentVC.setActiveChild(this.name);},enable:function()
{this.show();this._enableElement(this.activeChild);if(this.parentVC&&this.parentVC.setActiveChild)this.parentVC.setActiveChild(this.name);}}));})();