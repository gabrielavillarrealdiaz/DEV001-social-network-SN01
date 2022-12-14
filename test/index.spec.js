/* eslint-disable no-param-reassign */
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
  submitRegister,
  AuthErrorCodes,
} from 'firebase/auth';
import {
  addDoc,
  getDoc,
  onSnapshot,
  deleteDoc,
  updateDoc,
  collection,
  setDoc,
  // db,,
} from 'firebase/firestore';
import {
  getStorage, ref, uploadBytesResumable, getDownloadURL,
} from 'firebase/storage';
import {
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
  saveDataFromUsers,
  saveDataFromGoogle,
  storage,
  downloadUrl,
  refFunction,
  uploadToStorage,
  updateUsers,
} from '../src/lib/index';

import { viewForHome } from '../src/components/home';

jest.mock('firebase/auth');
jest.mock('firebase/firestore');
jest.mock('firebase/storage');
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
  // it('deberia registrarse correctamente', () => {
  //   // const registerDiv = viewForRegister();
  //   // submitRegister.mockImplementationOnce((email) => {
  //   // registerDiv.querySelector('#signUpPassword').value = 'holahola';
  //   // // registerDiv.querySelector('#signUpPasswordConf').value = 'holahoAAAla';
  //   // registerDiv.querySelector('#signUpCountry').value = 'mexico';
  //   // registerDiv.querySelector('#signUpEmail').value = 'gabrielaavd@gmail.com';
  //   // registerDiv.querySelector('#fName').value = 'Gabriela';
  //   // password = registerDiv.querySelector('#signUpPassword').value;
  //   // // const passwordConf = registerDiv.querySelector('#signUpPasswordConf').value;
  //   // name = registerDiv.querySelector('#fName').value;
  //   // // eslint-disable-next-line no-unused-vars
  //   // // country = registerDiv.querySelector('#signUpCountry').value;
  //   // // email = registerDiv.querySelector('#signUpEmail').value;
  //   // const buttonSignUp = registerDiv.querySelector('#signUp');

  //   // buttonSignUp.click();

  //   expect(submitRegister).toHaveBeenReturnedWidth(name, password, country, email);
  // });
});
// PENDIENTE POR REVISAR
it('submits a successful registration', () => {
  expect.assertions(1);
  return submitRegister('user@example.com', 'password123', 'John Doe', 'USA')
    .then((userCredential) => {
      expect(userCredential.user.uid).toBe('12345');
    });
});

// test for failed registration
// PENDIENTE POR REVISAR
it('submits a failed registration', () => {
  // expect.assertions(1);
  return submitRegister('user@example.com', 'password1A3', 'John Doe', 'USA')
    .catch(async (error) => {
      await expect(Promise.reject(error)).rejects.toThrow(
        AuthErrorCodes.EMAIL_EXISTS,
      );
    });
});
// it('submits a failed registration', () => {
//   expect.assertions(1);
//   return submitRegister('user@example.com', 'password123', 'John Doe', 'USA')
//     .catch((error) => {
//       expect(error.message).toBe('Registration failed');
//     });
// });

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
    addDoc.mockImplementationOnce(() => Promise.resolve());
    collection.mockImplementationOnce(() => ({}));
    savePost('textotexto', 'karla', 'kcrm900503', '9005030208', {});
    expect(addDoc).toHaveBeenCalledWith(expect.anything(), {
      textOfEachPost: 'textotexto',
      nameOfUser: 'karla',
      usersId: 'kcrm900503',
      creationDate: '9005030208',
      likes: {},
    });
  });
});

// test funcion changeHash
describe('changeHash', () => {
  it('debería ser una función', () => {
    expect(typeof changeHash).toBe('function');
  });
  it('cambiar al hash que coloquemos', () => {
    changeHash('#/profile');
    expect(window.location.hash).toBe('#/profile');
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

/// saveDataFromUsers
describe('saveDataFromUsers', () => {
  it('debería ser una función', () => {
    expect(typeof saveDataFromGoogle).toBe('function');
  });
  it('debería llamar correctamente a', () => {
    saveDataFromUsers(setDoc);
    expect(setDoc).toBeCalled();
  });
});

// saveDataFromGoogle
describe('saveDataFromGoogle', () => {
  it('debería ser una función', () => {
    expect(typeof saveDataFromGoogle).toBe('function');
  });
  it('debería llamar correctamente a', () => {
    saveDataFromGoogle(setDoc);
    expect(setDoc).toBeCalled();
  });
});

// storage
describe('storage', () => {
  it('debería ser una función', () => {
    expect(typeof storage).toBe('function');
  });
  it('debería llamar correctamente a', () => {
    storage(getStorage);
    expect(getStorage).toBeCalled();
  });
});

// downloadUrl
describe('downloadUrl', () => {
  it('debería ser una función', () => {
    expect(typeof downloadUrl).toBe('function');
  });
  it('debería llamar correctamente a', () => {
    downloadUrl(getDownloadURL);
    expect(getDownloadURL).toBeCalled();
  });
});

// refFunction
describe('refFunction', () => {
  it('debería ser una función', () => {
    expect(typeof refFunction).toBe('function');
  });
  it('debería llamar correctamente a ref', () => {
    refFunction(ref);
    expect(ref).toBeCalled();
  });
});

// uploadToStorage
describe('uploadToStorage', () => {
  it('debería ser una función', () => {
    expect(typeof uploadToStorage).toBe('function');
  });
  it('debería llamar correctamente a ref', () => {
    uploadToStorage(uploadBytesResumable);
    expect(uploadBytesResumable).toBeCalled();
  });
});
// updateUsers
describe('updateUsers', () => {
  it('debería ser una función', () => {
    expect(typeof updateUsers).toBe('function');
  });
  it('debería llamar correctamente a ref', () => {
    updateUsers(updateDoc);
    expect(updateDoc).toBeCalled();
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
