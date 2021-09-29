const commaPoint = (number) => number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")

const globalMarketCapVolume = ({ total_mcap, total_volume, mcap_change, volume_change }) => {
  const marketCap = document.getElementById('market-cap');
  const volume = document.getElementById('volume');
  marketCap.innerText = `  ${commaPoint(total_mcap)} (${mcap_change}%)`;
  volume.innerText = `  ${commaPoint(total_volume)} (${volume_change}%)`;
  if (mcap_change.startsWith('-')) {
    marketCap.style.color = 'red';
  } else {
    marketCap.style.color = 'green';
  }
  if (volume_change.startsWith('-')) {
    volume.style.color = 'red';
  } else {
    volume.style.color = 'green';
  }
}

function createLogosBigAndLose(nameid, span1) {
  if (nameid === 'axie-infinity') {
    const img = document.createElement('img');
    img.classList.add('logo-crypto');
    img.src = `https://monnos.com/wp-content/uploads/2021/08/axie-1.png`;
    span1.appendChild(img);
  } else if (nameid === 'ripple') {
    const img = document.createElement('img');
    img.classList.add('logo-crypto');
    img.src = `https://cryptologos.cc/logos/thumbs/xrp.png?v=013`;
    span1.appendChild(img);
  } else if (nameid === 'elrond-egold') {
    const img = document.createElement('img');
    img.classList.add('logo-crypto');
    img.src = `https://cryptologos.cc/logos/thumbs/elrond-egld.png?v=013`;
    span1.appendChild(img);
  } else if (nameid === 'polkadot') {
    const img = document.createElement('img');
    img.classList.add('logo-crypto');
    img.src = `https://cryptologos.cc/logos/thumbs/polkadot-new.png?v=013`;
    span1.appendChild(img);
  } else if (nameid === 'theta-token') {
    const img = document.createElement('img');
    img.classList.add('logo-crypto');
    img.src = `https://cryptologos.cc/logos/thumbs/theta.png?v=013`;
    span1.appendChild(img);
  } else if (nameid === 'terrausd') {
    const img = document.createElement('img');
    img.classList.add('logo-crypto');
    img.src = `https://s3-us-west-1.amazonaws.com/compliance-ico-af-us-west-1/production/token_profiles/logos/original/49e/d76/27-/49ed7627-3930-497b-a45f-7304ea9f7d83-1614303905-4ad23deebf089f767bfb868a69f674316a0fdc3c.png`;
    span1.appendChild(img);
  } else if (nameid === 'bitcoin-cash-sv') {
    const img = document.createElement('img');
    img.classList.add('logo-crypto');
    img.src = `https://cryptologos.cc/logos/thumbs/bitcoin-cash.png?v=013`;
    span1.appendChild(img);
  } else {
    const img = document.createElement('img');
    img.classList.add('logo-crypto');
    img.src = `https://cryptologos.cc/logos/thumbs/${nameid}.png?v=013`;
    span1.appendChild(img);
  }
}

// Traz informações da API de dados de  e ordena de acordo com o ganho das últimas 24h
const biggestLoserWinner = async () => {
  const response = await fetch(' https://api.coinlore.net/api/tickers/?start=0&limit=50').then(response => response.json());
  const winners = response.data.sort((a, b) => a.percent_change_24h - b.percent_change_24h).reverse().splice(0, 5);
  const losers = response.data.sort((a, b) => a.percent_change_24h - b.percent_change_24h).splice(0, 5);

  const winnerSec = document.getElementById('winners');
  const loserSec = document.getElementById('losers');

  // Loop para exibir na tela o resultado ordenado das moedas com maior valorização
  winners.forEach((coin) => {
    const div = document.createElement('div');
    div.style.display = 'flex';
    const span1 = document.createElement('span');
    const span2 = document.createElement('span');
    span1.innerText = `(+${coin.percent_change_24h}%)`
    span2.innerText = `${coin.name}`;
    span1.style.color = 'green'
    createLogosBigAndLose(coin.nameid, span1)
    div.appendChild(span1);
    div.appendChild(span2);
    winnerSec.appendChild(div);
  });
  
  // Loop para exibir na tela o resultado ordenado das moedas com menor valorização
  losers.forEach((coin) => {
    const div = document.createElement('div');
    div.style.display = 'flex';
    const span1 = document.createElement('span');
    const span2 = document.createElement('span');
    span1.innerText = `(${coin.percent_change_24h}%)`
    span2.innerText = `${coin.name}`;
    span1.style.color = 'red'
    createLogosBigAndLose(coin.nameid, span1)
    div.appendChild(span1);
    div.appendChild(span2);
    loserSec.appendChild(div);
  });
}


