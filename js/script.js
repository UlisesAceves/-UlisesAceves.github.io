/**
 * WEBSITE: https://themefisher.com
 * TWITTER: https://twitter.com/themefisher
 * FACEBOOK: https://www.facebook.com/themefisher
 * GITHUB: https://github.com/themefisher/
 */

(function ($) {
	'use strict';

	/* ========================================================================= */
	/*	Page Preloader
	/* ========================================================================= */

	$(window).on('load', function () {
		// preloader
		$('.preloader').fadeOut(700);

		// Portfolio Filtering
		var containerEl = document.querySelector('.filtr-container');
		var filterizd;
		if (containerEl) {
			filterizd = $('.filtr-container').filterizr({});
		}
		//Active changer
		$('.portfolio-filter button').on('click', function () {
			$('.portfolio-filter button').removeClass('active');
			$(this).addClass('active');
		});

		const IMAGENES = [
			'images/carousel/matrix.jpg',
			'images/carousel/Java.jpg',
			'images/carousel/javaScript.png'
		];
		const TIEMPO_INTERVALO_MILESIMAS_SEG = 1000;
		let posicionActual = 0;
		let $botonRetroceder = document.querySelector('#retroceder');
		let $botonAvanzar = document.querySelector('#avanzar');
		let $imagen = document.querySelector('#imagen');
		let $botonPlay = document.querySelector('#play');
		let $botonStop = document.querySelector('#stop');
		let intervalo;

		// Funciones

		/**
		 * Funcion que cambia la foto en la siguiente posicion
		 */
		function pasarFoto() {
			if(posicionActual >= IMAGENES.length - 1) {
				posicionActual = 0;
			} else {
				posicionActual++;
			}
			renderizarImagen();
		}

		/**
		 * Funcion que cambia la foto en la anterior posicion
		 */
		function retrocederFoto() {
			if(posicionActual <= 0) {
				posicionActual = IMAGENES.length - 1;
			} else {
				posicionActual--;
			}
			renderizarImagen();
		}

		/**
		 * Funcion que actualiza la imagen de imagen dependiendo de posicionActual
		 */
		function renderizarImagen () {
			$imagen.style.backgroundImage = `url(${IMAGENES[posicionActual]})`;
		}

		/**
		 * Activa el autoplay de la imagen
		 */
		function playIntervalo() {
			intervalo = setInterval(pasarFoto, TIEMPO_INTERVALO_MILESIMAS_SEG);
			// Desactivamos los botones de control
			$botonAvanzar.setAttribute('disabled', true);
			$botonRetroceder.setAttribute('disabled', true);
			$botonPlay.setAttribute('disabled', true);
			$botonStop.removeAttribute('disabled');

		}

		/**
		 * Para el autoplay de la imagen
		 */
		function stopIntervalo() {
			clearInterval(intervalo);
			// Activamos los botones de control
			$botonAvanzar.removeAttribute('disabled');
			$botonRetroceder.removeAttribute('disabled');
			$botonPlay.removeAttribute('disabled');
			$botonStop.setAttribute('disabled', true);
		}

		// Eventos
		$botonAvanzar.addEventListener('click', pasarFoto);
		$botonRetroceder.addEventListener('click', retrocederFoto);
		$botonPlay.addEventListener('click', playIntervalo);
		$botonStop.addEventListener('click', stopIntervalo);
		// Iniciar
		renderizarImagen();
	});

	/* ========================================================================= */
	/*	Post image slider
	/* ========================================================================= */
	$('#post-thumb, #gallery-post').slick({
		infinite: true,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 4000

	});
	$('#features').slick({
		infinite: true,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 4000
	});


	/* ========================================================================= */
	/*	Magnific popup
	/* =========================================================================  */
	$('.image-popup').magnificPopup({
		type: 'image',
		removalDelay: 160, //delay removal by X to allow out-animation
		callbacks: {
			beforeOpen: function () {
				// just a hack that adds mfp-anim class to markup
				this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
				this.st.mainClass = this.st.el.attr('data-effect');
			}
		},
		closeOnContentClick: true,
		midClick: true,
		fixedContentPos: false,
		fixedBgPos: true
	});


	// counterUp
	function counter() {
		var oTop;
		if ($('.jsCounter').length !== 0) {
			oTop = $('.jsCounter').offset().top - window.innerHeight;
		}
		if ($(window).scrollTop() > oTop) {
			$('.jsCounter').each(function () {
				var $this = $(this),
					countTo = $this.attr('data-count');
				$({
					countNum: $this.text()
				}).animate({
					countNum: countTo
				}, {
					duration: 500,
					easing: 'swing',
					step: function () {
						$this.text(Math.floor(this.countNum));
					},
					complete: function () {
						$this.text(this.countNum);
					}
				});
			});
		}
	}

	$(window).on('scroll', function () {
		counter();
	});



	//   magnific popup video
	$('.popup-video').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-zoom-in',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: true
	});

	/* ========================================================================= */
	/*	Testimonial Carousel
	/* =========================================================================  */
	//Init the carousel
	$('#testimonials').slick({
		infinite: true,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 4000
	});


	/* ========================================================================= */
	/*	Smooth Scroll
	/* ========================================================================= */
	$('a.nav-link, .smooth-scroll').click(function (e) {
		if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				e.preventDefault();
				$('html, body').animate({
					scrollTop: target.offset().top
				}, 1000, function () {
					var $target = $(target);
					$target.focus();
					if ($target.is(':focus')) {
						return false;
					} else {
						$target.attr('tabindex', '-1');
						$target.focus();
					}
				});
			}
		}
	});


})(jQuery);
// End Jquery Function


/* ========================================================================= */
/*	Animated section
/* ========================================================================= */

var wow = new WOW({
	offset: 100, // distance to the element when triggering the animation (default is 0)
	mobile: false // trigger animations on mobile devices (default is true)
});
wow.init();