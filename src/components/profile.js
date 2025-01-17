import { doc, updateDoc } from 'firebase/firestore';
import {
  updatePhoto,
  changeHash,
  getUser,
  signOutUser,
  auth,
  storage,
  downloadUrl,
  uploadToStorage,
  refFunction,
  updateUsers,
} from '../lib/index';
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
    <img src='https://raw.githubusercontent.com/gabrielavillarrealdiaz/DEV001-social-network-SN01/main/src/img/yello.png' id='upperBackgroundProfile' class='upperBackgroundProfile' alt='color background'>
    <div class='hamburger-menu'>
      <input id='menu__toggle' type='checkbox' />
      <label class='menu__btn' for='menu__toggle'>
      <span></span>
      </label>

      <ul class='menu__box'>
        <li><button id='postSelect' class='menu__item'>Posts</button></li>
        <li><p id='profileSelect' class='menu__item'>Me</p></li>
        <li><p class='menu__item' id='closeSession'>Close</p></li>
      </ul>
    </div>

    <form class='formProfile' id='formProfile'>
      <div class='headerProfile'>
        <img src='${photo}' id='photoProfile' class= 'photoForProfile'  alt='Imagen de perfil'></img>
        
        <input type='file' accept='image/png image/jpeg' id='updatePhoto'></input>
        </div>
        <div class='profileFormDivDad'>
          <h1 class= 'nameForProfile'> ${userProfile.name} </h1>
      </div>

      <div class='profileFormDiv'></div>
        <label for='namePet'>Name</label>
        <input type= 'text' class='inputProfile' id='namePet' placeholder='Pet name'> 
      </div>        
      <div class='profileFormDiv'></div>
        <label for='type'>Type</label>
        <input  type= 'text' class='inputProfile' id='type' placeholder='Type, e.g: Cat'> 
      </div>
      <div class='inputProfileDescription'>
        <label for='description'>Description</label>
        <textarea id='description' class='inputProfileTextArea' placeholder='...' rows='4' cols='50'></textarea>
      </div>  
      <div class ='buttonsProfile'>
      <button class='buttonProfile' id='buttonSave'>Save</button>
    </div>     
    </form>
    
    <img src='https://raw.githubusercontent.com/gabrielavillarrealdiaz/DEV001-social-network-SN01/main/src/img/paw1.png' id='pawBackground' class='pawBackground' alt='paw'>
  </section>
  <img src='https://raw.githubusercontent.com/gabrielavillarrealdiaz/DEV001-social-network-SN01/main/src/img/perritosProfile.png' id='imgForProfile' class='imgForProfileLandPage'  alt='profile img'>`;

  // Guarda en constante sección post del menu
  const post = profileDiv.querySelector('#postSelect');
  // Escucha evento 'click' en constante post y realiza cambio de hash con función changeHash
  post.addEventListener('click', () => {
    changeHash('#/post');
  });

  const profile = profileDiv.querySelector('#profileSelect');
  // Escucha evento 'click' en constante profile y realiza cambio de hash con función changeHash
  profile.addEventListener('click', () => {
    changeHash('#/profile');
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
    // Guarda en constante usersRef la referencia a la colección
    const usersRef = doc(db, 'users', user.uid);
    // llama a función getStorage
    const storageProfilePhoto = storage();
    // Metadata del archivo esperado
    /** @type {any} */
    const metadata = {
      contentType: 'image/jpeg',
    };
    // Referencia en el storage, tipo 'images/rutadelafoto'
    const storageRef = refFunction(storageProfilePhoto, `images/${newPhoto}`);
    // Sube la foto a la referencia anterior
    const uploadTask = uploadToStorage(storageRef, fileList[0], metadata);
    // Promesa, sube la foto y actualiza el doc del usuario agregando el photoURL nuevo
    //  + actualiza perfil del usuario
    downloadUrl(uploadTask.snapshot.ref)
      .then((downloadURL) => {
        updateDoc(usersRef, {
          photoURL: downloadURL,
        });
        updatePhoto(user, downloadURL);
        // Promesa, según uid del user
        getUser(user.uid).then((userSnap) => {
          // Crea elemento en localStorage con la data del user
          localStorage.setItem('userProfile', JSON.stringify(userSnap.data()));
          const userPhotosnew = JSON.parse(localStorage.getItem('userProfile'));
          profileDiv.querySelector('#photoProfile').src = userPhotosnew.photoURL;
          updatePhoto(user, userPhotosnew.photoURL);
          if (userPhotosnew) {
            photo = userPhotosnew;
          }
        });
      });
  });
  const buttonCloseSesion = profileDiv.querySelector('#closeSession');
  buttonCloseSesion.addEventListener('click', () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Confirm close session?')) {
      signOutUser(auth)
        .then(() => {
          changeHash('#/');
        })
        .catch((error) => {
          // eslint-disable-next-line no-unused-vars
          const errorCode = error.code;
          // eslint-disable-next-line no-unused-vars
          const errorMessage = error.message;
        });
    } else {
      changeHash('#/post');
    }
  });

  const buttonsave = profileDiv.querySelector('#buttonSave');
  buttonsave.addEventListener('click', (e) => {
    const namePetInput = profileDiv.querySelector('#namePet').value;
    const typeInput = profileDiv.querySelector('#type').value;
    const descriptionInput = profileDiv.querySelector('#description').value;
    e.preventDefault();
    updateUsers(userProfile.user, {
      petName: namePetInput,
      type: typeInput,
      description: descriptionInput,
    })
      .then(() => {
      });
  });
  return profileDiv;
};
