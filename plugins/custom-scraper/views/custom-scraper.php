
<div style="border-top:1px solid black;padding:10px;">
	<button onclick="activateSensors();" style="text-align:center;font-size:13pt;padding:6px;">
		<img src="<?php echo $scraperIcon; ?>" style="vertical-align:middle;height:18px;width:18px;"/>
		<span style="font-family:Arial,sans-serif;font-weight:bold;vertical-align:middle;"> Realtime Sensors </span>
	</button>
</div>

<script type="text/javascript">
var lastLyrId;
var pointFeatures=[];
var sensors=[];
<?php echo $scraperData; ?>

function activateSensors(){
	/* // uncomment to use Google App Engine cache instead:
	var mScript=document.createElement('script');
	mScript.type='text/javascript';
	mScript.src='http://mapmeld.appspot.com/plugins?data=AustraliaFlood';
	mScript.onload=processSensorData;
	document.body.appendChild(mScript);
	return;*/
	processSensorData();
}

function processSensorData(){
	var layer_style = OpenLayers.Util.extend({}, OpenLayers.Feature.Vector.style['default']);
	layer_style.fillOpacity = 0.2;
	layer_style.graphicOpacity = 1;

	var vectorLayer = new OpenLayers.Layer.Vector("River Conditions", {style: layer_style});
	map.addLayer(vectorLayer);

	//color coded flood sensors
	var style_blue = OpenLayers.Util.extend({}, layer_style);
	style_blue.strokeColor = "blue";
	style_blue.fillColor = "blue";
	style_blue.graphicName = "square";
	style_blue.pointRadius = 5;
	style_blue.strokeWidth = 1;
	style_blue.rotation = 0;
	style_blue.strokeLinecap = "butt";
	
	var style_green = OpenLayers.Util.extend({}, style_blue);
	style_green.strokeColor = "green";
	style_green.fillColor = "green";
	
	var style_orange = OpenLayers.Util.extend({}, style_blue);
	style_orange.strokeColor = "orange";
	style_orange.fillColor = "orange";
	
	var style_red = OpenLayers.Util.extend({}, style_blue);
	style_red.strokeColor = "red";
	style_red.fillColor = "red";
	
	var style_gry = OpenLayers.Util.extend({}, style_blue);
	style_gry.strokeColor = "grey";
	style_gry.fillColor = "grey";
	style_gry.pointRadius=3;
	style_blue.pointRadius=3;

	for(var s=sensors.length-1;s>=0;s--){
		var point = new OpenLayers.Geometry.Point( sensors[s].latlng[1], sensors[s].latlng[0] ).transform(map.displayProjection,  map.projection);
		var ptStyle;
		var addThisSensor=true;
		switch(sensors[s].floodClass){
			case "Major":
			ptStyle=style_red;
			break;
			case "Moderate":
			ptStyle=style_orange;
			break;
			case "Minor":
			ptStyle=style_green;
			break;
			case "Below Minor":
			ptStyle=style_blue;
			break;
			case "Unknown":
			ptStyle=style_gry;
			break;
		}
		if(addThisSensor){
			var pointFeature = new OpenLayers.Feature.Vector(point,null,ptStyle);
			/* NOW <-> GRAPH buttons or tabs */
			pointFeature.attributes = {name:"<b id='floodTtl' style='font-size:14pt;'>"+sensors[s].name+"</b><div id='floodTbl' height='250' width='430' style='font-size:16pt;height:250px;width:430px;'><style type='text/css'>td{padding:5px;}</style><table border='1'><tr><td>Height</td><td>"+sensors[s].height+"</td></tr><tr><td>Class</td><td>"+sensors[s].floodClass+"</td></tr><tr><td>Trend</td><td>"+sensors[s].trend+"</td></tr></table><hr/><input type='button' style='margin-top:6px;padding:8px;' value='&rarr;Graph&rarr;' onclick='showFloodGraph("+s+")'/></div>"};
			pointFeatures.push(pointFeature);
		}
	}

	lastLyrId = populateReportLayer();
	setInterval("populateReportLayer();",500);
}

function populateReportLayer(){
	var reportLayer;
	for(var lyr=0;lyr<map.layers.length;lyr++){
		if(map.layers[lyr].name.indexOf("eports")!=-1){
			reportLayer=map.layers[lyr];
			if(reportLayer.id != lastLyrId){
				reportLayer.addFeatures(pointFeatures);
				lastLyrId = reportLayer.id;
			}
			return reportLayer.id;
		}
	}
}
function showFloodGraph(i){
	document.getElementById('floodTtl').style.fontSize="11pt";
	document.getElementById('floodTbl').innerHTML="<img src='http://www.bom.gov.au" + sensors[i].href.replace(".plt.shtml",".png") + "' height='220' width='400'/>";
}
</script>