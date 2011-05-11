javascript:
function byId(id){return document.getElementById(id)}
/* remove language dropdown */
byId("searchbox").children[0].style.display="none";
/* put title on one line */
byId("logo").children[0].style.display="inline";
byId("logo").children[0].style.color="white";
byId("logo").children[1].style.display="inline";
byId("logo").children[1].style.color="white";
byId("logo").children[1].style.marginLeft="10px";
byId("logo").style.padding="5px";
byId("logo").style.margin="0px";
byId("logo").style.backgroundColor="transparent";
byId("header").style.height="35pt";
/* change background and li css */
byId("page").style.background="#031634 url(../images/terra.gif) 50% 0 repeat-x";
var licss=document.createElement("div");
licss.innerHTML="<style type='text/css'>div#mainmenu a.active{color:#fff;background-color:#031634;} div#mainmenu a:hover{color:#fff;background-color:#031634;}ul.category-filters li a:hover, ul.category-filters li a.active{color:#FFF;background-color:#031634;border-color:#031634;}</style>";
document.body.appendChild(licss);
/* expand content part of page */
byId("middle").style.minWidth="116%";
byId("middle").style.marginLeft="-8%";
/* remove floating Submit a Report button */
byId("header").children[2].style.display="none";
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
sampleItem.innerHTML="<a href='#' class='active' id='cat_"+pnum+"_person'><span class='swatch' style='background-color:#FF0000'></span><span class='category-title'>Everyone</span></a>";
sampleItem.onclick=function(){
	people();
}
byId("right").children[1].appendChild(sampleItem);
var people=["Tom","Barry"];
for(var pnum=0;pnum<people.length;pnum++){
	sampleItem=document.createElement("li");
	sampleItem.innerHTML="<a href='#' id='cat_"+pnum+"_person'><span class='swatch' style='background-color:#3300FF'></span><span class='category-title'>"+people[pnum]+"</span></a>";
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
/* prepend Facebook comments (?) to content-block-left */
document.getElementsByClassName("content-block-left")[0].innerHTML = 'Facebook Commenting<hr/><hr/>' + document.getElementsByClassName("content-block-left")[0].innerHTML;
/* add Kijani to footer credits */
document.getElementsByClassName("footer-credits")[0].innerHTML+="<br/>And the &nbsp;<a href='http://kijani-map.appspot.com/'><img src='http://kijani-map.appspot.com/credit.png' alt='Kijani' style='vertical-align:middle'></a>&nbsp; Plugin";
void(0);