// Traz informações da API de notícias em tempo real sobre o mercado de criptomoedas
const fetchNews = () => {
  const myHeaders = new Headers();
  myHeaders.append("authorization", "c075710bb2a4746fca0e92e034127a432b454e538b43e9f8291d4cb2e8fba8c2");
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  // Utiliza as informações trazidas da API citada acima como parâmetro para a função 'createNews'
  fetch("https://min-api.cryptocompare.com/data/v2/news/?lang=PT", requestOptions)
    .then(response => response.json())
    .then(result => {
      createNews(result)
      createNews2(result);
    })
    .catch(error => console.log('error', error));
}

// Cria 6 elementos contendo a imagem, o título e o link de redirecionamento para cada notícia trazida pela API 
const createNews = (result) => {
  for (let i = 2; i < 50; i += 1) {
    const div = document.createElement('div');
    div.className = 'news-div'
    const lin = document.createElement('a');
    lin.href = result.Data[i].guid;
    lin.target = '_blank';
    const img = document.createElement('img');
    img.className = 'news-image';
    const p = document.createElement('p');
    img.src = result.Data[i].imageurl;
    p.innerText = `${result.Data[i].title.slice(0, 50)}...`;
    const newsSection = document.querySelector('.news');
    newsSection.appendChild(lin);
    lin.appendChild(div);
    div.appendChild(img);
    div.appendChild(p);
  }
  $('.news').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: '<div style="font-size:50px; margin-right:25px; cursor:pointer;" class="slick-prev"><i class="fa fa-angle-left arrow" aria-hidden="true"></i></div>',
    nextArrow: '<div style="font-size:50px; margin-left:25px; cursor:pointer;" class="slick-next"><i class="fa fa-angle-right arrow" aria-hidden="true"></i></div>'
  });
}

// Cria 3 elementos contendo a imagem, o título e o link de redirecionamento para cada notícia trazida pela API
const createNews2 = (result) => {
  const randomNum = Math.floor(Math.random() * 44);
  for (let i = 2; i < 50; i += 1) {
    const div = document.createElement('div');
    div.className = 'news2-div'
    const lin = document.createElement('a');
    lin.href = result.Data[i].guid;
    lin.target = '_blank';
    const img = document.createElement('img');
    img.className = 'news2-image';
    const p = document.createElement('p');
    img.src = result.Data[i].imageurl;
    p.innerText = `${result.Data[i].title.slice(0, 50)}...`;
    const newsSection = document.querySelector('.news2');
    newsSection.appendChild(lin);
    lin.appendChild(div);
    div.appendChild(img);
    div.appendChild(p);
  }
  $('.news2').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: '<div style="font-size:50px; margin-right:25px; cursor:pointer;" class="slick-prev arrow"><i class="fa fa-angle-left" aria-hidden="true"></i></div>',
    nextArrow: '<div style="font-size:50px; margin-left:25px; cursor:pointer;" class="slick-next"><i class="fa fa-angle-right arrow" aria-hidden="true"></i></div>'
  });
}

const getApi = async () => {
  const response = await fetch(' https://api.coinlore.net/api/tickers/?start=0&limit=50').then(response => response.json());
  const response2 = await fetch('https://api.coinlore.net/api/coin/markets/?id=90').then(response => response.json());
  const response3 = await fetch('https://api.coinlore.net/api/global/').then(response => response.json());
  globalMarketCapVolume(response3[0]);
  document.querySelector('.main-content').innerHTML = '';
  return { coins: response, exchanges: response2, global: response3 };
}

// Cria a seção principal da página onde serão disponibilizadas as informações de cada criptomoeda
function createSection(main) {
  const newSection = document.createElement('section');
  newSection.className = 'coin-section';
  main.appendChild(newSection);
  return newSection
}

function createSection2(main) {
  const newSection = document.createElement('section');
  newSection.className = 'coin-section2';
  main.appendChild(newSection);
  return newSection
}

