<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Custom Scraper Hook - Load All Events
 *
 * PHP version 5
 * LICENSE: This source file is subject to LGPL license 
 * that is available through the world-wide-web at the following URI:
 * http://www.gnu.org/copyleft/lesser.html
 * @author	   Ushahidi Team <team@ushahidi.com> 
 * @package	   Ushahidi - http://source.ushahididev.com
 * @copyright  Ushahidi - http://www.ushahidi.com
 * @license	   http://www.gnu.org/copyleft/lesser.html GNU Lesser General Public License (LGPL) 
 */

class customscraper {
	/**
	 * Registers the main event add method
	 */
	public function __construct()
	{	
		// Hook into routing
		Event::add('system.pre_controller', array($this, 'add'));
		$this->trackgroups = array();
	}
	
	/**
	 * Adds all the events to the main Ushahidi application
	 */
	public function add()
	{
		Event::add('ushahidi_action.main_sidebar', array($this, 'embed_scraper'));
	}
	
	public function embed_floodwatch()
	{
		$view = View::factory('custom-scraper');
		$ch = curl_init();
		// set URL and other appropriate options
		curl_setopt($ch, CURLOPT_URL, Kohana::config('custom-scraper.scraper_src_url'));
		curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);

		$sensorsPg = (string) curl_exec($ch);
		curl_close($ch);

		$sensorsPg = substr($sensorsPg,stripos($sensorsPg,'<map name'));
		$sensorsPg = substr($sensorsPg,0,stripos($sensorsPg,'</map>'));
		$sensorsList = explode('HidePopup',$sensorsPg);
		$sensorOutput = '';
		for($s = count($sensorsList)-2; $s >= 1; $s -=1){
			$sensorStr = substr($sensorsList[$s],stripos($sensorsList[$s],'PopupRiver')+12);
			$sensedata = explode(',',substr($sensorStr,0,stripos($sensorStr,'Click mouse to display')));
			if(count($sensedata) < 6){
				continue;
			}
			$shref = substr($sensorsList[$s],stripos($sensorsList[$s],'href=')+6);
			$shref = substr($shref,0,stripos($shref,'onMouseOver')-2);
			$sname = substr($sensedata[0],0,stripos($sensedata[0],"'"));
			$slat = str_replace(array(" ","\t","	","'"),"",$sensedata[2]);
			$slng = str_replace(array(" ","\t","	","'"),"",$sensedata[3]);
			$sheight =  str_replace(array(" ","\t","	","'"),"",$sensedata[4]);
			$sclass = str_replace(array(" ","\t","	"),"",$sensedata[5]);
			$strend = str_replace(array(" ","\t","	"),"",$sensedata[6]);
			$sensorOutput = $sensorOutput . 'sensors.push({name:"'.$sname.'",href:"'.$shref.'",latlng:['.$slat.','.$slng.'],height:'.$sheight.',floodClass:'.$sclass.',trend:'.$strend.'});';
		}
		$view->scraperIcon = Kohana::config('custom-scraper.scraper_icon');
		$view->sensors = $sensorOutput;
		$view->render(TRUE);
	}
}

new customscraper;