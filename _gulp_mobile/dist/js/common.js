'use strict'

// Document ready
$(document).on('ready', function(){

  // Magnific popup gallery
  $('.gallery-row').each(function() {
    $(this).magnificPopup({
      delegate: '.gallery-item',
      type: 'image',
      gallery:{
        enabled: true,
        tCounter: '<span class="mfp-counter">%curr% из %total%</span>'
      },
      zoom: {
        enabled: true, // By default it's false, so don't forget to enable it

        duration: 300, // duration of the effect, in milliseconds
        easing: 'ease-in-out', // CSS transition easing function

        // The "opener" function should return the element from which popup will be zoomed in
        // and to which popup will be scaled down
        // By defailt it looks for an image tag:
        opener: function(openerElement) {
          // openerElement is the element on which popup was initialized, in this case its <a> tag
          // you don't need to add "opener" option if this code matches your needs, it's defailt one.
          return openerElement.is('img') ? openerElement : openerElement.find('img');
        }
      }
    });
  });

  // Magnific popup one image
  $('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    mainClass: 'mfp-img-mobile',
    image: {
      verticalFit: true
    }
  });

  // Magnific popup video
  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });

  $('.open-popup-link').magnificPopup({
    type: 'inline',
    midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
  });

  $('.open-popup-ajax').magnificPopup({
    type: 'ajax',
    midClick: true
  });

  $('.catalog__block-title').equalHeights();

  headerScroll();
  mobileNav();
  seoContent();
  catalogFilter();
  productGgallery();
  productPhone();
  filterPopup();
  sorting();
  showPassword();
  faq();
  tariffPopup();

  $('.similar__carousel').slick({
    variableWidth: true,
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    centerMode: false,
    centerPadding: '0px',
    slidesToShow: 5,
    prevArrow: '<button type="button" class="slick-prev"><svg viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 7l-.7071.7071c-.3905-.3905-.3905-1.0237 0-1.4142L1 7zm5.2929 6.7071l-6-6L1.707 6.293l6 6-1.4142 1.4142zm-6-7.4142l6-6L7.707 1.707l-6 6L.293 6.293z" fill="#CECDCD"/></svg></button>',
    nextArrow: '<button type="button" class="slick-next"><svg viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 7l.7071.7071c.3905-.3905.3905-1.0237 0-1.4142L7 7zm-5.2929 6.7071l6-6L6.293 6.293l-6 6 1.4142 1.4142zm6-7.4142l-6-6L.293 1.707l6 6L7.707 6.293z" fill="#CECDCD"/></svg></button>'
  });

  // Chrome Smooth Scroll
  try {
    $.browserSelector();
    if($("html").hasClass("chrome")) {
      $.smoothScroll();
    }
  } catch(err) {

  };

  // simpleForm version 2015-09-23 14:30 GMT +2
  simpleForm('form.form-callback');
});

$(window).on('load', function() {
  $(".loader").delay(400).fadeOut("slow");
});

$(window).on('scroll', function() {
  headerScroll();
});
$(window).on('resize', function() { });

/*
version 2015-09-23 14:30 GMT +2
*/
function simpleForm(form, callback) {
  $(document).on('submit', form, function(e){
    e.preventDefault();
    var formData = {};
    var hasFile = false;
    if ($(this).find('[type=file]').length < 1) {
      formData = $(this).serialize();
    }
    else {
      formData = new FormData();
      $(this).find('[name]').each(function(){

        switch($(this).prop('type')) {

          case 'file':
            if ($(this)[0]['files'].length > 0) {
              formData.append($(this).prop('name'), $(this)[0]['files'][0]);
              hasFile = true;
            }
            break;

          case 'radio':
          case 'checkbox':
            if (!$(this).prop('checked')) {
              break;
            }
            formData.append($(this).prop('name'), $(this).val().toString());
            break;

          default:
            formData.append($(this).prop('name'), $(this).val().toString());
            break;
        }
      });
    }

    $.ajax({
      url: $(this).prop('action'),
      data: formData,
      type: 'POST',
      contentType : hasFile ? 'multipart/form-data' : 'application/x-www-form-urlencoded',
      cache       : false,
      processData : false,
      success: function(response) {
        $(form).removeClass('ajax-waiting');
        $(form).html($(response).find(form).html());

        if (typeof callback === 'function') {
          callback(response);
        }
      }
    });

    $(form).addClass('ajax-waiting');

    return false;
  });
}

