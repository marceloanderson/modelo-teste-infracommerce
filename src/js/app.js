"use strict";

function carouselPlayPause(carousel){
    carousel.clip.hover(function() {
        carousel.stopAuto();
    }, function() {
        carousel.startAuto();
    });
}

function skin_shelf(vitrine) {
    vitrine.jcarousel({
        auto: 3,
        scroll: 1,
        wrap: 'last',
        initCallback: carouselPlayPause
    });
}

function product_line_carousel(){
    $(".product-line-carousel >div").each(function(){
        var vitrine = $(this).find("ul");
        if ($(this).find("li").length > 3) {
            vitrine.addClass('jcarousel-skin-vitrine');
            skin_shelf(vitrine);
        }
        $(this).addClass("carouselAdded");
    });
}

function onBefore(currSlide, nexSlide, opts) {

    var currIndex = $(nexSlide).index();

    $('.product-line-carousel').find('>div').stop(true).animate({
        opacity: 0.0
    }, 750, function(){ $(this).removeClass('active'); });
    $('.product-line-carousel').find('.carousel-'+currIndex).addClass('active').stop(true).animate({
        opacity: 1.0
    }, 750);
}

function slider_product_line() {
    if ($('.select-slider').find('>div').length<2) return false;

    $('.select-slider').cycle({
        fx: 'scrollLeft',
        speed: 750,
        timeout: 5000,
        pager: '.slider-control',
        before: onBefore
    });

    $('.product-line-carousel').hover(function() {
        $('.select-slider').cycle('pause');
    }, function() {
        $('.select-slider').cycle('resume');
    });
}


$(function(){ 
    slider_product_line();
    product_line_carousel();
});