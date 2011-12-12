javascript:
function byId(id){return document.getElementById(id)}
function byClass(nm){return document.getElementsByClassName(nm)}
function replaceAll(cont,oldr,newr){while(cont.indexOf(oldr) > -1){cont=cont.replace(oldr,newr);}return cont}

var jsonEndpoint = "https://mtsuperfund.crowdmap.com/json";
var fbPage = "http://www.facebook.com/ushahidi";
fbPage = replaceAll(fbPage,"%3A",":");
fbPage = replaceAll(fbPage,"%2F","/");

/* remove language dropdown */
byId("searchbox").children[0].style.display="none";
/* put title on one line */
byId("logo").children[0].style.display="inline";
/* byId("logo").children[0].style.color="white"; */
if(byId("logo").children[1] != null){
	byId("logo").children[1].style.display="inline";
	/* byId("logo").children[1].style.color="white"; */
	byId("logo").children[1].style.marginLeft="10px";
}
byId("logo").style.padding="5px";
byId("logo").style.margin="0px";
/* byId("logo").style.backgroundColor="transparent"; */
byId("header").style.height="35pt";
/* change background and li css */
/* byId("page").style.background="#031634 url(../images/terra.gif) 50% 0 repeat-x"; */
var licss=document.createElement("div");
licss.innerHTML="<style type='text/css'>div#mainmenu a.active{color:#fff;background-color:#031634;} div#mainmenu a:hover{color:#fff;background-color:#031634;}ul.category-filters li a:hover, ul.category-filters li a.active{color:#FFF;background-color:#031634;border-color:#031634;}</style>";
document.body.appendChild(licss);
/* expand content part of page */
byId("middle").style.minWidth="116%";
byId("middle").style.marginLeft="-8%";
/* remove floating Submit a Report button on new and old versions of Ushahidi and CrowdMap */
try{
	byId("header").children[2].style.display="none";
}
catch(e){
	byId("header").children[1].style.display="none";
}
/* remove Category Filter label and "hide" option; replace with tabs for populating the new list below */
byId("right").children[0].className="clearingfix";
byId("right").children[0].id="mainmenu";
byId("right").children[0].style.background="#D7D2CC";
byId("right").children[0].style.paddingBottom="10px";
byId("right").children[0].style.marginBottom="-10px";
byId("right").children[0].innerHTML="<ul><li><a id='mfilter0' class='active' href='#' onclick='mfilter(0)'>Team</a></li><li><a id='mfilter1' href='#' onclick='mfilter(1)'>Map</a></li><li><a id='mfilter2' href='#' onclick='mfilter(2)'>Time</a></li></ul>";
byId("right").children[0].style.marginLeft="-50%";
/* total revamp of Category list (should look at what these categories are before hiding them) */
byId("right").children[1].innerHTML="";
byId("right").children[1].style.marginLeft="-50%";
/* add people to the Team section */
var sampleItem=document.createElement("li");
sampleItem.innerHTML="<a href='#' class='active' id='cat_everyone'><span class='swatch' style='background-color:#FF0000;height:30px;width:30px;'></span><span class='category-title'>Everyone</span></a>";
sampleItem.onclick=function(){people()}
byId("right").children[1].appendChild(sampleItem);
var people=[
	{
		name: "Nick Doiron",
		twitter: "mapmeld",
		photo: "http://i.imgur.com/SNcaa.jpg",
		lastArticle: "Where We Are",
		lastLink: "http://google.com",
		lastTime: "2 hours ago",
		homepage: ""
	},
	{
		name: "Zora Mayer",
		photo: "http://i.imgur.com/TL1K5.jpg",
		lastArticle: "Going Green",
		lastLink: "http://google.com",
		lastTime: "30 minutes ago"
	}
];
for(var pnum=0;pnum<people.length;pnum++){
	sampleItem=document.createElement("li");
	var marker="";
	if(people[pnum].photo){
		marker="<a href='#' id='cat_"+pnum+"_person' style='border:1px solid #000;-moz-border-radius:14px;-webkit-border-radius:14px;border-radius:14px;'><table><tr><td><img class='swatch' src='" + people[pnum].photo + "' style='height:40px;width:40px;'/></td>";
		marker+="<td><span class='category-title' style='text-transform:none;'>"+people[pnum].name+"</span><br/>";
		if(people[pnum].twitter){
			marker+="<a href='http://twitter.com/" + people[pnum].twitter + "' target='_blank' style='display:inline;padding:0px;font-size:10pt;color:#0af;text-transform:none;font-weight:normal;border:none;line-height:12pt'>Tweet@</a> &mdash; ";
		}
		if(people[pnum].homepage){
			marker+="<a href='" + people[pnum].homepage + "' target='_blank' style='display:inline;padding:0px;font-size:10pt;color:#0af;text-transform:none;font-weight:normal;border:none;line-height:12pt'>Homepage</a>";
		}
		marker+="</td><td><a href='" + people[pnum].lastLink + "' target='_blank' style='padding:0px;text-transform:none;border:none;line-height:12pt;color:#BC8B75;font-weight:bold;font-style:italic;margin-left:25px;'>" + people[pnum].lastArticle + "</a><br/><span style='padding:0px;text-transform:none;border:none;line-height:12pt;color:#BC8B75;margin-left:25px;'>" + people[pnum].lastTime + "</span></td>";
		marker+="</tr></table></a>";
	}
	else{
		marker="<a href='#' id='cat_"+pnum+"_person'><span class='swatch' style='background-color:#3300FF'></span><span class='category-title' style='text-transform:none;'>"+people[pnum].name+"</span></a>";
	}
	sampleItem.innerHTML=marker;
	sampleItem.onclick=function(){
		people(this);
	}
	byId("right").children[1].appendChild(sampleItem);
}
/* add layers to the hidden Map section */
var layers=["A","B"];
for(var pnum=people.length;pnum<people.length+layers.length;pnum++){
	sampleItem=document.createElement("li");
	sampleItem.innerHTML="<a href='#' id='cat_"+pnum+"_layer'><span class='swatch' style='background-color:#FF00FF'></span><span class='category-title'>"+layers[pnum-people.length]+"</span></a>";
	sampleItem.onclick=function(){
		layer(this);
	}
	byId("right").children[1].appendChild(sampleItem);
}
/* add events to the hidden Time section */
var events=["C","D"];
for(var pnum=people.length+layers.length;pnum<people.length+layers.length+events.length;pnum++){
	sampleItem=document.createElement("li");
	sampleItem.innerHTML="<a href='#' id='cat_"+pnum+"_event'><span class='swatch' style='background-color:#00FFFF'></span><span class='category-title'>"+events[pnum-people.length-layers.length]+"</span></a>";
	sampleItem.onclick=function(){
		event(this);
	}
	byId("right").children[1].appendChild(sampleItem);
}
/* add click events when switching between sections on the former category section */
function mfilter(mnum){
	var litype="person";
	if(mnum==1){
		litype="layer";
	}
	else if(mnum==2){
		litype="event";
	}
	for(var m=0;m<3;m++){
		if(m==mnum){
			byId("mfilter"+m).className="active";
		}
		else{
			byId("mfilter"+m).className="inactive";		
		}
	}
	for(var c=0;c<byId("right").children[1].children.length;c++){
		if(byId("right").children[1].children[c].children[0].id.indexOf("_"+litype) == -1){
			byId("right").children[1].children[c].style.display="none";		
		}
		else{
			byId("right").children[1].children[c].style.display="block";
		}
	}
}
mfilter(0);
/* remove OpenLayers default layer selector */
for(var control=0;control<map.controls.length;control++){
	if(map.controls[control].displayClass=="olControlLayerSwitcher"){
		map.removeControl(map.controls[control]);
		break;
	}
}

