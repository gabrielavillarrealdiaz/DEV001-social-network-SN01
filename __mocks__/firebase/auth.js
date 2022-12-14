/* eslint-disable no-unused-vars */
// console.log('estamos aquí');
export const getAuth = jest.fn();
export const createUserWithEmailAndPassword = jest.fn();
export const sendEmailVerification = jest.fn();
export const sendPasswordResetEmail = jest.fn();
export const signInWithEmailAndPassword = jest.fn();
export const AuthErrorCodes = jest.fn();
export const GoogleAuthProvider = jest.fn();
export const signInWithPopup = jest.fn();
export const provider = jest.fn(GoogleAuthProvider());
export const updateProfile = jest.fn();
export const signOut = jest.fn();
// PENDIENTE POR REVISAR
// eslint-disable-next-line max-len
export const submitRegister = jest.fn((email, password, name, country) => new Promise((resolve, reject) => {
  const userCredential = {
    user: {
      uid: '12345',
    },
  };
  resolve(userCredential);
  reject(new Error(AuthErrorCodes));
}));

/* jest.fn((auth, email, password) => {
  Promise.resolve({ user: { email, password } });
}); */
