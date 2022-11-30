import {
  logInHome, googleLogIn, forgotPassword, saveDataFromGoogle, changeHash,
} from '../lib/index';
import { AuthErrorCodes, GoogleAuthProvider } from '../firebase'; // esto podria estar en archivo intermedio!

// Constante que contiene el template de la vista de home
export const viewForHome = () => {
  const homeDiv = document.createElement('div');
  const button = document.createElement('button');

  homeDiv.classList.add('cuerpo');
  button.classList.add('buton');

  button.innerText = 'Hola';
  const textHome = `  <section class="homeDivi">
  <img src="./img/homeBack01.png" id='upperBackground' class='upperBackground'  alt="fondos superior">
  <div class="headerLogo">
    <img class= "logo" src="./img/pawsfinder.png" alt="Logo">
  </div>
  <div class="mainBox">
  <img src="./img/boyPet-01.png" id='imgForHome' class='imgForHome'  alt="boy with pet">
      <div class= "input-wrapper">
        <input  type= "email" class="input1" id="signInButton" placeholder="E-mail">
        <img  class="iconoEmail" src="/img/email.png" alt= "icono email">
      </div>
      <div class="input-wrapper">
        <input id="password" type="password" class="input1" placeholder="Password">
        <img class="iconoPassword" src="/img/password.png" alt="password">
        <img class="iconoPasswordEye" id='eyePassword'  src="/img/eye.png" alt="showPassword">
      </div>
      <button class="buttonSignIn" id="buttonSignIn">Sign In</button>
      <button class="forgotPassword" id="forgotPassword">Forgot Password</button>
      <div class="textDisplay" id="textDisplay"></div>
      <div class="textDisplay" id="textWrongPassword"></div>
        <p class="registerText"><span class="text1">Doesn't have an account yet?</span> 
      <button id="buttonRegister" class= "buttonRegister">Register</button></p>
      <div class="login2">
        <div class="acomodo">
          <hr> <p>Or login with</p> <hr>
        </div>
        <div class="google">
          <img class="iconoGoogle" id='googleIcon' src="/img/google.svg" alt="google">
          <div class="circle" id="circle"></div>
        </div>
      </div>
      
  </div>
</section>
<div class="doggy">
  <img  class="imgFooter" src="./img/multiPets.png" alt="Puppy2">
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

  forChangeViewToRegister.addEventListener('click', () => {
    // al hacer click hacemos cambio de hash :)
    changeHash('#/register');
  });

  // Si usuario hace click en botón google, llama a la función googleLogIn() que loguea con google
  homeDiv.querySelector('#googleIcon').addEventListener('click', () => {
    const promesa = googleLogIn();
    promesa
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // consultar el usuario en la BD y traerlo
        console.log(user);
        const usersId = user.uid;
        const nameGoogle = user.displayName;
        const emailGoogle = user.email;
        console.log(usersId, nameGoogle, emailGoogle);
        saveDataFromGoogle(nameGoogle, usersId, emailGoogle);
        actualUser(user);
        changeHash('#/profile');
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.customData.email;
        // The AuthCredential type that was used.
        const credentialError = GoogleAuthProvider.credentialFromError(error);
        alert(errorCode, errorMessage, credentialError);
      });
    console.log('google auth');
  });

  // olvidaste tu contraseña
  homeDiv.querySelector('#forgotPassword').addEventListener('click', (e) => {
    e.preventDefault();
    const email = homeDiv.querySelector('#signInButton').value;
    // console.log(email)
    if (email === '') {
      alert('insert your email in the input call email');
    } else {
      forgotPassword(email)
        .then(() => {
          textForAlert.innerHTML = 'check your E-mail';
          // alert('Password reset email sent!');
          console.log(email);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    }
  });

  // LogIn de usuario, según value de input email y password, confirma que existan
  homeDiv.querySelector('#buttonSignIn').addEventListener('click', () => {
    const email = homeDiv.querySelector('#signInButton').value;
    const password = homeDiv.querySelector('#password').value;
    logInHome(email, password)
      .then((userCredential) => {
        changeHash('#/profile');
        // Signed in
        const user = userCredential.user;
        const emailUser = user.email;
        localStorage.setItem('user', JSON.stringify(user));
        console.log(emailUser);
        return user;
      })
      .catch((error) => {
        if (error.code === AuthErrorCodes.INVALID_PASSWORD
        || error.code === AuthErrorCodes.USER_DELETED) {
          textForAlert.innerHTML = 'contraseña incorrecta';
          console.log('El E-mail o la contraseña son incorrectos');
        } else {
          console.log('no has ingresado nada');
        }
      });
  });

  return homeDiv;
};
