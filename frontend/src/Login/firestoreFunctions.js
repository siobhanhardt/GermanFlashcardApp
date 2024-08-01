import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase-config";

export async function saveUserData(userId, data) {
  try {
    await setDoc(doc(db, "users", userId), data, { merge: true });
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

export async function getUserData(userId) {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return [];
  }
}
