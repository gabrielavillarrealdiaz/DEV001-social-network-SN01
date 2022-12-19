/* eslint-disable no-use-before-define */
// import {  } from 'firebase/firestore';
// import { async } from 'regenerator-runtime';
import {
  savePost, getPost, functionDeleteEachPost, getSavePosts, updatePost, updateLikes, signOutUser,
  changeHash, auth,
} from '../lib/index';

// Exporta vista de posts
export const viewForPost = () => {
  // Crea constante user que guarda usuario desde localStorage con nombre 'user
  const userProfile = JSON.parse(localStorage.getItem('userProfile'));
  const postDiv = document.createElement('div');
  postDiv.classList.add('fullBodyPost');
  // Añade el template de viewForPost en HTML
  const bodyOfPost = `
  <section class='grandpaDivForPost'>
    <div class='carousel'>
    <img src= './img/carrusel/izq.png' id='left' class='previous-button' alt='left'>
    <img src= './img/carrusel/bannerPrototipo2.png' id='image' class='image'  alt='ads banner'>
    <img src= './img/carrusel/der.png' id='right' class='next-button' alt='right'>
    </div>
  <img src='./img/yello.png' id='upperBackgroundPost' class='upperBackgroundPost'  alt='paw background>
    <header class='headerOfPost'>
      <div class='leftHeader'>
        <div class='hamburger-menu'>
          <input id='menu__toggle' type='checkbox' />
          <label class='menu__btn' for='menu__toggle'>
            <span></span>
          </label>
          <ul class='menu__box'>
          <li><p id='postSelect' class='menu__item'>Posts</p></li>
          <li><p id= 'profileSelect' class='menu__item'>Me</p></li>
          <li><p class='menu__item' id='closeSession' data-id ='${userProfile}'>Close</p></li>
          </ul>
        </div>
      </div>
        <h2 class='helloForPost'>Hi ${userProfile.name}!</h2>
        <img src='${userProfile.photoURL}' id='photoProfile' class= 'photoForPost'  alt='Imagen de perfil'>
    </header>
    
    <div class='post'>
      <h3>Tell us about your day!</h3>
      <div class='postAreaForEdit'> 
        <textarea id= 'inputPost' class= 'textAreaPost' rows='6' cols='30'></textarea>
      </div>  
      <span class= 'buttonPostDiv'>   
      <button id='buttonPost' class='buttonPost'>Post</button>
      </span>
    </div>
    <span class ='buttonShowPosts'>
    <button id='buttonShowPost' class='buttonShowPost2'>Show Posts</button> 
    </span>
    <div id='showPost' class='post-anteriores'></div>

    <img src='./img/paw1.png' id='pawBackgroundPost' class='pawBackgroundPost' alt='paw'>
   </section>
`;
  postDiv.insertAdjacentHTML('beforeend', bodyOfPost);

  const profile = postDiv.querySelector('#profileSelect');
  // Escucha evento 'click' en constante profile y realiza cambio de hash con función changeHash
  profile.addEventListener('click', () => {
    changeHash('#/profile');
  });

  const postSelect = postDiv.querySelector('#postSelect');
  // Escucha evento 'click' en constante profile y realiza cambio de hash con función changeHash
  postSelect.addEventListener('click', () => {
    changeHash('#/post');
  });

  const images = ['./img/carrusel/bannerPrototipo2.png', './img/carrusel/bannerPrototipo3.png', './img/carrusel/bannerPrototipo4.png'];
  let counter = 0;
  function carousel() {
    const back = postDiv.querySelector('.previous-button');
    back.addEventListener('click', () => {
      const img = postDiv.querySelector('#image');
      if (counter > 0) {
        img.src = images[counter - 1];
        // eslint-disable-next-line no-plusplus
        counter--;
      } else {
        img.src = images[images.length - 1];
        counter = images.length - 1;
      }
      // eslint-disable-next-line eqeqeq
    });

    const forward = postDiv.querySelector('.next-button');
    forward.addEventListener('click', () => {
      const img = postDiv.querySelector('#image');
      if (counter < (images.length - 1)) {
        img.src = images[counter + 1];
        // eslint-disable-next-line no-plusplus
        counter++;
      } else {
        img.src = images[0];
        counter = 0;
      }
    });
  }

  const atras = postDiv.querySelector('.previous-button');
  const adelante = postDiv.querySelector('.next-button');
  atras.addEventListener('click', () => {
    const carrusel = postDiv.querySelector('.carousel');
    carousel(carrusel);
  });
  adelante.addEventListener('click', () => {
    const carrusel = postDiv.querySelector('.carousel');
    carousel(carrusel);
  });

  const likes = [];
  // Selecciona button showPost desde template para mostrar posts
  const postArea = postDiv.querySelector('#showPost');
  // Escucha evento 'click' en button buttonPost
  postDiv.querySelector('#buttonPost').addEventListener('click', () => {
    const textAreaPost = postDiv.querySelector('#inputPost').value;
    const nameUser = userProfile.name;
    const userUid = userProfile.user;
    // crea constante que guarda la fecha del momento en el que se guarda el post
    const creationDatePost = Date.now();
    // guarda el post en función savePost con parámetros
    savePost(textAreaPost, nameUser, userUid, creationDatePost, likes);
  });
  const buttonShowPost = postDiv.querySelector('#buttonShowPost');
  // Selecciona button showPost para mostrar posts y escucha evento 'click'
  buttonShowPost.addEventListener('click', async () => {
    // Llama a la función getPost que trae los posts publicados
    getPost((querySnapshot) => {
      postArea.innerHTML = '';
      const arrayForPost = [];
      // Consigue la data y cada post es agregado en un array + id de documento del post
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const idDoc = doc.id;
        arrayForPost.push([data, { id: idDoc }]);
      });
      // En el array creado, se utiliza método sort para ordenar los post de forma descendente
      const dataSort = arrayForPost.sort(
        (a, b) => new Date(b[0].creationDate) - new Date(a[0].creationDate),
      );
      // Por cada documento posteado se busca que el id del documento coincida con el id del usuario
      // y si coincide, se inserta en el HTML un template para el post
      dataSort.forEach((doc) => {
        const dateOfPost = new Date(doc[0].creationDate);
        if (doc[0].usersId === userProfile.user) {
          const allPosts = `
          <section class='bodyOfEachPost' id='bodyOfEachPost'>
              <header class='headerOfEachPost' id='headerOfEachPost'>
                <p class='nameOfUserPost' id='nameOfUserPost'>${doc[0].nameOfUser} <span id='youTag'>You</span></p>
                <p class='dateOfPost' id='dateOfPost'>${dateOfPost.toLocaleDateString()}</p>
              </header>
              <div class='prueba' id='prueba'>${doc[0].textOfEachPost}</div> 
              <div class='reactionsandEventsForPost' id='reactionsandEventsForPost'>
                <img src='./img/delete.png' class='deletePost' id='deletePost' data-id=${doc[1].id}>
                <img src='./img/editButton.png' class='editPost' id='editPost' data-id=${doc[1].id}>
                <div class='likesRow'>
                  <img src= ${doc[0].likes.includes(userProfile.user) ? './img/likePaw2.png' : './img/likePaw.png'} class='likePost' data-id=${doc[1].id}>
                  <span class='numberOfLikes'>${doc[0].likes.length}</span>
                </div>
              </div>
          </section>
          `;

          postArea.insertAdjacentHTML('beforeend', allPosts);
          // Si no, se insertan únicamente los posts de los demás usuarios
        } else {
          const allPosts = `
          <section class='bodyOfEachPost' id='bodyOfEachPost'>
            <header class='headerOfEachPost' id='headerOfEachPost'>
              <p class='nameOfUserPost' id='nameOfUserPost'>${doc[0].nameOfUser}</p>
              <p class='dateOfPost' id='dateOfPost'>${dateOfPost.toLocaleDateString()}</p>
            </header>
            <div class='prueba'>${doc[0].textOfEachPost}</div> 
            <div class='reactionsandEventsForPost2' id='reactionsandEventsForPost'>
              <div class='likesRow'>
                <img src= ${doc[0].likes.includes(userProfile.user) ? './img/likePaw2.png' : './img/likePaw.png'} class='likePost' data-id=${doc[1].id}>
                <span class='numberOfLikes'>${doc[0].likes.length}</span>
              </div>
            </div>
          </section>
          `;

          postArea.insertAdjacentHTML('beforeend', allPosts);
        }
      });
      dataSort.forEach((doc) => {
        if (doc[0].usersId === userProfile.user) {
          const buttonsForDelete = postArea.querySelectorAll('#deletePost');
          buttonsForDelete.forEach((button) => {
            button.addEventListener('click', ({ target: { dataset } }) => {
              const postId = dataset.id;
              if (doc[1].id === postId) {
                // eslint-disable-next-line no-restricted-globals, no-unused-expressions
                confirm('Confirm delete post?') ? functionDeleteEachPost(postId) : false;
                // eslint-disable-next-line no-restricted-globals
              }
            });
          });
        }
      });
      /* aqui comienza editar */
      dataSort.forEach((doc) => {
        if (doc[0].usersId === userProfile.user) {
          const buttonsForEdit = postArea.querySelectorAll('#editPost');
          buttonsForEdit.forEach((button) => {
            button.addEventListener('click', ({ target: { dataset } }) => {
              const idEditButton = dataset.id;
              if (doc[1].id === idEditButton) {
                getSavePosts(idEditButton);
                // crear textarea
                const conteinerOfEditPost = document.createElement('div');
                const divHeaderEditPost = document.createElement('div');
                divHeaderEditPost.classList.add('divHeaderPost');
                conteinerOfEditPost.appendChild(divHeaderEditPost);
                divHeaderEditPost.innerText = 'Edit your post here';

                const textAreaForEdit = document.createElement('textarea');
                textAreaForEdit.classList.add('textEditPost');
                textAreaForEdit.innerText = `${doc[0].textOfEachPost}`;
                textAreaForEdit.setAttribute('id', doc[1].id);
                conteinerOfEditPost.classList.add('containerEditPost');
                conteinerOfEditPost.appendChild(textAreaForEdit);
                postDiv.appendChild(conteinerOfEditPost);

                const buttonSaveNewPost = document.createElement('button');
                buttonSaveNewPost.classList.add('buttonSavePostNew');
                buttonSaveNewPost.innerText = 'save';
                buttonSaveNewPost.setAttribute('id', doc[1].id);
                conteinerOfEditPost.appendChild(buttonSaveNewPost);

                /*  crear boton cerrar */

                const buttonCloseModal = document.createElement('img');
                buttonCloseModal.src = './img/cerrar.png';
                buttonCloseModal.classList.add('buttonCloseEditTextArea');
                buttonCloseModal.innerText = 'close';
                buttonCloseModal.setAttribute('id', doc[1].id);
                conteinerOfEditPost.appendChild(buttonCloseModal);

                buttonSaveNewPost.addEventListener('click', () => {
                  const valueEditArea = textAreaForEdit.value;
                  updatePost(buttonSaveNewPost.id, {
                    textOfEachPost: valueEditArea,
                  }).then(() => {
                    divHeaderEditPost.classList.remove('divHeaderPost');
                    divHeaderEditPost.classList.add('divHeaderPostDisplayNone');
                    textAreaForEdit.classList.remove('textEditPost');
                    textAreaForEdit.classList.add('textEditPostDisplayNone');
                    buttonSaveNewPost.classList.remove('buttonSavePostNew');
                    buttonSaveNewPost.classList.add('buttonSavePostNewDisplayNone');
                    conteinerOfEditPost.classList.remove('containerEditPost');
                    conteinerOfEditPost.classList.add('textEditPostDisplayNone');
                  });
                });
                buttonCloseModal.addEventListener('click', () => {
                  divHeaderEditPost.classList.remove('divHeaderPost');
                  divHeaderEditPost.classList.add('divHeaderPostDisplayNone');
                  textAreaForEdit.classList.remove('textEditPost');
                  textAreaForEdit.classList.add('textEditPostDisplayNone');
                  buttonSaveNewPost.classList.remove('buttonSavePostNew');
                  buttonSaveNewPost.classList.add('buttonSavePostNewDisplayNone');
                  conteinerOfEditPost.classList.remove('containerEditPost');
                  conteinerOfEditPost.classList.add('textEditPostDisplayNone');
                });
              } // FIN IF de edit
            });
          });
        }
      });
      // AQUI TERMINA y comienza likes
      const buttonLikes = postArea.querySelectorAll('.likePost');
      buttonLikes.forEach((button) => {
        button.addEventListener('click', async ({ target: { dataset } }) => {
          const post = await getSavePosts(dataset.id);
          const docOfEachPost = post.data();
          if (!docOfEachPost.likes.includes(userProfile.user)) {
            const newLikes = [...docOfEachPost.likes, userProfile.user];
            updateLikes(dataset.id, { likes: newLikes });
            // document.querySelector('.likePost2').style.backgroundColor = 'red';
          } else {
            const dislike = docOfEachPost.likes.filter((users) => users !== userProfile.user);
            updateLikes(dataset.id, { likes: dislike });
          }
        });
      });
    });
    // aqui termina
  });
  const buttonCloseSesion = postDiv.querySelector('#closeSession');
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

  return postDiv;
};