/* remove media type filters above the OpenLayers map */
byId("content").children[0].children[0].style.display="none";

/* add Kijani to footer credits */
try{
	byClass("footer-credits")[0].innerHTML+="<br/>And the &nbsp;<a href='http:/" + "/kijani-map.appspot.com/'><img src='http:/" + "/kijani-map.appspot.com/credit.png' alt='Kijani' style='vertical-align:middle'></a>&nbsp; Plugin";
}
catch(e){
	/* for older and customized builds */
	var footerDiv = document.createElement('div');
	footerDiv.innerHTML = "<br/>And the &nbsp;<a href='http:/" + "/kijani-map.appspot.com/'><img src='http:/" + "/kijani-map.appspot.com/credit.png' alt='Kijani' style='vertical-align:middle'></a>&nbsp; Plugin";
	document.body.appendChild(footerDiv);
}

/* add Facebook comments to bottom left square */
try{
	/* older Ushahidi and CrowdMap */
	byClass("content-block-left")[0].innerHTML = 'Facebook Commenting<hr/><hr/>' + byClass("content-block-left")[0].innerHTML;
}
catch(e){
	/* newer Ushahidi and CrowdMap uses content-block in place of content-block-left */
	try{
		fbContent = '<table><tr><td>';
		fbContent += '<iframe src="//www.facebook.com/plugins/likebox.php?href=' + fbPage + '&amp;width=292&amp;height=558&amp;colorscheme=light&amp;show_faces=true&amp;border_color&amp;stream=true&amp;header=false&amp;appId=123994207657251" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:292px; height:558px;" allowTransparency="true"></iframe>';
		fbContent += '</td><td>';
		fbContent += '<iframe src="http://mapmeld.appspot.com/" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:100px; height:558px;" allowTransparency="true"></iframe>';
		fbContent += '</td></tr></table>';
		byClass("content-block")[0].innerHTML = fbContent;
	}
	catch(e){}
}

