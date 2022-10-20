const nav = document.querySelector('nav');
const hamb = document.querySelector('.hamb-menu');
const buttons = document.querySelectorAll('button');
const submit = document.querySelector('#submit');
const userInput = document.querySelector('#userInput');
const root = document.querySelector('.root');

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

// this
const keys = [];
submit.addEventListener('click', function () {
  getAPi(userInput.value);
  // update();
});
// get api
function getAPi(url) {
  const userUrl = url;
  const api = fetch(`https://api.shrtco.de/v2/shorten?url=${userUrl}`);
  api
    .then((bdy) => bdy.json())
    .then((res) => {
      pushKey(res.result);
      console.log(res);
      update();
    })
    .catch((err) => console.log(err));
}

function pushKey(params) {
  let key = params.code;
  let original = params.original_link;
  let short = params.short_link;
  localStorage.setItem(params.code, params.short_link);
  keys.unshift({ key, original, short });
}

function update() {
  let result = '';

  keys.forEach((e) => {
    result += `
        <div class="output-shortly">
          <div class="urlBase">${e.original}</div>
          <div class="urlEndpoint">
            <h3>${e.short}</h3>
            <button>copy</button>
          </div>
        </div>
      `;
  });

  root.innerHTML = result;
}
