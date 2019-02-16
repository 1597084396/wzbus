var BMapLib=window.BMapLib=BMapLib||{};var BMAP_DRAWING_MARKER="marker",BMAP_DRAWING_POLYLINE="polyline",BMAP_DRAWING_CIRCLE="circle",BMAP_DRAWING_RECTANGLE="rectangle",BMAP_DRAWING_POLYGON="polygon";
(function(){var baidu=baidu||{guid:"$BAIDU$"};(function(){window[baidu.guid]={};baidu.extend=function(target,source){for(var p in source){if(source.hasOwnProperty(p)){target[p]=source[p]
}}return target};baidu.lang=baidu.lang||{};baidu.lang.guid=function(){return"TANGRAM__"+(window[baidu.guid]._counter++).toString(36)
};window[baidu.guid]._counter=window[baidu.guid]._counter||1;window[baidu.guid]._instances=window[baidu.guid]._instances||{};
baidu.lang.Class=function(guid){this.guid=guid||baidu.lang.guid();window[baidu.guid]._instances[this.guid]=this
};window[baidu.guid]._instances=window[baidu.guid]._instances||{};baidu.lang.isString=function(source){return"[object String]"==Object.prototype.toString.call(source)
};baidu.lang.isFunction=function(source){return"[object Function]"==Object.prototype.toString.call(source)
};baidu.lang.Class.prototype.toString=function(){return"[object "+(this._className||"Object")+"]"
};baidu.lang.Class.prototype.dispose=function(){delete window[baidu.guid]._instances[this.guid];
for(var property in this){if(!baidu.lang.isFunction(this[property])){delete this[property]
}}this.disposed=true};baidu.lang.Event=function(type,target){this.type=type;this.returnValue=true;
this.target=target||null;this.currentTarget=null};baidu.lang.Class.prototype.addEventListener=function(type,handler,key){if(!baidu.lang.isFunction(handler)){return
}!this.__listeners&&(this.__listeners={});var t=this.__listeners,id;if(typeof key=="string"&&key){if(/[^\w\-]/.test(key)){throw ("nonstandard key:"+key)
}else{handler.hashCode=key;id=key}}type.indexOf("on")!=0&&(type="on"+type);typeof t[type]!="object"&&(t[type]={});
id=id||baidu.lang.guid();handler.hashCode=id;t[type][id]=handler};baidu.lang.Class.prototype.removeEventListener=function(type,handler){if(baidu.lang.isFunction(handler)){handler=handler.hashCode
}else{if(!baidu.lang.isString(handler)){return}}!this.__listeners&&(this.__listeners={});
type.indexOf("on")!=0&&(type="on"+type);var t=this.__listeners;if(!t[type]){return
}t[type][handler]&&delete t[type][handler]};baidu.lang.Class.prototype.dispatchEvent=function(event,options){if(baidu.lang.isString(event)){event=new baidu.lang.Event(event)
}!this.__listeners&&(this.__listeners={});options=options||{};for(var i in options){event[i]=options[i]
}var i,t=this.__listeners,p=event.type;event.target=event.target||this;event.currentTarget=this;
p.indexOf("on")!=0&&(p="on"+p);baidu.lang.isFunction(this[p])&&this[p].apply(this,arguments);
if(typeof t[p]=="object"){for(i in t[p]){t[p][i].apply(this,arguments)}}return event.returnValue
};baidu.lang.inherits=function(subClass,superClass,className){var key,proto,selfProps=subClass.prototype,clazz=new Function();
clazz.prototype=superClass.prototype;proto=subClass.prototype=new clazz();for(key in selfProps){proto[key]=selfProps[key]
}subClass.prototype.constructor=subClass;subClass.superClass=superClass.prototype;
if("string"==typeof className){proto._className=className}};baidu.dom=baidu.dom||{};
baidu._g=baidu.dom._g=function(id){if(baidu.lang.isString(id)){return document.getElementById(id)
}return id};baidu.g=baidu.dom.g=function(id){if("string"==typeof id||id instanceof String){return document.getElementById(id)
}else{if(id&&id.nodeName&&(id.nodeType==1||id.nodeType==9)){return id}}return null
};baidu.insertHTML=baidu.dom.insertHTML=function(element,position,html){element=baidu.dom.g(element);
var range,begin;if(element.insertAdjacentHTML){element.insertAdjacentHTML(position,html)
}else{range=element.ownerDocument.createRange();position=position.toUpperCase();if(position=="AFTERBEGIN"||position=="BEFOREEND"){range.selectNodeContents(element);
range.collapse(position=="AFTERBEGIN")}else{begin=position=="BEFOREBEGIN";range[begin?"setStartBefore":"setEndAfter"](element);
range.collapse(begin)}range.insertNode(range.createContextualFragment(html))}return element
};baidu.ac=baidu.dom.addClass=function(element,className){element=baidu.dom.g(element);
var classArray=className.split(/\s+/),result=element.className,classMatch=" "+result+" ",i=0,l=classArray.length;
for(;i<l;i++){if(classMatch.indexOf(" "+classArray[i]+" ")<0){result+=(result?" ":"")+classArray[i]
}}element.className=result;return element};baidu.event=baidu.event||{};baidu.event._listeners=baidu.event._listeners||[];
baidu.on=baidu.event.on=function(element,type,listener){type=type.replace(/^on/i,"");
element=baidu._g(element);var realListener=function(ev){listener.call(element,ev)
},lis=baidu.event._listeners,filter=baidu.event._eventFilter,afterFilter,realType=type;
type=type.toLowerCase();if(filter&&filter[type]){afterFilter=filter[type](element,type,realListener);
realType=afterFilter.type;realListener=afterFilter.listener}if(element.addEventListener){element.addEventListener(realType,realListener,false)
}else{if(element.attachEvent){element.attachEvent("on"+realType,realListener)}}lis[lis.length]=[element,type,listener,realListener,realType];
return element};baidu.un=baidu.event.un=function(element,type,listener){element=baidu._g(element);
type=type.replace(/^on/i,"").toLowerCase();var lis=baidu.event._listeners,len=lis.length,isRemoveAll=!listener,item,realType,realListener;
while(len--){item=lis[len];if(item[1]===type&&item[0]===element&&(isRemoveAll||item[2]===listener)){realType=item[4];
realListener=item[3];if(element.removeEventListener){element.removeEventListener(realType,realListener,false)
}else{if(element.detachEvent){element.detachEvent("on"+realType,realListener)}}lis.splice(len,1)
}}return element};baidu.getEvent=baidu.event.getEvent=function(event){return window.event||event
};baidu.getTarget=baidu.event.getTarget=function(event){var event=baidu.getEvent(event);
return event.target||event.srcElement};baidu.preventDefault=baidu.event.preventDefault=function(event){var event=baidu.getEvent(event);
if(event.preventDefault){event.preventDefault()}else{event.returnValue=false}};baidu.stopBubble=baidu.event.stopBubble=function(event){event=baidu.getEvent(event);
event.stopPropagation?event.stopPropagation():event.cancelBubble=true};baidu.browser=baidu.browser||{};
if(/msie (\d+\.\d)/i.test(navigator.userAgent)){baidu.browser.ie=baidu.ie=document.documentMode||+RegExp["\x241"]
}})();var DrawingManager=BMapLib.DrawingManager=function(map,opts){if(!map){return
}instances.push(this);opts=opts||{};this.overlays=[];this._initialize(map,opts)};
baidu.lang.inherits(DrawingManager,baidu.lang.Class,"DrawingManager");DrawingManager.prototype.open=function(){if(this._isOpen==true){return true
}closeInstanceExcept(this);this._open()};DrawingManager.prototype.close=function(){if(this._isOpen==false){return true
}var me=this;this._close();me._map.removeOverlay(tip_label);setTimeout(function(){me._map.enableDoubleClickZoom()
},2000)};DrawingManager.prototype.setDrawingMode=function(drawingType){if(this._drawingType!=drawingType){closeInstanceExcept(this);
this._setDrawingMode(drawingType)}};DrawingManager.prototype.getDrawingMode=function(){return this._drawingType
};DrawingManager.prototype.enableCalculate=function(){this._enableCalculate=true;
this._addGeoUtilsLibrary()};DrawingManager.prototype.disableCalculate=function(){this._enableCalculate=false
};DrawingManager.prototype.enableSorption=function(){this._enableSorption=true};DrawingManager.prototype.disableSorption=function(){this._enableSorption=false
};DrawingManager.prototype.enableGpc=function(){this._enableGpc=true};DrawingManager.prototype.disableGpc=function(){this._enableGpc=false
};DrawingManager.prototype.getOverlays=function(){return this.overlays};DrawingManager.prototype.addOverlayData=function(overlay){return this.overlays.push(overlay)
};DrawingManager.prototype.setOverlaysData=function(overlays){return this.overlays=overlays
};DrawingManager.prototype.clearOverlayData=function(overlay){var map=this._map;for(var i=0;
i<this.overlays.length;i++){if(this.overlays[i]===overlay){this.overlays.splice(i,1);
return overlay}}};DrawingManager.prototype.clearOverlay=function(overlay){var map=this._map;
var overlay=this.clearOverlayData(overlay);if(overlay){map.removeOverlay(overlay)
}};DrawingManager.prototype.clearOverlays=function(){var map=this._map;this.overlays.forEach(function(overlay){map.removeOverlay(overlay)
});this.overlays.length=0};DrawingManager.prototype._initialize=function(map,opts){this._map=map;
this._opts=opts;this._drawingType=opts.drawingMode||BMAP_DRAWING_MARKER;if(opts.enableDrawingTool){this.enableDrawingTool()
}if(opts.sorptionDistance!==undefined){this.setSorptionDistance(opts.sorptionDistance)
}if(opts.enableDrawingTool){var drawingTool=new DrawingTool(this,opts.drawingToolOptions);
this._drawingTool=drawingTool;map.addControl(drawingTool)}if(opts.enableCalculate===true){this.enableCalculate()
}else{this.disableCalculate()}if(opts.enbaleLimit===true){var limit=opts.limitOptions;
this.limit=limit}if(opts.enableSorption===true){this.enableSorption()}else{this.disableSorption()
}if(opts.enableGpc===true){this.enableGpc()}else{this.disableGpc()}this._isOpen=!!(opts.isOpen===true);
if(this._isOpen){this._open()}this.setPolygonOptions(opts.polygonOptions);this.setMarkerOptions(opts.markerOptions);
this.setCircleOptions(opts.circleOptions);this.setPolylineOptions(opts.polylineOptions);
this.setRectangleOptions(opts.rectangleOptions);this.setLabelOptions(opts.labelOptions);
this.controlButton=opts.controlButton=="right"?"right":"left"};DrawingManager.prototype.enableDrawingTool=function(){var opts=this._opts;
if(!this._drawingTool){var drawingTool=new DrawingTool(this,opts.drawingToolOptions);
this._drawingTool=drawingTool}this._map.addControl(this._drawingTool)};DrawingManager.prototype.disableDrawingTool=function(){if(this._drawingTool){this._map.removeControl(this._drawingTool)
}};DrawingManager.prototype.setSorptionDistance=function(distance){this._sorptionDistance=distance||0
};DrawingManager.prototype.setPolygonOptions=function(options){this.polygonOptions=options||{}
};DrawingManager.prototype.setMarkerOptions=function(options){this.markerOptions=options||{}
};DrawingManager.prototype.setCircleOptions=function(options){this.circleOptions=options||{}
};DrawingManager.prototype.setPolylineOptions=function(options){this.polylineOptions=options||{}
};DrawingManager.prototype.setRectangleOptions=function(options){this.rectangleOptions=options||{}
};DrawingManager.prototype.setLabelOptions=function(options){this.labelOptions=options||{}
};DrawingManager.prototype._open=function(){this._isOpen=true;if(!this._mask){this._mask=new Mask()
}this._map.addOverlay(this._mask);this._setDrawingMode(this._drawingType)};DrawingManager.prototype._setDrawingMode=function(drawingType){this._drawingType=drawingType;
if(this._isOpen){this._mask.__listeners={};switch(drawingType){case BMAP_DRAWING_MARKER:this._bindMarker();
break;case BMAP_DRAWING_CIRCLE:this._bindCircle();break;case BMAP_DRAWING_POLYLINE:case BMAP_DRAWING_POLYGON:this._bindPolylineOrPolygon();
break;case BMAP_DRAWING_RECTANGLE:this._bindRectangle();break}}if(this._drawingTool&&this._isOpen){this._drawingTool.setStyleByDrawingMode(drawingType)
}};DrawingManager.prototype._close=function(){this._isOpen=false;if(this._mask){this._map.removeOverlay(this._mask)
}if(this._drawingTool){this._drawingTool.setStyleByDrawingMode("hander")}};DrawingManager.prototype._bindMarker=function(){var me=this,map=this._map,mask=this._mask;
var clickAction=function(e){var marker=new BMap.Marker(e.point,me.markerOptions);
map.addOverlay(marker);me._dispatchOverlayComplete(marker)};mask.addEventListener("click",clickAction)
};var tip_label=null;DrawingManager.prototype._bindCircle=function(){var me=this,map=this._map,mask=this._mask,circle=null,overlays=[],centerPoint=null;
var radius=null;var moveMarker=null;var polyline=null;var radiusWindow=null;var operateWindow=null;
var lineStyel={strokeColor:"#4E6DF1",strokeWeight:2};var centerIcon=new BMap.Icon("./images/circenter.png",new BMap.Size(20,20));
var shadow=new BMap.Icon("./images/maker-shadow.png",new BMap.Size(21,33));var startAction=function(e){if(me.controlButton=="right"&&(e.button==1||e.button==0)){return
}centerPoint=e.point;var centerMarker=new BMap.Marker(centerPoint);centerIcon.setImageSize(new BMap.Size(20,20));
centerMarker.setIcon(centerIcon);centerMarker.setShadow(shadow);centerMarker.enableDragging();
centerMarker.addEventListener("dragstart",centerDragstart);centerMarker.addEventListener("dragging",centerDragging);
centerMarker.addEventListener("dragend",centerDragend);map.addOverlay(centerMarker);
overlays.push(centerMarker);circle=new BMap.Circle(centerPoint,0,me.circleOptions);
map.addOverlay(circle);mask.enableEdgeMove();mask.addEventListener("mousemove",moveAction);
baidu.on(document,"mouseup",endAction)};var moveAction=function(e){radius=me._map.getDistance(centerPoint,e.point).toFixed(0);
circle.setRadius(me._map.getDistance(centerPoint,e.point));map.removeOverlay(tip_label);
tip_label=new BMap.Label("半径："+radius+"米<br>松开完成绘制",{position:e.point,offset:new BMap.Size(10,10)});
tip_label.setStyle(me.labelOptions);map.addOverlay(tip_label)};var endAction=function(e){var cz=map.getViewport(circle.getBounds());
cz.zoom-=1;map.setViewport(cz);map.removeOverlay(tip_label);var endPoint=new BMap.Point(circle.getBounds().getNorthEast().lng,centerPoint.lat);
mask.hide();moveMarker=new BMap.Marker(endPoint);var moveIcon=new BMap.Icon("./images/nbsearch2.png",new BMap.Size(40,20));
moveIcon.setImageSize(new BMap.Size(40,40));moveIcon.setImageOffset(new BMap.Size(0,-10));
moveMarker.setIcon(moveIcon);moveMarker.setShadow(shadow);moveMarker.enableDragging();
polyline=new BMap.Polyline([centerPoint,endPoint],lineStyel);var midPoint=new BMap.Point((circle.getBounds().getNorthEast().lng+centerPoint.lng)/2,centerPoint.lat);
radiusWindow=new Screenshot("circle",midPoint,radius,circle,me);overlays=overlays.concat([moveMarker,polyline,radiusWindow]);
var limit=null;if(me.limit){limit=me.limit.area}var targetOverlay={limit:limit,type:"circle",point:endPoint,overlay:circle,overlays:overlays};
operateWindow=new Operate(targetOverlay,me);map.addOverlay(moveMarker);map.addOverlay(polyline);
map.addOverlay(radiusWindow);map.addOverlay(operateWindow);radiusWindow.addEventListener("radiuschange",function(e){var radius=e.radius;
circle.setRadius(radius);var ePoint=getPointByDistance(centerPoint,radius,"east");
var dragLeftPoint=new BMap.Point(ePoint.lng,centerPoint.lat);var halflng=ePoint.lng>centerPoint.lng?(circle.getBounds().getNorthEast().lng+centerPoint.lng)/2:(circle.getBounds().getSouthWest().lng+centerPoint.lng)/2;
var halfLeftPoint=new BMap.Point(halflng,centerPoint.lat);moveMarker.setPosition(dragLeftPoint);
radiusWindow.setInfo(halfLeftPoint,radius);operateWindow.setPosition(dragLeftPoint,true);
operateWindow.updateWindow();polyline.setPath([centerPoint,dragLeftPoint]);var cz=map.getViewport(circle.getBounds());
cz.zoom-=1;map.setViewport(cz)});moveMarker.addEventListener("dragging",function(e){var dragLeftPoint=new BMap.Point(e.point.lng,centerPoint.lat);
var halflng=e.point.lng>centerPoint.lng?(circle.getBounds().getNorthEast().lng+centerPoint.lng)/2:(circle.getBounds().getSouthWest().lng+centerPoint.lng)/2;
var isright=e.point.lng>centerPoint.lng?true:false;var halfLeftPoint=new BMap.Point(halflng,centerPoint.lat);
e.target.setPosition(dragLeftPoint);radiusWindow.setInfo(halfLeftPoint,me._map.getDistance(centerPoint,e.point).toFixed(0));
operateWindow.setPosition(dragLeftPoint,isright);polyline.setPath([centerPoint,dragLeftPoint]);
radius=me._map.getDistance(centerPoint,e.point).toFixed(0);circle.setRadius(me._map.getDistance(centerPoint,e.point))
});moveMarker.addEventListener("dragend",function(e){operateWindow.updateWindow();
var cz=map.getViewport(circle.getBounds());cz.zoom-=1;map.setViewport(cz)});mask.disableEdgeMove();
mask.removeEventListener("mousemove",moveAction);mask.removeEventListener("mousemove",mousedownAction);
baidu.un(document,"mouseup",endAction)};var mousedownAction=function(e){baidu.preventDefault(e);
baidu.stopBubble(e);if(me.controlButton=="right"&&e.button==1){return}if(centerPoint==null){startAction(e)
}};var mousemoveAction=function(e){baidu.preventDefault(e);baidu.stopBubble(e);map.removeOverlay(tip_label);
tip_label=new BMap.Label("按下确认中心点，拖拽确认半径",{position:e.point,offset:new BMap.Size(10,10)});
tip_label.setStyle(me.labelOptions);map.addOverlay(tip_label)};var centerDragstart=function(e){map.removeOverlay(moveMarker);
map.removeOverlay(polyline);map.removeOverlay(radiusWindow);map.removeOverlay(operateWindow)
};var centerDragging=function(e){centerPoint=e.point;circle.setCenter(e.point)};var centerDragend=function(e){centerPoint=e.point;
endAction(e)};mask.addEventListener("mousedown",mousedownAction);mask.addEventListener("mousemove",mousemoveAction)
};DrawingManager.prototype._bindPolylineOrPolygon=function(){var me=this,map=this._map,mask=this._mask,points=[],drawPoint=null,overlay=null,match=null,isBinded=false;
function getNorthEast(){var bound=arguments[0];var maxlng=0;var index=0;for(var j=0;
j<bound.length;j++){if(maxlng<bound[j].lng){maxlng=bound[j].lng;index=j}}return bound[index]
}var startAction=function(e){if(me.controlButton=="right"&&(e.button==1||e.button==0)){return
}var point=e.point;if(match){point=match}points.push(point);drawPoint=points.concat(points[points.length-1]);
if(points.length==1){if(me._drawingType==BMAP_DRAWING_POLYLINE){overlay=new BMap.Polyline(drawPoint,me.polylineOptions)
}else{if(me._drawingType==BMAP_DRAWING_POLYGON){overlay=new BMap.Polygon(drawPoint,me.polygonOptions)
}}map.addOverlay(overlay)}else{overlay.setPath(drawPoint)}if(!isBinded){isBinded=true;
mask.enableEdgeMove();mask.removeEventListener("mousemove",mousemoveAction);mask.addEventListener("mousemove",moveAction);
mask.addEventListener("dblclick",dblclickAction)}};var moveAction=function(e){var point=e.point;
if(me._enableSorption){var matchs=me.getSorptionMatch(point,me.overlays,me._sorptionDistance);
if(matchs&&matchs.length>0){match=matchs[0].point;overlay.setPositionAt(drawPoint.length-1,matchs[0].point);
return}}match=null;overlay.setPositionAt(drawPoint.length-1,e.point);map.removeOverlay(tip_label);
tip_label=new BMap.Label("单击绘制下一个点，双击完成绘制",{position:e.point,offset:new BMap.Size(10,10)});
tip_label.setStyle(me.labelOptions);map.addOverlay(tip_label)};var dblclickAction=function(e){baidu.stopBubble(e);
isBinded=false;map.removeOverlay(tip_label);mask.disableEdgeMove();mask.removeEventListener("mousedown",startAction);
mask.removeEventListener("mousemove",moveAction);mask.removeEventListener("mousemove",mousemoveAction);
mask.removeEventListener("dblclick",dblclickAction);if(me.controlButton=="right"){points.push(e.point)
}else{if(baidu.ie<=8){}else{points.pop()}}try{if(me._enableGpc&&window.gpcas){var res=new gpcas.geometry.PolyDefault();
for(var i=0;i<points.length;i++){res.addPoint(new gpcas.Point(points[i].lng,points[i].lat))
}for(var j=0;j<me.overlays.length;j++){var path=me.overlays[j].getPath();var target=new gpcas.geometry.PolyDefault();
for(var i=0;i<path.length;i++){target.addPoint(new gpcas.Point(path[i].lng,path[i].lat))
}var diff=res.difference(target);var newPoints=diff.getPoints();var outPoints=[];
for(var i=0;i<newPoints.length;i++){outPoints.push(new BMap.Point(newPoints[i].x,newPoints[i].y))
}res=new gpcas.geometry.PolyDefault();for(var i=0;i<newPoints.length;i++){res.addPoint(new gpcas.Point(newPoints[i].x,newPoints[i].y))
}points=outPoints}}}catch(e){}overlay.setPath(points);var cz=map.getViewport(points);
cz.zoom-=1;map.setViewport(cz);var mar=new BMap.Marker(e.point);overlay.enableEditing();
var limit=null;if(me.limit){limit=me.limit.area}var targetOverlay={limit:limit,type:"polygon",point:getNorthEast(points),overlay:overlay,overlays:[]};
var operateWindow=new Operate(targetOverlay,me);map.addOverlay(operateWindow);overlay.addEventListener("lineupdate",function(e){var point=getNorthEast(e.currentTarget.getPath());
operateWindow.setPosition(point,true);operateWindow.updateWindow()});points.length=0;
drawPoint.length=0;me.close()};var mousemoveAction=function(e){baidu.preventDefault(e);
baidu.stopBubble(e);map.removeOverlay(tip_label);tip_label=new BMap.Label("单击确认起点",{position:e.point,offset:new BMap.Size(10,10)});
tip_label.setStyle(me.labelOptions);map.addOverlay(tip_label)};mask.addEventListener("mousemove",mousemoveAction);
mask.addEventListener("mousedown",startAction);mask.addEventListener("dblclick",function(e){baidu.stopBubble(e)
})};DrawingManager.prototype._bindRectangle=function(){var me=this,map=this._map,mask=this._mask,polygon=null,startPoint=null;
function getRectAllPoints(pointA,pointB){var pointLT=new BMap.Point(pointA.lng,pointA.lat);
var pointRT=new BMap.Point(pointB.lng,pointA.lat);var pointRB=new BMap.Point(pointB.lng,pointB.lat);
var pointLB=new BMap.Point(pointA.lng,pointB.lat);var pointTC=new BMap.Point((pointA.lng+pointB.lng)/2,pointA.lat);
var pointRC=new BMap.Point(pointB.lng,(pointA.lat+pointB.lat)/2);var pointBC=new BMap.Point((pointA.lng+pointB.lng)/2,pointB.lat);
var pointLC=new BMap.Point(pointA.lng,(pointA.lat+pointB.lat)/2);return[pointLT,pointTC,pointRT,pointRC,pointRB,pointBC,pointLB,pointLC]
}function copy(o){var output,v,key;output=Array.isArray(o)?[]:{};for(key in o){v=o[key];
output[key]=(typeof v==="object")?copy(v):v}return output}var moveIcon=new BMap.Icon("./images/bullet2.png",new BMap.Size(10,10));
var shadow=new BMap.Icon("./images/maker-shadow.png",new BMap.Size(20,20));moveIcon.setImageSize(new BMap.Size(10,10));
var startAction=function(e){baidu.stopBubble(e);baidu.preventDefault(e);if(me.controlButton=="right"&&(e.button==1||e.button==0)){return
}startPoint=e.point;var endPoint=startPoint;polygon=new BMap.Polygon(me._getRectanglePoint(startPoint,endPoint),me.rectangleOptions);
map.addOverlay(polygon);mask.enableEdgeMove();mask.addEventListener("mousemove",moveAction);
baidu.on(document,"mouseup",endAction)};var moveAction=function(e){map.removeOverlay(tip_label);
polygon.setPath(me._getRectanglePoint(startPoint,e.point));var points=getRectAllPoints(startPoint,e.point);
var width=me._map.getDistance(startPoint,points[2]).toFixed(0);var height=me._map.getDistance(startPoint,points[6]).toFixed(0);
tip_label=new BMap.Label("尺寸："+width+"米 x "+height+"米<br>松开结束绘制",{position:e.point,offset:new BMap.Size(10,10)});
tip_label.setStyle(me.labelOptions);map.addOverlay(tip_label)};var endAction=function(e){mask.hide();
var endPoint=null;var markers=[];var points=getRectAllPoints(startPoint,e.point);
var pointsTmp=copy(points);var cz=map.getViewport(points);cz.zoom-=1;map.setViewport(cz);
var width=me._map.getDistance(startPoint,points[2]).toFixed(0);var height=me._map.getDistance(startPoint,points[6]).toFixed(0);
var rectInfo=new Screenshot("rectangle",points[0],{width:width,height:height},polygon,me);
for(var i=0;i<points.length;i++){var marker=new BMap.Marker(points[i]);marker.point=points[i];
marker.enableDragging();marker.setIcon(moveIcon);marker.setShadow(shadow);markers.push(marker);
map.addOverlay(marker);marker.addEventListener("mousedown",function(e){endPoint=e.target.point
});marker.addEventListener("dragging",function(e){var point=e.point;for(var i=0;i<pointsTmp.length;
i++){if(endPoint.lng==pointsTmp[i].lng){points[i].lng=point.lng}if(endPoint.lat==pointsTmp[i].lat){points[i].lat=point.lat
}}points=getRectAllPoints(points[0],points[4]);for(var j=0;j<markers.length;j++){markers[j].setPosition(points[j])
}width=me._map.getDistance(points[0],points[2]).toFixed(0);height=me._map.getDistance(points[0],points[6]).toFixed(0);
rectInfo.setInfo(points[0],{width:width,height:height});operateWindow.setPosition(points[3],true);
polygon.setPath(points)});marker.addEventListener("dragend",function(e){pointsTmp=copy(points);
operateWindow.updateWindow();var cz=map.getViewport(points);cz.zoom-=1;map.setViewport(cz)
})}rectInfo.addEventListener("rectwhchange",function(e){var width=e.width;var height=e.height;
var pointx=getPointByDistance(points[0],width,"east");var pointy=getPointByDistance(points[0],height,"south");
points[4].lng=pointx.lng;points[4].lat=pointy.lat;points=getRectAllPoints(points[0],points[4]);
for(var j=0;j<markers.length;j++){markers[j].setPosition(points[j])}rectInfo.setInfo(points[0],{width:width,height:height});
operateWindow.setPosition(points[3],true);polygon.setPath(points);pointsTmp=copy(points);
operateWindow.updateWindow();var cz=map.getViewport(points);cz.zoom-=1;map.setViewport(cz)
});var overlays=[markers,rectInfo];var limit=null;if(me.limit){limit=me.limit.area
}var overlay={limit:limit,type:"rectangle",point:points[3],overlay:polygon,overlays:overlays};
var operateWindow=new Operate(overlay,me);map.addOverlay(operateWindow);map.addOverlay(rectInfo);
map.removeOverlay(tip_label);mask.disableEdgeMove();mask.removeEventListener("mousemove",moveAction);
mask.removeEventListener("mousemove",mousemoveAction);baidu.un(document,"mouseup",endAction)
};var mousemoveAction=function(e){baidu.preventDefault(e);baidu.stopBubble(e);map.removeOverlay(tip_label);
tip_label=new BMap.Label("按住确认起点，拖拽进行绘制",{position:e.point,offset:new BMap.Size(10,10)});
tip_label.setStyle(me.labelOptions);map.addOverlay(tip_label)};mask.addEventListener("mousedown",startAction);
mask.addEventListener("mousemove",mousemoveAction)};DrawingManager.prototype._calculate=function(overlay,point){var result={data:0,label:null};
if(this._enableCalculate&&BMapLib.GeoUtils){var type=overlay.toString();switch(type){case"[object Polyline]":result.data=BMapLib.GeoUtils.getPolylineDistance(overlay);
break;case"[object Polygon]":result.data=BMapLib.GeoUtils.getPolygonArea(overlay);
break;case"[object Circle]":var radius=overlay.getRadius();result.data=Math.PI*radius*radius;
break}if(!result.data||result.data<0){result.data=0}else{result.data=result.data.toFixed(2)
}}return result};DrawingManager.prototype._addGeoUtilsLibrary=function(){if(!BMapLib.GeoUtils){var script=document.createElement("script");
script.setAttribute("type","text/javascript");script.setAttribute("src","//huiyan-fe.github.io/BMap-JavaScript-library/src/GeoUtils/GeoUtils.min.js");
document.body.appendChild(script)}};DrawingManager.prototype._addLabel=function(point,content){var label=new BMap.Label(content,{position:point});
this._map.addOverlay(label);return label};DrawingManager.prototype._getRectanglePoint=function(startPoint,endPoint){return[new BMap.Point(startPoint.lng,startPoint.lat),new BMap.Point(endPoint.lng,startPoint.lat),new BMap.Point(endPoint.lng,endPoint.lat),new BMap.Point(startPoint.lng,endPoint.lat)]
};DrawingManager.prototype._dispatchOverlayComplete=function(overlay,calculate){var options={overlay:overlay,drawingMode:this._drawingType};
if(calculate){options.calculate=calculate.data||null;options.label=calculate.label||null
}this.dispatchEvent(this._drawingType+"complete",overlay);this.dispatchEvent("overlaycomplete",options)
};DrawingManager.prototype.getSorptionMatch=function(point,polygons,distance){distance=distance||20;
var map=this._map;var P=map.pointToPixel(point);var match=[];for(var j=0;j<polygons.length;
j++){var pixels=polygons[j].getPath();var first=pixels[0];var last=pixels[pixels.length-1];
if(!first.equals(last)){pixels.push(pixels[0])}for(var i=1;i<pixels.length;i++){var A=map.pointToPixel(pixels[i-1]);
var B=map.pointToPixel(pixels[i]);var vAP=[P.x-A.x,P.y-A.y];var vAB=[B.x-A.x,B.y-A.y];
var vPB=[B.x-P.x,B.y-P.y];var cAPAB=vAP[0]*vAB[0]+vAP[1]*vAB[1];var lAPAB=Math.sqrt(Math.pow(vAP[0],2)+Math.pow(vAP[1],2))*Math.sqrt(Math.pow(vAB[0],2)+Math.pow(vAB[1],2));
var rPAB=Math.acos(cAPAB/lAPAB);var cABPB=vAB[0]*vPB[0]+vAB[1]*vPB[1];var lABPB=Math.sqrt(Math.pow(vAB[0],2)+Math.pow(vAB[1],2))*Math.sqrt(Math.pow(vPB[0],2)+Math.pow(vPB[1],2));
var rPBA=Math.acos(cABPB/lABPB);if(rPAB<Math.PI/2&&rPBA<Math.PI/2){var lAP=Math.sqrt(Math.pow(vAP[0],2)+Math.pow(vAP[1],2));
var lAB=Math.sqrt(Math.pow(vAB[0],2)+Math.pow(vAB[1],2));var lAO=Math.cos(rPAB)*lAP;
var pAOAB=lAO/lAB;var lPO=Math.sin(rPAB)*lAP;var O=[A.x+vAB[0]*pAOAB,A.y+vAB[1]*pAOAB];
if(lPO<distance){match.push({point:map.pixelToPoint({x:O[0],y:O[1]}),length:lPO})
}}}}match.sort(function(a,b){return a.length-b.length});var ret=match.length>0?match:null;
return ret};function Operate(data,DrawingManager){this.limit=data.limit;this.type=data.type;
this.point=data.point;this.overlay=data.overlay;this.overlays=data.overlays;this.DrawingManager=DrawingManager
}Operate.prototype=new BMap.Overlay();Operate.prototype.dispatchEvent=baidu.lang.Class.prototype.dispatchEvent;
Operate.prototype.addEventListener=baidu.lang.Class.prototype.addEventListener;Operate.prototype.removeEventListener=baidu.lang.Class.prototype.removeEventListener;
Operate.prototype.initialize=function(map){var me=this;this._map=map;var div=this.div=document.createElement("div");
div.className="operateWindow";var html='<div><span id="confirmOperate"></span><span id="cancelOperate"></span><span id="warnOperate">面积不超过'+this.limit/10000+"万平方米！</span></div>";
div.innerHTML=html;this._map.addEventListener("resize",function(e){me._adjustSize(e.size)
});this._map.getPanes().markerPane.appendChild(div);this.updateWindow();this._bind();
return div};Operate.prototype._bind=function(){var that=this;var map=this._map;var overlay=this.overlay;
var overlays=this.overlays;document.getElementById("confirmOperate").addEventListener("click",function(e){map.removeOverlay(that);
if(that.type=="rectangle"){var calculate=that.DrawingManager._calculate(overlay,overlay.getPath())
}else{if(that.type=="circle"){var calculate=that.DrawingManager._calculate(overlay,that.point)
}else{if(that.type=="polygon"){var calculate=that.DrawingManager._calculate(overlay,(overlay.getPath()));
that.DrawingManager.overlays.push(overlay);overlay.disableEditing()}}}that.DrawingManager._dispatchOverlayComplete(overlay,calculate);
for(var i=0;i<overlays.length;i++){if(Array.isArray(overlays[i])){for(var k in overlays[i]){map.removeOverlay(overlays[i][k])
}}else{map.removeOverlay(overlays[i])}}that.DrawingManager.close()});document.getElementById("cancelOperate").addEventListener("click",function(e){map.removeOverlay(that);
for(var i=0;i<overlays.length;i++){if(Array.isArray(overlays[i])){for(var k in overlays[i]){map.removeOverlay(overlays[i][k])
}}else{map.removeOverlay(overlays[i])}}map.removeOverlay(overlay);that.DrawingManager._mask.show();
that.DrawingManager._setDrawingMode(that.type)})};Operate.prototype.updateWindow=function(){var overlay=this.overlay;
var overlays=this.overlays;var limit=this.limit;var calculate;if(this.type=="rectangle"){calculate=this.DrawingManager._calculate(overlay,overlay.getPath())
}else{if(this.type=="circle"){calculate=this.DrawingManager._calculate(overlay,this.point)
}else{if(this.type=="polygon"){calculate=this.DrawingManager._calculate(overlay,(overlay.getPath()))
}}}if(Object.prototype.toString.call(limit)==="[object Number]"&&calculate.data>limit){document.getElementById("confirmOperate").style.display="none";
document.getElementById("warnOperate").style.display="block"}else{document.getElementById("confirmOperate").style.display="block";
document.getElementById("warnOperate").style.display="none"}};Operate.prototype.setPosition=function(point,isright){this.point=point;
var map=this._map,pixel=map.pointToOverlayPixel(this.point);if(isright){this.div.classList.remove("operateLeft");
this.div.style.left=pixel.x+15+"px"}else{this.div.classList.add("operateLeft");this.div.style.left=pixel.x-105+"px"
}this.div.style.top=pixel.y-16+"px"};Operate.prototype.draw=function(){var map=this._map,pixel=map.pointToOverlayPixel(this.point);
this.div.style.left=pixel.x+15+"px";this.div.style.top=pixel.y-16+"px"};function Screenshot(type,point,number,overlay,DrawingManager){this.type=type;
this.point=point;this.number=number;this.overlay=overlay;this.DrawingManager=DrawingManager
}Screenshot.prototype=new BMap.Overlay();Screenshot.prototype.dispatchEvent=baidu.lang.Class.prototype.dispatchEvent;
Screenshot.prototype.addEventListener=baidu.lang.Class.prototype.addEventListener;
Screenshot.prototype.removeEventListener=baidu.lang.Class.prototype.removeEventListener;
Screenshot.prototype.initialize=function(map){var me=this;this._map=map;var div=this.div=document.createElement("div");
div.className="screenshot";if(this.type=="circle"){var html='<div class="circlShot"><span id="screenshotNum">'+this.number+'</span><input id="circleInput" type="text" /><span class="unit">米</span></div>'
}else{if(this.type=="rectangle"){var html='<div class="rectWH"><div class="wh"><span id="rectWidth">'+this.number.width+'</span><input id="rectWidthInput" type="text" /></div><span class="multiple">x</span><div class="wh"><span id="rectHeight">'+this.number.height+'</span><input id="rectHeightInput" type="text" /></div><span class="unit">米</span></div>'
}}div.innerHTML=html;this._map.addEventListener("resize",function(e){me._adjustSize(e.size)
});this._map.getPanes().markerPane.appendChild(div);this._bind();return div};Screenshot.prototype._bind=function(){this.setNumber(this.number);
if(this.type=="circle"){this.bindCircleEvent()}else{this.bindRectEvent()}};Screenshot.prototype.bindCircleEvent=function(){var that=this;
var circleSpn=document.getElementById("screenshotNum");var circleInput=document.getElementById("circleInput");
circleSpn.addEventListener("click",function(e){var val=circleSpn.innerText;circleSpn.style.display="none";
circleInput.value=val;circleInput.style.display="inline-block";circleInput.focus()
});circleInput.addEventListener("click",function(e){circleInput.focus()});circleInput.addEventListener("keydown",function(e){if(e.keyCode===13){var val=circleInput.value;
circleInput.style.display="none";circleSpn.style.display="inline-block";circleSpn.innerText=val;
var opt={radius:val,overlay:that.overlay};that._dispatchRadiusChange(opt)}});circleInput.addEventListener("blur",function(e){var val=circleInput.value;
circleInput.style.display="none";circleSpn.style.display="inline-block";circleSpn.innerText=val;
var opt={radius:val,overlay:that.overlay};that._dispatchRadiusChange(opt)})};Screenshot.prototype.bindRectEvent=function(){var that=this;
var rectWidthSpn=document.getElementById("rectWidth");var rectWidthInput=document.getElementById("rectWidthInput");
var rectHeightSpn=document.getElementById("rectHeight");var rectHeightInput=document.getElementById("rectHeightInput");
rectWidthInput.value=rectWidthSpn.innerText;rectHeightInput.value=rectHeightSpn.innerText;
rectWidthSpn.addEventListener("click",function(e){var val=rectWidthSpn.innerText;
rectWidthSpn.style.display="none";rectWidthInput.value=val;rectWidthInput.style.display="inline-block";
rectWidthInput.focus()});rectHeightSpn.addEventListener("click",function(e){var val=rectHeightSpn.innerText;
rectHeightSpn.style.display="none";rectHeightInput.value=val;rectHeightInput.style.display="inline-block";
rectHeightInput.focus()});rectWidthInput.addEventListener("click",function(e){rectWidthInput.focus()
});rectHeightInput.addEventListener("click",function(e){rectHeightInput.focus()});
rectWidthInput.addEventListener("keydown",function(e){if(e.keyCode===13){var widthVal=rectWidthInput.value;
var heightVal=rectHeightInput.value;rectWidthInput.style.display="none";rectHeightInput.style.display="none";
rectWidthSpn.style.display="inline-block";rectHeightSpn.style.display="inline-block";
rectWidthSpn.innerText=widthVal;rectHeightSpn.innerText=heightVal;var opt={width:widthVal,height:heightVal,overlay:that.overlay};
that._dispatchRectWHChange(opt)}});rectHeightInput.addEventListener("keydown",function(e){if(e.keyCode===13){var widthVal=rectWidthInput.value;
var heightVal=rectHeightInput.value;rectWidthInput.style.display="none";rectHeightInput.style.display="none";
rectWidthSpn.style.display="inline-block";rectHeightSpn.style.display="inline-block";
rectWidthSpn.innerText=widthVal;rectHeightSpn.innerText=heightVal;var opt={width:widthVal,height:heightVal,overlay:that.overlay};
that._dispatchRectWHChange(opt)}})};Screenshot.prototype.setInfo=function(point,number){this.setNumber(number);
this.setPosition(point)};Screenshot.prototype.setNumber=function(number){if(this.type=="circle"){document.getElementById("screenshotNum").textContent=number
}else{document.getElementById("rectWidth").textContent=number.width;document.getElementById("rectHeight").textContent=number.height
}};Screenshot.prototype.setPosition=function(point){this.point=point;var map=this._map,type=this.type,pixel=map.pointToOverlayPixel(this.point);
if(type=="circle"){this.div.style.left=pixel.x-30+"px";this.div.style.top=pixel.y-40+"px"
}else{if(type=="rectangle"){this.div.style.left=pixel.x+"px";this.div.style.top=pixel.y-45+"px"
}}};Screenshot.prototype.draw=function(){var map=this._map,type=this.type,pixel=map.pointToOverlayPixel(this.point);
if(type=="circle"){this.div.style.left=pixel.x-30+"px";this.div.style.top=pixel.y-40+"px"
}else{if(type=="rectangle"){this.div.style.left=pixel.x+"px";this.div.style.top=pixel.y-45+"px"
}}};Screenshot.prototype._dispatchRadiusChange=function(opt){this.dispatchEvent("radiuschange",opt)
};Screenshot.prototype._dispatchRectWHChange=function(opt){this.dispatchEvent("rectwhchange",opt)
};function Mask(){this._enableEdgeMove=false}Mask.prototype=new BMap.Overlay();Mask.prototype.dispatchEvent=baidu.lang.Class.prototype.dispatchEvent;
Mask.prototype.addEventListener=baidu.lang.Class.prototype.addEventListener;Mask.prototype.removeEventListener=baidu.lang.Class.prototype.removeEventListener;
Mask.prototype.initialize=function(map){var me=this;this._map=map;var div=this.container=document.createElement("div");
var size=this._map.getSize();div.style.cssText="position:absolute;background:url(about:blank);cursor:crosshair;width:"+size.width+"px;height:"+size.height+"px";
this._map.addEventListener("resize",function(e){me._adjustSize(e.size)});this._map.getPanes().floatPane.appendChild(div);
this._bind();return div};Mask.prototype.draw=function(){var map=this._map,point=map.pixelToPoint(new BMap.Pixel(0,0)),pixel=map.pointToOverlayPixel(point);
this.container.style.left=pixel.x+"px";this.container.style.top=pixel.y+"px"};Mask.prototype.enableEdgeMove=function(){this._enableEdgeMove=true
};Mask.prototype.disableEdgeMove=function(){clearInterval(this._edgeMoveTimer);this._enableEdgeMove=false
};Mask.prototype._bind=function(){var me=this,map=this._map,container=this.container,lastMousedownXY=null,lastClickXY=null;
var getXYbyEvent=function(e){return{x:e.clientX,y:e.clientY}};var domEvent=function(e){var type=e.type;
e=baidu.getEvent(e);point=me.getDrawPoint(e);var dispatchEvent=function(type){e.point=point;
me.dispatchEvent(e)};if(type=="mousedown"){lastMousedownXY=getXYbyEvent(e)}var nowXY=getXYbyEvent(e);
if(type=="click"){if(Math.abs(nowXY.x-lastMousedownXY.x)<5&&Math.abs(nowXY.y-lastMousedownXY.y)<5){if(!lastClickXY||!(Math.abs(nowXY.x-lastClickXY.x)<5&&Math.abs(nowXY.y-lastClickXY.y)<5)){dispatchEvent("click");
lastClickXY=getXYbyEvent(e)}else{lastClickXY=null}}}else{dispatchEvent(type)}};var events=["click","mousedown","mousemove","mouseup","dblclick"],index=events.length;
while(index--){baidu.on(container,events[index],domEvent)}baidu.on(container,"mousemove",function(e){if(me._enableEdgeMove){me.mousemoveAction(e)
}})};Mask.prototype.mousemoveAction=function(e){function getClientPosition(e){var clientX=e.clientX,clientY=e.clientY;
if(e.changedTouches){clientX=e.changedTouches[0].clientX;clientY=e.changedTouches[0].clientY
}return new BMap.Pixel(clientX,clientY)}var map=this._map,me=this,pixel=map.pointToPixel(this.getDrawPoint(e)),clientPos=getClientPosition(e),offsetX=clientPos.x-pixel.x,offsetY=clientPos.y-pixel.y;
pixel=new BMap.Pixel((clientPos.x-offsetX),(clientPos.y-offsetY));this._draggingMovePixel=pixel;
var point=map.pixelToPoint(pixel),eventObj={pixel:pixel,point:point};this._panByX=this._panByY=0;
if(pixel.x<=20||pixel.x>=map.width-20||pixel.y<=50||pixel.y>=map.height-10){if(pixel.x<=20){this._panByX=8
}else{if(pixel.x>=map.width-20){this._panByX=-8}}if(pixel.y<=50){this._panByY=8}else{if(pixel.y>=map.height-10){this._panByY=-8
}}if(!this._edgeMoveTimer){this._edgeMoveTimer=setInterval(function(){map.panBy(me._panByX,me._panByY,{noAnimation:true})
},30)}}else{if(this._edgeMoveTimer){clearInterval(this._edgeMoveTimer);this._edgeMoveTimer=null
}}};Mask.prototype._adjustSize=function(size){this.container.style.width=size.width+"px";
this.container.style.height=size.height+"px"};Mask.prototype.getDrawPoint=function(e){var map=this._map,trigger=baidu.getTarget(e),x=e.offsetX||e.layerX||0,y=e.offsetY||e.layerY||0;
if(trigger.nodeType!=1){trigger=trigger.parentNode}while(trigger&&trigger!=map.getContainer()){if(!(trigger.clientWidth==0&&trigger.clientHeight==0&&trigger.offsetParent&&trigger.offsetParent.nodeName=="TD")){x+=trigger.offsetLeft||0;
y+=trigger.offsetTop||0}trigger=trigger.offsetParent}var pixel=new BMap.Pixel(x,y);
var point=map.pixelToPoint(pixel);return point};function DrawingTool(drawingManager,drawingToolOptions){this.drawingManager=drawingManager;
drawingToolOptions=this.drawingToolOptions=drawingToolOptions||{};if(!drawingToolOptions.hasCustomStyle){this.defaultAnchor=BMAP_ANCHOR_TOP_LEFT;
this.defaultOffset=new BMap.Size(10,10)}this.defaultDrawingModes=[BMAP_DRAWING_MARKER,BMAP_DRAWING_CIRCLE,BMAP_DRAWING_POLYLINE,BMAP_DRAWING_POLYGON,BMAP_DRAWING_RECTANGLE];
if(drawingToolOptions.drawingModes){this.drawingModes=drawingToolOptions.drawingModes
}else{this.drawingModes=this.defaultDrawingModes}if(drawingToolOptions.hasCustomStyle){if(drawingToolOptions.anchor){this.setAnchor(drawingToolOptions.anchor)
}if(drawingToolOptions.offset){this.setOffset(drawingToolOptions.offset)}}}DrawingTool.prototype=new BMap.Control();
DrawingTool.prototype.initialize=function(map){var container=this.container=document.createElement("div");
container.className="BMapLib_Drawing";var panel=this.panel=document.createElement("div");
panel.className="BMapLib_Drawing_panel";if(this.drawingToolOptions&&!this.drawingToolOptions.hasCustomStyle&&this.drawingToolOptions.scale){this._setScale(this.drawingToolOptions.scale)
}container.appendChild(panel);var content=this._generalHtml();panel.appendChild(content);
var tip=this.tip=document.createElement("div");tip.className="BMapLib_tip";tip.innerHTML='<p class="BMapLib_tip_title"></p><p class="BMapLib_tip_text"></p>';
if(this.drawingToolOptions.enableTips===true){panel.appendChild(tip)}this._bind(panel);
if(this.drawingToolOptions.customContainer){baidu.g(this.drawingToolOptions.customContainer).appendChild(container)
}else{map.getContainer().appendChild(container)}return container};DrawingTool.prototype._generalHtml=function(map){var that=this;
var tips={};tips.hander="拖动地图";tips[BMAP_DRAWING_MARKER]="画点";tips[BMAP_DRAWING_CIRCLE]="圆形工具";
tips[BMAP_DRAWING_POLYLINE]="画折线";tips[BMAP_DRAWING_POLYGON]="多边形工具";tips[BMAP_DRAWING_RECTANGLE]="矩形工具";
var getItem=function(className,drawingType){var ele=document.createElement("a");ele.className=className;
ele.href="javascript:void(0)";ele.setAttribute("drawingType",drawingType);ele.setAttribute("onfocus","this.blur()");
ele.addEventListener("mouseenter",function(e){var drawingType=e.target.getAttribute("drawingType");
var title=tips[drawingType];if(drawingType==="hander"){that.tip.children[0].innerText=title;
that.tip.children[1].innerText="使用鼠标拖动地图"}else{that.tip.className+=" "+drawingType;
that.tip.children[0].innerText=title;that.tip.children[1].innerText="使用"+title+"选出目标区域"
}that.tip.style.display="block"});ele.addEventListener("mouseleave",function(e){var drawingType=e.target.getAttribute("drawingType");
var newClass=" "+that.tip.className.replace(/[\t\r\n]/g,"")+" ";while(newClass.indexOf(" "+drawingType+" ")>=0){newClass=newClass.replace(" "+drawingType+" "," ")
}that.tip.className=newClass.replace(/^\s+|\s+$/g,"");that.tip.style.display="none"
});return ele};var fragment=document.createDocumentFragment();for(var i=0,len=this.drawingModes.length;
i<len;i++){var classStr="BMapLib_box BMapLib_"+this.drawingModes[i];if(i==len-1){classStr+=" BMapLib_last"
}fragment.appendChild(getItem(classStr,this.drawingModes[i]))}return fragment};DrawingTool.prototype._setScale=function(scale){var width=390,height=50,ml=-parseInt((width-width*scale)/2,10),mt=-parseInt((height-height*scale)/2,10);
this.container.style.cssText=["-moz-transform: scale("+scale+");","-o-transform: scale("+scale+");","-webkit-transform: scale("+scale+");","transform: scale("+scale+");","margin-left:"+ml+"px;","margin-top:"+mt+"px;","*margin-left:0px;","*margin-top:0px;","margin-left:0px\\0;","margin-top:0px\\0;","filter: progid:DXImageTransform.Microsoft.Matrix(","M11="+scale+",","M12=0,","M21=0,","M22="+scale+",","SizingMethod='auto expand');"].join("")
};DrawingTool.prototype._bind=function(panel){var me=this;baidu.on(this.panel,"click",function(e){var target=baidu.getTarget(e);
var drawingType=target.getAttribute("drawingType");me.setStyleByDrawingMode(drawingType);
me._bindEventByDraingMode(drawingType)})};DrawingTool.prototype.setStyleByDrawingMode=function(drawingType){if(!drawingType){return
}var boxs=this.panel.getElementsByTagName("a");for(var i=0,len=boxs.length;i<len;
i++){var box=boxs[i];if(box.getAttribute("drawingType")==drawingType){var classStr="BMapLib_box BMapLib_"+drawingType+"_hover";
if(i==len-1){classStr+=" BMapLib_last"}box.className=classStr}else{box.className=box.className.replace(/_hover/,"")
}}};DrawingTool.prototype._bindEventByDraingMode=function(drawingType){var me=this;
var drawingManager=this.drawingManager;if(drawingManager._isOpen&&drawingManager.getDrawingMode()===drawingType){drawingManager.close();
drawingManager._map.enableDoubleClickZoom()}else{drawingManager.setDrawingMode(drawingType);
drawingManager.open();drawingManager._map.disableDoubleClickZoom()}};var instances=[];
function closeInstanceExcept(instance){var index=instances.length;while(index--){if(instances[index]!=instance){instances[index].close()
}}}function drawcircle(center,radius){var points=[];var cx=center.lng,cy=center.lat;
var d=radius/6378800,lat1=(Math.PI/180)*cy,lng1=(Math.PI/180)*cx;for(var i=0;i<271;
i+=9){var tc=(Math.PI/180)*i,y=Math.asin(Math.sin(lat1)*Math.cos(d)+Math.cos(lat1)*Math.sin(d)*Math.cos(tc)),dlng=Math.atan2(Math.sin(tc)*Math.sin(d)*Math.cos(lat1),Math.cos(d)-Math.sin(lat1)*Math.sin(y)),x=((lng1-dlng+Math.PI)%(2*Math.PI))-Math.PI,point=new BMap.Point(x*(180/Math.PI),y*(180/Math.PI));
points.push(point)}var fstPoint=points[0];points.push(new BMap.Point(fstPoint.lng,fstPoint.lat));
return points}function getPointByDistance(srcPoint,distance,direction){var cx=srcPoint.lng,cy=srcPoint.lat;
var d=distance/6378800,lat1=(Math.PI/180)*cy,lng1=(Math.PI/180)*cx;var i,tmplng,tmplat;
switch(direction){case"North":case"north":case"N":case"n":i=0;tmplng=srcPoint.lng;
break;case"West":case"west":case"W":case"w":i=90;tmplat=srcPoint.lat;break;case"South":case"south":case"S":case"s":i=180;
tmplng=srcPoint.lng;break;case"East":case"east":case"E":case"e":i=270;tmplat=srcPoint.lat;
break;default:i=~~direction;break}var tc=(Math.PI/180)*i,y=Math.asin(Math.sin(lat1)*Math.cos(d)+Math.cos(lat1)*Math.sin(d)*Math.cos(tc)),dlng=Math.atan2(Math.sin(tc)*Math.sin(d)*Math.cos(lat1),Math.cos(d)-Math.sin(lat1)*Math.sin(y)),x=((lng1-dlng+Math.PI)%(2*Math.PI))-Math.PI,point=new BMap.Point(tmplng||x*(180/Math.PI),tmplat||y*(180/Math.PI));
point.lng=parseFloat(point.lng.toFixed(6));point.lat=parseFloat(point.lat.toFixed(6));
return point}})();