var Keys=(function(){var keyBinder=function(tvaKey,defaultCode){return(tvaKey==null)?defaultCode:tvaKey;};var KeySingleton=Class.create({_init_:function(){this.bindings={Back:keyBinder(461,8),Up:keyBinder(38,38),Down:keyBinder(40,40),Left:keyBinder(37,37),Right:keyBinder(39,39),Enter:keyBinder(13,13),Red:keyBinder(403,81),Green:keyBinder(404,87),Yellow:keyBinder(405,109),Blue:keyBinder(406,107),Play:keyBinder(415,118),Pause:keyBinder(19,118),RW:keyBinder(412,117),FF:keyBinder(417,119),RWC:(function(){if(TVA.tvKey!=null){return(TVA.tvKey.KEY_REWIND_==null)?0:TVA.tvKey.KEY_REWIND_}else{return 0;}})(),FFC:(function(){if(TVA.tvKey!=null){return(TVA.tvKey.KEY_FF_==null)?0:TVA.tvKey.KEY_FF_}else{return 0;}})(),Stop:keyBinder(413,35),One:keyBinder(49,97),Two:keyBinder(50,98),Three:keyBinder(51,99),Four:keyBinder(52,100),Five:keyBinder(53,101),Six:keyBinder(54,102),Seven:keyBinder(55,103),Eight:keyBinder(56,104),Nine:keyBinder(57,105),Zero:keyBinder(TVA.Key_TEN,96),Cross:keyBinder(0,0),Circle:keyBinder(0,0),Triangle:keyBinder(0,0),Square:keyBinder(0,0),Start:keyBinder(0,0),Select:keyBinder(0,0),L1:keyBinder(0,0),L2:keyBinder(0,0),L3:keyBinder(0,0),R1:keyBinder(0,0),R2:keyBinder(0,0),R3:keyBinder(0,0)};},getBind:function(keycode){if(this.bindings.hasOwnProperty(keycode)){return this.bindings[keycode];}
return null;}});return new KeySingleton();})();