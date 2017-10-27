var Utils=(function(){var Singleton=Class.create({trim:function(str){var i=0,l=str.length-1;while(str[i]===' '){i++;}
while(str[l]===' '){l--;}
return str.slice(i,l+1);},isInt:function(n){return typeof n==='number'&&n%1===0;},centerElement:function($p,$c,v){var c=Math.round(($p.height()/2)-($c.height()/2));$c.css('top',(v===undefined)?c:v+'px');return c;},isArrSame:function(arra,arrb){var aL=arra.length;if(aL!==arrb.length){return false;}
while(aL--){if(arra[aL]!==arrb[aL]){return false;}}
return true;}});return new Singleton();})();