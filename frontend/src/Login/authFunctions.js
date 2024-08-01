import { auth } from './firebase-config';
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from "firebase/auth";

export async function signUp(email, password, name) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: name
    });

    return { success: true, user };
  } catch (error) {
    const errorMessage = error.message;
    const errorCode = error.code;
    return { success: false, error: errorMessage, code: errorCode };
  }
}

export async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return { success: true, user };
  } catch (error) {
    const errorMessage = error.message;
    const errorCode = error.code;
    return { success: false, error: errorMessage, code: errorCode };
  }
}

export async function logOut() {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
