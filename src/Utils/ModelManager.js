var ModelManager=(function(){"use strict";var Singleton=Class.create({_init_:function(){},init:function(){Model.newModel('App');Model.newModel('Movies');Model.App=Model.getModel("App");Model.Movies=Model.getModel("Movies");this.countdownTimers=[];},_modelError:function(Model,data){}});return new Singleton();})();