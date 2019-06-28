<?php
/*
Plugin Name: WP Google Classroom: Thermal Printer
Plugin URI: https://mathwithmrdulaney.com/google-classroom-plugin
Description: Extends WP Google Classroom with thermal printed hall passes
Version: 1.0
Author: Dan Dulaney
Author URI: https://dandulaney.com
License: GPLv2
License URI: http://www.gnu.org/licenses/gpl-2.0.html

    Copyright 2019 by Dan Dulaney <dan.dulaney07@gmail.com>

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License version 2,
    as published by the Free Software Foundation.

    You may NOT assume that you can use any other version of the GPL.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    The license for this software can likely be found here:
    http://www.gnu.org/licenses/gpl-2.0.html

*/

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}


//checks to see if the GF Stripe official plugin is activated
function thermal_google_classroom_activate() {
  
    if( !function_exists( 'google_classroom_enqueue_scripts' ) ) {
	
		 deactivate_plugins( plugin_basename( __FILE__ ) );
         wp_die( __( 'Please activate WP Google Classroom First.', 'google-classroom-thermal' ), 'Plugin dependency check', array( 'back_link' => true ) );
        
    }
}
register_activation_hook(__FILE__, 'thermal_google_classroom_activate');

function thermal_google_classroom_enqueue_scripts($hook) {

    //if ( 'toplevel_page_google-classroom' == $hook || 'google-classroom_page_google-classroom-bulk-add' == $hook) {

        wp_enqueue_script('rsvp-js',plugins_url('js/dependencies/rsvp-3.1.0.min.js', __FILE__),array('jquery'),'3.1.0');
        wp_enqueue_script( 'sha-256-js', plugins_url( 'js/dependencies/sha-256.min.js', __FILE__ ),array('jquery','rsvp-js'), '1.0');
        wp_enqueue_script( 'qz-tray-js', plugins_url( 'js/qz-tray.js', __FILE__ ),array('rsvp-js','sha-256-js'), '2.0');
        wp_enqueue_script( 'exit-ticket-js', plugins_url( 'js/print-exit-ticket.js', __FILE__ ),array('qz-tray-js'), '2.0');

    //}
}
add_action( 'admin_enqueue_scripts', 'thermal_google_classroom_enqueue_scripts' );

if(!function_exists('thermal_google_classroom_menu')) {

    add_action('admin_menu', 'thermal_google_classroom_menu',99);
    function thermal_google_classroom_menu() {

        add_submenu_page('google-classroom', 'Thermal Printer', 'Thermal Printer', 'manage_options', 'google-classroom-thermal-setup', 'gclassroom_wp_integration_display_thermal_setup');       

    }
}

function gclassroom_wp_integration_display_thermal_setup() {
    echo '<h1>Thermal Printer Setup</h1>';
    
    echo gclassroom_wp_integration_thermal_shortcode();
    
    echo '<button onclick="print_pass_to_me()">Print Pass To Me</button>';
}

function gclassroom_wp_integration_thermal_shortcode() {

    return '<div id="store_data" data-certfile="'.plugins_url('assets/signing/cert.pem', __FILE__ ).'" data-signfile="'.plugins_url('assets/signing/sign-message.php',__FILE__).'"></div>';

}
add_shortcode('gclassroom_thermal_data','gclassroom_wp_integration_thermal_shortcode');