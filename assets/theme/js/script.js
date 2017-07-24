
jQuery(document).ready(function($) {
    "use strict";
    /*==============================
        Is mobile
    ==============================*/
    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    }

    if ( $('.menu-content').length ) {
        $('body').scrollspy({ target: '.menu-content' });
    }

    if( $(".theme-slider").length>0 ) {

        $(".theme-slider").each(function() {
            // Default:
            var opt_single = false,
                opt_pagi = false,
                opt_control = false,
                opt_transition = 'fade';
            // Var:
            var owl = $(this).children('.theme-slider-content'),
                option_slide = $(this).attr("data-slider"),
                option_pagi = $(this).attr("data-pagi"),
                option_contr = $(this).attr("data-control"),
                option_tran = $(this).attr("data-transition");

            if(option_slide == "single") opt_single = true;
            if(option_pagi == "true") opt_pagi = true;
            if(option_contr == "true") opt_control = true;
            if((option_tran == 'fade')||(option_tran == 'backSlide')||(option_tran == 'goDown')||(option_tran == 'fadeUp')) opt_transition = option_tran;

            owl.owlCarousel({
                pagination : opt_pagi,
                //navigation : false,
                singleItem: opt_single,
                autoPlay : 2500,
                slideSpeed : 500,
                paginationSpeed : 500,
                transitionStyle: opt_transition,
                items : 5, //5 items above 1000px browser width
                itemsDesktop : [1000,5], //3 items between 1000px and 901px
                itemsDesktopSmall : [980,3], // betweem 800px and 601px
                itemsTablet: [768,3], //2 items between 600 and 0
                itemsMobile : [480,1], // 1 item between 480 and 0
            });
            if(opt_control) {
                owl.closest('.theme-slider').find('.theme-slider-control .usc-preview').click(function(){
                    owl.trigger('owl.prev');
                })
                owl.closest('.theme-slider').find('.theme-slider-control .usc-next').click(function(){
                    owl.trigger('owl.next');
                })
            }
        });
    }

    /*==============================
        Ajax contact form
    ==============================*/
    if($(".contact-form").length > 0) {
      // Validate the contact form
      $('.contact-form').validate({
        // Add requirements to each of the fields
        rules: {
          name: {
            required: true,
            minlength: 2
          },
          email: {
            required: true,
            email: true
          },
          message: {
            required: true,
            minlength: 10
          }
        },

        // Specify what error messages to display
        // when the user does something horrid
        messages: {
          name: {
            required: "Please enter your first name.",
            minlength: $.format("At least {0} characters required.")
          },
          email: {
            required: "Please enter your email.",
            email: "Please enter a valid email."
          },
          message: {
            required: "Please enter a message.",
            minlength: $.format("At least {0} characters required.")
          }
        },

        // Use Ajax to send everything to processForm.php
        submitHandler: function(form) {
          $(".submit-contact").html("Sending...");
          $(form).ajaxSubmit({
            success: function(responseText, statusText, xhr, $form) {
              $("#contact-content").slideUp(600, function() {
                $("#contact-content").html(responseText).slideDown(600);
              });
            }
          });
          return false;
        }
      });
    }

    function sliderBG() {

        if( $('.header-slider').length ) {
            var  winHeight = $(window).height(),
                navHeight = $('.nav').height(),
                elHeight = winHeight - navHeight;
            $('.header-slider').css('margin-top', navHeight);

            $.each( $('> .owl-item', $('.header-slider .owl-wrapper') ), function() {
                var src = $(this).find('.ts-item-background').children('img').attr('src');
                $(this).children('.theme-slider-item').css('background-image', 'url(' +src+ ')');
                $(this).children('.theme-slider-item').css('height', elHeight);
            });
        }
     }

     function menuToggle() {

        if ( $('.header-v1').length ) {

            $('.menu-content').children('.menu').addClass('menu-style1');

            $('.header-v1').delegate('.shape', 'click', function() {
                $('.block-menu').toggleClass('active');
                $('.shape').toggleClass('active');

                $.each( $('.menu', $('.menu-style1')), function() {
                    if ( $('.menu').hasClass('active') ) {
                        $('.menu').removeClass('active');
                    }
                });
            });
        }

        $('.menu-style1').delegate( '> li > a',  'click', function() {

            $.each( $('> li > a', $('.menu-style1')), function() {
                if ( $(this).parent('li').hasClass('active')) {
                    $(this).parent('li').removeClass('active');
                }

            });

            $(this).parent('li').addClass('active');

        });

        if ( $('.menu-style1').find('.expanded').length ) {

            $.each( $('.expanded'), function(){
                $(this).append('<i class="next-icon fa fa-chevron-down"></i>');
            });

            $(document).delegate('.next-icon', 'click', function() {
                $(this).parent('.expanded').children('.menu').toggleClass('active');
            });

            $.each($('.expanded', $('.menu-style1')).children('.menu'), function(){
                $('li:eq(0)', this).before('<li class="back leaf"><a href="javascript:">back</a></li>');
            });
        }

        if ( $('.back').length ) {
            $(document).delegate('.back', 'click', function() {
                $(this).parent('.menu').toggleClass('active');
            });
        }

        $(document).on( 'click touchstart', function( event ) {

            if( !$(event.target).closest('.block-menu, .shape, .menu').length ) {

                if ( $('.block-menu').hasClass('active') ) {
                    $('.block-menu').removeClass('active');
                }
                if ( $('.menu').hasClass('active') ) {
                    $('.menu-style1 .menu').removeClass('active');
                }

                if ( $('.shape').hasClass('active') ) {
                     $('.shape').removeClass('active');
                }
            }
        });
        $('.section-services-v2')
            .find('.parallax-content')
                .css({
                    'padding-left': 0,
                    'padding-right': 0
                });
        $('.section-idea-v2')
            .find('.parallax-content')
                .css({
                    'padding-left': 0,
                    'padding-right': 0
                });
     }

    if ($('.awe-parallax').length) {
        if (isMobile.any()) {
        } else {
            $('.home-media .awe-parallax').parallax("50%", 0.1);
            $('.our-story .awe-parallax').parallax("50%", 0.1);
            $('.the-menu .awe-parallax').parallax("50%", 0.1);
            $('.the-staff .awe-parallax').parallax("50%", 0.1);
            $('.events .awe-parallax').parallax("50%", 0.1);
            $('.testimonial .awe-parallax').parallax("50%", 0.1);
            $('.sub-banner .awe-parallax').parallax("50%", 0.1);
        }
    }

     function menuStyle2() {

        if ( $('.header-v2').length ) {
            $('.menu-content').children('.menu').addClass('menu-style2');
        }
        if ( $('.menu-style2').length ) {
            $('.menu-style2').children('.expanded').children('a').append('<i class="fa fa-caret-down"></i>');

            var $menuClone = $('.menu-style2').clone().appendTo('body');

            $menuClone.addClass('menu-style3');
            $menuClone.removeClass('menu-style2');
            $menuClone.wrap('<div class="block-menu3"><div class="menu-content3"></div></div>');

            $('.menu-style2').delegate( '> li > a',  'click', function() {

                $.each( $('> li > a', $('.menu-style2')), function() {
                    if ( $(this).parent('li').hasClass('active')) {
                        $(this).parent('li').removeClass('active');
                    }

                });

                $(this).parent('li').addClass('active');

            });
        }
     }

     function menuResize() {

        var flag        = false,
            winWidth    = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        if ( winWidth < 1200 ) {

            flag = true;

            if ( flag || $('.menu-style3').length ) {
                if ( $('.block-menu3').hasClass('active') ) {
                    $('.block-menu3').removeClass('active');
                }
                if ( $('.menu').hasClass('active') ) {
                    $('.menu-style3 .menu').removeClass('active');
                }
            }

        }
     }

     function menuStyle3() {

        if ( $('.menu-style3').length ) {


            if ( $('.header-v2').length ) {

                $('.header-v2').delegate('.shape', 'click', function() {
                    $('.block-menu3').toggleClass('active');
                    $('.shape').toggleClass('active');

                    $.each( $('.menu', $('.menu-style3')), function() {
                        if ( $('.menu').hasClass('active') ) {
                            $('.menu').removeClass('active');
                        }
                    });
                });
            }

            $('.menu-style3').delegate( '> li > a',  'click', function() {

                $.each( $('> li > a', $('.menu-style3')), function() {
                    if ( $(this).parent('li').hasClass('active')) {
                        $(this).parent('li').removeClass('active');
                    }

                });

                $(this).parent('li').addClass('active');

            });

            if ( $('.menu-style3').find('.expanded').length ) {

                $.each( $('.expanded'), function(){
                    $(this).append('<i class="next-icon fa fa-chevron-down"></i>');
                });

                $(document).delegate('.next-icon', 'click', function() {
                    $(this).parent('.expanded').children('.menu').toggleClass('active');
                });

                $.each($('.expanded', $('.menu-style3')).children('.menu'), function(){
                    $('li:eq(0)', this).before('<li class="back leaf"><a href="javascript:">back</a></li>');
                });
            }

            if ( $('.back').length ) {
                $(document).delegate('.back', 'click', function() {
                    $(this).parent('.menu').toggleClass('active');
                });
            }

            $(document).on( 'click touchstart', function( event ) {

                if( !$(event.target).closest('.block-menu, .shape, .menu').length ) {

                    if ( $('.block-menu3').hasClass('active') ) {
                        $('.block-menu3').removeClass('active');
                    }
                    if ( $('.menu').hasClass('active') ) {
                        $('.menu-style3 .menu').removeClass('active');
                    }

                    if ( $('.shape').hasClass('active') ) {
                         $('.shape').removeClass('active');
                    }
                }
            });
        }
     }

    if ( $('.theme-media-video').length ) {

        $('.theme-media-video').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,

            fixedContentPos: false
        });
    }

    if ( $('.type-lightbox').length ) {
        $('.type-lightbox').magnificPopup({
            delegate: '.openlightbox',
            type: 'image',
            removalDelay: 300,
            mainClass: 'mfp-fade',
            gallery:{
                enabled:true,
                preload: [0,2], // read about this option in next Lazy-loading section
                navigateByImgClick: true,

            }
        });
    }

    //  CountUP

    if( $(".amount-list").length > 0 ){
        $(".amount-list").appear(function() {
            $(".countup").each(function(){
                var count_element = $(this).html();
                $(this).countTo({
                    from: 0,
                    to: count_element,
                    speed: 1500,
                    refreshInterval: 30,
                });
            })
        });
    }



    $( window ).load( function() {

        //Preloader
        $('body').addClass('loaded');


        // FIlter
        if( $("#filter").length>0 ) {
            var container = $('#filter');
            container.isotope({
                itemSelector: '.gallery-item',
                transitionDuration: '0.8s'
            })
            $(".filter").click(function(){
                $(".filter.active").removeClass("active");
                $(this).addClass("active");
                var selector = $(this).attr('data-filter');
                container.isotope({
                    filter: selector
                });
                return false;
            })
            $(window).resize(function(){
                setTimeout(function(){
                    container.isotope();
                },1000);
            }).trigger('resize');
        }



        if ( $('#type-masory').length ) {

            var $container = $('#type-masory');

            $container.imagesLoaded( function(){
              $container.fadeIn(1000).isotope({
                itemSelector : '.post-item'
              });
            });
        }

    });


    if( $(".frame-map").length > 0 ) {

        // Option map
        var $map = $('#map'),
            mapZoom = $map.data('map-zoom'),
            lat = $map.data('map-latlng').split(',')[0],
            lng = $map.data('map-latlng').split(',')[1],
            marker = $map.data('map-marker'),
            width = parseInt($map.data('map-marker-size').split('*')[0]),
            height = parseInt($map.data('map-marker-size').split('*')[1]),
            title = $map.find('h4').text(),
            content = $map.find('p').text(),
            grayscale = [
                {featureType: 'all',  stylers: [{saturation: -100},{gamma: 0.50}]}
            ],
            blue = [
                {featureType: 'all',  stylers: [{hue: '#0000b0'},{invert_lightness: 'true'},{saturation: -30}]}
            ],
            dark = [
                {featureType: 'all',  stylers: [{ hue: '#ff1a00' },{ invert_lightness: true },{ saturation: -100  },{ lightness: 33 },{ gamma: 0.5 }]}
            ],
            pink = [
                {"stylers": [{ "hue": "#ff61a6" },{ "visibility": "on" },{ "invert_lightness": true },{ "saturation": 40 },{ "lightness": 10 }]}
            ],
            light = [
                {"featureType": "water","elementType": "all","stylers": [{"hue": "#e9ebed"},{"saturation": -78},{"lightness": 67},{"visibility": "simplified"}]
                },{"featureType": "landscape","elementType": "all","stylers": [{"hue": "#ffffff"},{"saturation": -100},{"lightness": 100},{"visibility": "simplified"}]
                },{"featureType": "road","elementType": "geometry","stylers": [{"hue": "#bbc0c4"},{"saturation": -93},{"lightness": 31},{"visibility": "simplified"}]
                },{"featureType": "poi","elementType": "all","stylers": [{"hue": "#ffffff"},{"saturation": -100},{"lightness": 100},{"visibility": "off"}]
                },{"featureType": "road.local","elementType": "geometry","stylers": [{"hue": "#e9ebed"},{"saturation": -90},{"lightness": -8},{"visibility": "simplified"}]
                },{"featureType": "transit","elementType": "all","stylers": [{"hue": "#e9ebed"},{"saturation": 10},{"lightness": 69},{"visibility": "on"}]
                },{"featureType": "administrative.locality","elementType": "all","stylers": [ {"hue": "#2c2e33"},{"saturation": 7},{"lightness": 19},{"visibility": "on"}]
                },{"featureType": "road","elementType": "labels","stylers": [{"hue": "#bbc0c4"},{"saturation": -93},{"lightness": 31},{"visibility": "on"}]
                },{"featureType": "road.arterial","elementType": "labels","stylers": [{"hue": "#bbc0c4"},{"saturation": -93},{"lightness": -2},{"visibility": "simplified"}]}
            ],
            blueessence = [
                {featureType: "landscape.natural",elementType: "geometry.fill",stylers: [{ "visibility": "on" },{ "color": "#e0efef" }]
                },{featureType: "poi",elementType: "geometry.fill",stylers: [{ "visibility": "on" },{ "hue": "#1900ff" },{ "color": "#c0e8e8" }]
                },{featureType: "landscape.man_made",elementType: "geometry.fill"
                },{featureType: "road",elementType: "geometry",stylers: [{ lightness: 100 },{ visibility: "simplified" }]
                },{featureType: "road",elementType: "labels",stylers: [{ visibility: "off" }]
                },{featureType: 'water',stylers: [{ color: '#7dcdcd' }]
                },{featureType: 'transit.line',elementType: 'geometry',stylers: [{ visibility: 'on' },{ lightness: 700 }]}
            ],
            bentley = [
                {featureType: "landscape",stylers: [{hue: "#F1FF00"},{saturation: -27.4},{lightness: 9.4},{gamma: 1}]
                },{featureType: "road.highway",stylers: [{hue: "#0099FF"},{saturation: -20},{lightness: 36.4},{gamma: 1}]
                },{featureType: "road.arterial",stylers: [{hue: "#00FF4F"},{saturation: 0},{lightness: 0},{gamma: 1}]
                },{featureType: "road.local",stylers: [{hue: "#FFB300"},{saturation: -38},{lightness: 11.2},{gamma: 1}]
                },{featureType: "water",stylers: [{hue: "#00B6FF"},{saturation: 4.2},{lightness: -63.4},{gamma: 1}]
                },{featureType: "poi",stylers: [{hue: "#9FFF00"},{saturation: 0},{lightness: 0},{gamma: 1}]}
            ],
            retro = [
                {featureType:"administrative",stylers:[{visibility:"off"}]
                },{featureType:"poi",stylers:[{visibility:"simplified"}]},{featureType:"road",elementType:"labels",stylers:[{visibility:"simplified"}]
                },{featureType:"water",stylers:[{visibility:"simplified"}]},{featureType:"transit",stylers:[{visibility:"simplified"}]},{featureType:"landscape",stylers:[{visibility:"simplified"}]
                },{featureType:"road.highway",stylers:[{visibility:"off"}]},{featureType:"road.local",stylers:[{visibility:"on"}]
                },{featureType:"road.highway",elementType:"geometry",stylers:[{visibility:"on"}]},{featureType:"water",stylers:[{color:"#84afa3"},{lightness:52}]},{stylers:[{saturation:-17},{gamma:0.36}]
                },{featureType:"transit.line",elementType:"geometry",stylers:[{color:"#3f518c"}]}
            ],
            cobalt = [
                {featureType: "all",elementType: "all",stylers: [{invert_lightness: true},{saturation: 10},{lightness: 30},{gamma: 0.5},{hue: "#435158"}]}
            ],
            brownie = [
                {"stylers": [{ "hue": "#ff8800" },{ "gamma": 0.4 }]}
            ];
        var mapTheme;
        switch($map.data('snazzy-map-theme')){
            case 'grayscale' : {
                mapTheme = grayscale;
            } break;
            case 'blue' : {
                mapTheme = blue;
            } break;
            case 'dark' : {
                mapTheme = dark;
            } break;
            case 'pink' : {
                mapTheme = pink;
            } break;
            case 'light' : {
                mapTheme = light;
            } break;
            case 'blue-essence' : {
                mapTheme = blueessence;
            } break;
            case 'bentley' : {
                mapTheme = bentley;
            } break;
            case 'retro' : {
                mapTheme = retro;
            } break;
            case 'cobalt' : {
                mapTheme = cobalt;
            } break;
            case 'brownie' : {
                mapTheme = brownie;
            } break;
            default : {
                mapTheme = grayscale;
            }
        }

        // Map
        var MY_MAPTYPE_ID = 'custom_style';
        var featureOpts = mapTheme;
        var latlng = new google.maps.LatLng(lat, lng);
        var settings = {
            zoom: mapZoom,
            center: latlng,
            mapTypeControlOptions: {
                mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
            },
            mapTypeControl: false,
            mapTypeId: MY_MAPTYPE_ID,
            scrollwheel: false,
            draggable: true,
        };

        var map = new google.maps.Map(document.getElementById("map"), settings);
        var styledMapOptions = {
            name: 'Custom Style'
        };
        var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);

        map.mapTypes.set(MY_MAPTYPE_ID, customMapType);

        google.maps.event.addDomListener(window, "resize", function () {
            var center = map.getCenter();
            google.maps.event.trigger(map, "resize");
            map.setCenter(center);
        });
        var contentString = '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h3 id="firstHeading" class="firstHeading">' + title + '</h3>' +
            '<div id="bodyContent">' +
            '<p>' + content + '</p>' +
            '</div>' +
            '</div>';
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        var companyImage = new google.maps.MarkerImage(marker,
            new google.maps.Size(width, height),
            new google.maps.Point(0, 0)
        );
        var companyPos = new google.maps.LatLng(lat, lng);
        var companyMarker = new google.maps.Marker({
            position: companyPos,
            map: map,
            icon: companyImage,
            title: title,
            zIndex: 3
        });
        google.maps.event.addListener(companyMarker, 'click', function () {
            infowindow.open(map, companyMarker);
        });
    }

    sliderBG();
    menuResize();
    menuToggle();
    menuStyle2();

    // Auto resize
    $(window).resize(function(){
        sliderBG();
        menuResize();
    }).trigger('resize');

    menuStyle3();

    var navHeight = $('.nav').height();

    $('.menu-style1 > li > a, .menu-style2 > li > a, .menu-style3 > li > a, .link-detail a').on('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - navHeight
        }, 700, 'swing');
        event.preventDefault();
    });

    $('.bar-discovery').on('click', function() {
        $('html, body').stop().animate({
            scrollTop: $('.main-page').offset().top - navHeight
        }, 700, 'swing');
    });

});
