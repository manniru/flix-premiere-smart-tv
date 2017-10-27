(function(){"use strict";var base=ViewControllerManager.findClass("ViewControllerNav");ViewControllerManager.newClassDef("VCheckBoxListVC",Class.create({_extends_:base,_init_:function(args){base.call(this,args);this.activeChild='VCheckBox_Item_0_Overlay';this.navigation={VCheckBox_Item_0_Overlay:{Down:'VCheckBox_Item_1_Overlay'},VCheckBox_Item_1_Overlay:{Up:'VCheckBox_Item_0_Overlay'}};this.pos=0;this.size=0;this.maxEl=2;this.activePos=0;this.offset=0;this.images=[];this.text=[];this.contents=[];},init:function(params)
{this.contents=params.contents||[];this.maxEl=params.length;this.size=params.contents.length;for(var i=0;i<this.maxEl;i++)
{if(i===0)
{if(this.size>1)
{this.navigation['V_Carousel_Item_pos_'+i+'_Overlay']={Down:'V_Carousel_Item_pos_'+(i+1)+'_Overlay'};}
else
{this.navigation['V_Carousel_Item_pos_'+i+'_Overlay']={};}}
else if(i===this.maxEl-1&&i!=0)
{this.navigation['V_Carousel_Item_pos_'+i+'_Overlay']={Up:'V_Carousel_Item_pos_'+(i-1)+'_Overlay',Down:'V_Carousel_Item_pos_'+i+'_Overlay'};}
else
{var nav={Up:'V_Carousel_Item_pos_'+(i-1)+'_Overlay',Down:'V_Carousel_Item_pos_'+(i+1)+'_Overlay'};this.navigation['V_Carousel_Item_pos_'+i+'_Overlay']=nav;}}},onUnload:function(){this.pos=0;this.images=[];this.text=[];this.contents=[];TVA.offFocus(TVA.onFocus);},onLoad:function(){this._loadVC();},_loadVC:function(){this.images=[];this.text=[];this.pos=0;this.contents=Model.TemperatureUnits;this.activeChild='VCheckBox_Item_0_Overlay';this.size=2;},render:function(location){this._super(location);this.enable();this.setChecked();},onKeyDown:function(e,keyCode){switch(keyCode)
{case Keys.getBind("Back"):break;case Keys.getBind("Up"):this.navUpElement(e);break;case Keys.getBind("Down"):this.navDownElement(e);break;case Keys.getBind("Left"):this._navigate('Left',e);break;case Keys.getBind("Right"):this._navigate('Right',e);break;case Keys.getBind("Enter"):$('#'+TVA.onFocus).click();e.stopPropagation();break;case Keys.getBind("Cross"):$('#'+TVA.onFocus).click();e.stopPropagation();break;}},_navigate:function(direction,e)
{var nextChild=this.navigation[this.activeChild][direction];if(nextChild&&this.children[nextChild])
{this.children[nextChild].view.enable();e.stopPropagation();}
else if($(this.rootID).find('#'+nextChild).length)
{TVA.setFocus(nextChild);this.activeChild=nextChild;e.stopPropagation();}},_prevItem:function()
{var prevChild=this.navigation[this.activeChild]["Up"];if(this.pos>0){this.pos--;}
if(this.activeChild==='VCheckBox_Item_0_Overlay'){this.offset--;this.updateCarousel();}else{TVA.setFocus(prevChild);this.activeChild=prevChild;}
},_nextItem:function()
{var nextChild=this.navigation[this.activeChild]["Down"];if(this.pos<this.size){this.pos++;}
if(this.activeChild==='VCheckBox_Item_2_Overlay'){this.offset++;this.updateCarousel();}else{TVA.setFocus(nextChild);this.activeChild=nextChild;}
},navUpElement:function(e)
{if(this.pos>0){this._prevItem();e.stopPropagation();}},navDownElement:function(e)
{if(this.pos<this.size-1){this._nextItem();e.stopPropagation();}},updateCarousel:function(){var maxCarouselElements=this.maxEl;for(var i=0;i<maxCarouselElements;i++)
{var index=i+this.offset;$(this.rootID+' #VCheckBox_Item_'+i).hide();$(this.rootID+' #VCheckBox_Item_'+i+' p').html('');if(this.contents[index])
{$(this.rootID+' #VCheckBox_Item_'+i).show();var url=this.contents[index].images||'';var bgcss=this.contents[index].bgcss||{};var text=this.contents[index].text||'';if(url==='')
{$(this.rootID+' #VCheckBox_Item_'+i).css(bgcss);}
else
{$(this.rootID+' #VCheckBox_Item_'+i).css('background-image','url('+url+')');}
if($(this.rootID+' #VCheckBox_Item_'+i+' p')[0])
{$(this.rootID+' #VCheckBox_Item_'+i+' p').html(text);}
else
{$(this.rootID+' #VCheckBox_Item_'+i).prepend('<p>'+text+'</p>');}}}},onHover:function(event)
{var element=event.target.id;element=element.replace('_Overlay','');var i=element[element.length-1];this._setCarouselIndex(parseInt(i));this._enableElement(event.target.id);event.stopPropagation();},_setCarouselIndex:function(index)
{this.pos=this.offset+index;},clickEvent:function(e){},setChecked:function(){$(this.rootID+' .VCheckBox_radio').removeClass('inactive');$(this.rootID+' .VCheckBox_radio').removeClass('active');$(this.rootID+' .VCheckBox_radio').addClass('inactive');$(this.rootID+' #VCheckBox_Item_'+Model.Units.index+'_radio').removeClass('inactive');$(this.rootID+' #VCheckBox_Item_'+Model.Units.index+'_radio').addClass('active');}}));})();