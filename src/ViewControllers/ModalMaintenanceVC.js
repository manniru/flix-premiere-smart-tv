(function(){"use strict";var base=ViewControllerManager.findClass("ViewControllerNav");ViewControllerManager.newClassDef("ModalMaintenanceVC",Class.create({_extends_:base,_init_:function(args){base.call(this,args);this.activeChild='btn_goBack';this.navigation={'btn_goBack':{}};},onLoad:function(){$('#ModalContent').addClass('moveUp');var scope=this;$('#Header').hide();},onUnload:function(){$('#ModalContent').removeClass('moveUp');},render:function(location){this._super(location);this.enable();$('#popup_description').html();if(Model.App.file&&Model.App.file.language&&language[Model.App.file.language]){$(this.rootID+' #popup_description').html(language[Model.App.file.language].error.offline);$(this.rootID+' #btn_goBack').html(language[Model.App.file.language].common.btn_exit);}else{$(this.rootID+' #popup_description').html('Our Smart TV is currently under maintenance. Please visit our website www.flixpremiere.com or download our Android or iOS apps to access your favorite content.');$(this.rootID+' #btn_goBack').html('Exit');}},onKeyDown:function(e,keyCode){TVA.log('keydown in '+this.name);$('.hoveritemBack').removeClass('active');if(Model.App.listen){switch(keyCode){case Keys.getBind("Circle"):case Keys.getBind("Back"):this.exitApp();e.stopPropagation();break;case Keys.getBind("Up"):this._navigate("Up",e);e.stopPropagation();break;case Keys.getBind("Down"):this._navigate("Down",e);e.stopPropagation();break;case Keys.getBind("Left"):this._navigate("Left",e);e.stopPropagation();break;case Keys.getBind("Right"):this._navigate("Right",e);e.stopPropagation();break;case Keys.getBind("Cross"):case Keys.getBind("Enter"):$('#'+TVA.onFocus).click();break;}}},exitApp:function(){if(settings.device==='chrome'){location.reload();}else if(settings.device==='samsung_tizen'){TVA.quit();}else{TVA.quit(true);}},onMouseLeave:function(e){$('#'+e.target.id).removeClass('active');},onBackHover:function(e){$('#'+e.target.id).addClass('active');},onHover:function(event){if(event.target.className==='btn_overlay hoveritem'){this._enableElement(event.target.parentElement.id);}}}));})();