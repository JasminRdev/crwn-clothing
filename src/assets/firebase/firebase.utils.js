import { initializeApp } from 'firebase/app';
import {
    getAuth, 
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
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
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)
  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName, email, createAt
            });
        } catch (error) {
            console.log("err creating user ", error.message)
        }
    } 

    return userDocRef


  }

