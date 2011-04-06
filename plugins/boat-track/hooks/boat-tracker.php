<?php defined('SYSPATH') or die('No direct script access.');
/**
 * Boat Tracker Hook - Load All Events
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

class boattracker {
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
		Event::add('ushahidi_action.main_sidebar', array($this, 'embed_boat_tracker'));
	}
	
	public function embed_estimator()
	{
		$view = View::factory('boat-tracker');
		$view->service_url = Kohana::config('boat-tracker.service_url');
		/*$view->js_base_url = url::site().'plugins/boat-tracker/';*/
		$view->render(TRUE);
	}
}

new boattracker;