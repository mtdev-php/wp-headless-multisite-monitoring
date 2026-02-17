<?php

if(!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

class Hdm_Endpoints 
{

    public function __construct() 
    {
        add_action('rest_api_init', [$this, 'registerRoutes']);
    }

    public function registerRoutes() 
    {
        $namespace = 'wp-hdm/v1';

        register_rest_route($namespace, '/health', [
            'methods'  => 'GET',
            'callback' => [$this, 'getHealth'],
            'permission_callback' => [$this, 'canAccessEndpoint'],
        ]);

        register_rest_route($namespace, '/updates', [
            'methods'  => 'GET',
            'callback' => [$this, 'getUpdates'],
            'permission_callback' => [$this, 'canAccessEndpoint'],
        ]);

        register_rest_route($namespace, '/site', [
            'methods' => 'GET',
            'callback' => [$this, 'getSiteInfos'],
            'permission_callback' => [$this, 'canAccessEndpoint'],
        ]);
    }

    public function canAccessEndpoint() 
    {
        return current_user_can('manage_options');
    }

    public function getHealth() 
    {
        global $wpdb;

        $fatalError = $this->fatalErrorCheck();

        return [
            'wp_version'   => get_bloginfo('version'),
            'php_version'  => PHP_VERSION,
            'mysql'        => $wpdb->db_version(),
            'debug'        => defined('WP_DEBUG') && WP_DEBUG,
            'cron'         => !defined('DISABLE_WP_CRON'),
            'rest'         => true,
            'memory_limit' => WP_MEMORY_LIMIT,
            'multisite'    => is_multisite(),
            'last_fatal'   => $fatalError, 
        ];
    }

    public function getUpdates() 
    {
        
        if(!function_exists('get_plugin_updates')){
            require_once ABSPATH . 'wp-admin/includes/update.php';
        }
        
        if(!function_exists('get_plugins')){
            require_once ABSPATH . 'wp-admin/includes/plugin.php';
        }

        // IMPORTANT: Force la vérification des mises à jour
        wp_update_plugins();
        wp_update_themes();

        //Wordpress core update
        $coreUpdates            = get_core_updates();
        $coreUpdateAvailable    = false;
        $newVersion             = null;
        //Plugin and theme updates
        $pluginUpdates          = get_site_transient('update_plugins');
        $themeUpdates           = get_site_transient('update_themes');

        if(!empty($coreUpdates) && isset($coreUpdates[0]->response)){
            if($coreUpdates[0]->response === 'upgrade'){
                $coreUpdateAvailable = true;
                $newVersion = $coreUpdates[0]->current;
            }
        }

        //Get all plugins with update status
        $allPlugins = get_plugins();
        $plugins = [];

        foreach($allPlugins as $file => $plugin){
            $plugins[] = [
                'name' => $plugin['Name'],
                'version' => $plugin['Version'],
                'update_available' => isset($pluginUpdates->response[$file]),
            ];
        }

        //Get all themes with update status
        $allThemes = wp_get_themes();
        $themes = [];

        foreach($allThemes as $slug => $theme){
            $themes[] = [
                'name' => $theme->get('Name'),
                'version' => $theme->get('Version'),
                'update_available' => isset($themeUpdates->response[$slug]),
            ];
        }

        return [
            'core' => [
                'current'   => get_bloginfo('version'),
                'new_version' => $newVersion,        // null si pas de mise à jour
                'available' => $coreUpdateAvailable, // true seulement si upgrade dispo
            ],
            'plugins' => $plugins,
            'themes' => $themes,
        ];
    }

    public function getSiteInfos() 
    {
        return [
            'name' => get_bloginfo('name'),
            'url'  => home_url(),
            'logo' => get_site_icon_url(512),
        ];
    }

    private function fatalErrorCheck()
    {
        $fatal = get_option('wp_hdm_last_fatal');
        $fatalError = null;

        if($fatal){
            $age_seconds = time() - $fatal['time'];
    
            if($age_seconds < 30){
                $fatalError = $fatal;
            }else{
                delete_option('wp_hdm_last_fatal');
            }
        }

        return $fatalError;
    }

}
