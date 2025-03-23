<?php get_header(); ?>

<!-- Slide -->
<section class="banner full">
    <article>
        <img src="<?php echo get_template_directory_uri(); ?>/images/slide01.webp" alt="Pack de licores DrinkX" width="1440" height="961">
        <div class="inner">
            <header>
                <p>Disfruta los mejores packs de licores en Hogares, Ciudad Verde y Soacha Centro</p>
                <h2>DrinkX Hogares Soacha</h2>
            </header>
        </div>
    </article>
    <article>
        <img src="<?php echo get_template_directory_uri(); ?>/images/slide02.webp" alt="Servicio a domicilio en Soacha" width="1440" height="961">
        <div class="inner">
            <header>
                <p>Entrega a domicilio en Soacha Centro, Hogares y Ciudad Verde. ¡Haz tu pedido ahora!</p>
                <h2>Rápido y Seguro</h2>
            </header>
        </div>
    </article>
    <article>
        <img src="<?php echo get_template_directory_uri(); ?>/images/slide03.webp" alt="Brinda con tus amigos" width="1440" height="961">
        <div class="inner">
            <header>
                <p>Tenemos combos listos para cualquier ocasión</p>
                <h2>Elige el tuyo</h2>
            </header>
        </div>
    </article>
    <article>
        <img src="<?php echo get_template_directory_uri(); ?>/images/slide04.jpg" alt="Promociones y descuentos en licor" width="1440" height="961">
        <div class="inner">
            <header>
                <p>Obsequios exclusivos en cada compra</p>
                <h2>¡Sorpresas para ti!</h2>
            </header>
        </div>
    </article>
    <article>
        <img src="<?php echo get_template_directory_uri(); ?>/images/slide05.webp" alt="Compra fácil y rápida" width="1440" height="961">
        <div class="inner">
            <header>
                <p>Pide por WhatsApp y te lo llevamos a casa</p>
                <h2>Fácil y rápido</h2>
            </header>
        </div>
    </article>
</section>






<!-- Packs Combos -->
<section id="one" class="wrapper style2">
    <div class="inner">
        <div class="grid-style">

            <?php
            $packs = [
                ["img" => "pic01.webp", "pack" => "Pack 01", "title" => "Combo Superior"],
                ["img" => "pic02.webp", "pack" => "Pack 02", "title" => "Combo Bonito"],
                ["img" => "pic03.webp", "pack" => "Pack 03", "title" => "Combo Lindo"],
                ["img" => "pic03.webp", "pack" => "Pack 04", "title" => "Combo Lindo"],
                ["img" => "pic03.webp", "pack" => "Pack 05", "title" => "Combo Lindo"],
                ["img" => "pic03.webp", "pack" => "Pack 06", "title" => "Combo Lindo"],
                ["img" => "pic03.webp", "pack" => "Pack 07", "title" => "Combo Lindo"],
                ["img" => "pic03.webp", "pack" => "Pack 08", "title" => "Combo Lindo"],
            ];

            foreach ($packs as $pack) : ?>
                <div>
                    <div class="box">
                        <div class="image fit">
                            <img src="<?php echo get_template_directory_uri(); ?>/images/<?php echo $pack['img']; ?>" alt="" width="600" height="300">
                        </div>
                        <div class="content">
                            <header class="align-center">
                                <p><?php echo $pack['pack']; ?></p>
                                <h2><?php echo $pack['title']; ?></h2>
                            </header>
                            <p>Cras aliquet urna ut sapien tincidunt, quis malesuada elit facilisis. Vestibulum sit amet tortor velit. Nam elementum nibh a libero pharetra elementum. Maecenas feugiat ex purus, quis volutpat lacus placerat malesuada.</p>
                            <footer class="align-center"><a href="#" class="button alt">Comprar</a></footer>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>

        </div>
    </div>
</section>



<?php get_footer(); ?>