// Busca logos de cada moeda através da url especifica de cada uma e exibe ao lado para melhorar a visualização do usuário
function createLogos(nameid, newSpan) {
  if (nameid === 'ripple') {
    const img = document.createElement('img');
    img.classList.add('logo-crypto');
    img.src = `https://cryptologos.cc/logos/thumbs/xrp.png?v=013`;
    newSpan.appendChild(img);
  } else if (nameid === 'polkadot') {
    const img = document.createElement('img');
    img.classList.add('logo-crypto');
    img.src = `https://cryptologos.cc/logos/thumbs/polkadot-new.png?v=013`;
    newSpan.appendChild(img);
  } else if (nameid === 'theta-token') {
    const img = document.createElement('img');
    img.classList.add('logo-crypto');
    img.src = `https://cryptologos.cc/logos/thumbs/theta.png?v=013`;
    newSpan.appendChild(img);
  } else if (nameid === 'axie-infinity') {
    const img = document.createElement('img');
    img.classList.add('logo-crypto');
    img.src = `https://monnos.com/wp-content/uploads/2021/08/axie-1.png`;
    newSpan.appendChild(img);
  } else if (nameid === 'elrond-egold') {
    const img = document.createElement('img');
    img.classList.add('logo-crypto');
    img.src = `https://cryptologos.cc/logos/thumbs/elrond-egld.png?v=013`;
    newSpan.appendChild(img);
  } else if (nameid === 'terrausd') {
    const img = document.createElement('img');
    img.classList.add('logo-crypto');
    img.src = `https://s3-us-west-1.amazonaws.com/compliance-ico-af-us-west-1/production/token_profiles/logos/original/49e/d76/27-/49ed7627-3930-497b-a45f-7304ea9f7d83-1614303905-4ad23deebf089f767bfb868a69f674316a0fdc3c.png`;
    newSpan.appendChild(img);
  } else if (nameid === 'bitcoin-cash-sv') {
    const img = document.createElement('img');
    img.classList.add('logo-crypto');
    img.src = `https://cryptologos.cc/logos/thumbs/bitcoin-cash.png?v=013`;
    newSpan.appendChild(img);
  } else {
    const img = document.createElement('img');
    img.classList.add('logo-crypto');
    img.src = `https://cryptologos.cc/logos/thumbs/${nameid}.png?v=013`;
    newSpan.appendChild(img);
  }
}

function createTable(section, rank, title, nameid) {
  const newSpan = document.createElement('span');
  newSpan.innerText = rank;
  if (parseFloat(rank) < 0) {
    newSpan.style.color = 'red';
    newSpan.style.fontWeight = '900';
    newSpan.innerText += '%';
  } else if ((title === '1h' || title === '24h' || title === '7d') && parseFloat(rank) > 0) {
    newSpan.style.fontWeight = '900';
    newSpan.style.color = 'green';
    newSpan.innerText += '%';
  } else if (title === 'Volume 24h' || title === 'Suprimento' || title === 'Market Cap') {
    newSpan.innerText = commaPoint(Number(newSpan.innerText));
  } else if (title === 'Símbolo') {
    createLogos(nameid, newSpan);
  }
  section.appendChild(newSpan);
}

function fillSectionsSorted(coins) {
  const main = document.querySelector('.main-content');
  const keyArray = ['rank', 'symbol', 'name', 'percent_change_1h', 'percent_change_24h', 'percent_change_7d', 'price_usd', 'market_cap_usd', 'volume24', 'tsupply'];
  const titleArray = ['Rank', 'Símbolo', 'Nome', '1h', '24h', '7d', 'Preço(USD)', 'Market Cap', 'Volume 24h', 'Suprimento']
  keyArray.forEach((key, i) => {
    createMainContent(coins, key, main, titleArray[i]);
  });
}

async function sort({ target }, key) {
  const { coins } = await getApi();
  if (target.classList[1] === key && (key === 'symbol' || key === 'name')) {
    coins.data.sort();
    document.querySelector('.main-content').innerHTML = '';
    fillSectionsSorted(coins);
  }
}

function createMainContent(coins, key, main, title) {
  // const criptoButton = document.querySelector('#cripto-button');
  const newSection = createSection(main);
  const titleSpan = document.createElement('span');
  titleSpan.className = `title-span ${key}`;
  titleSpan.innerText = title;
  titleSpan.addEventListener('click', async ({ target }) => {
    const { coins } = await getApi();
    if (target.classList[1] === key && (key === 'symbol' || key === 'name')) {
      if (target.nextElementSibling.innerText[0].toLowerCase() === 'a') {
        coins.data.sort((a, b) => a[key] < b[key] && 1 || -1);
        document.querySelector('.main-content').innerHTML = '';
        fillSectionsSorted(coins);
      } else {
        coins.data.sort((a, b) => a[key] > b[key] && 1 || -1);
        document.querySelector('.main-content').innerHTML = '';
        fillSectionsSorted(coins);
      }
    } else {
      if (parseFloat(target.nextElementSibling.innerText) > parseFloat(target.parentNode.lastChild.innerText)) {
        coins.data.sort((a, b) => a[key] - b[key]);
        document.querySelector('.main-content').innerHTML = '';
        fillSectionsSorted(coins);
      } else {
        coins.data.sort((a, b) => b[key] - a[key]);
        document.querySelector('.main-content').innerHTML = '';
        fillSectionsSorted(coins);
      }
    }
  });
  // criptoButton.href = '#criptos';
  newSection.appendChild(titleSpan);
  coins.data.forEach(coin => {
    createTable(newSection, coin[key], title, coin.nameid);
  });
}

