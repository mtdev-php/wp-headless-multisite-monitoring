<?php
/**
 * Plugin Name: WP Headless Dashboard Monitor
 * Description: Monitor multiple WordPress sites from a single React dashboard API access.
 * Version: 0.1.0
 * Author: mtdev
 */

if(!defined('ABSPATH')){
    exit; // Exit if accessed directly.
}

// Include the class file
require_once plugin_dir_path(__FILE__) . 'includes/hdm-endpoints-class.php';

// Instantiate the Hdm_Endpoints class
new Hdm_Endpoints();

//Trigger if an fatal error occurs
register_shutdown_function(function(){

  $error = error_get_last();

  if($error && in_array($error['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR])){
    update_option('wp_hdm_last_fatal', [
      'message' => wp_strip_all_tags($error['message']),
      'file' => basename($error['file']),
      'line' => $error['line'],
      'time' => time(),
    ]);
  }
  
});