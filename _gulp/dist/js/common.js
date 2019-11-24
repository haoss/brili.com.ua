'use strict';

// Document ready
$(document).on('ready', function(){

  // Magnific popup gallery
  $('.gallery').each(function() {
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
    midClick: true
  });

  $('.open-popup-ajax').magnificPopup({
    type: 'ajax',
    midClick: true
  });

  headerSearch();
  moveUp();
  seoContent();
  sortingTest();
  showPassword();
  headerProfile();
  inputNumber();
  uploadImageProfile();
  faq();
  catalogFilter();
  tariffPopup();

  settingsTest();
  removeAdvertTest();
  addAdvertTest();
  productPhoneTest();
  messageListTest();
  favoriteRemoveTest();

  $('.similar__carousel').slick({
    variableWidth: true,
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    centerMode: false,
    touchMove: false,
    touchThreshold: 1,
    centerPadding: '0px',
    slidesToShow: 5,
    prevArrow: '<button type="button" class="slick-prev"><svg viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 7l-.7071.7071c-.3905-.3905-.3905-1.0237 0-1.4142L1 7zm5.2929 6.7071l-6-6L1.707 6.293l6 6-1.4142 1.4142zm-6-7.4142l6-6L7.707 1.707l-6 6L.293 6.293z" fill="#CECDCD"/></svg></button>',
    nextArrow: '<button type="button" class="slick-next"><svg viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 7l.7071.7071c.3905-.3905.3905-1.0237 0-1.4142L7 7zm-5.2929 6.7071l6-6L6.293 6.293l-6 6 1.4142 1.4142zm6-7.4142l-6-6L.293 1.707l6 6L7.707 6.293z" fill="#CECDCD"/></svg></button>'
  });

  $('.product__gallery').slick({
     slidesToShow: 1,
     slidesToScroll: 1,
     arrows: true,
     dots: false,
     infinite: true,
     centerMode: true,
     variableWidth: false,
     // adaptiveHeight: true,
     fade: true,
     cssEase: 'linear',
     asNavFor: '.product__gallery-vertical',
     prevArrow: '<button type="button" class="slick-prev"><svg viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 7l-.7071.7071c-.3905-.3905-.3905-1.0237 0-1.4142L1 7zm5.2929 6.7071l-6-6L1.707 6.293l6 6-1.4142 1.4142zm-6-7.4142l6-6L7.707 1.707l-6 6L.293 6.293z" fill="#fff"/></svg></button>',
     nextArrow: '<button type="button" class="slick-next"><svg viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 7l.7071.7071c.3905-.3905.3905-1.0237 0-1.4142L7 7zm-5.2929 6.7071l6-6L6.293 6.293l-6 6 1.4142 1.4142zm6-7.4142l-6-6L.293 1.707l6 6L7.707 6.293z" fill="#fff"/></svg></button>'
  });
  $('.product__gallery-vertical').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.product__gallery',
    dots: false,
    centerMode: false,
    focusOnSelect: true,
    vertical: true,
    arrows: false,
    // variableWidth: true
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
  var btnUp = $('#link__up');

  if ($(window).scrollTop() > 200) {
    btnUp.fadeIn(500)
  } else {
    btnUp.fadeOut(500)
  }
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

function headerSearch(){
  var div = $('.header__search');
  var btn = div.find('.header__search-btn');

  btn.on('click', function(){
    div.toggleClass('is-active');
  });
}

function moveUp(){
  var btnUp = $('#link__up');

  btnUp.on('click', function(e){
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $(window).offset().top
    }, 500)
  })
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

function sortingTest(){
  var block = $('.sorting');
  var a = block.find('.sorting__link');

  a.each(function(){
    var _this = $(this);
    _this.on('click', function(e){
      e.preventDefault();

      $('.sorting__link').removeClass('is-active');
      _this.addClass('is-active');
    });
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

function headerProfile(){
  var btn = $('.header__profile-wrapper');

  btn.on('click', function(e){
    e.stopPropagation();
    var _this = $(this);
    if (_this.parent().hasClass('is-active')) {
      _this.parent().removeClass('is-active');
    } else {
      _this.parent().addClass('is-active');
    }
  });

  $('.header__profile-popup').on('click', function(e){
    e.stopPropagation();
  });

  $(document).on('click', function(){
    $('.header__profile').removeClass('is-active');
  });
}

function inputNumber(){
  $(document).on('keydown', 'input.onlyNumber', function(evt) {
    var key = evt.charCode || evt.keyCode || 0;

    return (key == 8 ||
            key == 9 ||
            key == 46 ||
            key == 110 ||
            key == 190 ||
            (key >= 35 && key <= 40) ||
            (key >= 48 && key <= 57) ||
            (key >= 96 && key <= 105));
  });
}

function settingsTest(){
  var input1 = $('#inputName');
  input1.on('input', function(e){
    input1.next().removeClass('hidden');
  });

  input1.next().find('button').on('click', function(e){
    e.preventDefault();
    input1.next().find('button').parent().addClass('hidden');
  });

  var edit2 = $('#btn-email-edit');
  edit2.on('click', function(e){
    e.preventDefault();
    edit2.hide();
    edit2.next().removeClass('hidden');
    edit2.next().find('input').focus();
  });
  var btn2 = $('#button2');
  btn2.on('click', function(e){
    e.preventDefault();
    btn2.parent().addClass('hidden');
    edit2.show();
  });

  var edit3 = $('#btn-phone-edit');
  edit3.on('click', function(e){
    e.preventDefault();
    edit3.hide();
    edit3.next().removeClass('hidden');
    edit3.next().find('input').focus();
  });
  var btn3 = $('#button3');
  btn3.on('click', function(e){
    e.preventDefault();
    btn3.parent().addClass('hidden');
    edit3.show();
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

function removeAdvertTest(){
  var close = $('.advert__block-close');
  close.each(function(){
    var _this = $(this);
    _this.on('click', function(){
      _this.parents('.advert__block').hide();
    });
  });
}

function faq(){
  var faqBlock = '.faq__block',
      faqBlockAnswer = '.faq__block-answer',
      faqBlockTitle = $('.faq__block-title');

  faqBlockTitle.on('click', function(e){
    e.preventDefault();
    console.log(e);
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

function addAdvertTest(){
  $('#radio111-input').on('change', function(){
    $('#radio-div2').addClass('hidden');
    $('#radio-div1').removeClass('hidden');
  });
  $('#radio112-input').on('change', function(){
    $('#radio-div1').addClass('hidden');
    $('#radio-div2').removeClass('hidden');
  });
}

function productPhoneTest(){
  var a = $('.product__phone a');
  a.on('click', function(e){
    e.preventDefault();
    $(this).prev('span').html($(this).prev('span').data('phone'));
    $(this).hide();
  })
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

;( function ( document, window, index )
{
	var inputs = document.querySelectorAll( '.inputfile' );
	Array.prototype.forEach.call( inputs, function(input)	{
		var label	 = input.nextElementSibling,
			labelVal = label.innerHTML;

		input.addEventListener('change', function(e){
	    var fileName = '';
      var link = input.nextElementSibling.lastElementChild;
      fileName = e.target.value.split( '\\' ).pop();

			if( fileName ) {
				label.querySelector( 'span' ).innerHTML = fileName;
        label.parentNode.classList.add("has-file");

        link.addEventListener('click', function(e){
          e.preventDefault();
          console.log(e);
          label.innerHTML = labelVal;
          label.parentNode.classList.remove("has-file");
        });
      } else {
        label.innerHTML = labelVal;
      }
		});
	});
}( document, window, 0 ));

function messageListTest(){
  var link = $('.iconTrash');

  link.each(function(){
    var _this = $(this);

    _this.on('click', function(){
      _this.parents('tr').hide();
    });
  })
}

function favoriteRemoveTest(){
  var link = $('.catalog__block-favorite');

  link.each(function(){
    var _this = $(this);
    _this.on('click', function(e){
      e.preventDefault();
      _this.parents('.catalog__block').hide();
    });
  })
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
