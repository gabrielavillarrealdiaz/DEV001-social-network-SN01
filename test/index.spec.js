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
  updateProfile,
  signOut,
} from 'firebase/auth';
import {
  addDoc,
  getDoc,
  onSnapshot,
  deleteDoc,
  updateDoc,
  collection,
  // db,
} from 'firebase/firestore';

import {
  submitRegister,
  sendEmail,
  forgotPassword,
  logInHome,
  googleLogIn,
  updateInfo,
  signOutUser,
  updatePhoto,
  savePost,
  getSavePosts,
  getPost,
  getUser,
  functionDeleteEachPost,
  updatePost,
  updateLikes,
  changeHash,
} from '../src/lib/index';

import { viewForHome } from '../src/components/home';

jest.mock('firebase/auth');
jest.mock('firebase/firestore');

// Inicio testeo función submitRegister()
describe('submitRegister', () => {
  it('debería ser una función', () => {
    expect(typeof submitRegister).toBe('function');
  });
  it('deberia llamar correctamente createUserWithEmailAndPassword', () => {
    createUserWithEmailAndPassword.mockImplementationOnce((auth, email, password) => {
      expect(email).toBe('test@test.test');
      expect(password).toBe('123');
      // return Promise.resolve({ user: { email, password } });
    });
    submitRegister('test@test.test', '123');
  });
});

describe('sendEmail', () => {
  it('debería ser una función', () => {
    expect(typeof sendEmail).toBe('function');
  });
  it('sendEmail llama correctamente a sendEmailVerification', () => {
    sendEmailVerification.mockImplementationOnce((currentUser) => {
      expect(currentUser).toBe('testUser');
      // return Promise.resolve();
    });
    /* window.addEventListener('hashchange', () => {
      expect(window.location.hash).toBe('#/');
      done();
    }); */
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
      // return Promise.resolve();
    });
    forgotPassword('test@test.test');
  });
});
// test de logInHome
// test de logInHome;
describe('logInHome', () => {
  it('debería ser una función', () => {
    expect(typeof logInHome).toBe('function');
  });
  it('deberia llamar correctamente signInWithEmailAndPassword', () => {
    signInWithEmailAndPassword.mockImplementationOnce((auth, email, password) => {
      expect(email).toBe('test@test.test');
      expect(password).toBe('123');
      // return Promise.resolve({ user: { email, password } });
    });
    logInHome('test@test.test', '123');
  });
  it('have an alert', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    expect(window.alert).toBeDefined();
    await expect(Promise.reject(new Error('auth/wrong-password'))).rejects.toThrow(
      'auth/wrong-password',
    );
  });
});

