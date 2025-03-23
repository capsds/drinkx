var settings = {
  banner: {
    // Indicators (= the clickable dots at the bottom).
    indicators: true,

    // Transition speed (in ms)
    // For timing purposes only. It *must* match the transition speed of "#banner > article".
    speed: 1500,

    // Transition delay (in ms)
    delay: 5000,

    // Parallax intensity (between 0 and 1; higher = more intense, lower = less intense; 0 = off)
    parallax: 0.25,
  },
};

(function ($) {
  skel.breakpoints({
    xlarge: "(max-width: 1680px)",
    large: "(max-width: 1280px)",
    medium: "(max-width: 980px)",
    small: "(max-width: 736px)",
    xsmall: "(max-width: 480px)",
  });

  /**
   * Applies parallax scrolling to an element's background image.
   * @return {jQuery} jQuery object.
   */
  $.fn._parallax =
    skel.vars.browser == "ie" || skel.vars.mobile
      ? function () {
          return $(this);
        }
      : function (intensity) {
          var $window = $(window),
            $this = $(this);

          if (this.length == 0 || intensity === 0) return $this;

          if (this.length > 1) {
            for (var i = 0; i < this.length; i++)
              $(this[i])._parallax(intensity);

            return $this;
          }

          if (!intensity) intensity = 0.25;

          $this.each(function () {
            var $t = $(this),
              on,
              off;

            on = function () {
              $t.css(
                "background-position",
                "center 100%, center 100%, center 0px"
              );

              $window.on("scroll._parallax", function () {
                var pos =
                  parseInt($window.scrollTop()) - parseInt($t.position().top);

                $t.css(
                  "background-position",
                  "center " + pos * (-1 * intensity) + "px"
                );
              });
            };

            off = function () {
              $t.css("background-position", "");

              $window.off("scroll._parallax");
            };

            skel.on("change", function () {
              if (skel.breakpoint("medium").active) off();
              else on();
            });
          });

          $window
            .off("load._parallax resize._parallax")
            .on("load._parallax resize._parallax", function () {
              $window.trigger("scroll");
            });

          return $(this);
        };

  /**
   * Custom banner slider for Slate.
   * @return {jQuery} jQuery object.
   */
  $.fn._slider = function (options) {
    var $window = $(window),
      $this = $(this);

    if (this.length == 0) return $this;

    if (this.length > 1) {
      for (var i = 0; i < this.length; i++) $(this[i])._slider(options);

      return $this;
    }

    // Vars.
    var current = 0,
      pos = 0,
      lastPos = 0,
      slides = [],
      indicators = [],
      $indicators,
      $slides = $this.children("article"),
      intervalId,
      isLocked = false,
      i = 0;

    // Turn off indicators if we only have one slide.
    if ($slides.length == 1) options.indicators = false;

    // Functions.
    $this._switchTo = function (x, stop) {
      if (isLocked || pos == x) return;

      isLocked = true;

      if (stop) window.clearInterval(intervalId);

      // Update positions.
      lastPos = pos;
      pos = x;

      // Hide last slide.
      slides[lastPos].removeClass("top");

      if (options.indicators) indicators[lastPos].removeClass("visible");

      // Show new slide.
      slides[pos].addClass("visible").addClass("top");

      if (options.indicators) indicators[pos].addClass("visible");

      // Finish hiding last slide after a short delay.
      window.setTimeout(function () {
        slides[lastPos].addClass("instant").removeClass("visible");

        window.setTimeout(function () {
          slides[lastPos].removeClass("instant");
          isLocked = false;
        }, 100);
      }, options.speed);
    };

    // Indicators.
    if (options.indicators)
      $indicators = $('<ul class="indicators"></ul>').appendTo($this);

    // Slides.
    $slides
      .each(function () {
        var $slide = $(this),
          $img = $slide.find("img");

        // Slide.
        $slide
          .css("background-image", 'url("' + $img.attr("src") + '")')
          .css(
            "background-position",
            $slide.data("position") ? $slide.data("position") : "center"
          );

        // Add to slides.
        slides.push($slide);

        // Indicators.
        if (options.indicators) {
          var $indicator_li = $("<li>" + i + "</li>").appendTo($indicators);

          // Indicator.
          $indicator_li.data("index", i).on("click", function () {
            $this._switchTo($(this).data("index"), true);
          });

          // Add to indicators.
          indicators.push($indicator_li);
        }

        i++;
      })
      ._parallax(options.parallax);

    // Initial slide.
    slides[pos].addClass("visible").addClass("top");

    if (options.indicators) indicators[pos].addClass("visible");

    // Bail if we only have a single slide.
    if (slides.length == 1) return;

    // Main loop.
    intervalId = window.setInterval(function () {
      current++;

      if (current >= slides.length) current = 0;

      $this._switchTo(current);
    }, options.delay);
  };

  $(function () {
    var $window = $(window),
      $body = $("body"),
      $header = $("#header"),
      $banner = $(".banner");

    // Disable animations/transitions until the page has loaded.
    $body.addClass("is-loading");

    $window.on("load", function () {
      window.setTimeout(function () {
        $body.removeClass("is-loading");
      }, 100);
    });

    // Prioritize "important" elements on medium.
    skel.on("+medium -medium", function () {
      $.prioritize(
        ".important\\28 medium\\29",
        skel.breakpoint("medium").active
      );
    });

    // Banner.
    $banner._slider(settings.banner);

    // Menu.
    $("#menu")
      .append('<a href="#menu" class="close"></a>')
      .appendTo($body)
      .panel({
        delay: 500,
        hideOnClick: true,
        hideOnSwipe: true,
        resetScroll: true,
        resetForms: true,
        side: "right",
      });

    // Header.
    if (skel.vars.IEVersion < 9) $header.removeClass("alt");

    if ($banner.length > 0 && $header.hasClass("alt")) {
      $window.on("resize", function () {
        $window.trigger("scroll");
      });

      $banner.scrollex({
        bottom: $header.outerHeight(),
        terminate: function () {
          $header.removeClass("alt");
        },
        enter: function () {
          $header.addClass("alt");
        },
        leave: function () {
          $header.removeClass("alt");
          $header.addClass("reveal");
        },
      });
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    let button = document.createElement("a");
    button.href = "https://wa.me/3248969378";
    button.target = "_blank";
    button.style.position = "fixed";
    button.style.bottom = "50px";
    button.style.right = "20px";
    button.style.zIndex = "1001";
    button.style.cursor = "pointer";
    button.style.transition = "transform 0.3s ease-in-out";
    button.style.display = "flex";
    button.style.alignItems = "center";
    button.style.gap = "10px";
    button.style.backgroundColor = "#25D366";
    button.style.padding = "8px 12px";
    button.style.borderRadius = "50px";
    button.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
    button.style.textDecoration = "none";
    button.style.maxWidth = "80%";
    button.style.flexWrap = "wrap";

    let img = document.createElement("img");
    img.src = "https://www.freepnglogos.com/uploads/whatsapp-logo-png-hd-2.png";
    img.alt = "WhatsApp";
    img.style.width = "35px";
    img.style.height = "35px";
    img.style.borderRadius = "50%";

    let text = document.createElement("span");
    text.textContent = "Contáctanos por WhatsApp";
    text.style.color = "white";
    text.style.fontSize = "14px";
    text.style.fontFamily = "Arial, sans-serif";
    text.style.fontWeight = "bold";
    text.style.whiteSpace = "normal";
    text.style.textAlign = "center";
    text.style.display = "block";
    text.style.wordBreak = "break-word";

    button.appendChild(img);
    button.appendChild(text);
    document.body.appendChild(button);

    function pulseAnimation() {
      button.style.transform = "scale(1.1)";
      setTimeout(() => {
        button.style.transform = "scale(1)";
      }, 500);
    }

    setInterval(pulseAnimation, 3000);
  });

  document.addEventListener("DOMContentLoaded", function () {
    let mensaje = document.createElement("div");
    mensaje.innerText =
      "El exceso de alcohol es perjudicial para la salud. Prohíbase el expendio de bebidas embriagantes a menores de edad y mujeres embarazadas. Ley 30 de 1986.";

    Object.assign(mensaje.style, {
      position: "fixed",
      bottom: "0px",
      left: "10px",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      color: "white",
      padding: "10px",
      borderRadius: "5px",
      fontSize: "9.5px",
      maxWidth: "90%",
      width: "auto",
      whiteSpace: "normal",
      zIndex: "1002",
      lineHeight: "1.5",
      textAlign: "center",
      wordBreak: "break-word",
    });

    document.body.appendChild(mensaje);
  });

  document.addEventListener("DOMContentLoaded", function () {
    // Verificar si el usuario ya aceptó la edad en esta sesión
    if (sessionStorage.getItem("edadConfirmada") === "true") {
      return;
    }

    // Deshabilitar la interacción con la página
    document.body.style.overflow = "hidden";
    document.body.style.pointerEvents = "none";

    // Crear el fondo del popup
    let overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.zIndex = "1000";

    // Crear el popup
    let popup = document.createElement("div");
    popup.style.backgroundColor = "#fff";
    popup.style.padding = "20px";
    popup.style.borderRadius = "10px";
    popup.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.3)";
    popup.style.textAlign = "center";
    popup.style.maxWidth = "300px";
    popup.style.pointerEvents = "auto"; // Permitir interacción solo en el popup

    // Agregar logo
    let logo = document.createElement("img");
    logo.src = "images/logo_6.jpg"; // Asegúrate de que la ruta es correcta
    logo.style.width = "200px";
    logo.style.marginBottom = "10px";

    // Contenido del popup
    let message = document.createElement("p");
    message.textContent = "¿Eres mayor de 18 años?";
    message.style.fontSize = "18px";
    message.style.marginBottom = "15px";

    let btnYes = document.createElement("button");
    btnYes.textContent = "Sí";
    btnYes.style.margin = "5px";
    btnYes.style.padding = "10px 20px";
    btnYes.style.border = "none";
    btnYes.style.borderRadius = "5px";
    btnYes.style.backgroundColor = "green";
    btnYes.style.color = "white";
    btnYes.style.cursor = "pointer";

    let btnNo = document.createElement("button");
    btnNo.textContent = "No";
    btnNo.style.margin = "5px";
    btnNo.style.padding = "10px 20px";
    btnNo.style.border = "none";
    btnNo.style.borderRadius = "5px";
    btnNo.style.backgroundColor = "red";
    btnNo.style.color = "white";
    btnNo.style.cursor = "pointer";

    // Eventos de los botones
    btnYes.addEventListener("click", function () {
      sessionStorage.setItem("edadConfirmada", "true"); // Se almacena solo en la sesión actual
      document.body.style.overflow = "auto";
      document.body.style.pointerEvents = "auto";
      location.reload();
    });

    btnNo.addEventListener("click", function () {
      window.history.back();
    });

    // Agregar elementos al popup
    popup.appendChild(logo);
    popup.appendChild(message);
    popup.appendChild(btnYes);
    popup.appendChild(btnNo);
    overlay.appendChild(popup);

    // Agregar popup al body
    document.body.appendChild(overlay);
  });
})(jQuery);
