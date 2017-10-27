(function(){"use strict";ViewControllerManager.newClassDef("ModalVC",Class.create({_extends_:ViewController,_init_:function(args){ViewController.call(this,args);this.modalStack=[];this.stackIgnore=[];this.hidden=true;this._previousFocus=null;},onKeyDown:function(e,keyEvent){e.stopPropagation();},_replace:function(name){for(var c in this.children){if(this.children.hasOwnProperty(c)){TVA.offFocus(TVA.onFocus);this.removeChild(c);}}
if(this.hidden){this._previousFocus=TVA.onFocus;}
var vc=ViewControllerManager.find(name);this.addChild(vc,"#ModalContent");this.show();var tmp=true;for(var i=0;i<this.modalStack.length;i+=1)
if(name===this.modalStack[i])
tmp=false;if(tmp){this.modalStack.push(name);}
this.hidden=false;if(vc.onVisible){vc.onVisible();}},previousElementName:function(){if(this.modalStack.length<=0){return null;}else if(this.modalStack.length===1){return this.modalStack[0];}else{return this.modalStack[this.modalStack.length-2];}},backToPrevious:function(rec){if(this.modalStack.length<=0){this.hide();return;}
if(!rec){this.unloadCurrentChild();}
var name=this.modalStack.pop();if(name===undefined){this.hide();return;}
if(this.stackIgnore.lastIndexOf(name)>=0){this.backToPrevious(true);}else{this._replace(name);}},unloadCurrentChild:function(){TVA.offFocus(TVA.onFocus);var currentChild=this.modalStack.pop();this.removeChild(currentChild.name);},hide:function(setFocus){this._unloadChildren();this.modalStack=[];if(setFocus!==true){var self=this;if(settings.device==='googletv'){setTimeout(function(){TVA.setFocus(self._previousFocus);},500);}else{TVA.setFocus(self._previousFocus);}}
this.hidden=true;this._super();}}));})();