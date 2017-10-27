var Model=(function(){var M=Class.create({newModel:function(name,data){if(data instanceof Function){return null;}
if(!this.hasOwnProperty(name)){this[name]=data||{};}else{}
return this[name];},hasModel:function(name){return this.hasOwnProperty(name);},getModel:function(name){return(this.hasOwnProperty(name))?this[name]:null;},cleanModel:function(name){if(this.hasModel(name)){if(this[name]instanceof Array){this[name]=[];}else{this[name]={};}}},updateModel:function(name,newData){if(!this.hasOwnProperty(name)){if(newData instanceof Array){this[name]=[];}else{this[name]={};}}
this._updateModel(name,newData);return this[name];},_updateModel:function(name,newData,destination){var property,obj=newData,value,isObj=false,v=(destination===undefined)?this[name]:destination;if(newData instanceof Array){isObj=true;}else if(newData instanceof Object){isObj=true;}
if(!isObj){this[name]=newData;return;}
for(property in obj){if(obj.hasOwnProperty(property)){delete v[property];value=obj[property];v[property]={};if(!(value instanceof Object)){v[property]=value;}else{if(value instanceof Array){v[property]=value;}else{this._updateModel(name,obj[property],v[property]);}}}}}});return new M();})();
