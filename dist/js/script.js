$(document).ready(function(){
  $('.carousel__inner').slick({
    speed: 1200,
    //adaptiveHeight: true,
    prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.png"></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="icons/right.png"></button>',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          arrows: true,
          infinite: true,
          cssEase: 'linear'
        }
      },
      {
        breakpoint: 768,
        settings: {
          autoplay: true,
          autoplaySpeed: 2000,
          dots: false,
          arrows: false
        }
      },
      {
        breakpoint: 576,
        settings: {
          autoplay: true,
          autoplaySpeed: 2000,
          dots: false,
          arrows: false
        }
      }
    ]
  });
});

$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab__active)', function() {
  $(this)
    .addClass('catalog__tab__active').siblings().removeClass('catalog__tab__active')
    .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
});


function toggleSlide(item) {
$(item).each(function(i) {
  $(this).on('click', function(e) {
    e.preventDefault();
    $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
    $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
  })
});
};

toggleSlide('.catalog-item__link');
toggleSlide('.catalog-item__back');

//Modal

$('[data-modal=consultation]').on('click', function() {
  $('.overlay, #consultation').fadeIn('slow');
});
$('.modal__close').on('click', function() {
  $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
});

$('.button_mini').each(function(i) {
  $(this).on('click', function(){
    $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
    $('.overlay, #order').fadeIn('slow');
  })
});

function validateForms(form) {
  $(form).validate({
    rules: {
      name: {
        required: true,
        minlength: 2
      },
      phone: "required",
      email: {
        required: true,
        email: true
      }
    },
    messages: {
      name: {
        required: "Пожалуйста введите свое имя",
        minlength: jQuery.validator.format("Введите {0} символа!")
      },
      phone: "Пожалуйста введите свой номер телефона",
      email: {
        required: "Пожалуйста введите свою почту",
        email: "Неправильно введен адрес почты"
      }
    }
  });
};

validateForms('#consultation-form');
validateForms('#consultation form');
validateForms('#order form');

$('input[name=phone]').mask("+7 (999) 999-99-99");

$('form').submit(function(e) {
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: "mailer/smart.php",
    data: $(this).serialize()
  }).done(function() {
    $(this).find("input").val("");
    $('#consultation, #order').fadeOut();
    $('.overlay, #thanks').fadeIn('slow');
    $('form').trigger('reset');
  });
  return false;
});

//Smooth scroll and page-up

$(window).scroll(function() {
  if ($(this).scrollTop() > 1600) {
    $('.pageup').fadeIn();
  } else {
    $('.pageup').fadeOut();
  }
});

$("a[href=#up]").click(function(){
  const _href = $(this).attr("href");
  $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
  return false;
});

new WOW().init();

/* const slider = tns({
  container: '.carousel__inner',
  items: 1,
  slideBy: 'page',
  autoplay: false,
  controls: false, //чтобы исчезли родные стрелки(кнопки)
  nav: false, // чтоб исчезли точечки
  navPosition: 'bottom',
  preventScrollOnTouch: 'auto', // bugfix warning console on touch
  autoWidth: false,
  controls: false,
  rewind: true,
  responsive: {
    576: {
      edgePadding: 20,
      gutter: 20,
      items: 1,
      nav: true
    },
    768: {
      autoWidth: true,
      gutter: 30,
      nav: true
    },
    992: {
      items: 1,
      nav: false
    }
  },
});

document.querySelector('.prev').addEventListener('click', function () {
  slider.goTo('prev');
});

document.querySelector('.next').addEventListener('click', function () {
  slider.goTo('next');
}); */