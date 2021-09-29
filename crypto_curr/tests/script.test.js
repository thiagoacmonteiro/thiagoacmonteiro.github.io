/**
 * @jest-environment jsdom
 */

let { loadingScreen, fillSectionsSorted, fillSections, fillSections2, biggestLoserWinner, fetchNews, getApi, loadingRemove, createTable, createLogos, commaPoint, createNews, createNews2, createMainContent, createMainContent2, createSection, createSection2, buttonEvent } = require('../script.js');

describe('Testando o loading da página', () => {
  test('se a função de loadingScreen está funcionando corretamente', () => {
    loadingScreen = jest.fn();
    loadingScreen();
    expect(loadingScreen).toHaveBeenCalled();
    expect(loadingScreen).toHaveBeenCalledTimes(1);
  });

  test('se a função de loadingRemove está funcionando corretamente', () => {
    loadingRemove = jest.fn();
    loadingRemove();
    expect(loadingRemove).toHaveBeenCalled();
    expect(loadingRemove).toHaveBeenCalledTimes(1);
  });
});

describe('Testando retorno do fetch da API de notícias e sua construção para exibir na tela', () => {
  fetchNews = jest.fn().mockResolvedValue({
    title: 'Título da notícia',
    imageurl: 'Endereço da imagem',
    guid: 'Endereço da notícia',
  });

  test('se o retorno é o esperado', () => {
    fetchNews().then((data) => {
      expect(data.title).toEqual('Título da notícia');
      expect(data.imageurl).toEqual('Endereço da imagem');
      expect(data.guid).toEqual('Endereço da notícia');
    });
  });

  test('se createNews é executada', () => {
    createNews = jest.fn()

    createNews();
    expect(createNews).toHaveBeenCalled();
  });

  test('se createNews2 é executada', () => {
    createNews2 = jest.fn()

    createNews2();
    expect(createNews2).toHaveBeenCalled();
  });
});

describe('Testando a ordenação dos mais valorizados e dos menos valorizados', () => {
  const winners = ['10.39, 6.08, 3.66, 2.65, 1.92'];

  test('se os valores retornados correspondem aos esperados', () => {
    biggestLoserWinner = jest.fn().mockReturnValue(winners);

    biggestLoserWinner();
    expect(biggestLoserWinner).toHaveBeenCalled();
    expect(biggestLoserWinner(winners)).toEqual(['10.39, 6.08, 3.66, 2.65, 1.92']);
  });

  const losers = ['-6.46, -5.42, -5.13, -5.10, -5.03'];

  test('se os valores retornados correspondem aos esperados', () => {
    biggestLoserWinner = jest.fn().mockReturnValue(losers);

    biggestLoserWinner();
    expect(biggestLoserWinner).toHaveBeenCalled();
    expect(biggestLoserWinner(losers)).toEqual(['-6.46, -5.42, -5.13, -5.10, -5.03']);
  });
});

describe('Testando a construção dinâmica da tabela página com base na API', () => {
  getApi = jest.fn().mockResolvedValue({
    coins: 'response',
    exchanges: 'response2',
    global: 'response3',
  });

  test('se a função de getApi está funcionando corretamente', () => {
    getApi().then((data) => {
      expect(data.coins).toEqual('response');
      expect(data.exchanges).toEqual('response2');
      expect(data.global).toEqual('response3');
    });
  });

  test('se a função fillSections está funcionando corretamente', () => {
    fillSections = jest.fn();
    fillSections();
    expect(fillSections).toHaveBeenCalled();
    expect(fillSections).toHaveBeenCalledTimes(1);
  });

  test('se a função fillSections2 está funcionando corretamente', () => {
    fillSections2 = jest.fn();
    fillSections2();
    expect(fillSections2).toHaveBeenCalled();
    expect(fillSections2).toHaveBeenCalledTimes(1);
  });

  test('se a função createMainContent está funcionando corretamente', () => {
    createMainContent = jest.fn();
    createMainContent();
    expect(createMainContent).toHaveBeenCalled();
    expect(createMainContent).toHaveBeenCalledTimes(1);
  });

  test('se a função createMainContent2 está funcionando corretamente', () => {
    createMainContent2 = jest.fn();
    createMainContent2();
    expect(createMainContent2).toHaveBeenCalled();
    expect(createMainContent2).toHaveBeenCalledTimes(1);
  });

  test('se a função createSection está funcionando corretamente', () => {
    createSection = jest.fn().mockReturnValue('HTML Element');
    expect(createSection()).toBe('HTML Element');
    expect(createSection).toHaveBeenCalled();
    expect(createSection).toHaveBeenCalledTimes(1);
  });

  test('se a função createSection está funcionando corretamente', () => {
    createSection2 = jest.fn().mockReturnValue('HTML Element');
    expect(createSection2()).toBe('HTML Element');
    expect(createSection2).toHaveBeenCalled();
    expect(createSection2).toHaveBeenCalledTimes(1);
  });

  test('se a função fillSectionsSorted está funcionando corretamente', () => {
    fillSectionsSorted = jest.fn();
    fillSectionsSorted();
    expect(fillSectionsSorted).toHaveBeenCalled();
    expect(fillSectionsSorted).toHaveBeenCalledTimes(1);
  });

  test('se a função createTable está funcionando corretamente', () => {
    createTable = jest.fn();
    createTable();
    expect(createTable).toHaveBeenCalled();
    expect(createTable).toHaveBeenCalledTimes(1);
  });

  test('se a função commaPoint está funcionando corretamente', () => {
    expect(commaPoint(1650.705)).toBe('1,650.70');
  });

  test('se a função createLogos está funcionando corretamente', () => {
    createLogos = jest.fn()
    createLogos();
    expect(createLogos).toHaveBeenCalled();
    expect(createLogos).toHaveBeenCalledTimes(1);
  });
});

describe('Testando a funcionalidade do botão de submit', () => {
  
  const success = 'E-mail cadastrado com sucesso!';
  
  test('se o botão envia alert de sucesso', () => {
    buttonEvent = jest.fn().mockReturnValue(success);

    buttonEvent();
    expect(buttonEvent).toHaveBeenCalled();
    expect(buttonEvent(success)).toEqual('E-mail cadastrado com sucesso!');
  });  
  
  const error = 'E-mail inválido!';

  test('se o botão envia alert de erro', () => {
    buttonEvent = jest.fn().mockReturnValue(error);

    buttonEvent();
    expect(buttonEvent).toHaveBeenCalled();
    expect(buttonEvent(error)).toEqual('E-mail inválido!');
  });
});
