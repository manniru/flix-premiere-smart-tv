(function(){"use strict";var base=ViewControllerManager.findClass("ViewControllerNav");ViewControllerManager.newClassDef("HMatrixVC",Class.create({_extends_:base,_init_:function(args){base.call(this,args);this.activeChild='Matrix_Element_main_Overlay';this.navigation={};this.pos=0;this.size=0;this.maxEl=3;this.activePos=0;this.offset=0;this.screenPadding=34;this.fastScroll=500;this.slowScroll=1000;this.scrollSpeed=null;},init:function(params)
{this.navigation=params.navigation;this.activeChild=params.activeChild;$(this.rootID+' .HMContainer').css('left','0px');},onUnload:function(){TVA.offFocus(TVA.onFocus);},render:function(location){this._super(location);this.enable();$('#AppContent').addClass(this.lastClass);},onKeyDown:function(e,keyCode){if(Model.App.listen)
{switch(keyCode)
{case Keys.getBind("Back"):break;case Keys.getBind("Up"):this.navDirection(e,"Up");break;case Keys.getBind("Down"):this.navDirection(e,"Down");break;case Keys.getBind("Left"):this.navDirection(e,"Left");break;case Keys.getBind("Right"):this.navDirection(e,"Right");break;case Keys.getBind("Enter"):$('#'+TVA.onFocus).click();break;case Keys.getBind("Cross"):$('#'+TVA.onFocus).click();e.stopPropagation();break;}}},_nextItem:function(direction)
{if(Model.App.listen)
{var nextChild=this.navigation[this.activeChild][direction];this.isElementOffscreen(nextChild);if(this.activeChild==='V_Carousel_Item_pos_2_Overlay'){this.offset++;}else{TVA.setFocus(nextChild);this.activeChild=nextChild;}
}},navDirection:function(e,direction)
{if(this.navigation[this.activeChild][direction]){this._nextItem(direction);e.stopPropagation();}
else
{this.isElementOffscreen(this.activeChild);}},onHover:function(event)
{$('.Arrow').removeClass('arrowHover');if($('#'+event.target.id).hasClass('Arrow'))
{$('#'+event.target.id).addClass('arrowHover');}
else
{this._enableElement(event.target.id);}
event.stopPropagation();},_setChannelIndex:function(index)
{Model.updateModel('ChannelContent',{channelIndex:index});},clickEvent:function(e){},isElementOffscreen:function(element,autoScroll)
{var matrixLeft=$(this.rootID+' .HMContainer').position().left+this.screenPadding;var pos=$('#'+element).parent().position();var width=$('#'+element).width();var scrollAmount=0;var scroll=autoScroll||true;var x=pos.left+matrixLeft;var s=element.match(/radar/gi)?element.match(/radar/gi)[0]:element.match(/radar/gi);if(s==='radar')
{this.scrollSpeed=this.slowScroll;}
else{this.scrollSpeed=this.fastScroll;}
if(x<this.screenPadding)
{if(scroll)
{this.scrollRight(Math.abs(x)+this.screenPadding);}
return true;}
else if((x+width)>(1280-this.screenPadding))
{scrollAmount=(x+width)-(1280-this.screenPadding);if(scroll)
{this.scrollLeft(scrollAmount);}
return true;}
else
{return false;}},scrollLeft:function(scrollAmount)
{this.scroll(-1,scrollAmount);},scrollRight:function(scrollAmount)
{this.scroll(1,scrollAmount);},scroll:function(direction,distance)
{Model.App.listen=false;var scope=this;var dx=(distance||53)*direction;var x=$(this.rootID+' .HMContainer').position().left;var newPos=(dx+x)+'px';var cssProps={left:newPos};var animProps={duration:scope.scrollSpeed,easing:'linear',step:function(a){var x=$(scope.rootID+' .HMContainer').position().left;var sizedef=VideoController.videoSizes.home;sizedef.x=(x+34)+$(scope.rootID+' #matrix_element_live').position().left;VideoController._changeSize(sizedef);$('#player_controls').css('left',$(scope.rootID+' .HMContainer').position().left+1010);},complete:function(){$('#player_controls').css('left',$(scope.rootID+' .HMContainer').position().left+1010);Model.App.listen=true;var x=$(scope.rootID+' .HMContainer').position().left;var sizedef=VideoController.videoSizes.home;sizedef.x=(x+34)+$(scope.rootID+' #matrix_element_live').position().left;VideoController._changeSize(sizedef);}};$(this.rootID+' .HMContainer').animate(cssProps,animProps);}}));})();