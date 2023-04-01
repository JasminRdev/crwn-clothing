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

  //a.1. general set up for log in func
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

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();
  //a.1. ends here

  //when user logs in we store authentication data here to firebase db
  //call this func in the sing in comp 
  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    //if user data does not exist
    // create / set doc with data from userAuth in collection
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

