import { AuthErrorCodes } from '../firebase';
import {
  submitRegister, sendEmail, saveDataFromUsers, updateInfo, changeHash,
} from '../lib/index.js';

// Exporta constante que contiene el template de la vista de registro
export const viewForRegister = () => {
  const registerDiv = document.createElement('div');
  registerDiv.classList.add('fullBodyOfRegister');

  const registerText = `
  <section class='registerBody'>
  <img class='manchaRegister' src='./img/mancha.png' alt='fondo de mancha'>
    <div class='headRegister'>
      <img class='logo2' src='./img/pawsfinder.png' alt='Logo'>
      <img class='multiPets' src='./img/multiPets.png' alt='pets'>
    </div>
    <form class='formRegister' id='formRegister'>
      <h1 class='signUp'>Sign Up</h1>
      <div class='underline-title'></div>
      <div class='infoForm'>
          <label for='fName'>Name</label>
          <input type= 'text' class='input2' id='fName' placeholder='Your name, e.g: John Doe'> 
        </div>
        <div class='infoForm'>
          <label for='fEmail'>E-mail</label>
          <input  type= 'email' class='input2' id='signUpEmail' placeholder='Your mail, e.g: someone@gmail.com'> 
        </div>
        <div class='infoForm'>
          <label for='fCountry'>Country</label>
          <input type='country' class='input2' id='signUpCountry' placeholder='Your country, e.g:Chile'> 
        </div>
        <div class='infoForm'>
          <label for='fPassword'>Password</label>
          <input  type= 'text' class='input2' id='signUpPassword' placeholder='Enter a password: only letters and numbers'>
        </div>
        <div class='infoForm'>
          <label for='fConfPassword'>Confirm password</label>
          <input type= 'text' class='input2' id='signUpPasswordConf' placeholder='Confirm your password'>
          <div class ='secretText' id='secretText'></div>
        </div>    
    </form>
    <div class ='buttonsRegisterForRow'>
      <button class='buttonSignUp' id='signUp'>Sign Up</button>
      <button class='return' id='return'>Return</button>
    </div> 
  </section>
  <img class='upperBackground2' src='./img/homeBack01.png' alt='fondo de mancha'>
  <img src='./img/cat.png' id='imgForRegister' class='imgForRegisterLandPage'  alt='register img'>
  `;

  registerDiv.innerHTML = registerText;
  // seleccionamos el boton y funciona con template string cuando se usa querySelector
  // Botón de retorno a la vista de home
  const returnToHome = registerDiv.querySelector('#return');
  returnToHome.addEventListener('click', () => {
    window.location.hash = '#/';
  });
  // Guarda values de inputs de registro
  // eslint-disable-next-line consistent-return
  registerDiv.querySelector('#signUp').addEventListener('click', (e) => {
    e.preventDefault();

    const email = registerDiv.querySelector('#signUpEmail').value;
    const password = registerDiv.querySelector('#signUpPassword').value;

    const name = registerDiv.querySelector('#fName').value;
    const country = registerDiv.querySelector('#signUpCountry').value;
    const passwordConf = registerDiv.querySelector('#signUpPasswordConf').value;
    const textMessageSecret = registerDiv.querySelector('#secretText');
    console.log(passwordConf);
    const passwordConfTwo = registerDiv.querySelector('#signUpPasswordConf');
    // Sección de validación de campos, contraseñas sean idénticas y que los campos no estén vacíos
    // antes de enviar el registro
    if (password !== passwordConf) {
      passwordConfTwo.classList.add('red');
      textMessageSecret.innerHTML = 'Passwords do not match';
      return textMessageSecret;
    }
    if (password === passwordConf) {
      passwordConfTwo.classList.remove('red');
      textMessageSecret.innerHTML = '';
    }
    if (email === '' || password === '' || name === '' || country === '') {
      textMessageSecret.innerHTML = 'Fill the empty inputs!!!';
      return textMessageSecret;
    }
    console.log('hola como estas');
    submitRegister(email, password, name, country)
      .then((userCredential) => {
        const usersUid = userCredential.user.uid;
        saveDataFromUsers(name, country, usersUid, email, password);
        const currentUser = userCredential.user;
        updateInfo(currentUser, name);
        console.log(currentUser);
        sendEmail(currentUser)
          .then(() => {
            alert('mail verification sent!');
            changeHash('#/');
          });
        console.log(currentUser.displayName);
      })
      // eslint-disable-next-line consistent-return
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // agregue un mensaje de que el correo ya esta en uso
        if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
          // alert('El E-mail ya existe');
          textMessageSecret.innerHTML = 'Email already exist';
          return textMessageSecret;
        }
      });
  });
  return registerDiv;
};