// Preenche o conteúdo da tabela principal
const fillSections = async () => {
  const { coins } = await getApi();
  const main = document.querySelector('.main-content');
  const keyArray = ['rank', 'symbol', 'name', 'percent_change_1h', 'percent_change_24h', 'percent_change_7d', 'price_usd', 'market_cap_usd', 'volume24', 'tsupply'];
  const titleArray = ['Rank', 'Símbolo', 'Nome', '1h', '24h', '7d', 'Preço(USD)', 'Market Cap', 'Volume 24h', 'Suprimento']
  keyArray.forEach((key, i) => {
    createMainContent(coins, key, main, titleArray[i]);
  });
}

function createMainContent2(coins, key, main, title) {
  const newSection = createSection2(main);
  const titleSpan = document.createElement('span');
  // const criptoButton = document.querySelector('#cripto-button');
  titleSpan.className = `title-span2 ${key}`;
  titleSpan.innerText = title;
  titleSpan.addEventListener('click', async ({ target }) => {
    const { coins } = await getApi();
    if (target.classList[1] === key && (key === 'symbol' || key === 'name')) {
      if (target.nextElementSibling.innerText[0].toLowerCase() === 'a') {
        coins.data.sort((a, b) => a[key] < b[key] && 1 || -1);
        document.querySelector('.main-content2').innerHTML = '';
        fillSectionsSorted(coins);
      } else {
        coins.data.sort((a, b) => a[key] > b[key] && 1 || -1);
        document.querySelector('.main-content2').innerHTML = '';
        fillSectionsSorted(coins);
      }
    } else {
      if (parseFloat(target.nextElementSibling.innerText) > parseFloat(target.parentNode.lastChild.innerText)) {
        coins.data.sort((a, b) => a[key] - b[key]);
        document.querySelector('.main-content2').innerHTML = '';
        fillSectionsSorted(coins);
      } else {
        coins.data.sort((a, b) => b[key] - a[key]);
        document.querySelector('.main-content2').innerHTML = '';
        fillSectionsSorted(coins);
      }
    }
  });
  // criptoButton.href = '#criptos2';
  newSection.appendChild(titleSpan);
  coins.data.forEach(coin => {
    createTable(newSection, coin[key], title, coin.nameid);
  });
}

// Preenche o conteúdo da tabela principal quando a tela for menor que 600px (controle via css);
const fillSections2 = async () => {
  const { coins } = await getApi();
  const main = document.querySelector('.main-content2');
  const keyArray = ['rank', 'symbol', 'percent_change_24h', 'percent_change_7d', 'price_usd'];
  const titleArray = ['Rank', 'Símbolo', '24h', '7d', 'Preço(USD)']
  keyArray.forEach((key, i) => {
    createMainContent2(coins, key, main, titleArray[i]);
  });
}

function loadingScreen() {
  const newSection = document.createElement('section');
  const nav = document.querySelector('.nav-bar');
  newSection.className = 'loading-container';
  document.querySelector('body').insertBefore(newSection, nav);
  const loadImage = document.createElement('img');
  loadImage.className = 'load-image';
  loadImage.src = './imgs/cc_logo_transp.png';
  newSection.appendChild(loadImage);
  const loadImage2 = document.createElement('img');
  loadImage2.className = 'load-image';
  loadImage2.src = './imgs/cc_logo_transp.png';
  newSection.appendChild(loadImage2);
}

function loadingRemove() {
  const section = document.querySelector('.loading-container');
  section.remove();
}

function buttonEvent() {
  const submitButton = document.querySelector('.button');
  submitButton.addEventListener('click', () => {
    const emailInput = document.querySelector('.input');
    const re = /\S+@\S+\.\S+/;
    if (re.test(emailInput.value)) {
      emailInput.value = '';
      alert('E-mail cadastrado com sucesso!')
    } else {
      emailInput.value = '';
      alert('E-mail inválido!')
    }
  });
}

const criptoHref = () => {
  const criptoButton = document.querySelector('#cripto-button');
  if (window.screen.width <= 420) {
    criptoButton.href = '#criptos2'
  } else {
    criptoButton.href = '#criptos'
  }
}

window.onload = async () => {
  criptoHref();
  loadingScreen();
  await fillSections2();
  fetchNews();
  biggestLoserWinner();
  await fillSections();
  loadingRemove();
  buttonEvent();
  setInterval(() => {
    fillSections();
  }, 60000)
}

module.exports = { loadingScreen, fillSectionsSorted, fillSections, fillSections2, biggestLoserWinner, fetchNews, getApi, loadingRemove, createTable, createLogos, createLogosBigAndLose, globalMarketCapVolume, commaPoint, createNews, createNews2, createMainContent, createMainContent2, createSection, createSection2, buttonEvent };