/* remove box around search tool */
try{
	byId("searchbox").style.border = "none";
	byId("searchbox").style.borderTop = "none";
	byId("searchbox").style.border = "none";
	byId("searchbox").style.background = "transparent";
	byId("searchbox").style.border = "none";
	byId("searchbox").style.marginBottom = "20px";
	byId("searchbox").style.marginTop = "-14px";
}
catch(e){}

/* hide widgets surrounding the original timeline */
byClass("slider-holder")[0].style.display = "none";
byClass("tickLabels")[0].style.display = "none"; // and repeat this instead of redrawing tickmarks

var events = [
	{
		name: "Mine opened",
		details: "The mine was opened in 1955 and operated by Anaconda Copper and later by the Atlantic Richfield Company (ARCO) (CC-BY-SA Wikipedia and contributors)",
		time: new Date(1955,1,1)
	},
	{
		name: "Listed on EPA's NPL",
		details: "Listed on the Environmental Protection Agency's National Priorities List",
		time: new Date(1982,9,8)
	},
	{
		name: "Geese land in Berkeley Pit",
		details: "Flock of birds dies in Berkeley Pit <a href='http://www.hcn.org/issues/49/1520' target='_blank'>http://www.hcn.org/issues/49/1520</a>",
		time: new Date(1995,11,14)
	},
	{
		name: "Next update",
		details: "Test of future dates",
		time: new Date(2012,1,1)
	},
	{
		name: "Future update",
		details: "Test of even more future dates",
		time: new Date(2015,6,3)
	}
];
function refreshGraph(startDate, endDate){
	/* this.layer set to the reports layer */
	this.layer = map.layers[3];

	/* new timeline style should still respect category and date inputs */
	var currentCat = gCategoryId;
	if (!currentCat || currentCat == '0'){
		currentCat = '0';
	}
	var startTime = new Date(startDate * 1000);
	var endTime = new Date(endDate * 1000);
	
	/* count previous and future events for the storyboard layout */
	var prevEvents = 0;
	var futureEvents = 0;
	for(var e=0; e<events.length; e++){
		if(events[e].time.getTime() < startTime.getTime()){
			prevEvents++;
		}
		else if(events[e].time.getTime() > endTime.getTime()){
			futureEvents++;
		}
	}
	
	/* determine how much space to set aside before and after the main timeline for past and future events */
	var centralWidth = 573 - Math.min(150, 20 * (prevEvents + futureEvents));
	var centralOffset = Math.round((573 - centralWidth) * (prevEvents / (prevEvents + futureEvents)));
	var centralTrail = Math.round((573 - centralWidth) * (futureEvents / (prevEvents + futureEvents)));
	var msperpix = Math.round((endTime.getTime() - startTime.getTime()) / centralWidth);
	if(prevEvents + futureEvents > 0){
		startTime = new Date(startTime.getTime() - msperpix * centralOffset);
		endTime = new Date(endTime.getTime() + msperpix * centralTrail);
		startDate = (startTime.getTime() / 1000) + "";
		endDate = (endTime.getTime() / 1000) + "";	
	}

	/* prepare the graph canvas */
	var graphData = "";
	byId("graph").children[0].width = byId("graph").children[0].width;
	var ctx = byId("graph").children[0].getContext('2d');
	/* draw gray-blue background */
	ctx.fillStyle = "#ECF1EF";
	ctx.fillRect(0,0,573,150);
	/* draw horizontal gridlines */
	ctx.strokeStyle = "#CCC1FF";
	ctx.lineWidth = 2;
	ctx.moveTo(0,20);
	ctx.lineTo(573,20);
	ctx.moveTo(0,40);
	ctx.lineTo(573,40);
	ctx.moveTo(0,60);
	ctx.lineTo(573,60);
	ctx.moveTo(0,80);
	ctx.lineTo(573,80);
	ctx.moveTo(0,100);
	ctx.lineTo(573,100);
	ctx.moveTo(0,120);
	ctx.lineTo(573,120);
	ctx.moveTo(0,140);
	ctx.lineTo(573,140);
	ctx.stroke();
	
	/* draw timeline with weekly totals (could revert to original which varies sampling rate based on start-to-finish timespan) */
	$.getJSON(jsonEndpoint + "/timeline/"+currentCat+"?i=week", function(data) {
		/* prepare data from the JSON response */
		graphData = data[0];
		var kigraphData = graphData.data;

		/* determine maximum number of points per week */
		var max = 1;
		for(var gpt=0; gpt < kigraphData.length; gpt++){
			if(kigraphData[gpt][1] * 1 > max){
				max = kigraphData[gpt][1] * 1;
			}
		}
		
		/* draw a line connecting all data points */
		/* begin with the paler highlight part of the line */
		ctx.beginPath();
		ctx.strokeStyle = "#CC6C6C";
		ctx.lineWidth = 2;
		ctx.moveTo(Math.round(centralOffset), 152);
		for(var gpt=0; gpt < kigraphData.length; gpt++){
			var timestamp = kigraphData[gpt][0];
			var height = Math.round(152 - kigraphData[gpt][1] / max * 140);
			ctx.lineTo( Math.round((timestamp - startTime) / msperpix), height );
			ctx.stroke();
			ctx.moveTo( Math.round((timestamp - startTime) / msperpix), height );
		}
		ctx.lineTo(Math.round(573 - centralTrail), 138);
		ctx.closePath();
		ctx.beginPath();
		ctx.moveTo(Math.round(centralOffset), 148);
		for(var gpt=0; gpt < kigraphData.length; gpt++){
			var timestamp = kigraphData[gpt][0];
			var height = Math.round(148 - kigraphData[gpt][1] / max * 140);
			ctx.lineTo( Math.round((timestamp - startTime) / msperpix), height );
			ctx.stroke();
			ctx.moveTo( Math.round((timestamp - startTime) / msperpix), height );
		}
		ctx.lineTo(Math.round(573 - centralTrail), 134);
		ctx.closePath();
		/* end highlight line */
		
		/* then draw the central red thread of the line */
		ctx.beginPath();
		ctx.strokeStyle = "#990000";
		ctx.fillStyle = "#fff";
		ctx.lineWidth = 3;
		ctx.moveTo(Math.round(centralOffset), 150);		
		for(var gpt=0; gpt < kigraphData.length; gpt++){
			var timestamp = kigraphData[gpt][0];
			var height = Math.round(150 - kigraphData[gpt][1] / max * 140);
			ctx.lineTo( Math.round((timestamp - startTime) / msperpix), height );

			/* draw dark red circle at each data point */
			ctx.moveTo( Math.round((timestamp - startTime) / msperpix), height );
			ctx.arc(Math.round((timestamp - startTime) / msperpix), height, 4, 0, Math.PI*2, true);
			ctx.moveTo( Math.round((timestamp - startTime) / msperpix), height );
		}
		ctx.lineTo(Math.round(573 - centralTrail), 148);
		ctx.moveTo(Math.round(573 - centralTrail), 148);
		ctx.stroke();
		ctx.fill();
		ctx.closePath();
		/* end the central red thread line */

		/* past events */
		ctx.beginPath();
		ctx.strokeStyle = "#6CCC6C";
		ctx.lineWidth = 5;
		for(var e=0;e<prevEvents;e++){
			ctx.strokeStyle = "#009900";
			ctx.lineWidth = 3;
			ctx.moveTo(20 * e + 5, 0);
			ctx.lineTo(20 * e + 5, 150);
		}
		/* future events */
		ctx.lineWidth = 5;
		for(var e=events.length-1;e>=prevEvents;e--){
			ctx.moveTo(563 - 20 * (events.length - e - 1), 0);
			ctx.lineTo(563 - 20 * (events.length - e - 1), 150);
		}
		ctx.stroke();
		ctx.closePath();
	});

	// Get dailyGraphData for All Categories
	$.getJSON(jsonEndpoint + "/timeline/"+currentCat+"?i=day", function(data) {
		dailyGraphData = data[0];
	});

	// Get allGraphData for All Categories
	$.getJSON(jsonEndpoint + "/timeline/"+currentCat, function(data) {
		allGraphData = data[0];
	});
}
/* draw the new, reprogrammed graph */
var startDate = $("#startDate").val();
var endDate = $("#endDate").val();						
refreshGraph(startDate, endDate);

/* remove checkins, if they exist */
var CIcandidates = byClass("additional-content");
for(var c=0;c<CIcandidates.length; c++){
	if(CIcandidates[c].children != null){
		if(CIcandidates[c].children[0].innerHTML == "Checkins"){
			CIcandidates[c].style.display = "none";
			break;
		}
	}
}

/* remove "other deployments" segment, if it exists */
var CIcandidates = byClass("cat-filters");
for(var c=0;c<CIcandidates.length; c++){
	if(CIcandidates[c].children != null){
		if(CIcandidates[c].children[0].innerHTML.indexOf("Other Deployments") > -1){
			CIcandidates[c].style.display = "none";
			break;
		}
	}
}

void(0);