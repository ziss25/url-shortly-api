const nav = document.querySelector('nav');
const hamb = document.querySelector('.hamb-menu');
const buttons = document.querySelectorAll('button');

class Myclass extends Swal {}

// hamb click
hamb.addEventListener('click', function () {
  nav.classList.toggle('nav-active');
});
// all buttons
buttons.forEach((button) => {
  button.addEventListener('click', function () {
    Myclass.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'untuk sementara begini aja dlu!',
    });
  });
});
