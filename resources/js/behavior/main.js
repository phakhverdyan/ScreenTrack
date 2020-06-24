
$(document).ready(function(){
  $('.coupon-code').click(function() {
    $('.gs-checkout__form-coupon').toggle("slide");
  });
});

$(document).ready(function(){
  $('.gs-from__country').click(function() {
    $('.list-block').toggle("slide");
  });
});


document.getElementsByClassName('hero-form__button')[0].addEventListener('click', function () {
  document.getElementsByClassName('hero-form')[0].classList.add('active');
});

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

/* preload */

