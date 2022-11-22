/* eslint-disable arrow-body-style */
/**
 *
 * @jest-environment jsdom
 */
// importamos la funcion que vamos a testear
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  setDoc,
  db,
  doc,
  getFirestore,
} from 'firebase/auth';
// import {

// } from 'firebase/firestore';
import {
  submitRegister, sendEmail, forgotPassword, logInHome, googleLogIn, saveDataFromUsers,
} from '../src/lib/index';
import { viewForRegister } from '../src/components/register';
import { viewForHome } from '../src/components/home';

jest.mock('firebase/auth');
jest.mock('firebase/firestore');

// Inicio Testeo a viewForRegister
describe('viewForRegister', () => {
  it('debería ser una función', () => {
    expect(typeof viewForRegister).toBe('function');
  });
  it('Tenemos boton de return', () => {
    const registerDiv = viewForRegister();
    const returnToHome = registerDiv.querySelector('#return');
    expect(returnToHome.outerHTML).toBe('<button class="return" id="return">Return</button>');
  });
  it('cambia de hash y retorna a home', () => {
    const registerDiv = viewForRegister();
    const buttonReturnToHome = registerDiv.querySelector('#return');
    expect(window.location.hash).toBe('');
    buttonReturnToHome.click();
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
    expect(password !== passwordConf).toBe(true); // preguntar si esta bien :(
  });

  describe('elemento root', () => {
    beforeAll(() => {
      document.body.innerHTML = '<div class="root" id="root"></div>';
    });
    it('debería existir elemento root', () => {
      const bodyRoot = document.getElementById('root');
      expect(bodyRoot.outerHTML).toBe('<div class="root" id="root"></div>');
    });
  });
});
// Fin testeo viewForRegister
// Inicio testeo función submitRegister()
describe('submitRegister', () => {
  it('debería ser una función', () => {
    expect(typeof submitRegister).toBe('function');
  });
  it('Tenemos boton de submit', () => {
    const bodyRegister = viewForRegister();
    const botonSubmit = bodyRegister.querySelector('#signUp');
    expect(botonSubmit.outerHTML).toBe('<button class="buttonSignUp" id="signUp">Sign Up</button>');
  });
  it('deberia llamar correctamente userwithEmailAndPassword', () => {
    createUserWithEmailAndPassword.mockImplementationOnce((auth, email, password) => {
      expect(email).toBe('test@test.test');
      expect(password).toBe('123');
      return Promise.resolve({ user: { email, password } });
    });
    submitRegister('test@test.test', '123');
  });
});

describe('envioCorreoVerificacion', () => {
  it('debería ser una función', () => {
    expect(typeof sendEmail).toBe('function');
  });
  it('deberia llamar correctamente sendEmailVerification', (done) => {
    sendEmailVerification.mockImplementationOnce((currentUser) => {
      expect(currentUser).toBe('testUser');
      return Promise.resolve();
    });
    window.addEventListener('hashchange', () => {
      expect(window.location.hash).toBe('#/');
      done();
    });
    sendEmail('testUser');
  });
});
// test de forgotPassword
describe('forgotPassword', () => {
  it('deberia ser una función', () => {
    expect(typeof forgotPassword).toBe('function');
  });
  it('forgotPassword llama correctamente a sendPasswordResetEmail', () => {
    sendPasswordResetEmail.mockImplementationOnce((auth, email) => {
      expect(email).toBe('test@test.test');
      return Promise.resolve();
    });
    forgotPassword('test@test.test');
  });
});
// test de logInHome
// describe('logInHome');

describe('logInHome', () => {
  it('debería ser una función', () => {
    expect(typeof logInHome).toBe('function');
  });
  it('Tenemos boton de login', () => {
    const bodyHome = viewForHome();
    const buttonSignIn = bodyHome.querySelector('#buttonSignIn');
    expect(buttonSignIn.outerHTML).toBe('<button class="buttonSignIn" id="buttonSignIn">Sign In</button>');
  });
  it('deberia llamar correctamente signInWithEmailAndPassword', () => {
    signInWithEmailAndPassword.mockImplementationOnce((auth, email, password) => {
      expect(email).toBe('test@test.test');
      expect(password).toBe('123');
      return Promise.resolve({ user: { email, password } });
    });
    window.addEventListener('hashchange', () => {
      expect(window.location.hash).toBe('#/profile');
    });
    logInHome('test@test.test', '123');
  });
});

// aqui va el test a logIn with Google
describe('googleLogIn', () => {
  it('debería ser una función', () => {
    expect(typeof googleLogIn).toBe('function');
  });
  it('Tenemos boton de loginGoogle', () => {
    const bodyHome = viewForHome();
    const buttonGoogleLogIn = bodyHome.querySelector('#googleIcon');
    expect(buttonGoogleLogIn.outerHTML).toBe('<img class="iconoGoogle" id="googleIcon" src="/img/google.svg" alt="google">');
  });
  /* it('deberia llamar correctamente  signInWithPopup', () => {
    signInWithPopup.mockImplementationOnce((auth) => {
      const provider = jest.fn(new GoogleAuthProvider());
       expect(provider).toHaveBeenCalled();
      expect(provider).toBe(new GoogleAuthProvider());
      return Promise.resolve();
    });
    window.addEventListener('hashchange', () => {
      expect(window.location.hash).toBe('#/profile');
    });
    googleLogIn();
  }); */
});

describe.only('saveDataFromUsers', () => {
  it('debería ser una función', () => {
    expect(typeof saveDataFromUsers).toBe('function');
  });
  
});

/* import { createUserWithEmailAndPassword } from 'firebase/auth';
import { submitRegister } from '../src/lib/index.js';

jest.mock('firebase/auth');

describe.only('submitRegister', () => {
  it('debería ser una función', () => {
    expect(typeof submitRegister).toBe('function');
  });
  it('deberia llamar correctamente userwithEmailAndPassword', () => {
    createUserWithEmailAndPassword.mockImplementationOnce((auth, email, password) => {
      expect(email).toBe('test@test.testo');
      expect(password).toBe('123');
      return Promise.resolve({ user: { email, password } });
    });
    submitRegister('test@test.test', '123');
  });
  it('deberia regresar error', () => {
    // esto es si no esta habilitado jsdom ... sí lo tenemos habilitado.
    global.alert = (mensaje) => { expect(mensaje).toBe('el correo electronico ya esta registrado');
};
    createUserWithEmailAndPassword.mockImplementationOnce((auth, email, password) => {
      return Promise.reject({ tiene que tener un texto--como lo que espera el catch });
    });

    expect(typeof submitRegister).toBe('function');
  });
}); */