function headerScroll(){
  var header = $('.header');

  if ($(window).scrollTop() > 0) {
    header.addClass('is-scroll');
  } else {
    header.removeClass('is-scroll');
  }
}

function mobileNav(){
  var btn = $('.header__btn');
  var nav = $('.header__nav');

  btn.on('click', function(){
    var _this = $(this);
    if (_this.hasClass('is-active')) {
      _this.removeClass('is-active');
      nav.removeClass('is-active');
    } else {
      _this.addClass('is-active');
      nav.addClass('is-active');
    }
  });
}

function seoContent(){
  var block = $('.content__seo');
  var btn = block.find('.btn');
  var wrapper = block.find('.content__seo-wrapper');

  btn.on('click', function(e){
    e.preventDefault();
    block.toggleClass('is-active');

    if ($(this).text() == 'Подробнее') {
      $(this).text('Скрыть')
    } else {
      $(this).text('Подробнее')
    }

  });
}

function showPassword(){
  var input = $('input[type="password"]');

  input.each(function(){
    var _this = $(this);
    var btn = _this.next('button');
    btn.text('Показать');

    btn.on('click', function() {
      _this.togglePassword();
      if (btn.text() == 'Скрыть') {
        btn.text('Показать')
      } else {
        btn.text('Скрыть')
      }
    });
  });
}

function uploadImageProfile() {
  var readURL = function(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $('.settings__picture').attr('src', e.target.result);
      }

      reader.readAsDataURL(input.files[0]);
    }
  }

  $(".settings__file-upload").on('change', function(){
    readURL(this);
  });
  $(".settings__image-div").on('click', function() {
     $(".settings__file-upload").click();
  });
  $(".settings__file-link").on('click', function() {
     $(".settings__file-upload").click();
  });
}

function filterPopup(){
  var btn = $('.catalog__head a, .advert__block-tariff a');
  var html = $('html');
  var close = $('.modal .filter__head-btn--close');

  btn.each(function(){
    var _this = $(this);

    _this.on('click', function(e){
      e.preventDefault();
      var href = _this.attr('href').split('').slice(1).join('');
      var block = $('#' + href);

      if (block.hasClass('is-active')) {
        block.removeClass('is-active');
        html.removeClass('is-modal');
      } else {
        block.addClass('is-active');
        html.addClass('is-modal');
      }
    });
  });

  close.on('click', function(e){
    e.preventDefault();
    var block = $(this).parents('.modal');

    if (block.hasClass('is-active')) {
      block.removeClass('is-active');
      html.removeClass('is-modal');
    } else {
      block.addClass('is-active');
      html.addClass('is-modal');
    }
  });
}

function sorting(){
  var html = $('html');
  var a = $('.filter__sort a');

  a.each(function(){
    var _this = $(this);

    _this.on('click', function(e){
      e.preventDefault();
      var block = $(this).parents('.modal');

      if (block.hasClass('is-active')) {
        block.removeClass('is-active');
        html.removeClass('is-modal');
      } else {
        block.addClass('is-active');
        html.addClass('is-modal');
      }
    });
  });
}

