/* aqui vamos a testear la funcionalidad de cada componente */
// eslint-disable-next-line import/no-duplicates
import { changeHash } from '../src/lib/index';
import { viewForRegister } from '../src/components/register';
import { viewForProfile } from '../src/components/profile';
import { viewForPost } from '../src/components/post';
// eslint-disable-next-line import/no-duplicates
// import index from '../src/lib/index';

// jest.mock('../src/lib/index');
jest.mock('../src/lib/index.js', () => ({
  changeHash: jest.fn(),
}));
// eslint-disable-next-line import/no-named-as-default-member
// index.changeHash = jest.fn();
// test componente register (viewForRegister)
describe('viewForRegister', () => {
  it('debería ser una función', () => {
    expect(typeof viewForRegister).toBe('function');
  });
  it('Tenemos boton de return', () => {
    const registerDiv = viewForRegister();
    const returnToHome = registerDiv.querySelector('#return');
    expect(returnToHome.outerHTML).toBe('<button class="return" id="return">Return</button>');
  });
  it('Tenemos boton de submit', () => {
    const bodyRegister = viewForRegister();
    const botonSubmit = bodyRegister.querySelector('#signUp');
    expect(botonSubmit.outerHTML).toBe('<button class="buttonSignUp" id="signUp">Sign Up</button>');
  });
  it('se llama a changeHash desde botón return', () => {
    const registerDiv = viewForRegister();
    const buttonReturnToHome = registerDiv.querySelector('#return');
    buttonReturnToHome.click(changeHash());
    expect(changeHash).toBeCalled();
    expect(window.location.hash).toBe('#/');
  });
  it('contraseña y confirmación no son iguales', () => {
    const registerDiv = viewForRegister();
    let password = registerDiv.querySelector('#signUpPassword').value;
    let passwordConf = registerDiv.querySelector('#signUpPasswordConf').value;
    password = 'holahola';
    passwordConf = 'holasholas';
    const buttonSignUp = registerDiv.querySelector('#signUp');
    buttonSignUp.click();
    expect(password !== passwordConf).toBeTruthy(); // preguntar si esta bien :(
  });

  describe('elemento .root existe en el HTML', () => {
    beforeAll(() => {
      document.body.innerHTML = '<div class="root" id="root"></div>';
    });
    it('debería existir elemento .root', () => {
      const bodyRoot = document.getElementById('root');
      expect(bodyRoot.outerHTML).toBe('<div class="root" id="root"></div>');
    });
  });
});
// Fin testeo viewForRegister

// test viewForProfile

describe('viewForProfile', () => {
  it('debería ser una función', () => {
    expect(typeof viewForProfile).toBe('function');
  });
  it.only('se llama a changeHash desde botón post del menu', () => {
    // revisar json y local storage
    JSON.parse = jest.fn(() => ({ photoUrl: 'httmpdjdjfjdjd' }));
    const profileDiv = viewForProfile();
    const post = profileDiv.querySelector('#postSelect');
    console.log(post);
    post.click();
    // viewForProfile();
    expect(changeHash).toBeCalled();
    // expect(window.location.hash).toBe('#/post');
  });
  it('Tenemos p de post en menu', () => {
    const bodyProfile = viewForProfile();
    const post = bodyProfile.querySelector('#postSelect');
    expect(post.outerHTML).toBe('<p id="postSelect" class="menu__item">Posts</p>');
  });
  it('Tenemos p de close en menu', () => {
    const bodyProfile = viewForProfile();
    const post = bodyProfile.querySelector('#closeSession');
    expect(post.outerHTML).toBe('<p class="menu__item" id="closeSession">Close</p>');
  });
});

describe('viewForPost', () => {
  it('Tenemos botón de post', () => {
    const bodyPosts = viewForPost();
    const buttonPost = bodyPosts.querySelector('#buttonPost');
    expect(buttonPost.outerHTML).toBe('<button id="buttonPost" class="buttonPost">Post</button>');
  });
  it('Tenemos boton de show posts', () => {
    const bodyPosts = viewForPost();
    const buttonShowPost = bodyPosts.querySelector('#buttonShowPost');
    expect(buttonShowPost.outerHTML).toBe('<button id="buttonShowPost" class="buttonShowPost2">Show Posts</button>');
  });
});