// test de vista viewForHome
describe('viewForHome', () => {
  it('debería ser una función', () => {
    expect(typeof logInHome).toBe('function');
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
  // POR REVISAR
  /*
  it('cambia de hash y retorna a profile', async () => {
    const homeDiv = viewForHome();
    const buttonReturnToLogin = homeDiv.querySelector('#buttonSignIn');
    // viewForHome();
    // console.log(window.location.hash);
    // expect(window.location.hash).toBe('#/');
    // const clickEvent = new Event('click');
    buttonReturnToLogin.click();
    getUser.mockImplementationOnce((userCredential) => {
      expect(userCredential).toBe('abcdefg');
      return Promise.resolve(changeHash('#/profile'));
    });
    getUser('abcdefg');
  });
  */
});

// test a logIn with Google
describe('googleLogIn', () => {
  it('debería ser una función', () => {
    expect(typeof googleLogIn).toBe('function');
  });
  // ----------------------Inicio prueba 2 ---------------
  it('deberia llamar correctamente  signInWithPopup', () => {
    signInWithPopup.mockImplementationOnce((auth, provider) => {
      // const provider = jest.fn(new GoogleAuthProvider());
      // expect(provider).toHaveBeenCalled();
      expect(provider).toStrictEqual(new GoogleAuthProvider());
      return Promise.resolve({ user: { provider } });
    });
    window.addEventListener('hashchange', () => {
      expect(window.location.hash).toBe('#/profile');
    });
    googleLogIn();
  });
  // ----------------------Fin prueba 2----------------
});

// test función updateInfo

describe('updateInfo', () => {
  it('debería ser una función', () => {
    expect(typeof updateInfo).toBe('function');
  });
  it('deberia llamar correctamente  updateProfile', () => {
    updateInfo(updateProfile);
    expect(updateProfile).toBeCalled();
  });
});
// test funcion signOutUser
describe('signOutUser', () => {
  it('debería ser una función', () => {
    expect(typeof signOutUser).toBe('function');
  });
  it('deberia llamar correctamente signOut', () => {
    signOutUser(signOut);
    expect(signOut).toBeCalled();
  });
});

// test funcion updatePhoto
describe('updatePhoto', () => {
  it('debería ser una función', () => {
    expect(typeof updatePhoto).toBe('function');
  });
  it('deberia llamar correctamente updateProfile', () => {
    updatePhoto(updateProfile);
    expect(updateProfile).toBeCalled();
  });
});

// test función savePost NO PASA
describe('savePost', () => {
  it('debería ser una función', () => {
    expect(typeof savePost).toBe('function');
  });
  it('deberia llamar correctamente addDoc', () => {
    savePost(addDoc);
    expect(addDoc).toBeCalled();
  });
});

// test funcion changeHash
describe('changeHash', () => {
  it('debería ser una función', () => {
    expect(typeof changeHash).toBe('function');
  });
  it('deberia llamar correctamente updateProfile', () => {
    updatePhoto(updateProfile);
    expect(updateProfile).toBeCalled();
  });
});

// test getSavePosts
describe('getSavePosts', () => {
  it('debería ser una función', () => {
    expect(typeof getSavePosts).toBe('function');
  });
  it('deberia llamar correctamente getDoc', () => {
    getSavePosts(getDoc);
    expect(getDoc).toBeCalled();
  });
});

// test getPost
describe('getPost', () => {
  it('debería ser una función', () => {
    expect(typeof getPost).toBe('function');
  });
  it('deberia llamar correctamente onSnapshot', () => {
    getPost(onSnapshot);
    expect(onSnapshot).toBeCalled();
  });
});

// collection
describe('collection', () => {
  it('debería ser una función', () => {
    expect(typeof collection).toBe('function');
  });
});
// test getUser
describe('getUser', () => {
  it('debería ser una función', () => {
    expect(typeof getUser).toBe('function');
  });
  it('deberia llamar correctamente getDoc', () => {
    getUser(getDoc);
    expect(getDoc).toBeCalled();
  });
});

// tesr functionDeleteEachPost
describe('functionDeleteEachPost', () => {
  it('debería ser una función', () => {
    expect(typeof functionDeleteEachPost).toBe('function');
  });
  it('deberia llamar correctamente deleteDoc', () => {
    functionDeleteEachPost(deleteDoc);
    expect(deleteDoc).toBeCalled();
  });
});

// test updatePost
describe('updatePost', () => {
  it('debería ser una función', () => {
    expect(typeof updatePost).toBe('function');
  });
  it('deberia llamar correctamente updateDoc', () => {
    updatePost(updateDoc);
    expect(updateDoc).toBeCalled();
  });
});

// test updateLikes
describe('updateLikes', () => {
  it('debería ser una función', () => {
    expect(typeof updateLikes).toBe('function');
  });
  it('deberia llamar correctamente updateDoc', () => {
    updateLikes(updateDoc);
    expect(updateDoc).toBeCalled();
  });
});

/* // saveDataFromUsers
describe('saveDataFromUsers', () => {
  it('debería ser una función', () => {
    expect(typeof saveDataFromUsers).toBe('function');
  });
  it('debería llamar correctamente a', () => {
    expect(saveDataFromUsers).toBe('');
  });
});

// saveDataFromGoogle
describe('saveDataFromGoogle', () => {
  it('debería ser una función', () => {
    expect(typeof saveDataFromGoogle).toBe('function');
  });
  it('debería llamar correctamente a', () => {
    expect(saveDataFromG).toBe('');
  });
});
 */
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
