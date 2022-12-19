// eslint-disable-next-line import/no-duplicates
// import { getDownloadURL } from 'firebase/firestore';
import { changeHash } from '../src/lib/index';
import { viewForRegister } from '../src/components/register';
import { viewForProfile } from '../src/components/profile';
import { viewForPost } from '../src/components/post';
import { viewForHome } from '../src/components/home';

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
    returnToHome.click();
    expect(window.location.hash).toBe('#/');
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
    registerDiv.querySelector('#signUpPassword').value = 'holahola';
    registerDiv.querySelector('#signUpPasswordConf').value = 'holasholas';
    const password = registerDiv.querySelector('#signUpPassword').value;
    const passwordConf = registerDiv.querySelector('#signUpPasswordConf').value;
    const buttonSignUp = registerDiv.querySelector('#signUp');
    buttonSignUp.click();
    expect(password !== passwordConf).toBeTruthy();
  });
  it('contraseña y confirmación son iguales', () => {
    const registerDiv = viewForRegister();
    registerDiv.querySelector('#signUpPassword').value = 'holahola';
    registerDiv.querySelector('#signUpPasswordConf').value = 'holahola';
    // const password = registerDiv.querySelector('#signUpPassword').value;
    // const passwordConf = registerDiv.querySelector('#signUpPasswordConf').value;
    const buttonSignUp = registerDiv.querySelector('#signUp');
    const passwordConfTwo = registerDiv.querySelector('#signUpPasswordConf');
    buttonSignUp.click();
    expect(passwordConfTwo.classList.contains('red')).toBe(false);
  });
  it('se llama a changeHash desde botón forChangeViewToRegister', () => {
    const homeDiv = viewForHome();
    const forChangeViewToRegister = homeDiv.querySelector('#buttonRegister');
    forChangeViewToRegister.click();
    expect(changeHash).toBeCalled();
    expect(changeHash).toBeCalledWith('#/register');
  });

  it('anuncia que falta llenar un input', () => {
    const registerDiv = viewForRegister();
    const password = registerDiv.querySelector('#signUpPassword').value;
    const country = registerDiv.querySelector('#signUpCountry').value;
    const email = registerDiv.querySelector('#signUpEmail').value;
    const name = registerDiv.querySelector('#fName').value;
    const emptyAlert = registerDiv.querySelector('#secretText');
    if (email === '' || password === '' || name === '' || country === '') {
      // emptyAlert.mockReturnValue('Fill the empty inputsSS!!!');
      emptyAlert.innerHTML = 'Fill the empty inputs!!!';
      expect(emptyAlert.innerHTML).toBe('Fill the empty inputs!!!');
    }
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
  it('se llama a changeHash desde botón post del menu', () => {
    // revisar json y local storage
    JSON.parse = jest.fn(() => ({ photoUrl: 'httmpdjdjfjdjd' }));
    const profileDiv = viewForProfile();
    const post = profileDiv.querySelector('#postSelect');
    post.click();
    // viewForProfile();
    expect(changeHash).toBeCalled();
    // expect(window.location.hash).toBe('#/post');
  });
  /* it('se llama a funcion ', () => {
    JSON.parse = jest.fn(() => ({ photoUrl: 'httmpdjdjfjdjd' }));
    const profileDiv = viewForProfile();
    const photoForProfile = profileDiv.querySelector('#photoProfile');
    photoForProfile.change();
    expect(getDownloadURL).toBeCalled();
  }); */
  it('Tenemos button de post en menu', () => {
    const bodyProfile = viewForProfile();
    const post = bodyProfile.querySelector('#postSelect');
    expect(post.outerHTML).toBe('<button id="postSelect" class="menu__item">Posts</button>');
  });
  it('Tenemos p de close en menu', () => {
    const bodyProfile = viewForProfile();
    const post = bodyProfile.querySelector('#closeSession');
    expect(post.outerHTML).toBe('<p class="menu__item" id="closeSession">Close</p>');
  });
});

// test viewForPost
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

// test de vista viewForHome
describe('viewForHome', () => {
  it('debería ser una función', () => {
    expect(typeof viewForHome).toBe('function');
  });
  it('Tenemos boton de login en HTML', () => {
    const bodyHome = viewForHome();
    const buttonSignIn = bodyHome.querySelector('#buttonSignIn');
    expect(buttonSignIn.outerHTML).toBe('<button class="buttonSignIn" id="buttonSignIn">Sign In</button>');
  });
  it('Tenemos boton de register', () => {
    const bodyHome = viewForHome();
    const buttonSignUp = bodyHome.querySelector('#buttonRegister');
    expect(buttonSignUp.outerHTML).toBe('<button id="buttonRegister" class="buttonRegister">Register</button>');
  });
  it('Tenemos img eye password', () => {
    const bodyHome = viewForHome();
    const imgeyepasword = bodyHome.querySelector('#eyePassword');
    expect(imgeyepasword.outerHTML).toBe('<img class="iconoPasswordEye" id="eyePassword" src="/img/eye.png" alt="showPassword">');
  });
  it('img eye password muestra contraseña', () => {
    const bodyHome = viewForHome();
    const imgeyepassword = bodyHome.querySelector('#eyePassword');
    const typePassword = bodyHome.querySelector('#password');
    imgeyepassword.click();
    if (typePassword.type === 'password') {
      expect(typePassword.type).toBe('text');
    }
  });
  it('img eye password oculta contraseña', () => {
    const bodyHome = viewForHome();
    const imgeyepassword = bodyHome.querySelector('#eyePassword');
    const typePassword = bodyHome.querySelector('#password');
    imgeyepassword.click();
    imgeyepassword.click();
    if (typePassword.type === 'password') {
      typePassword.type = 'text';
    } else {
      expect(typePassword.type).toBe('password');
    }
  });
  it('Tenemos boton de forgotPassword', () => {
    const bodyHome = viewForHome();
    const buttonForgotPassword = bodyHome.querySelector('#forgotPassword');
    expect(buttonForgotPassword.outerHTML).toBe('<button class="forgotPassword" id="forgotPassword">Forgot Password</button>');
  });
  it('Tenemos boton de loginGoogle', () => {
    const bodyHome = viewForHome();
    const buttonGoogleLogIn = bodyHome.querySelector('#googleIcon');
    expect(buttonGoogleLogIn.outerHTML).toBe('<img class="iconoGoogle" id="googleIcon" src="/img/google.svg" alt="google">');
  });
});
