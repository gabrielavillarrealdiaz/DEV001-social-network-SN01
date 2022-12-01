import { doc, updateDoc } from 'firebase/firestore';
import {
  getStorage, ref, uploadBytesResumable, getDownloadURL,
} from 'firebase/storage';
import { updatePhoto, changeHash, getUser } from '../lib/index';
import { db } from '../firebase';

// Exporta vista de perfil de usuario
export const viewForProfile = () => {
  // Crea constante user que guarda usuario desde localStorage con nombre 'user'
  const user = JSON.parse(localStorage.getItem('user'));
  // Crea constante userProfile que guarda usuario desde localStorage con nombre 'userProfile'
  const userProfile = JSON.parse(localStorage.getItem('userProfile'));
  let photo = userProfile.photoURL;
  const profileDiv = document.createElement('div');
  profileDiv.classList.add('allViewForProfile');
  // Añade el template de viewForProfile en HTML
  profileDiv.innerHTML = `
  <section class='grandpaForProfile'>
    <img src="./img/backg02.png" id='upperBackground' class='upperBackground'  alt="noseve">
    <div class="hamburger-menu">
      <input id="menu__toggle" type="checkbox" />
      <label class="menu__btn" for="menu__toggle">
      <span></span>
      </label>

      <ul class="menu__box">
        <li><p class= 'menu__item'>Home</p></li>
        <li><p id="postSelect" class="menu__item">Posts</p></li>
        <li><p class="menu__item">Me</p></li>
        <li><p class="menu__item">Adoptions</p></li>
        <li><p class="menu__item"></p>Contact</li>
      </ul>
    </div>

    <form class="formProfile" id="formProfile">
      <div class="headerProfile">
        <img src="${photo}" id='photoProfile' class= 'photoForProfile'  alt="Imagen de perfil">
        <input type="file" accept="image/png image/jpeg" id="updatePhoto">Sube una foto de perfil</img>
        <div class="profileFormDivDad">
          <h1 class= "nameForProfile"> ${user.displayName} </h1>
        </div>
      </div>

      <div class="profileFormDiv"></div>
        <label for="namePet">Name</label>
        <input type= "text" class="inputProfile" id="namePet" placeholder="Pet name"> 
      </div>        
      <div class="profileFormDiv"></div>
        <label for="type">Type</label>
        <input  type= "text" class="inputProfile" id="type" placeholder="Type, e.g: Cat"> 
      </div>
      <div class="profileFormDiv">
        <label for="description">Description</label>
        <textarea id="description" class="inputProfile" placeholder="..."></textarea>
      </div>       
    </form>
    <div class ="buttonsProfile">
      <button class="buttonProfile" id="buttonSave">Save</button>
    </div>
    <img src="./img/backg01.png" id='backgroundIconsDown' class='backgroundIconsDown' alt="noseve">
  </section>`;
  // Guarda en constante sección post del menu
  const post = profileDiv.querySelector('#postSelect');
  // Escucha evento 'click' en constante post y realiza cambio de hash con función changeHash
  post.addEventListener('click', () => {
    changeHash('#/post');
  });

  // Input con type file y ID updatePhoto
  const photoForProfile = profileDiv.querySelector('#updatePhoto');
  // Escucha evento de cambio
  photoForProfile.addEventListener('change', (event) => {
    // Selecciona la propiedad de files del target del evento
    const fileList = event.target.files;
    // Selecciona el primer elemento de fileList
    // y muestra sólo la propiedad name, que es la ruta del archivo
    const newPhoto = fileList[0].name;
    console.log(fileList[0]);
    // console.log(user.photoURL);
    console.log(profileDiv.querySelector('#photoProfile'));
    // Guarda en constante usersRef la referencia a la colección
    const usersRef = doc(db, 'users', user.uid);
    // Guarda en constante la función getStorage
    const storage = getStorage();

    // Metadata del archivo esperado
    /** @type {any} */
    const metadata = {
      contentType: 'image/jpeg',
    };
    // Referencia en el storage, tipo 'images/rutadelafoto'
    const storageRef = ref(storage, `images/${newPhoto}`);
    // Sube la foto a la referencia anterior
    const uploadTask = uploadBytesResumable(storageRef, fileList[0], metadata);
    // Promesa, sube la foto y actualiza el doc del usuario agregando el photoURL nuevo
    //  + actualiza perfil del usuario
    getDownloadURL(uploadTask.snapshot.ref)
      .then((downloadURL) => {
        console.log('File available at', downloadURL);
        updateDoc(usersRef, {
          photoURL: downloadURL,
        });
        updatePhoto(user, downloadURL);
        // Promesa, según uid del user
        getUser(user.uid).then((userSnap) => {
          // Crea elemento en localStorage con la data del user
          localStorage.setItem('userProfile', JSON.stringify(userSnap.data()));
          const userPhotosnew = JSON.parse(localStorage.getItem('userProfile'));
          console.log(userPhotosnew.photoURL);
          profileDiv.querySelector('#photoProfile').src = userPhotosnew.photoURL;
          updatePhoto(user, userPhotosnew.photoURL);
          if (userPhotosnew) {
            photo = userPhotosnew;
          }
          // eslint-disable-next-line max-len
          // profileDiv.querySelector('#photoProfile').src = JSON.parse(localStorage.getItem(userPhotos.photoURL);
        });
        // eslint-disable-next-line consistent-return
        // .then((downloadURL) => {
        //   console.log(userPhotos);
        //   if (userPhotosnew !== null) {
        //     userProfile = userPhotosnew;
        //   }
        // });
      });
  });
  return profileDiv;
};
