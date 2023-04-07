import { initializeApp } from 'firebase/app';
import {
    getAuth, 
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
 } from 'firebase/auth'

 import {
    getFirestore,
    doc,
    getDoc,
    setDoc
  } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBjFku9jLLX-94CEeJITUKiRo7UrtZXn6g",
    authDomain: "crwn-clothing-af025.firebaseapp.com",
    projectId: "crwn-clothing-af025",
    storageBucket: "crwn-clothing-af025.appspot.com",
    messagingSenderId: "1059043720133",
    appId: "1:1059043720133:web:4902e81faed945ed64a9ac"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (
    userAuth, 
    additionalInformation) => {
    if(!userAuth) return

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName, 
                email, 
                createAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log("err creating user ", error.message)
        }
    } 

    return userDocRef
  }

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
  }

export const signInAuthWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth);