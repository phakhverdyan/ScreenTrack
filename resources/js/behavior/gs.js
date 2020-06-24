document.getElementsByClassName('form-cp-cm__button')[0].addEventListener('click', function () {
    document.getElementsByClassName('form-cp-cm')[0].classList.add('active');
  });


  $(document).ready(function(){
    $('.mob-menu').click(function() {
      $('.mob-navigation').toggle("slide");
    });
  });