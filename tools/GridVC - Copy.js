(function () {
    "use strict";

    var base = ViewControllerManager.findClass("ViewControllerNav");
    ViewControllerManager.newClassDef("GridVC",
        Class.create({
            _extends_: base,

            _init_: function (args) {
                base.call(this, args);
                this.activeChild = 'Grid_row_0_Item_pos_0_Overlay';
                this.navigation = {};
                this.pos = 0;
                this.vpos = 0;
                this.hpos = 0;
                this.size = 0;
                this.maxEl = 3;
                this.activePos = 0;
                this.offset = 0;
                this.images = [];
                this.text = [];
                this.contents = [];
                this.screenPadding = 0;
                this.listen = true;
                this.rows = null;
                this.columns = null;
                this.Nrow = null;
                this.Ncol = null;
                this.row = 0;
                this.verticalMargin = 6;
                this.horizontalMargin = 6;
                this.cloneIndex = null;
            },

            init: function(params)
            {
                this.cloneIndex = params.cloneIndex ? params.cloneIndex : '';
                
                this.rows = params.rows || 0;
                this.columns = params.columns || 0;
                
                this.screenPadding = params.padding || 0;
                this.contents = params.contents || [];
                this.maxEl = params.length;
                this.offset = 0;
                this.size = params.contents.length;
                
                this.verticalMargin = params.verticalMargin || this.verticalMargin;
                this.horizontalMargin = params.horizontalMargin || this.horizontalMargin;
                
                if(this.rows > 0)//bias towards the rows
                {
                    this.Nrow = Math.ceil(this.size / this.rows);
                    this.Ncol = this.Nrow;
                    this.columns = this.Nrow;
                }
                else if(this.columns > 0)
                {
                    this.Ncol = Math.ceil(this.size / this.columns);//qty of columns
                    this.rows = this.Ncol;//qty of rows
                    this.Nrow = this.Ncol;
                }
                else
                {
                    //TVA.log('Error: Specify row or column length');
                    return;
                }
                var cellCount = 0;
                for(var i = 0; i < this.rows; i++)//rows
                {
                    for(var j = 0; j < this.columns; j++)//columns
                    {
                        var child = 'Grid' + this.cloneIndex + '_row_' + i + '_Item_pos_' + j + '_Overlay';
                        this.navigation[child] = {};
                        if(i === 0)//first row
                        {
                            if(j === 0)//check first column
                            {
                                this.navigation[child]['Right'] = 'Grid' + this.cloneIndex + '_row_' + i + '_Item_pos_' + (j + 1) + '_Overlay';
                            }
                            else if(j === this.columns - 1)//check last column
                            {
                                this.navigation[child]['Left'] = 'Grid' + this.cloneIndex + '_row_' + i + '_Item_pos_' + (j - 1) + '_Overlay';
                            }
                            else//all the rest
                            {
                                this.navigation[child]['Left'] = 'Grid' + this.cloneIndex + '_row_' + i + '_Item_pos_' + (j - 1) + '_Overlay';
                                //is there a cell to the right?
                                if(this.contents[cellCount + 1])
                                {
                                    this.navigation[child]['Right'] = 'Grid' + this.cloneIndex + '_row_' + i + '_Item_pos_' + (j + 1) + '_Overlay';
                                }
                            }
                            //is there a cell below?
                            if(this.contents[cellCount + this.columns])
                            {
                                this.navigation[child]['Down'] = 'Grid' + this.cloneIndex + '_row_' + (i + 1) + '_Item_pos_' + (j) + '_Overlay';
                            }
                        }
                        else if(i === this.rows - 1)//last row
                        {
                            if(j === 0)//check first column
                            {
                                this.navigation[child]['Right'] = 'Grid' + this.cloneIndex + '_row_' + i + '_Item_pos_' + (j + 1) + '_Overlay';
                            }
                            else if(j === this.columns - 1)//check last column
                            {
                                this.navigation[child]['Left'] = 'Grid' + this.cloneIndex + '_row_' + i + '_Item_pos_' + (j - 1) + '_Overlay';
                            }
                            else//all the rest
                            {
                                this.navigation[child]['Left'] = 'Grid' + this.cloneIndex + '_row_' + i + '_Item_pos_' + (j - 1) + '_Overlay';
                                //is there a cell to the right?
                                if(this.contents[cellCount + 1])
                                {
                                    this.navigation[child]['Right'] = 'Grid' + this.cloneIndex + '_row_' + i + '_Item_pos_' + (j + 1) + '_Overlay';
                                }
                            }
                            this.navigation[child]['Up'] = 'Grid' + this.cloneIndex + '_row_' + (i - 1) + '_Item_pos_' + (j) + '_Overlay';
                        }
                        else
                        {
                            if(j === 0)//check first element
                            {
                                this.navigation[child]['Right'] = 'Grid' + this.cloneIndex + '_row_' + i + '_Item_pos_' + (j + 1) + '_Overlay';
                                this.navigation[child]['Up'] = 'Grid' + this.cloneIndex + '_row_' + (i - 1) + '_Item_pos_' + (j) + '_Overlay';
                            }
                            else if(j === this.columns - 1)//check last element
                            {
                                this.navigation[child]['Left'] = 'Grid' + this.cloneIndex + '_row_' + i + '_Item_pos_' + (j - 1) + '_Overlay';
                                this.navigation[child]['Up'] = 'Grid' + this.cloneIndex + '_row_' + (i - 1) + '_Item_pos_' + (j) + '_Overlay';
                            }
                            else//all the rest
                            {
                                this.navigation[child]['Left'] = 'Grid' + this.cloneIndex + '_row_' + i + '_Item_pos_' + (j - 1) + '_Overlay';
                                //is there a cell to the right?
                                if(this.contents[cellCount + 1])
                                {
                                    this.navigation[child]['Right'] = 'Grid' + this.cloneIndex + '_row_' + i + '_Item_pos_' + (j + 1) + '_Overlay';
                                }
                                this.navigation[child]['Up'] = 'Grid' + this.cloneIndex + '_row_' + (i - 1) + '_Item_pos_' + (j) + '_Overlay';
                            }
                            //is there a cell below?
                            if(this.contents[cellCount + this.columns])
                            {
                                this.navigation[child]['Down'] = 'Grid' + this.cloneIndex + '_row_' + (i + 1) + '_Item_pos_' + (j) + '_Overlay';
                            }
                        }
                        cellCount++;
                    }
                }
                
                this.updateGrid();
                TVA.setFocus('Grid' + this.cloneIndex + '_row_0_Item_pos_0_Overlay');
                this.activeChild = 'Grid' + this.cloneIndex + '_row_0_Item_pos_0_Overlay';
                $(this.rootID + ' .Grid_Container').css({left:this.screenPadding});
                this.enable();
            },
            onUnload: function () {
                this.pos = 0;
                this.images = [];
                this.text = [];
                this.contents = [];
                TVA.offFocus(TVA.onFocus);
            },
            onLoad: function () {
                this._loadVC();
                this.images = [];
                this.text = [];
                this.pos = 0;
                this.contents = [];
                this.clickEvent = null;
            },

            _loadVC: function () {
            },
            render: function (location) {
                this._super(location);
                this.enable();
                this.reset();
            },

            onKeyDown: function (e, keyCode) {
                if(this.listen && Model.App.listen)
                {
                    switch (keyCode)
                    {
                        case Keys.getBind("Back"):
                            break;
                        case Keys.getBind("Up"):
                            this.navUpElement(e);
                            break;
                        case Keys.getBind("Down"):
                            this.navDownElement(e);
                            break;
                        case Keys.getBind("Left"):
                            this.navLeftElement(e);
                            break;
                        case Keys.getBind("Right"):
                            this.navRightElement(e);
                            break;
                        case Keys.getBind("Enter"):
                            $('#'+TVA.onFocus).click();
                            e.stopPropagation();
                            break;
                        case Keys.getBind("Cross"):
                            $('#'+TVA.onFocus).click();
                            e.stopPropagation();
                            break;
                    }
                }
            },
            _navigate: function (direction,e)
            {
                var nextChild = this.navigation[this.activeChild][direction];
                ////TVA.log('nextChild ' + nextChild);
                if (nextChild && this.children[nextChild])
                {
                    this.children[nextChild].view.enable();
                    //Don't send key to parent.
                    e.stopPropagation();
                }
                else if ($(this.rootID).find('#'+nextChild).length)
                {
                    //No VC element
                    TVA.setFocus(nextChild);
                    this.activeChild = nextChild;
                    this.activateParent();
                    e.stopPropagation();
                }
            },
            activateParent: function () {
                $('.gridElement').removeClass('active');
                $('#' + this.activeChild.replace('_Overlay', '')).addClass('active');
            },
            _targetItem: function(e,direction)
            {
                var targetChild = this.navigation[this.activeChild][direction];
                if(targetChild)
                {
                    if (this.isElementObscured(targetChild)) 
                    {
                        this.offset++;
                        this._navigate(direction,e);
                        //e.stopPropagation();
                    }
                    else
                    {
                        this._navigate(direction,e);
                        //e.stopPropagation();
                    }
                    this._setGridIndex(targetChild);
                }
            },
            navLeftElement: function (e)
            {
                if (this.listen) {
                    this._targetItem(e,"Left");
                    //Don't send key to parent.
                    //e.stopPropagation();
                }
                else{
                    e.stopPropagation();
                }
            },
            navRightElement: function (e)
            {
                if (this.listen) {
                    //this._nextItem(e);
                    this._targetItem(e,"Right");
                    //Don't send key to parent.
                    //e.stopPropagation();
                }
                else{
                    e.stopPropagation();
                }
            },
            navUpElement: function (e)
            {
                if (this.listen) {
                    //this._nextItem(e);
                    this._targetItem(e,"Up");
                    //Don't send key to parent.
                    //e.stopPropagation();
                }
                else{
                    e.stopPropagation();
                }
            },
            navDownElement: function (e)
            {
                if (this.listen) {
                    //this._nextItem(e);
                    this._targetItem(e,"Down");
                    //Don't send key to parent.
                    //e.stopPropagation();
                }
                else{
                    e.stopPropagation();
                }
            },
            updateGrid: function() {
                var maxCarouselElements = this.size;
                var cellCount = 0;
                for(var i = 0; i < this.rows; i++)//rows
                {
                    var row = '';
                    if ($(this.rootID + ' .Grid_Container').find('#Grid' + this.cloneIndex + '_row_' + i).length)
                    {
                        row = 'Grid' + this.cloneIndex + '_row_' + i;
                    }
                    else
                    {
                        row = 'Grid' + this.cloneIndex + '_row_' + i;
                        $(this.rootID + ' .Grid_Container').append('<div id="' + row + '" class="gridRow"></div>');
                    }
                    var height = ($(this.rootID + ' .Grid_Container #' + row ).height() + 6) * i;
                    
                    if($(this.rootID + ' .Grid_Container #' + row).position().top === 0 )
                    {
                        $(this.rootID + ' .Grid_Container #' + row).css({top:height});
                    }
                    
                    for(var j = 0; j < this.columns; j++)//columns
                    {
                        var element = row + '_Item_pos_' + j;
                        if(this.contents[cellCount])
                        {
                            var content = this.contents[cellCount].content || '';

                            //check element on the DOM
                            if($(this.rootID + ' .Grid_Container #' + row + ' #' + element)[0])
                            {
                                $(this.rootID + ' .Grid_Container #' + row + ' #' + element + ' .content').html(content);
                            }
                            else//add to the dom
                            {
                                var el = '<div id="' + element + '" class="gridElement"><div class="content"></div><div id="' + element + '_Overlay" class="Grid_Item_Overlay hoveritem"></div></div>';
                                $('.Grid_Container #' + row).append(el);
                                
                                $(this.rootID + ' #' + element + ' .content').html(content);
                                
                                var width = ($(this.rootID + ' #' + element).width() + this.horizontalMargin) * j;
                                ////TVA.log(width);
                                if($(this.rootID + ' #' + element).position().left === 0 )
                                {
                                    $(this.rootID + ' #' + element).css({left:width});
                                }
                            }
                        }
                        cellCount++;
                    }
                }
            },
            onHover: function(event)
            {
                var element = event.target.id;
                element = element.split('_Item_pos_');
                
                var row = element[0];
                var column = element[1];
                
                row = row.replace('Grid' + this.cloneIndex + '_row_','');
                column = column.replace('_Overlay','');
                
                this._setGridIndex(event.target.id);
            
                this._enableElement(event.target.id);
                this.activateParent();
                event.stopPropagation();
            },
            _setGridIndex: function(id)
            { 
                
                var element = id;
                element = element.split('_Item_pos_');
                
                var row = element[0];
                var column = element[1];
                
                row = row.replace('Grid' + this.cloneIndex + '_row_','');
                column = column.replace('_Overlay','');
                
                this.pos = parseInt(column);
                this.row = parseInt(row);
            },
            clickEvent: function () {
                //override this
                //TVA.log('Grid.clickEvent not overridden.');
            },
            scrollLeft: function(scrollAmount)
            {
                this.scroll(-1,scrollAmount);
            },
            scrollRight: function(scrollAmount)
            {
                this.scroll(1,scrollAmount);
            },
            scroll: function(direction,distance)
            {
                this.listen = false;
                var scope = this;
                var dx = (distance || 53) * direction;
                
                var x = $('.Grid_Container').position().left;
                var newPos = (dx + x) + 'px';
                var animCSS = {left:newPos};
                var animProps = {duration:500,
                                 step:function(a,b){
                                 },
                                 complete:function(){
                                     //TVA.log('Grid Scroll Animation complete.');
                                     scope.listen = true;
                                 }
                                };
                
                $('.Grid_Container').animate(animCSS,animProps);
            },
            isElementObscured: function(overlayElement,autoScroll)
            {
                ////TVA.log('Is Element Obscured? ' + overlayElement);
                var matrixLeft = $(this.rootID + ' .Grid_Container').position().left;
                
                var pos = $('#' + overlayElement).parent().position();
                
                var width = $('#' + overlayElement).width();
                
                var scrollAmount = 0;
                
                var scroll = autoScroll || true;
                
                var x = pos.left + matrixLeft;
                
                if( x < ($(this.rootID).position().left + this.screenPadding))
                {
                    if(scroll)
                    {
                        var dX = Math.abs(x) + this.screenPadding;
                        this.scrollRight( dX  );
                    }
                    
                    return true;
                }
                else if( ( x + width ) > ($(this.rootID).position().left + $(this.rootID).width() ) - this.screenPadding )
                {
                    scrollAmount = ( x + width ) - ( 1280 - this.screenPadding );
                    if( scroll )
                    {
                        this.scrollLeft( scrollAmount );
                    }
                    return true;
                }
                else
                {
                    return false;
                }
            },
            Grid_ClickEvent: function () {
                //override this
                //TVA.log('Grid_ClickEvent not overridden.');
            },
            reset: function()
            {
                $(this.rootID + ' .Grid_Container').html('');
            }

        })
    );
})();