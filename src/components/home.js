

export const home = () => {

  const div = document.createElement('div');

  const buttonLogin = document.createElement('button');
  const buttonRegister = document.createElement('button');

  buttonLogin.textContent = 'Login'
  buttonLogin.textContent = 'Register'

  div.append(buttonLogin, buttonRegister)

  return div; 

}

/*     const homeDiv = document.createElement('div');

    homeDiv.classList.add("cuerpo")

    const text = `  <section class="homeDivi">
    <div class="logo1">
      <img class= "logo" src="./img/pawsfinder.png" alt="Logo">
    </div>

    <div class="mainBox">
        <div class= "input-wrapper">
          <input  type= "email" class="input1" placeholder="E-mail">
          <img  class="iconoEmail" src="/img/email.png" alt= "icono email">
        </div>
        <div class= "input-wrapper">
          <input type="password" class="input1" placeholder="Password">
          <img class="iconoPassword" src= "/img/password.png" alt= "password">
          </div>
        <button class="buttonSignIn">Sign In</button>
        <p class="registerText"><span class="text1">Doesn't have an account yet? </span> 
        <button id="buttonRegister" class= "buttonRegister" >Register</button></p>
        <div class="login2">
          <div class="acomodo">
          <hr> <p>Or login with</p> <hr>
          </div>
          <div class="google">
          <img class="iconoGoogle" src= "/img/google.svg" alt= "google">
          <div class = "circle" id= "circle"></div>
          </div>

        </div>
        <img  class="imgFooter" src="./img/puppy1.png" alt="Puppy2">
    </div>

  </section>

   `

    homeDiv.insertAdjacentHTML("beforeend", text)


    return homeDiv;

} */

