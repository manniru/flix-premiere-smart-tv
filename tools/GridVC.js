(function(){"use strict";var base=ViewControllerManager.findClass("ViewControllerNav");ViewControllerManager.newClassDef("GridVC",Class.create({_extends_:base,_init_:function(args){base.call(this,args);this.activeChild='Grid_row_0_Item_pos_0_Overlay';this.navigation={};this.pos=0;this.vpos=0;this.hpos=0;this.size=0;this.maxEl=3;this.activePos=0;this.offset=0;this.images=[];this.text=[];this.contents=[];this.screenPadding=0;this.listen=true;this.rows=null;this.columns=null;this.Nrow=null;this.Ncol=null;this.row=0;this.verticalMargin=6;this.horizontalMargin=6;this.cloneIndex=null;this.x=0;this.y=0;this.orientation='vertical';this.keydownCB=null;this.clickCB=null;this.hoverCB=null;},init:function(params)
{this.cloneIndex=params.cloneIndex?params.cloneIndex:'';this.orientation=params.orientation||'vertical';this.rows=params.rows||0;this.columns=params.columns||0;this.x=params.x||0;this.y=params.y||0;this.screenPadding=params.padding||0;this.contents=params.contents||[];this.maxEl=params.length;this.offset=0;this.size=params.contents.length;this.verticalMargin=params.verticalMargin||this.verticalMargin;this.horizontalMargin=params.horizontalMargin||this.horizontalMargin;if(this.rows>0)
{this.Nrow=Math.ceil(this.size/this.rows);this.Ncol=this.Nrow;this.columns=this.Nrow;}
else if(this.columns>0)
{this.Ncol=Math.ceil(this.size/this.columns);this.rows=this.Ncol;this.Nrow=this.Ncol;}
else
{return;}
var cellCount=0;for(var i=0;i<this.rows;i++)
{for(var j=0;j<this.columns;j++)
{var child='Grid'+this.cloneIndex+'_row_'+i+'_Item_pos_'+j+'_Overlay';this.navigation[child]={};if(i===0)
{if(j===0)
{this.navigation[child]['Right']='Grid'+this.cloneIndex+'_row_'+i+'_Item_pos_'+(j+1)+'_Overlay';}
else if(j===this.columns-1)
{this.navigation[child]['Left']='Grid'+this.cloneIndex+'_row_'+i+'_Item_pos_'+(j-1)+'_Overlay';}
else
{this.navigation[child]['Left']='Grid'+this.cloneIndex+'_row_'+i+'_Item_pos_'+(j-1)+'_Overlay';if(this.contents[cellCount+1])
{this.navigation[child]['Right']='Grid'+this.cloneIndex+'_row_'+i+'_Item_pos_'+(j+1)+'_Overlay';}}
if(this.contents[cellCount+this.columns])
{this.navigation[child]['Down']='Grid'+this.cloneIndex+'_row_'+(i+1)+'_Item_pos_'+(j)+'_Overlay';}}
else if(i===this.rows-1)
{if(j===0)
{this.navigation[child]['Right']='Grid'+this.cloneIndex+'_row_'+i+'_Item_pos_'+(j+1)+'_Overlay';}
else if(j===this.columns-1)
{this.navigation[child]['Left']='Grid'+this.cloneIndex+'_row_'+i+'_Item_pos_'+(j-1)+'_Overlay';}
else
{this.navigation[child]['Left']='Grid'+this.cloneIndex+'_row_'+i+'_Item_pos_'+(j-1)+'_Overlay';if(this.contents[cellCount+1])
{this.navigation[child]['Right']='Grid'+this.cloneIndex+'_row_'+i+'_Item_pos_'+(j+1)+'_Overlay';}}
this.navigation[child]['Up']='Grid'+this.cloneIndex+'_row_'+(i-1)+'_Item_pos_'+(j)+'_Overlay';}
else
{if(j===0)
{this.navigation[child]['Right']='Grid'+this.cloneIndex+'_row_'+i+'_Item_pos_'+(j+1)+'_Overlay';this.navigation[child]['Up']='Grid'+this.cloneIndex+'_row_'+(i-1)+'_Item_pos_'+(j)+'_Overlay';}
else if(j===this.columns-1)
{this.navigation[child]['Left']='Grid'+this.cloneIndex+'_row_'+i+'_Item_pos_'+(j-1)+'_Overlay';this.navigation[child]['Up']='Grid'+this.cloneIndex+'_row_'+(i-1)+'_Item_pos_'+(j)+'_Overlay';}
else
{this.navigation[child]['Left']='Grid'+this.cloneIndex+'_row_'+i+'_Item_pos_'+(j-1)+'_Overlay';if(this.contents[cellCount+1])
{this.navigation[child]['Right']='Grid'+this.cloneIndex+'_row_'+i+'_Item_pos_'+(j+1)+'_Overlay';}
this.navigation[child]['Up']='Grid'+this.cloneIndex+'_row_'+(i-1)+'_Item_pos_'+(j)+'_Overlay';}
if(this.contents[cellCount+this.columns])
{this.navigation[child]['Down']='Grid'+this.cloneIndex+'_row_'+(i+1)+'_Item_pos_'+(j)+'_Overlay';}}
cellCount++;}}
this.updateGrid();TVA.setFocus('Grid'+this.cloneIndex+'_row_0_Item_pos_0_Overlay');this.activeChild='Grid'+this.cloneIndex+'_row_0_Item_pos_0_Overlay';$(this.rootID+' .Grid_Container').css({left:this.x,top:this.y});this.enable();},onUnload:function(){this.pos=0;this.images=[];this.text=[];this.contents=[];TVA.offFocus(TVA.onFocus);},onLoad:function(){this._loadVC();this.images=[];this.text=[];this.pos=0;this.contents=[];this.clickEvent=null;},_loadVC:function(){},render:function(location){this._super(location);this.enable();this.reset();},onKeyDown:function(e,keyCode){TVA.log('keydown in grid');if(this.listen&&Model.App.listen)
{switch(keyCode)
{case Keys.getBind("Back"):break;case Keys.getBind("Up"):this.navUpElement(e);break;case Keys.getBind("Down"):this.navDownElement(e);break;case Keys.getBind("Left"):this.navLeftElement(e);break;case Keys.getBind("Right"):this.navRightElement(e);break;case Keys.getBind("Enter"):$('#'+TVA.onFocus).click();e.stopPropagation();break;case Keys.getBind("Cross"):$('#'+TVA.onFocus).click();e.stopPropagation();break;}
this.keydownCB&&this.keydownCB(e,keyCode);}},_navigate:function(direction,e)
{var nextChild=this.navigation[this.activeChild][direction];if(nextChild&&this.children[nextChild])
{this.children[nextChild].view.enable();e.stopPropagation();}
else if($(this.rootID).find('#'+nextChild).length)
{TVA.setFocus(nextChild);this.activeChild=nextChild;this.activateParent();e.stopPropagation();this.gridNavCallBack&&this.gridNavCallBack();}},activateParent:function(){$('.gridElement').removeClass('active');$('#'+this.activeChild.replace('_Overlay','')).addClass('active');},_targetItem:function(e,direction)
{var targetChild=this.navigation[this.activeChild][direction];if(targetChild)
{if(this.isElementObscured(targetChild,true,direction))
{this._navigate(direction,e);}
else
{this._navigate(direction,e);}
this._setGridIndex(targetChild);}},navLeftElement:function(e)
{if(this.listen){this._targetItem(e,"Left");}
else{e.stopPropagation();}},navRightElement:function(e)
{if(this.listen){this._targetItem(e,"Right");}
else{e.stopPropagation();}},navUpElement:function(e)
{if(this.listen){this._targetItem(e,"Up");}
else{e.stopPropagation();}},navDownElement:function(e)
{if(this.listen){this._targetItem(e,"Down");}
else{e.stopPropagation();}},updateGrid:function(){var maxCarouselElements=this.size;var cellCount=0;for(var i=0;i<this.rows;i++)
{var row='';if($(this.rootID+' .Grid_Container').find('#Grid'+this.cloneIndex+'_row_'+i).length)
{row='Grid'+this.cloneIndex+'_row_'+i;}
else
{row='Grid'+this.cloneIndex+'_row_'+i;$(this.rootID+' .Grid_Container').append('<div id="'+row+'" class="gridRow"></div>');}
var height=($(this.rootID+' .Grid_Container #'+row).height()+6)*i;if($(this.rootID+' .Grid_Container #'+row).position().top===0)
{$(this.rootID+' .Grid_Container #'+row).css({top:height});}
for(var j=0;j<this.columns;j++)
{var element=row+'_Item_pos_'+j;if(this.contents[cellCount])
{var content=this.contents[cellCount].content||'';if($(this.rootID+' .Grid_Container #'+row+' #'+element)[0])
{$(this.rootID+' .Grid_Container #'+row+' #'+element+' .content').html(content);}
else
{var el='<div id="'+element+'" class="gridElement"><div class="content"></div><div id="'+element+'_Overlay" class="Grid_Item_Overlay hoveritem"></div></div>';$(this.rootID+' .Grid_Container #'+row).append(el);$(this.rootID+' #'+element+' .content').html(content);var width=($(this.rootID+' #'+element).width()+this.horizontalMargin)*j;if($(this.rootID+' #'+element).position().left===0)
{$(this.rootID+' #'+element).css({left:width});}}}
cellCount++;}}},onHover:function(event)
{var element=event.target.id;element=element.split('_Item_pos_');var row=element[0];var column=element[1];row=row.replace('Grid'+this.cloneIndex+'_row_','');column=column.replace('_Overlay','');this._setGridIndex(event.target.id);this._enableElement(event.target.id);this.activateParent();this.hoverCB&&this.hoverCB(event);event.stopPropagation();},_setGridIndex:function(id)
{var element=id;element=element.split('_Item_pos_');var row=element[0];var column=element[1];row=row.replace('Grid'+this.cloneIndex+'_row_','');column=column.replace('_Overlay','');this.pos=parseInt(column);this.row=parseInt(row);},clickEvent:function(){},scrollLeft:function(scrollAmount)
{this.scroll(-1,scrollAmount,'horizontal');},scrollRight:function(scrollAmount)
{this.scroll(1,scrollAmount,'horizontal');},scrollUp:function(scrollAmount)
{this.scroll(-1,scrollAmount,'vertical');},scrollDown:function(scrollAmount)
{this.scroll(1,scrollAmount,'vertical');},scroll:function(direction,distance,orientation)
{this.listen=false;var scope=this;var newPos='0px';var animCSS={};if(orientation==='vertical')
{var y=$(this.rootID+' .Grid_Container').position().top;var dy=(distance||53)*direction;var newPos=(dy+y)+'px';animCSS={top:newPos};}
else if(orientation==='horizontal')
{var x=$(this.rootID+' .Grid_Container').position().left;var dx=(distance||53)*direction;var newPos=(dx+x)+'px';animCSS={left:newPos};}
var animProps={duration:500,step:function(a,b){},complete:function(){scope.listen=true;}};$(this.rootID+' .Grid_Container').animate(animCSS,animProps);},isElementObscured:function(overlayElement,autoScroll,direction)
{if((direction==='Left'||direction==='Right')&&this.orientation==='horizontal')
{var matrixLeft=$(this.rootID+' .Grid_Container').position().left;var pos=$('#'+overlayElement).parent().position();var width=$('#'+overlayElement).width();var scrollAmount=0;var scroll=autoScroll||true;var x=pos.left+matrixLeft;if(x<($(this.rootID).position().left+this.screenPadding))
{if(scroll)
{var dX=Math.abs(x)+this.screenPadding;this.scrollRight(dX);}
return true;}
else if((x+width)>($(this.rootID).position().left+$(this.rootID).width())-this.screenPadding)
{scrollAmount=(x+width)-(1280-this.screenPadding);if(scroll)
{this.scrollLeft(scrollAmount);}
return true;}
else
{return false;}}
else if((direction==='Up'||direction==='Down')&&this.orientation==='vertical')
{var matrixTop=$(this.rootID+' .Grid_Container').position().top;var pos=$('#'+overlayElement).parent().position();var height=$('#'+overlayElement).height();var scrollAmount=0;var scroll=autoScroll||true;var y=pos.top+matrixTop;if(y<0)
{if(scroll)
{var dY=Math.abs(y)+this.screenPadding;this.scrollDown(dY);this.offset--;}
return true;}
else if((y+height)>($(this.rootID).height())-this.screenPadding)
{scrollAmount=(y+height)-($(this.rootID).height()-this.screenPadding);if(scroll)
{this.scrollUp(scrollAmount);this.offset++;}
return true;}
else
{return false;}}},onClick:function(e){this.clickCB&&this.clickCB(e);},reset:function()
{$(this.rootID+' .Grid_Container').html('');},gridNavCallBack:function(){}}));})();