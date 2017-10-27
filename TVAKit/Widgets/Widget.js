var Widget=(function(){var Widget=function(args){this.name=args.name||args.destination;this._init(args);};Widget.prototype={_init:function(vcDef){if(vcDef.source){this.vc=ViewControllerManager.clone(vcDef.source,vcDef.destination);}else{this.vc=ViewControllerManager.create(vcDef.vcName,{template:vcDef.template,events:vcDef.events,name:vcDef.name});}},setEventCallbacks:function(eventCallbacks){if(eventCallbacks.keydownCB)
this.vc.keydownCB=eventCallbacks.keydownCB;if(eventCallbacks.clickCB)
this.vc.clickCB=eventCallbacks.clickCB;if(eventCallbacks.hoverCB)
this.vc.hoverCB=eventCallbacks.hoverCB;if(eventCallbacks.mouseOutCB)
this.vc.mouseOutCB=eventCallbacks.mouseOutCB;if(eventCallbacks.parentListHoverCB)
this.vc.parentListHoverCB=eventCallbacks.parentListHoverCB;if(eventCallbacks.parentListMouseOutCB)
this.vc.parentListMouseOutCB=eventCallbacks.parentListMouseOutCB;},add:function(scope,location){scope.addChild(this.vc,location);},setParams:function(params){this.vc.init(params);}};return Widget;})();