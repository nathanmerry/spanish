<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'tanguagebackend' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', '' );

/** MySQL hostname */
define( 'DB_HOST', '127.0.0.1' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          'O8q;2b8nw@QF{_lWJ[SYD>=c(a /z0R;>FeEh[(YV)4Q; #,!h3^!AP}^cakI,S=' );
define( 'SECURE_AUTH_KEY',   'Hgn[C!HD2v;#_Hzstx24(d3SN)XmiTPBBA$u`!r5U|]3yg5ega}TASUghP#LxqcB' );
define( 'LOGGED_IN_KEY',     'jvFAeZ4OLDev~|SzaS=/N]`[5S1_};Y)4D3.L<&Dkz+s&:2:FJ&~TxM9nb3su|RO' );
define( 'NONCE_KEY',         'Ds+QpRZ#wFR0eP6-kp+>%>^2XksBrS@1$sQ.[:<_-7*8FSQwgG(!)m4g]m4CWGa6' );
define( 'AUTH_SALT',         'lX2dlp}nCNRnpFo_{P)*;82Q4}^sa_FOo1JQ)Vg^S&nC*Qda{I+{8p<[LzsH>hu>' );
define( 'SECURE_AUTH_SALT',  'Mj3+dz:{ryDS`8Q_:ssCad;l}Pp8XdAwful:lLuWZK+TljqI;SBo/U`{4EGl`Jw8' );
define( 'LOGGED_IN_SALT',    '=<c6p492JV&IRI<`CR4E,1iA1nPkl^Oo`,Kqs?{kKf:YDLD(2/{C+zQ~<x_^+6RI' );
define( 'NONCE_SALT',        'adAe6]FceVoGX>m[5t,Dr-T^/o Ni %7WwWQc.M7cV2&b!.wQu43dD-}JI^m`M5b' );
define( 'WP_CACHE_KEY_SALT', 'M?E]Xl0^_I~j2[f8r6dFjJm}gXZzK~S0Q8fERIr?2zBSRk~W#m!+#0Ms<6ECMNDH' );

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';


        define( 'WP_DEBUG', true );
        define( 'WP_DEBUG_LOG', true );


/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
