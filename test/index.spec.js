/* eslint-disable no-param-reassign */
/* eslint-disable arrow-body-style */
/**
 *
 * @jest-environment jsdom
 */
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  signOut,
// AuthErrorCodes,
} from 'firebase/auth';
import {
  addDoc,
  getDoc,
  onSnapshot,
  deleteDoc,
  updateDoc,
  collection,
  setDoc,
  getUser,
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
  submitRegister,
} from '../src/lib/index';

// import { submitRegister } from '../src/lib/index';
import { viewForHome } from '../src/components/home';
// import { viewForRegister } from '../src/components/register';
// global.localStorage = { getItem: jest.fn(), setItem: jest.fn(), removeItem: jest.fn() };

jest.mock('firebase/auth');
jest.mock('firebase/firestore');
jest.mock('firebase/storage');
// jest.mock('../src/lib/index.js');

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
  // REVISAR
  /* it('deberia registrarse correctamente', () => {
    const registerDiv = viewForRegister();
    submitRegister.mockImplementationOnce(() => {
      registerDiv.querySelector('#signUpPassword').value = 'holahola';
      registerDiv.querySelector('#signUpPasswordConf').value = 'holahoAAAla';
      registerDiv.querySelector('#signUpCountry').value = 'mexico';
      registerDiv.querySelector('#signUpEmail').value = 'gabrielaavd@gmail.com';
      registerDiv.querySelector('#fName').value = 'Gabriela';
      const password = registerDiv.querySelector('#signUpPassword').value;
      const passwordConf = registerDiv.querySelector('#signUpPasswordConf').value;
      const name = registerDiv.querySelector('#fName').value;
      // eslint-disable-next-line no-unused-vars
      const country = registerDiv.querySelector('#signUpCountry').value;
      const email = registerDiv.querySelector('#signUpEmail').value;
      expect(submitRegister).toHaveBeenReturnedWith(name, password, country, 'dos');
    });
    const buttonSignUp = registerDiv.querySelector('#signUp');
    buttonSignUp.click();
    expect(submitRegister).toHaveBeenCalled();
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
    expect.assertions(1);
    return submitRegister('user@example.com', 'password1A3', 'John Doe', 'USA')
      .catch(async (error) => {
        await expect(Promise.reject(error)).rejects.toThrow(
          AuthErrorCodes.EMAIL_EXISTS,
        );
      }); */
  /* });
  it('submits a failed registration', () => {
    expect.assertions(1);
    return submitRegister('user@example.com', 'password123', 'John Doe', 'USA')
      .catch((error) => {
        expect(error.message).toBe('Registration failed');
      });
  }); */
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
    sendEmail('testUser');
  });
});
// test de forgotPassword
describe('forgotPassword', () => {
  it('deberia ser una función', () => {
    expect(typeof forgotPassword).toBe('function');
  });
  it('forgotPassword marca cuando hay un error al llamar sendPasswordResetEmail', async () => {
    await sendPasswordResetEmail.mockImplementationOnce((auth, email) => {
      expect(email).toBe('test@test.test');
    });
    const bodyHome = viewForHome();
    const buttonForgotPassword = bodyHome.querySelector('#forgotPassword');
    buttonForgotPassword.click();
    forgotPassword('test@test.test');
  });
  it('forgotPassword llama  a sendPasswordResetEmail', () => {
    forgotPassword(sendPasswordResetEmail);
    expect(sendPasswordResetEmail).toBeCalled();
  });
});

// test de logInHome
describe('logInHome', () => {
  it('debería ser una función', () => {
    expect(typeof logInHome).toBe('function');
  });
  it('deberia llamar correctamente signInWithEmailAndPassword', () => {
    signInWithEmailAndPassword.mockImplementationOnce((auth, email, password) => {
      expect(email).toBe('test@test.test');
      expect(password).toBe('123');
      // await Promise.resolve()
      //   .then(() => {
      //     getUser();
      //     expect(getUser).toBeCalled();
      //   });
    });

    return logInHome('test@test.test', '123');
  });
  it('la respuesta de login almacena repuesta de localstorage', (done) => {
    const bodyHome = viewForHome();
    const button = bodyHome.querySelector('#buttonSignIn');
    signInWithEmailAndPassword.mockResolvedValueOnce({ user: 'karlaRm' });
    getDoc.mockResolvedValueOnce({ data: () => ({ name: 'karlaRm' }) });
    jest.spyOn(Storage.prototype, 'setItem');
    button.click();
    done();
    expect(localStorage.setItem).toHaveBeenCalled();
    // return logInHome('test@test.test', '123').then(() => {
    //   expect(localStorage.setItem).toHaveBeenCalled();
    // });
  });
  it('have an alert', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => { });
    expect(window.alert).toBeDefined();
    await expect(Promise.reject(new Error('auth/wrong-password'))).rejects.toThrow(
      'auth/wrong-password',
    );
  });
});

// test a logIn with Google
describe('googleLogIn', () => {
  it('debería ser una función', () => {
    expect(typeof googleLogIn).toBe('function');
  });
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
    // window.localStorage.setItem('userProfile', JSON.stringify(userSnap.data()));
  });
  it('localstorage es setItem', () => {
    jest.spyOn(localStorage, 'setItem');
    localStorage.setItem = jest.fn();

    expect(localStorage.setItem).toBeDefined();
  });
  // PENDIENTE POR REVISAR
/*   it('googleLogIn debería llamar correctamente a getUser', () => {
    googleLogIn();
    expect(getUser).toBeCalled();
  }); */
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
