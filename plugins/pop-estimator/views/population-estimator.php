
<div style="background-color:#a0a0a0;padding:10px;">
	<img src="<?php echo $population_icon; ?>"/>
	<input type='button' id='pop-estimator' value=' Activate Population Estimator ' onclick="applyScripts()"/>
</div>

<script type="text/javascript">
/* ESRI world population layer and geoprocessing script for Ushahidi and CrowdMap
javascript:var s=document.createElement("script");s.src="http://mapmeld.appspot.com/bookmarklet-population.js";document.body.appendChild(s);void(0); */

djConfig = { parseOnLoad:true };
var gp,drawnPolygon,polygonControl;

function applyScripts(){
	if(polygonControl){
		document.getElementById("pop-estimator").value="Reactivated"
		polygonControl.activate();
	}
	else{
		document.getElementById("pop-estimator").value="Loading..."
		loadScripts();
		document.getElementById("pop-estimator").value="Activated"
	}
}

function loadScripts(){
	/* load ESRI script and additional OpenLayers features */
	var esriScript=document.createElement("script");
	esriScript.src="http://serverapi.arcgisonline.com/jsapi/arcgis/?v=1.6";
	esriScript.onload=function(){
		dojo.require("esri.map");
		dojo.require("esri.tasks.gp");
		gp = new esri.tasks.Geoprocessor("<?php echo $service_url; ?>");
		dojo.connect(gp, "onExecuteComplete", displayPopResults);
		dojo.connect(gp, "onError", displayPopError);
		var newPt=document.createElement("script");
		newPt.src="http://trac.osgeo.org/openlayers/export/10706/trunk/openlayers/lib/OpenLayers/Handler/Point.js";
		newPt.onload=function(){
			var newP=document.createElement("script");
			newP.src="http://trac.osgeo.org/openlayers/export/10847/trunk/openlayers/lib/OpenLayers/Handler/Path.js";
			newP.onload=function(){
				var newH=document.createElement("script");
				newH.src="http://trac.osgeo.org/openlayers/export/10828/trunk/openlayers/lib/OpenLayers/Handler/Polygon.js";
				newH.onload=function(){
					var newDL=document.createElement("script");
					newDL.src="http://trac.osgeo.org/openlayers/export/10706/trunk/openlayers/lib/OpenLayers/Control/DrawFeature.js";
					newDL.onload=function(){
						/* add OpenLayers polygon editor */
						var polygonLayer = new OpenLayers.Layer.Vector("Draw Bounds");
						map.addLayers([polygonLayer]);
						polygonControl = new OpenLayers.Control.DrawFeature(polygonLayer, OpenLayers.Handler.Polygon);
						polygonControl.featureAdded=useDrawnPolygon;
						map.addControl(polygonControl);
						polygonControl.activate();
					};
					document.body.appendChild(newDL);
				};
				document.body.appendChild(newH);
			};
			document.body.appendChild(newP);
		};
		document.body.appendChild(newPt);
	};
	document.body.appendChild(esriScript);
}

function useDrawnPolygon(feature){
	/* convert OpenLayers polygon to ArcGIS Javascript API Polygon */
	polygonControl.deactivate();
	drawnPolygon=feature;
	featurePts=feature.geometry.getVertices();
	lnglatPointList=[];
	for(var fpt=0;fpt<featurePts.length;fpt++){
		var myPt=new OpenLayers.Geometry.Point(featurePts[fpt].x,featurePts[fpt].y);
		myPt=myPt.transform(map.projection, map.displayProjection );
		var lng=myPt.x;
		var lat=myPt.y;
		lnglatPointList.push([lng,lat]);
	}
	lnglatPointList.push(lnglatPointList[0]);
	var polygonJson  = {"rings":[lnglatPointList],"spatialReference":{"wkid":4326 }};
	var geometry = new esri.geometry.Polygon(polygonJson);
	var symbol = new esri.symbol.SimpleFillSymbol("none", new esri.symbol.SimpleLineSymbol("dashdot", new dojo.Color([255,0,0]), 2), new dojo.Color([255,255,0,0.25]));
	var graphic = new esri.Graphic(geometry,symbol);
	var featureSet = new esri.tasks.FeatureSet();
	featureSet.features = [graphic];
	gp.execute({ "inputPoly":featureSet });
	document.getElementById("pop-estimator").value="Sending Polygon...";
}
function displayPopError(error){
	popup = new OpenLayers.Popup.FramedCloud("chicken", 
		drawnPolygon.geometry.getBounds().getCenterLonLat(),
		new OpenLayers.Size(100,100),
		"<br/>Select a larger area",
		null, true, onPopupClose);
	map.addPopup(popup);
	document.getElementById("pop-estimator").value="Retry Population Estimator";
}
function displayPopResults(results, messages){
	/*alert("Population estimate of " + results[0].value.features[0].attributes.SUM);*/
	popup = new OpenLayers.Popup.FramedCloud("chicken", 
		drawnPolygon.geometry.getBounds().getCenterLonLat(),
		new OpenLayers.Size(100,100),
		"<br/>Population estimate of " + results[0].value.features[0].attributes.SUM + "<br/><a href='http://sampleserver1b.arcgisonline.com/arcgisoutput/Demographics_ESRI_Population_World/PopulationSummary.htm' target='_blank'>Geoprocessing</a>",
		null, true, onPopupClose);
	map.addPopup(popup);
	document.getElementById("pop-estimator").value="Activate Population Estimator";
}
</script>