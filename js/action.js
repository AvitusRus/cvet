$(document).ready(function() {

    $("#owl-demo").owlCarousel({

        navigation : true, // Show next and prev buttons
        slideSpeed : 300,
        paginationSpeed : 400,
        singleItem:true,
        autoHeight: true

        // "singleItem:true" is a shortcut for:
        // items : 1,
        // itemsDesktop : false,
        // itemsDesktopSmall : false,
        // itemsTablet: false,
        // itemsMobile : false

    });

    $('#soc-tabs ul').on('click', 'li:not(.active)', function() {
        $(this)
            .addClass('active').siblings().removeClass('active')
            .closest('div#soc-tabs').find('div.tab-content').removeClass('active').eq($(this).index()).addClass('active');
    });

    $('#extra-tabs ul').on('click', 'li:not(.active)', function() {
        $(this)
            .addClass('active').siblings().removeClass('active')
            .closest('div#extra-tabs').find('div.extra-tabs_content').removeClass('active').eq($(this).index()).addClass('active');
    });

    $( function() {
        var slider_range = $( "#slider-range" );
        if(slider_range.length !== 0)
        {
            slider_range.slider({
               range: true,
               min: 90,
               max: 20000,
               values: [ 90, 20000 ],
               slide: function( event, ui ) {
                   $( "#min_size" ).val(ui.values[ 0 ] );
                   $( ".interval_min" ).text(ui.values[ 0 ] );
                   $( "#max_size" ).val(ui.values[ 1 ] );
                   $( ".interval_max" ).text(ui.values[ 1 ] );
               }
           });
           $( "#min_size" ).val(slider_range.slider( "values", 0 ));
           $( ".interval_min" ).text(slider_range.slider( "values", 0 ));
           $( "#max_size" ).val(slider_range.slider( "values", 1 ));
           $( ".interval_max" ).text(slider_range.slider( "values", 1 ));
        }
    } );

    $('input, select').styler();

    $(function() {

        var sync1 = $("#sync1");
        var sync2 = $("#sync2");
        var sync3 = $("#sync3");

        sync1.owlCarousel({
            singleItem : true,
            slideSpeed : 1000,
            navigation: true,
            pagination:false,
            afterAction : syncPosition,
            responsiveRefreshRate : 200,
        });

        sync2.owlCarousel({
            items : 4,
            pagination:false,
            responsiveRefreshRate : 100,
            afterInit : function(el){
                el.find(".owl-item").eq(0).addClass("synced");
            }
        });

        sync3.owlCarousel({
            singleItem : true,
            slideSpeed : 1000,
            navigation: true,
            pagination:false,
            afterAction : syncPosition,
            responsiveRefreshRate : 200,
        });


        function syncPosition(el){
            var current = this.currentItem;
            $("#sync2")
                .find(".owl-item")
                .removeClass("synced")
                .eq(current)
                .addClass("synced")
            if($("#sync2").data("owlCarousel") !== undefined){
                center(current)
            }
        }

        $("#sync2").on("click", ".owl-item", function(e){
            e.preventDefault();
            var number = $(this).data("owlItem");
            sync1.trigger("owl.goTo",number);
        });

        function center(number){
            var sync2visible = sync2.data("owlCarousel").owl.visibleItems;
            var num = number;
            var found = false;
            for(var i in sync2visible){
                if(num === sync2visible[i]){
                    var found = true;
                }
            }

            if(found===false){
                if(num>sync2visible[sync2visible.length-1]){
                    sync2.trigger("owl.goTo", num - sync2visible.length+2)
                }else{
                    if(num - 1 === -1){
                        num = 0;
                    }
                    sync2.trigger("owl.goTo", num);
                }
            } else if(num === sync2visible[sync2visible.length-1]){
                sync2.trigger("owl.goTo", sync2visible[1])
            } else if(num === sync2visible[0]){
                sync2.trigger("owl.goTo", num-1)
            }

        }

    });

    var toggle_box = $('.toggle-box'),
        toggle_parent = $('.header-box_up'),
        toggle_btn = $('.current-val');

    toggle_parent.on('click', '.current-val', function (e) {
        toggle_box.toggle();
    });

    toggle_box.find('li').on('click', function (e) {
        var current_val = $(this).text();
        toggle_btn.text( current_val );
        toggle_box.hide();
    });


    var mobile_nav = $('.mobile-nav-menu');
        mobile_btn = $('.mobile-nav-btn');
        normal_nav = $('.hb-down > ul > li:not(.hb-down_btn__dropmenu)');

    mobile_btn.on('click', function(e){
        e.stopPropagation();
        mobile_nav.animate({
            left: 0
        });
        mobile_nav.addClass('open');
    });

    $('body').on('click', function (e) {
        if(mobile_nav.hasClass('open') && !$(e.target).is(mobile_nav))
        {
            mobile_nav.animate({
                left: "-50%"
            });
        }
    });

    var filter_btn = $('.filter-btn');
        filter_btn.fancybox({
            'padding': 0
        });

    var isMobile = window.matchMedia("(max-width: 320px)").matches;
    if(isMobile)
    {
        normal_nav.each(function (a) {
            $('.mobile-nav-menu').append( $(this).html() );
        })
    }


    var input_num = $('.input-num');
        input_num.on('click', 'span', function (e) {
            var input = input_num.find('input'),
                val = input.val();

            console.log(val);
            varl = parseInt(val);

            if($(this).hasClass('input-num_minus'))
            {
                val--;
            }

            if($(this).hasClass('input-num_plus'))
            {
                val++;
            }

            val = (val < 1) ? 1 : val;
            input.val(val);
        });

    var deviceWidth = getDeviceWidth();
        deviceWidth = deviceWidth + 44;
    // $('meta[name="viewport"]').attr('content', 'width='+deviceWidth+', initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=yes');

});

function getDeviceWidth()
{
    var deviceWidth = ( window.matchMedia("(orientation: landscape)") ) ? window.screen.width : window.screen.height;
    // iOS returns available pixels, Android returns pixels / pixel ratio
    // http://www.quirksmode.org/blog/archives/2012/07/more_about_devi.html
    if (navigator.userAgent.indexOf('Android') >= 0 && window.devicePixelRatio)
        deviceWidth = deviceWidth / window.devicePixelRatio;

    return deviceWidth;
}