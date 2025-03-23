<!DOCTYPE HTML>
<html <?php language_attributes(); ?>>

<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php bloginfo('name'); ?> - <?php wp_title(''); ?></title>
    <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/assets/css/main.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

    <!-- Header -->
    <header id="header" class="alt">
<div class="logo">
    <a href="<?php echo esc_url(home_url('/')); ?>">
        DrinkX <span>Brinda, Disfruta y Relájate</span>
    </a>
</div>

        <a href="#menu">Menú</a>
    </header>

    <!-- Nav -->
    <nav id="menu">
        <ul class="links">
            <li><a href="<?php echo esc_url(home_url('/')); ?>">Inicio</a></li>
            <li><a href="#one">Compra tu Pack</a></li>
            <li><a href="https://wa.me/3248969378?text=Hola,%20quiero%20más%20información" target="_blank">Contacto WhatsApp</a></li>
        </ul>
    </nav>

