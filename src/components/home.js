/* eslint-disable no-unused-vars */
import {
  logInHome, googleLogIn, forgotPassword, saveDataFromGoogle, changeHash, getUser,
} from '../lib/index';
import { AuthErrorCodes, GoogleAuthProvider } from '../firebase'; // esto podria estar en archivo intermedio!

// Constante que contiene el template de la vista de home
export const viewForHome = () => {
  const homeDiv = document.createElement('div');
  const button = document.createElement('button');

  homeDiv.classList.add('cuerpo');
  button.classList.add('buton');

  button.innerText = 'Hola';
  const textHome = `
    <section class='homeDivi'>
      <img src='./img/homeBack01.png' id='upperBackground' class='upBackgroundHome' alt='fondos superior'>
      <div class='headerLogo'>
        <img class= 'logo' src='./img/pawsfinder.png' alt='Logo'>
      </div>
      <div class='mainBox'>
        <img src='./img/homeImg.png' id='imgForHomeLeft' class='imgForHomeLeft'  alt='home image'>
        <div class='input-wrapper'>
          <input type='email' class='input1' id='signInButton' placeholder='E-mail'>
          <img class='iconoEmail' src='/img/email.png' alt='email icon'>
        </div>
        <div class='input-wrapper'>
          <input id='password' type='password' class='input1' placeholder='Password'>
          <img class='iconoPassword' src='/img/password.png' alt='password'>
          <img class='iconoPasswordEye' id='eyePassword'  src='/img/eye.png' alt='showPassword'>
        </div>
        <button class='buttonSignIn' id='buttonSignIn'>Sign In</button>
        <button class='forgotPassword' id='forgotPassword'>Forgot Password</button>
        <div class='textDisplay' id='textDisplay'></div>
        <div class='textDisplay' id='textWrongPassword'></div>
        <p class='registerText'><span class='text1'>Doesn't have an account yet?</span> 
          <button id='buttonRegister' class= 'buttonRegister'>Register</button></p>
        <div class='login2'>
          <div class='acomodo'>
            <hr> <p>Or login with</p> <hr>
          </div>
          <div class='google'>
            <img class='iconoGoogle' id='googleIcon' src='/img/google.svg' alt='google'>
            <div class='circle' id='circle'></div>
          </div>
        </div>
      </div>
    </section>
    <div class='doggy'>
      <img  class='imgFooter' src='./img/multiPets.png' alt='Puppy2'>
    </div>
`;

  homeDiv.innerHTML = textHome;

  const textForAlert = homeDiv.querySelector('#textDisplay');
  textForAlert.innerHTML = '';

  // Selecciona elemento eyePassword desde homeDiv que permite mostrar el password oculto
  homeDiv.querySelector('#eyePassword').addEventListener('click', () => {
    const typePassword = homeDiv.querySelector('#password');

    if (typePassword.type === 'password') {
      typePassword.type = 'text';
    } else {
      typePassword.type = 'password';
    }
  });

  // para dar click en el button register
  const forChangeViewToRegister = homeDiv.querySelector('#buttonRegister');

  // Agrega evento a button en constante forChangeViewToRegister
  forChangeViewToRegister.addEventListener('click', () => {
    // Cambio de hash con función changeHash
    changeHash('#/register');
  });

  // Si usuario hace click en botón google, llama a la función googleLogIn() que loguea con google
  homeDiv.querySelector('#googleIcon').addEventListener('click', () => {
    const promise = googleLogIn();
    promise
      .then((result) => {
        getUser(result.user.uid).then((userSnap) => {
          const user = result.user;
          // Crea item en localStorage con nombre 'user' y 'userProfile'
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('userProfile', JSON.stringify(userSnap.data()));
          const usersId = user.uid;
          const nameGoogle = user.displayName;
          const emailGoogle = user.email;
          saveDataFromGoogle(nameGoogle, usersId, emailGoogle);
          changeHash('#/profile');
        });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        const credentialError = GoogleAuthProvider.credentialFromError(error);
        // eslint-disable-next-line no-unused-expressions
        errorCode || errorMessage || credentialError ? alert('There is a problem, try again') : false;
      });
  });

  // olvidaste tu contraseña
  homeDiv.querySelector('#forgotPassword').addEventListener('click', (e) => {
    e.preventDefault();
    const email = homeDiv.querySelector('#signInButton').value;
    if (email === '') {
      alert('Insert your email in the input called email');
    } else {
      forgotPassword(email)
        .then(() => {
          textForAlert.innerHTML = 'Check your e-mail';
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  });

  // LogIn de usuario, según value de input email y password, confirma que existan
  homeDiv.querySelector('#buttonSignIn').addEventListener('click', () => {
    const email = homeDiv.querySelector('#signInButton').value;
    const password = homeDiv.querySelector('#password').value;
    logInHome(email, password)
      .then((userCredential) => {
        getUser(userCredential.user.uid).then((userSnap) => {
          // Signed in
          const user = userCredential.user;
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('userProfile', JSON.stringify(userSnap.data()));
          changeHash('#/profile');
        });
      })
      .catch((error) => {
        // eslint-disable-next-line no-unused-expressions
        error.code === AuthErrorCodes.INVALID_PASSWORD
        || error.code === AuthErrorCodes.USER_DELETED ? textForAlert.innerHTML = 'Wrong password' : false;
      });
  });

  return homeDiv;
};
