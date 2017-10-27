(function(){"use strict";var base=ViewControllerManager.findClass("ViewControllerNav");ViewControllerManager.newClassDef("HorizontalCarouselVC",Class.create({_extends_:base,_init_:function(args){base.call(this,args);this.activeChild='H_Carousel_Item_pos_0_Overlay';this.navigation={};this.pos=0;this.size=0;this.maxEl=3;this.activePos=0;this.offset=0;this.images=[];this.text=[];this.contents=[];this.screenPadding=0;this.carouselIndex='';},init:function(params)
{this.screenPadding=params.padding||0;this.contents=params.contents||[];this.offset=0;this.size=params.contents.length;this.maxEl=this.size;this.carouselIndex=this.name.replace('HorizontalCarousel','');this.activeChild='H_Carousel'+this.carouselIndex+'_Item_pos_0_Overlay';for(var i=0;i<this.maxEl;i++)
{if(i===0)
{if(this.size>1)
{this.navigation['H_Carousel'+this.carouselIndex+'_Item_pos_'+i+'_Overlay']={Right:'H_Carousel'+this.carouselIndex+'_Item_pos_'+(i+1)+'_Overlay'};}
else
{this.navigation['H_Carousel'+this.carouselIndex+'_Item_pos_'+i+'_Overlay']={};}}
else if(i===this.maxEl-1&&i!=0)
{this.navigation['H_Carousel'+this.carouselIndex+'_Item_pos_'+i+'_Overlay']={Left:'H_Carousel'+this.carouselIndex+'_Item_pos_'+(i-1)+'_Overlay',Right:'H_Carousel'+this.carouselIndex+'_Item_pos_'+i+'_Overlay'};}
else
{this.navigation['H_Carousel'+this.carouselIndex+'_Item_pos_'+i+'_Overlay']={Left:'H_Carousel'+this.carouselIndex+'_Item_pos_'+(i-1)+'_Overlay',Right:'H_Carousel'+this.carouselIndex+'_Item_pos_'+(i+1)+'_Overlay'};}}
this.updateCarousel();$('#HC_Container').css({left:this.screenPadding});this.enable();},onUnload:function(){this.pos=0;this.images=[];this.text=[];this.contents=[];TVA.offFocus(TVA.onFocus);},onLoad:function(){this.images=[];this.text=[];this.pos=0;this.contents=[];this.activeChild='H_Carousel_Item_pos_0_Overlay';this.clickEvent=null;},render:function(location){this._super(location);this.enable();this.reset();},onKeyDown:function(e,keyCode){if(Model.App.listen)
{switch(keyCode)
{case Keys.getBind("Back"):break;case Keys.getBind("Up"):this._navigate('Up',e);break;case Keys.getBind("Down"):this._navigate('Down',e);break;case Keys.getBind("Left"):this.navLeftElement(e);break;case Keys.getBind("Right"):this.navRightElement(e);break;case Keys.getBind("Enter"):$('#'+TVA.onFocus).click();e.stopPropagation();break;case Keys.getBind("Cross"):$('#'+TVA.onFocus).click();e.stopPropagation();break;}}},_navigate:function(direction,e)
{var nextChild=this.navigation[this.activeChild][direction];if(nextChild&&this.children[nextChild])
{this.children[nextChild].view.enable();e.stopPropagation();}
else if($(this.rootID).find('#'+nextChild).length)
{TVA.setFocus(nextChild);this.activeChild=nextChild;e.stopPropagation();}},_prevItem:function(e)
{var prevChild=this.navigation[this.activeChild]["Left"];if(prevChild)
{if(this.pos>0){this.pos--;}
if(this.isElementObscured(prevChild))
{this.offset--;if(this.offset<0)
{this.offset=0;}
this._navigate("Left",e);e.stopPropagation();}
else
{TVA.setFocus(prevChild);this.activeChild=prevChild;}}
},_nextItem:function(e)
{var nextChild=this.navigation[this.activeChild]["Right"];if(nextChild)
{if(this.pos<this.size-1){this.pos++;}
if(this.isElementObscured(nextChild))
{this.offset++;this._navigate("Right",e);e.stopPropagation();}
else
{TVA.setFocus(nextChild);this.activeChild=nextChild;}}
},navLeftElement:function(e)
{if(Model.App.listen){this._prevItem(e);}},navRightElement:function(e)
{if(Model.App.listen){this._nextItem(e);}},updateCarousel:function(){var maxCarouselElements=this.size;for(var i=0;i<maxCarouselElements;i++)
{var index=i+this.offset;$(this.rootID+' #H_Carousel_Item_pos_'+i+' .content').html('');if(this.contents[index])
{var content=this.contents[index].content||'';if($(this.rootID+' #H_Carousel'+this.carouselIndex+'_Item_pos_'+i)[0])
{$(this.rootID+' #H_Carousel'+this.carouselIndex+'_Item_pos_'+i+' .content').html(content);}
else{var el='<div id="H_Carousel'+this.carouselIndex+'_Item_pos_'+i+'" class="carouselElement"><div class="content"></div><div id="H_Carousel'+this.carouselIndex+'_Item_pos_'+i+'_Overlay" class="Carousel_Item_Overlay hoveritem"></div></div>';$(this.rootID+' #HC_Container').append(el);$(this.rootID+' #H_Carousel'+this.carouselIndex+'_Item_pos_'+i+' .content').html(content);var width=($(this.rootID+' #H_Carousel'+this.carouselIndex+'_Item_pos_'+i).width()+6)*i;if($(this.rootID+' #H_Carousel'+this.carouselIndex+'_Item_pos_'+i).position().left===0)
{$(this.rootID+' #H_Carousel'+this.carouselIndex+'_Item_pos_'+i).css({left:width});}}}}},onHover:function(event)
{var element=event.target.id;element=element.replace('_Overlay','');element=element.replace('H_Carousel_Item_pos_','');this._setCarouselIndex(parseInt(element));this._enableElement(event.target.id);event.stopPropagation();},_setCarouselIndex:function(index)
{this.pos=this.offset+index;},clickEvent:function(){},scrollLeft:function(scrollAmount)
{this.scroll(-1,scrollAmount);},scrollRight:function(scrollAmount)
{this.scroll(1,scrollAmount);},scroll:function(direction,distance)
{Model.App.listen=false;var scope=this;var dx=(distance||53)*direction;var x=$(this.rootID+' #HC_Container').position().left;var newPos=(dx+x)+'px';var animCSS={left:newPos};var animProps={duration:500,step:function(a,b){},complete:function(){Model.App.listen=true;}};$(this.rootID+' #HC_Container').animate(animCSS,animProps);},isElementObscured:function(overlayElement,autoScroll)
{var matrixLeft=$(this.rootID+' #HC_Container').position().left;var pos=$('#'+overlayElement).parent().position();var width=$('#'+overlayElement).width();var scrollAmount=0;var scroll=autoScroll||true;var x=pos.left+matrixLeft;if(x<($(this.rootID).position().left+this.screenPadding))
{if(scroll)
{var dX=Math.abs(x)+this.screenPadding;this.scrollRight(dX);}
return true;}
else if((x+width)>($(this.rootID).position().left+$(this.rootID).width())-this.screenPadding)
{scrollAmount=(x+width)-(1280-this.screenPadding);if(scroll)
{this.scrollLeft(scrollAmount);}
return true;}
else
{return false;}},HC_ClickEvent:function(){},reset:function()
{$(this.rootID+' #HC_Container').html('');}}));})();