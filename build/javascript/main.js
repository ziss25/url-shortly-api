const nav = document.querySelector('nav');
const hamb = document.querySelector('.hamb-menu');
const buttons = document.querySelectorAll('button');
const submit = document.querySelector('#submit');
const userInput = document.querySelector('#userInput');
const root = document.querySelector('.root');
const animate = document.querySelector('.spinner');
const shortenText = document.querySelector('.shorten-text');
class Myclass extends Swal {}

// hamb click
hamb.addEventListener('click', function () {
  nav.classList.toggle('nav-active');
});
// all buttons
// buttons.forEach((button) => {
//   button.addEventListener('click', function () {
//     Myclass.fire({
//       icon: 'error',
//       title: 'Oops...',
//       text: 'untuk sementara begini aja dlu!',
//     });
//   });
// });
// btn request api
const datas = [];
submit.addEventListener('click', async () => {
  try {
    animate.style.display = 'block';
    shortenText.innerText = '';
    const api = await getAPi(userInput.value);
    const dataResult = pushData(api);
    datas.unshift(dataResult);
    update();
  } catch (err) {
    Myclass.fire({
      icon: 'error',
      title: 'url tidak valid',
      text: 'silahkan url yg bener',
    });
  }
});
function getAPi(url) {
  const userUrl = url;
  return fetch(`https://api.shrtco.de/v2/shorten?url=${userUrl}`)
    .then((bdy) => bdy.json())
    .then((res) => res.result)
    .catch((err) => err)
    .finally(() => {
      animate.style.display = 'none';
      shortenText.innerText = 'Shorten it';
    });
}
function pushData(params) {
  let key = params.code;
  let original = params.original_link;
  let short = params.short_link;
  return { key, original, short };
}
function update() {
  let result = '';
  datas.forEach((e) => {
    console.log(e);
    result += `
        <div class="output-shortly">
          <div class="urlBase">${e.original}</div>
          <div class="urlEndpoint">
            <h3 class="p1">${e.short}</h3>
            <input style="opacity: 0; position: absolute;" value="${e.short}" ></input>
            <button onclick="copied()" style="cursor: pointer;" >copy</button>
          </div>
        </div>
      `;
  });
  root.innerHTML = result;
  userInput.value = '';
}
function copied() {
  const selectTarget = event.target;
  const selectShort = selectTarget.previousElementSibling;
  // copy select
  selectShort.select();
  document.execCommand('copy');
  console.log(selectShort);

  // style click copy
  selectTarget.innerText = 'copied';
  selectTarget.style.backgroundColor = 'hsl(257, 27%, 26%)';
  selectTarget.style.transition = 'all ease-out .3s';

  // reset style copied
  setTimeout(() => {
    selectTarget.innerText = 'copy';
    selectTarget.style.backgroundColor = 'hsl(180, 66%, 49%)';
    selectTarget.style.transition = 'all ease-out 1s';
  }, 2000);
}