function catalogFilter(){

  $("#filter__range").slider({
  	min: 0,
  	max: 20000,
  	values: [5000,15000],
  	range: true,
  	stop: function(event, ui) {
      $("input#priceMin").val($("#filter__range").slider("values",0));
      $("input#priceMax").val($("#filter__range").slider("values",1));

      $('.price-range-min.value').html($("#filter__range").slider("values",0));
      $('.price-range-max.value').html($("#filter__range").slider("values",1));
    },
    slide: function(event, ui){
      $("input#priceMin").val($("#filter__range").slider("values",0));
      $("input#priceMax").val($("#filter__range").slider("values",1));

      $('.price-range-min.value').html($("#filter__range").slider("values",0));
      $('.price-range-max.value').html($("#filter__range").slider("values",1));
    }
  });

  $("input#priceMin").on('change', function(){
  	var value1=$("input#priceMin").val();
  	var value2=$("input#priceMax").val();
    if(parseInt(value1) > parseInt(value2)){
  		value1 = value2;
  		$("input#priceMin").val(value1);
      $('.price-range-min.value').html(value1);
  	}
  	$("#filter__range").slider("values", 0, value1);
    $('.price-range-min.value').html(value1);
  });

  $("input#priceMax").on('change', function(){
  	var value1=$("input#priceMin").val();
  	var value2=$("input#priceMax").val();
  	if (value2 > 20000) { value2 = 20000; $("input#priceMax").val(35000)}
  	if(parseInt(value1) > parseInt(value2)){
  		value2 = value1;
  		$("input#priceMax").val(value2);
      $('.price-range-max.value').html(value2);
  	}
  	$("#filter__range").slider("values",1,value2);
    $('.price-range-max.value').html(value2);
  });

  // фильтрация ввода в поля
  $('input#priceMin, input#priceMax').on('keypress', function(event){
    var key, keyChar;
    if(!event) var event = window.event;
    if (event.keyCode) key = event.keyCode;
    else if(event.which) key = event.which;
    if(key==null || key==0 || key==8 || key==13 || key==9 || key==46 || key==37 || key==39 ) return true;
    keyChar=String.fromCharCode(key);
    if(!/\d/.test(keyChar))	return false;
  });

  $('.filter__block-head .span').on('click', function(){
    var _this = $(this);
    if (_this.parent().parent().hasClass('is-hidden')) {
      _this.parent().parent().removeClass('is-hidden');
    } else {
      _this.parent().parent().addClass('is-hidden');
    }
  });

  var filterCheckbox = $('.filter__block').find('input[type="checkbox"]');
  filterCheckbox.each(function(index){
    var _this = $(this);
    var _thisIndex = index;
    var label = _this.next().next('label');
    _this.on('change', function(e){
      var div = _this.parents('.filter__block').find('.filter__block-head .div');

      if (_this.is(":checked")) {
        _this.parents('.filter__block').find('.filter__block-head').append('<div class="div" data-text="'+ label.text() +'">' + label.text() + '</div>');
      }
    });
  });

  $('.has-hide').readmore({
    speed: 500,
    collapsedHeight: 110,
    moreLink: '<div class="filter__more"><a href="#!">показать еще</a></div>',
    lessLink: '<div class="filter__more"><a href="#!">свернуть</a></div>'
  });
}

function productGgallery(){
  $('.product__gallery').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnFocus: false,
    pauseOnHover: false,
    waitForAnimate: false,
    focusOnSelect: false,
    fade: true,
    cssEase: 'linear'
  });

  var gallery = $('.product__gallery');
  var html = $('html');
  var block = $('.modal');

  gallery.on('click', function(){
    block.addClass('is-active');
    html.addClass('is-modal');
  });

  var back = $('.modal .btn--default');
  back.on('click', function(e){
    e.preventDefault();
    block.removeClass('is-active');
    html.removeClass('is-modal');
  });
}

function productPhone(){
  $('.product__btn a').on('click', function(e){
    var _this = $(this);
    if (_this.filter('data-phone')) {
      _this.html($(this).data('phone'));
      setTimeout(function(){
        _this.attr('href', 'tel:' + _this.data('phone'));
      }, 100)
    }
  })
}

function faq(){
  var faqBlock = '.faq__block',
      faqBlockAnswer = '.faq__block-answer',
      faqBlockTitle = $('.faq__block-title');

  faqBlockTitle.on('click', function(e){
    e.preventDefault();
    var _this = $(this);

    if (_this.parents(faqBlock).hasClass('is-active')) {
      _this.parents(faqBlock).removeClass('is-active');
      _this.next(faqBlockAnswer).slideUp();
    } else {
      _this.parents(faqBlock).addClass('is-active');
      _this.next(faqBlockAnswer).slideDown();
    }
  });
}

function tariffPopup(){
  var block = $('.advert__block-tariff');
  block.each(function(){
    var _this = $(this);
    var link = _this.find('a.link');
    var popup = link.next('.tariff__popup');
    var close = popup.find('.tariff__popup-close');

    link.on('click', function(){
      if (popup.hasClass('is-active')) {
        popup.removeClass('is-active')
      } else {
        popup.addClass('is-active')
      }
    });

    close.on('click', function(){
      if (popup.hasClass('is-active')) {
        popup.removeClass('is-active')
      } else {
        popup.addClass('is-active')
      }
    });
  });
}
