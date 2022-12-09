import {
  doc, setDoc, getDoc, addDoc, collection, onSnapshot, deleteDoc, updateDoc,
} from 'firebase/firestore';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  app,
  db,
  updateProfile,
  signOut,
} from '../firebase';

export const auth = getAuth(app);

/**
 * Exporta constante reutilizable (cambio de hash)
 */
export const changeHash = (hash) => {
  window.location.hash = hash;
};

/**
 * Exporta constante que guarda data de usuarios usando su ID y crea documento en colección
 */
export const saveDataFromUsers = async (name, country, usersUid, email, password) => {
  const docs = doc(db, 'users', usersUid);
  setDoc(docs, {
    name,
    countries: country,
    user: usersUid,
    emails: email,
    passwords: password,
  });
  const userFromFirestore = await getDoc(docs);
  console.log(userFromFirestore.data(usersUid).user);
  // localStorage.setItem('user', userFromFirestore.data(usersUid));
  // console.log(userFromFirestore.data(usersUid));
};

/**
 * Exporta constante que guarda data de usuarios cuando se registran con google y crea documento
 */
export const saveDataFromGoogle = (nameGoogle, usersId, emailGoogle) => {
  setDoc(doc(db, 'users', usersId), {
    name: nameGoogle,
    user: usersId,
    email: emailGoogle,
  });
};

/**
 * Envía correo de verificación de cuenta y emite alerta de que el correo fue enviado
 */
export const sendEmail = (currentUser) => {
  const promesa = sendEmailVerification(currentUser);
  return promesa;
};

/**
 * Exporta constante de registro + datos del usuario
 */
// eslint-disable-next-line max-len
export const submitRegister = (email, password) => createUserWithEmailAndPassword(auth, email, password);

/**
 * TODO: JSDO
 * Return a promise that sign in with Google
 */
export const googleLogIn = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

/**
 * Exporta constante que envía correo de reseteo de contraseña
 */
export const forgotPassword = (email) => sendPasswordResetEmail(auth, email);

/**
 * Exporta constante que permite al usuario ingresar con su correo y contraseña
 */
export const logInHome = (email, password) => signInWithEmailAndPassword(auth, email, password);

/**
 * Exporta constante que permite al usuario ser identificado en su sesión
 */
export const updateInfo = (currentUser, name) => updateProfile(currentUser, {
  displayName: name,
});

/**
 * Exporta constante que permite al usuario cambiar su foto
 */
export const updatePhoto = (currentUser, photo) => updateProfile(currentUser, {
  photoUrl: photo,
});

/**
 * Exporta constante que permite guardar información de los posts
 */
export const savePost = (textOfEachPost, nameOfUser, usersId, creationDate, likes) => {
  addDoc(collection(db, 'posts'), {
    textOfEachPost, nameOfUser, usersId, creationDate, likes,
  });
  // console.log('base datos');
};

/**
 * Exporta constante que recupera la colección de posts
 */
export const getSavePosts = (id) => getDoc(doc(db, 'posts', id));

/**
 * Exporta constante que llama al documento de la colección
 */
export const getPost = (callback) => {
  onSnapshot(collection(db, 'posts'), callback);
};

/**
 * Exporta constante que retorna documento desde colección según id del usuario
 */
export const getUser = (userId) => {
  const docRef = doc(db, 'users', userId);
  return getDoc(docRef);
};

/**
 * Exporta constante que elimina documento desde firestore
 */
export const functionDeleteEachPost = (id) => deleteDoc(doc(db, 'posts', id));

// Función de getDoc
// export const functionGetTask2 = (id) => getDoc(doc(db, 'task', id));

/**
 * Exporta constante que actualiza post según id de documento
 */
export const updatePost = (id, newPost) => updateDoc(doc(db, 'posts', id), newPost);

export const updateLikes = (id, likes) => updateDoc(doc(db, 'posts', id), likes);

/**
 * Cerrar seción
 */
export const signOutUser = () => signOut(auth);
