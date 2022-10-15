import {
  GoogleAuthProvider,
  signInWithEmailAndPassword as signInWithEmailAndPasswordFirebase,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { firebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();

export const sigInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(firebaseAuth, googleProvider);
    //const credentials = await GoogleAuthProvider.credentialFromResult(result);
    const { displayName, email, photoURL, uid } = result.user;

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return {
      ok: false,
      errorCode,
      errorMessage,
    };
  }
};

export async function signInWithEmailAndPassword(email, password) {
  try {
    const result = await signInWithEmailAndPasswordFirebase(firebaseAuth, email, password);
    const { displayName, photoURL, uid } = result.user;

    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return {
      ok: false,
      errorCode,
      errorMessage,
    };
  }
}

export async function registerUserWithEmailAndPassword({ email, password, displayName }) {
  try {
    const result = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    const { uid, photoURL } = result.user;

    await updateProfile(firebaseAuth.currentUser, { displayName });

    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName,
    };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return {
      ok: false,
      errorCode,
      errorMessage,
    };
  }
}
