(function(){"use strict";var base=ViewControllerManager.findClass("ViewControllerNav");ViewControllerManager.newClassDef("ProfileVC",Class.create({_extends_:base,_init_:function(args){base.call(this,args);this.activeChild='btn_sign_in';this.helpText='';this.termsText='';this.aboutText='';},onLoad:function(){},render:function(location){this._super(location);if(settings.device==='lg'||settings.device==='webos'){$('#Profile').css('background-image','url("./css/assets/background.png")');}
this.setup();},setup:function(){Model.App.profileState='profile';Model.App.keyboardReturnTo='profile';var scope=this;if(Model.App.loggedIn){this._userLoggedIn();this.activeChild='btn_parental_controls';API.getTickets(function(res){Model.App.file.user.ticket_count=res.ticket_count;scope._populateFields();},function(res,errorCode){Model.App.errorCode=errorCode;scope.publish('Error');});}else{this._userLoggedOut();}
TVA.setFocus(this.activeChild);this._populateFields();Util.hideSpriteLoader();},onKeyDown:function(e,keyCode){TVA.log('keydown in profile');$('#backIcon').removeClass('active');if(Model.App.listen){switch(keyCode){case Keys.getBind("Circle"):case Keys.getBind("Back"):this.back(e);e.stopPropagation();break;case Keys.getBind("Left"):if(Model.App.profileState==='profile'){this.back(e);}
e.stopPropagation();break;case Keys.getBind("Right"):this._navigate("Right",e);e.stopPropagation();break;case Keys.getBind("Up"):this._navigate("Up",e);e.stopPropagation();break;case Keys.getBind("Down"):this._navigate("Down",e);e.stopPropagation();break;case Keys.getBind("Cross"):case Keys.getBind("Enter"):$('#'+TVA.onFocus).click();e.stopPropagation();break;}}},onHover:function(event){var home=ViewControllerManager.find('Home');home.hideSideMenu();var element=event.target.id;this._enableElement(element);},onUnload:function(){this._enableElement(this.activeChild);},back:function(e){$('#backIcon').removeClass('active');if(Model.App.profileState==="about"||Model.App.profileState==="help"||Model.App.profileState==="TandC"){$('#backIcon').text(language[Model.App.file.language].common.btn_menu);if(Model.App.loggedIn){$('#profileInfos').show();}
$('#profileButtons').show();$('.termsSupportScreen').hide();$('#profileTitle').html("Profile");if(Model.App.profileState==='TandC'){this._enableElement("btn_terms_conditions");}else if(Model.App.profileState==="about"){this._enableElement("btn_about");}else{this._enableElement("btn_help");}
Model.App.profileState='profile';$('#textField').empty();}else{var home=ViewControllerManager.find('Home');home.showSideMenu();home.children['mainMenu'].view.enable();home.navigation.mainMenu.Right='Profile';}},profileBtnClick:function(event){var scope=this;var Keyboard=ViewControllerManager.find('Keyboard');var RegisterHandler=ViewControllerManager.find('RegisterHandler');var Home=ViewControllerManager.find('Home');var ParentalControls=ViewControllerManager.find('ParentalControls');var Root=ViewControllerManager.find("Root");var ChooseLanguage=ViewControllerManager.find('ChooseLanguage');var SignInHandler=ViewControllerManager.find('SignInHandler');var focus=TVA.onFocus;TVA.offFocus(TVA.onFocus);var text;if(focus==="btn_parental_controls"){if(Model.App.loggedIn){scope.unload();scope.addChild(ParentalControls,'#screens');}else{Model.App.fromProfile=true;Model.App.fromMyMovies=false;Model.App.fromDetails=false;this.showSignIn();}}else if(focus==="btn_choose_language"){if(Model.App.loggedIn){this.hide();this.addChild(ChooseLanguage,'#screens');}else{Model.App.fromProfile=true;Model.App.fromMyMovies=false;Model.App.fromDetails=false;this.showSignIn();}}else if(focus==="btn_help"){this.addChild(ViewControllerManager.find("TextScroller"),scope.rootID+' .content');Model.App.profileState='help';if(Model.App.loggedIn){$('#profileInfos').hide();}
$('#profileButtons').hide();$('.termsSupportScreen').show();$('#profileTitle').html("Help");$('#backIcon').text(language[Model.App.file.language].common.btn_back);if(this.helpText===''){Util.showSpriteLoader();API.getHelpText(Model.App.file.language,function(data){text=this._textFormat(data,'help');this.helpText=text;ViewControllerManager.find("TextScroller").init('<p style="height: 100px;">'+text+'</p><p style="height: 100px;"></p>');Util.hideSpriteLoader();}.bind(this),function(res,errorCode){Model.App.errorCode=errorCode;home.publish('Error');});}else{ViewControllerManager.find("TextScroller").init('<p style="height: 100px;">'+this.helpText+'</p><p style="height: 100px;"></p>');}
ViewControllerManager.find("TextScroller").activeChild='arrow_scroll_down';TVA.setFocus('arrow_scroll_down');}else if(focus==="btn_about"){this.addChild(ViewControllerManager.find("TextScroller"),scope.rootID+' .content');Model.App.profileState='about';if(Model.App.loggedIn){$('#profileInfos').hide();}
$('#profileButtons').hide();$('.termsSupportScreen').show();$('#profileTitle').html("About");$('#backIcon').text(language[Model.App.file.language].common.btn_back);if(this.aboutText===''){Util.showSpriteLoader();API.getAboutText(Model.App.file.language,function(data){text=this._textFormat(data,'about');this.aboutText=text;ViewControllerManager.find("TextScroller").init('<p style="height: 100px;">'+text+'</p><p style="height: 100px;"></p>');Util.hideSpriteLoader();}.bind(this),function(res,errorCode){Model.App.errorCode=errorCode;home.publish('Error');});}else{ViewControllerManager.find("TextScroller").init('<p style="height: 100px;">'+this.aboutText+'</p><p style="height: 100px;"></p>');}
ViewControllerManager.find("TextScroller").activeChild='arrow_scroll_down';TVA.setFocus('arrow_scroll_down');}else if(focus==="btn_terms_conditions"){scope.addChild(ViewControllerManager.find("TextScroller"),scope.rootID+' .content');Model.App.profileState='TandC';if(Model.App.loggedIn){$('#profileInfos').hide();}
$('#profileButtons').hide();$('.termsSupportScreen').show();$('#profileTitle').html("Terms and Conditions");$('#backIcon').text(language[Model.App.file.language].common.btn_back);if(scope.termsText===''){Util.showSpriteLoader();API.getTermsText(Model.App.file.language,function(data){text=scope._textFormat(data,'terms');scope.termsText=text;API.getPrivacyText(Model.App.file.language,function(data){text+=scope._textFormat(data,'privacy');scope.privacyText=text;ViewControllerManager.find("TextScroller").init('<p style="height: 100px;">'+text+'</p><p style="height: 100px;"></p>');Util.hideSpriteLoader();},function(res,errorCode){Model.App.errorCode=errorCode;home.publish('Error');});},function(res,errorCode){Model.App.errorCode=errorCode;home.publish('Error');});}else{var aux=scope.termsText;aux+=scope.privacyText;ViewControllerManager.find("TextScroller").init('<p style="height: 100px;">'+aux+'</p><p style="height: 100px;"></p>');}
ViewControllerManager.find("TextScroller").activeChild='arrow_scroll_down';TVA.setFocus('arrow_scroll_down');}else if(focus==="btn_sign_in"){Model.App.fromProfile=true;Model.App.fromMyMovies=false;Model.App.fromDetails=false;this.showSignIn();}else if(focus==="btn_register"){Model.App.fromProfile=true;Model.App.fromMyMovies=false;Model.App.fromDetails=false;this.showRegister();}else if(focus==="btn_sign_out"){this._unpopulateInfoTable();Model.App.file.user={};Util.saveFile(Model.App.file);Model.App.loggedIn=false;this._userLoggedOut();this.activeChild='btn_sign_in';TVA.setFocus(this.activeChild);}},showRegister:function(){var Home=ViewControllerManager.find('Home');var Keyboard=ViewControllerManager.find('Keyboard');var RegisterHandler=ViewControllerManager.find('RegisterHandler');Model.App.profileState='register';this.publish('Keyboard');},showSignIn:function(){var Keyboard=ViewControllerManager.find('Keyboard');var Home=ViewControllerManager.find('Home');var SignInHandler=ViewControllerManager.find('SignInHandler');Model.App.profileState='signIn';this.publish('Keyboard');},_populateInfoTable:function(){var name=$('#profileClientName');var email=$('#profileClientEmail');var tickets=$('#profileClientTickets');name.html(Util.ellipseText(Model.App.file.user.user.fullname,35));email.html(Util.ellipseText(Model.App.file.user.user.email,35));tickets.html(Model.App.file.user.ticket_count);$('#profileInfos').show();},_unpopulateInfoTable:function(){var name=$('#profileClientName');var email=$('#profileClientEmail');var tickets=$('#profileClientTickets');name.html("");email.html("");tickets.html("");},_userLoggedIn:function(){$('#btn_sign_in').hide();$('#btn_register').hide();$('#btn_parental_controls').css({"margin-top":"50px"});$('#btn_sign_out').show();this._populateInfoTable();this.navigation={'btn_parental_controls':{Down:"btn_choose_language"},'btn_choose_language':{Up:"btn_parental_controls",Down:"btn_about"},'btn_about':{Up:"btn_choose_language",Down:"btn_help"},'btn_help':{Up:"btn_about",Down:"btn_terms_conditions"},'btn_terms_conditions':{Down:"btn_sign_out",Up:"btn_help"},'btn_sign_out':{Up:"btn_terms_conditions"}};},_userLoggedOut:function(){$('#btn_sign_in').show();$('#btn_register').show();$('#btn_parental_controls').css({"margin-top":"15px"});$('#profileInfos').hide();$('#btn_sign_out').hide();this.navigation={'btn_sign_in':{Down:"btn_register"},'btn_register':{Up:"btn_sign_in",Down:"btn_parental_controls"},'btn_parental_controls':{Up:"btn_register",Down:"btn_choose_language"},'btn_choose_language':{Up:"btn_parental_controls",Down:"btn_about"},'btn_about':{Up:"btn_choose_language",Down:"btn_help"},'btn_help':{Up:"btn_about",Down:"btn_terms_conditions"},'btn_terms_conditions':{Up:"btn_help"}};},_textFormat:function(infos,selector){var s='';var aux;if(selector==='help'){if(infos.help.length>0){for(var i=0;i<infos.help.length;i++){if(infos.help[i].type==='ul'||infos.help[i].type==='ol'){s+='<'+infos.help[i].type+'>';aux=infos.help[i].value;for(var j=0;j<aux.length;j++){s+='<li>'+infos.help[i].value[j]+'</li>';}
s+='</'+infos.help[i].type+'>';s+='<br>';}else{s+='<'+infos.help[i].type+'>'+infos.help[i].value+'</'+infos.help[i].type+'>';s+='<br>';}}}}else if(selector==='terms'){if(infos.terms.length>0){for(var k=0;k<infos.terms.length;k++){if(infos.terms[k].type==='ul'||infos.terms[k].type==='ol'){s+='<'+infos.terms[k].type+'>';aux=infos.terms[k].value;for(var w=0;w<aux.length;w++){s+='<li>'+infos.terms[k].value[w]+'</li>';}
s+='</'+infos.terms[k].type+'>';s+='<br>';}else{s+='<'+infos.terms[k].type+'>'+infos.terms[k].value+'</'+infos.terms[k].type+'>';s+='<br>';}}}}else if(selector==='privacy'){if(infos.privacy.length>0){for(var x=0;x<infos.privacy.length;x++){if(infos.privacy[x].type==='ul'||infos.privacy[x].type==='ol'){s+='<'+infos.privacy[x].type+'>';aux=infos.privacy[x].value;for(var z=0;z<aux.length;z++){s+='<li>'+infos.privacy[x].value[z]+'</li>';}
s+='</'+infos.privacy[x].type+'>';s+='<br>';}else{s+='<'+infos.privacy[x].type+'>'+infos.privacy[x].value+'</'+infos.privacy[x].type+'>';s+='<br>';}}}}else if(selector==='about'){if(infos.about.length>0){for(var c=0;c<infos.about.length;c++){if(infos.about[c].type==='ul'||infos.about[c].type==='ol'){s+='<'+infos.about[c].type+'>';aux=infos.about[c].value;for(var v=0;v<aux.length;v++){s+='<li>'+infos.about[c].value[v]+'</li>';}
s+='</'+infos.about[c].type+'>';s+='<br>';}else{s+='<'+infos.about[c].type+'>'+infos.about[c].value+'</'+infos.about[c].type+'>';s+='<br>';}}}}
return s;},_populateFields:function(){$('#profileTitle').text(language[Model.App.file.language].profileScreen.profile);$('#btn_sign_in').text(language[Model.App.file.language].profileScreen.signInButton);$('#btn_register').text(language[Model.App.file.language].profileScreen.registerButton);$('#btn_parental_controls').text(language[Model.App.file.language].profileScreen.parentalControlsButton);$('#btn_choose_language').text(language[Model.App.file.language].profileScreen.chooseLanguageButton);$('#btn_about').text(language[Model.App.file.language].profileScreen.aboutButton);$('#btn_help').text(language[Model.App.file.language].profileScreen.helpButton);$('#btn_terms_conditions').text(language[Model.App.file.language].profileScreen.termsConditionsButton);$('#btn_sign_out').text(language[Model.App.file.language].profileScreen.signOutButton);$('#profileName').text(language[Model.App.file.language].profileScreen.nameLabel);$('#profileEmail').text(language[Model.App.file.language].profileScreen.emailLabel);$('#profileTickets').text(language[Model.App.file.language].profileScreen.ticketsAvailableLabel);}}));})();