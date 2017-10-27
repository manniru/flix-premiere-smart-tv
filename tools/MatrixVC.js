(function(){"use strict";ViewControllerManager.newClassDef("MatrixVC",Class.create({_extends_:ViewController,_init_:function(args){ViewController.call(this,args);this.id=this.name+'_matrixVC';this.options=Model.newModel(this.id,{autoselect:false,animation:0,transition:false,vertical:false,wrap:null,style:'default',limitedItems:false,topElementId:null,bottomElementId:null,leftElementId:null,rightElementId:null,backElementId:null});this.autoselectTimeout=null;this.menu=null;this.pos=0;this.activePos=0;this.row=this.col=this.rows=this.cols=0;this.status={blocked:false};},onLoad:function(){},onUnload:function(){},render:function(location){this._super(location);},onKeyDown:function(e,keyCode){switch(keyCode){case Keys.getBind("Up"):this.navTopElement(e);break;case Keys.getBind("Down"):this.navBottomElement(e);break;case Keys.getBind("Left"):this.navLeftElement(e);break;case Keys.getBind("Right"):this.navRightElement(e);break;case Keys.getBind("Enter"):this.selectCurrentElement(e);break;default:break;}},configure:function(page,rows,cols,model,options){Model.updateModel(this.id,options);this.model=model;this.data=Model.getModel(model).data;this.rows=rows;this.cols=cols;this.page=page;this.draw();},enable:function(){this.show();this.menu.jcarousel('scrollIntoView',this.pos);this._hoverItem();},isFocused:function(){return $(this.rootID).find('.focus').length>0;},draw:function(offset){var self=this;this.offset=offset||0;this.page=(this.options.limitedItems)?this.offset/this.options.limitedItems:0;$(this.rootID).empty().css({position:'absolute',left:20000,top:0});this.menu=$('<div class="'+this.options.style+'"></div>');var list=$('<ul></ul>');var limited=false;if(this.options.limitedItems)limited=true;for(var i=this.page;i<this.data.length&&(!limited||i<(this.options.limitedItems+this.page)*this.rows*this.cols);i+=(this.rows*this.cols)){list.append(this._createElement(this.data.slice(i,i+(this.rows*this.cols))));}
this.menu.append(list);this._addCarouselEvents();$(this.rootID).append(this.menu);this.menu.jcarousel(this.options);if(jQuery().dotdotdot)window.setTimeout(function(){$(self.rootID).find('.ellipsis').dotdotdot({wrap:'letter'});},200);if(jQuery().lazyload)window.setTimeout(function(){$(self.rootID).find('img.lazy').lazyload();},200);$(this.rootID).css({position:'',left:'',top:''});},_addCarouselEvents:function(){this.menu.on('jcarousel:createend',{menuObject:this},function(event,carousel){var menuObject=event.data.menuObject;menuObject.size=menuObject.menu.jcarousel('items').size();if(menuObject.options.header)menuObject._addHeader();if(menuObject.options.currentView)menuObject._addCurrentView();if(menuObject.options.controls)menuObject._addCarouselControls();if(menuObject.options.paginationView)menuObject._addPaginationView();}).on('jcarousel:animate',{menuObject:this},function(event,carousel,target,animate){var menuObject=event.data.menuObject;menuObject.status.blocked=true;}).on('jcarousel:animateend',{menuObject:this},function(event,carousel){var menuObject=event.data.menuObject;if(menuObject.options.limitedItems)menuObject._updateCarousel();menuObject.status.blocked=false;}).on('jcarousel:scroll',{menuObject:this},function(event,carousel,target,animate){var menuObject=event.data.menuObject;if(menuObject.options.loadingIcon)$(menuObject.options.loadingIcon).show();}).on('jcarousel:scrollend',{menuObject:this},function(event,carousel,target,animate){var menuObject=event.data.menuObject;if(menuObject.options.currentView)menuObject._updateCurrentView(menuObject.pos);if(menuObject.options.loadingIcon)$(menuObject.options.loadingIcon).hide();menuObject._scrollControl();}).on('jcarousel:reloadend',{menuObject:this},function(event,carousel){var menuObject=event.data.menuObject;menuObject.status.blocked=false;if(menuObject.options.currentView)menuObject._updateCurrentView(menuObject.pos);if(menuObject.options.loadingIcon)$(menuObject.options.loadingIcon).hide();});},_scrollControl:function(){if(this.menu.jcarousel('first').index()>this.pos)this._focusItem(this.menu.jcarousel('first').index());else if(this.menu.jcarousel('last').index()<this.pos)this._focusItem(this.menu.jcarousel('last').index());},_createElement:function(item){var m=$('<li>');var i;for(i in item){var element=$('<div id="'+this.id+'_'+item[i].id.toString().replace(/\s+/g,'_')+'" class="outerContainer" style="float:left"><div class="innerContainer"><div class="element">'+item[i].content+'</div></div></div>');element.addClass('hoveritem');m.append(element);}
return m;},onClick:function(event){$(event.currentTarget).parent().find('.active').removeClass('active');$(event.currentTarget).addClass('active');this.activeRow=Math.floor($(event.currentTarget).index()/this.cols);this.activeCol=Math.floor($(event.currentTarget).index()%this.cols);this.activePos=$(event.currentTarget).index();this.menu.jcarousel('scrollIntoView',this.pos);$(this.div).find('.active').removeClass('active');$(this).addClass('active');if(this.options.currentView)this.updateCurrentView(event.data.item[index]);this.data[this.activePos+(this.pos*this.cols*this.rows)].action();event.stopPropagation();},onMouseEnter:function(event){var onFocus=TVA.onFocus,target=event.currentTarget.id;if(onFocus!==target){TVA.offFocus(TVA.onFocus);TVA.setFocus(target);}
this.row=Math.floor($(event.currentTarget).index()/this.cols);this.col=Math.floor($(event.currentTarget).index()%this.cols);this._autoSelectManagement();this.parentVC.setActiveChild(this.name);event.stopPropagation();},_updateCarousel:function(){var sizePos=this.rows*this.cols;var sizeLimited=this.size*sizePos;if(this.data.length>sizeLimited){var sliceInit=this.page*sizePos;var sliceEnds=sliceInit+sizeLimited;if((this.menu.jcarousel('last').index()==this.size-1)&&this.data.length>sliceEnds){this.page++;sliceInit=this.page*sizePos;sliceEnds=sliceInit+sizeLimited;this.menu.find('ul').append(this.createElement(this.data.slice(sliceEnds-sizePos,sliceEnds)));this.menu.jcarousel('items').slice(0,1).remove();this.menu.jcarousel('reload');this.pos=this.menu.jcarousel('last').index();}
else if(this.menu.jcarousel('first').index()==0&&this.page>0){this.page--;sliceInit=this.page*sizePos;sliceEnds=sliceInit+sizeLimited;this.menu.find('ul').prepend(this.createElement(this.data.slice(sliceInit,sliceInit+sizePos)));this.menu.jcarousel('items').slice(this.size-1,this.size).remove();this.menu.jcarousel('reload');this.pos=this.menu.jcarousel('first').index();}}},_addHeader:function(){this.header=$('<div class="'+this.options.style+'-header"><div class="'+this.options.style+'-title">'+this.options.header.title+'</div><div class="'+this.options.style+'-subtitle">'+this.options.header.subtitle+'</div></div>');$(this.rootID).prepend(this.header);},_addCurrentView:function(){this.currentView=$('<div class="'+this.options.style+'-currentOption"></div>');$(this.rootID).prepend(this.currentView);},_updateCurrentView:function(item){this.currentView.empty();this.currentView.append(item.content);},_addPaginationView:function(item){this.paginationView=$('<div class="'+this.styleClass+'-paginationOption"></div>');this.div.append(this.paginationView);this.updatePaginationView();},_updatePaginationView:function(){this.paginationView.text(string_Page+': '+(this.pos+1)+' '+string_of+' '+this.size);},_addCarouselControls:function(){this.control_prev=$('<div class="'+this.options.style+'-prev" href="#">'+this.options.controls.prev+'</div>').addClass('pointer itemhover');this.control_next=$('<div class="'+this.options.style+'-next" href="#">'+this.options.controls.next+'</div>)').addClass('pointer itemhover');$(this.rootID).prepend(this.control_prev).append(this.control_next);this.control_next.on('jcarouselcontrol:inactive',function(){$(this).addClass('inactive');})
.on('jcarouselcontrol:active',function(){$(this).removeClass('inactive');}).jcarouselControl({target:'+=1',carousel:this.menu,method:'scroll'});this.control_prev.on('jcarouselcontrol:inactive',function(){$(this).addClass('inactive');})
.on('jcarouselcontrol:active',function(){$(this).removeClass('inactive');}).jcarouselControl({target:'-=1',carousel:this.menu,method:'scroll'});},_autoSelectManagement:function(){if(this.options.autoselect){var _this=this;window.clearTimeout(this.autoselectTimeout);this.autoselectTimeout=window.setTimeout(function(){if(_this.pos!=_this.activePos&&$(_this.rootID).is(':visible'))_this.selectCurrentElement();},this.options.autoselect);}},_prevItem:function(){if(this.pos>0)this.pos--;var element=$(this.menu.jcarousel('items')[this.pos]);element.trigger('mouseenter');},_nextItem:function(){if(this.pos+1<this.size)this.pos++;var element=$(this.menu.jcarousel('items')[this.pos]);element.trigger('mouseenter');},_focusItem:function(pos){this.pos=pos;var element=$(this.menu.jcarousel('items')[this.pos]);element.trigger('mouseenter');},selectCurrentElement:function(e){var elements=$(this.menu.jcarousel('items')[this.pos]).find('.outerContainer');$(elements[(this.row*this.cols)+this.col]).trigger('click');if(e)e.stopPropagation();},selectElementById:function(id,force){if(typeof id!='string')id=id.toString();this._checkElementIdInsideList(id);var element=this.menu.find('#'+this.id+'_'+id.toString().replace(/\s+/g,'_'));if(force||element.index()!=this.activePos)element.trigger('click');},focusElementById:function(id){if(typeof id!='string')id=id.toString();this._checkElementIdInsideList(id);var element=this.menu.find('#'+this.id+'_'+id.replace(/\s+/g,'_'));element.trigger('mouseenter');},_checkElementIdInsideList:function(id){if(typeof id!='string')id=id.toString();if(this.options.limitedItems&&this.options.limitedItems<this.data.length){var item=$.grep(this.data,function(e){return e.id==id;});var x0=this.data.indexOf(item[0]);if((x0+this.options.limitedItems)>this.data.length)x0=this.data.length-this.options.limitedItems;this.menu.find('ul').empty();for(var i=x0;i<this.options.limitedItems+x0;i++){this.menu.find('ul').append(this._createElement(this.data[i]));}
this.menu.jcarousel('reload');this.page=x0;}},selectActiveElement:function(){if(this.activePos!==null){this.menu.jcarousel('scrollIntoView',this.activePos);var element=$(this.menu.jcarousel('items')[this.options.activePos]);element.trigger('click');}},_hoverItem:function(){var elements=$(this.menu.jcarousel('items')[this.pos]).find('.outerContainer');var pos=(this.row*this.cols)+this.col;if(elements.length<=pos)$(elements[elements.length-1]).trigger('mouseenter');else $(elements[(this.row*this.cols)+this.col]).trigger('mouseenter');},navTopElement:function(e){if(this.row==0&&this.pos>0&&this.options.vertical){this.pos--;this.menu.jcarousel('scrollIntoView',this.pos);this.row=this.rows-1;this._hoverItem();e.stopPropagation();}
else if(this.row==0&&(this.pos==0||!this.options.vertical)){}
else{this.row--;this._hoverItem();e.stopPropagation();}},navBottomElement:function(e){var maxRow=Math.ceil($(this.menu.jcarousel('items')[this.pos]).find('.outerContainer').length/this.cols);if(this.row>=maxRow-1&&this.pos+1<this.size&&this.options.vertical){this.pos++;this.menu.jcarousel('scrollIntoView',this.pos);this.row=0;this._hoverItem();e.stopPropagation();}
else if(this.row>=maxRow-1&&(this.pos+1==this.size||!this.options.vertical)){}
else{this.row++;this._hoverItem();e.stopPropagation();}},navLeftElement:function(e){if(this.col==0&&this.pos>0&&!this.options.vertical){this.pos--;this.menu.jcarousel('scrollIntoView',this.pos);this.col=this.cols-1;this._hoverItem();e.stopPropagation();}
else if(this.col==0&&(this.pos==0||this.options.vertical)){}
else{this.col--;this._hoverItem();e.stopPropagation();}},navRightElement:function(e){var length=$(this.menu.jcarousel('items')[this.pos]).find('.outerContainer').length;var maxCol=Math.floor(length/this.cols)==0?length:this.cols;if(this.col>=maxCol-1&&this.pos+1<this.size&&!this.options.vertical){this.pos++;this.menu.jcarousel('scrollIntoView',this.pos);this.col=0;this._hoverItem();e.stopPropagation();}
else if(this.col>=maxCol-1&&(this.pos+1==this.size||this.options.vertical)){}
else{this.col++;this._hoverItem();e.stopPropagation();}}}));})();