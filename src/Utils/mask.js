var Mask={masks:{},emptyMask:'empty',init:function(element)
{this.create(this.emptyMask,0,0,2,2,element);this.resize(this.emptyMask,element);},resize:function(name,element)
{var style="";var img=TVA.year==='2012'&&TVA.device==='samsung'?"data:image/png;base64,":'data:image/svg+xml;utf8,';img+=this.get(name);style+="-webkit-mask-image: url(\""+img+"\")";$(element).attr('style',style);},clear:function(element)
{this.resize(this.emptyMask,element);},create:function(name,x,y,width,height,element)
{var rect1={x:0,y:0,width:1280,height:y},rect2={x:0,y:0,width:x,height:720},rect3={x:(width+x),y:0,width:(1280-(width+x)),height:720},rect4={x:0,y:(height+y),width:1280,height:720-(height+y)};if(TVA.year==='2012'&&TVA.device=='samsung')
{var p=new PNGlib(1280,720,256);var background=p.color(0,0,0,0);p.drawRect(rect1);p.drawRect(rect2);p.drawRect(rect3);p.drawRect(rect4);this.masks[name]=p.getBase64();}
else
{var style='';style+="<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'>";var col="fill:rgb(0,0,0);";style+="<rect x='"+rect1.x+"' y='"+rect1.y+"' width='"+rect1.width+"' height='"+rect1.height+"' style='"+col+"'></rect>";style+="<rect x='"+rect2.x+"' y='"+rect2.y+"' width='"+rect2.width+"' height='"+rect2.height+"' style='"+col+"'></rect>";style+="<rect x='"+rect3.x+"' y='"+rect3.y+"' width='"+rect3.width+"' height='"+rect3.height+"' style='"+col+"'></rect>";style+="<rect x='"+rect4.x+"' y='"+rect4.y+"' width='"+rect4.width+"' height='"+rect4.height+"' style='"+col+"'></rect>";style+="</svg>";this.masks[name]=style;}
this.resize(name,element);this.clear(element);return this.masks[name];},get:function(name)
{return this.masks[name];}};