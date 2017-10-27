(function(){"use strict";var base=ViewControllerManager.findClass("ViewControllerNav");ViewControllerManager.newClassDef("ModalCreditCardMenuVC",Class.create({_extends_:base,_init_:function(args){base.call(this,args);this.activeChild='btnSignIn';this.navigation={btnSignIn:{Down:'btnRegister'},btnRegister:{Up:'btnSignIn'}};},onLoad:function(){},onUnload:function(){},render:function(location){this._super(location);var Keyboard=ViewControllerManager.find('Keyboard');var Home=this;Home.addChild(ViewControllerManager.find("CreditCardMenu"),'#ModalCreditCardMenu');Home.activeChild=ViewControllerManager.find("CreditCardMenu");},onKeyDown:function(e,keyCode){TVA.log('keydown in '+this.name);if(Model.App.listen){switch(keyCode){case Keys.getBind("Circle"):case Keys.getBind("Back"):this.onClose();e.stopPropagation();break;case Keys.getBind("Exit"):e.stopPropagation();break;case Keys.getBind("Up"):this._navigate("Up",e);e.stopPropagation();break;case Keys.getBind("Down"):this._navigate("Down",e);e.stopPropagation();break;case Keys.getBind("Left"):this._navigate("Left",e);e.stopPropagation();break;case Keys.getBind("Right"):this._navigate("Right",e);e.stopPropagation();break;case Keys.getBind("Cross"):case Keys.getBind("Enter"):$('#'+TVA.onFocus).click();break;}}},_navigate:function(direction,e){var nextChild=this.navigation[this.activeChild][direction];if(nextChild&&this.children[nextChild]){this.children[nextChild].view.enable();e.stopPropagation();}else if($(this.rootID).find('#'+nextChild).length){TVA.setFocus(nextChild);this.activeChild=nextChild;e.stopPropagation();}},onClose:function(){var scope=this;$(this.rootID+' .active').removeClass('active');scope.parentVC.backToPrevious();},onHover:function(e){},onMouseLeave:function(e){$('#'+e.target.id).removeClass('active');},onBackHover:function(e){$('#'+e.target.id).addClass('active');},btnClick:function(e){}}));})();