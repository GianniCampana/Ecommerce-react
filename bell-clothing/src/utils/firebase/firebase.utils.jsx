import {initializeApp} from 'firebase/app';
import 'firebase/auth';
import{
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth'

import{
    getFirestore,
    doc, //retrive document inside our firestore database 
    getDoc,
    setDoc
}from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCozACyqgEHIJ7I0dEQ6TABeEwiHlNT2KA",
    authDomain: "bell-clothing-db.firebaseapp.com",
    projectId: "bell-clothing-db",
    storageBucket: "bell-clothing-db.appspot.com",
    messagingSenderId: "197026936659",
    appId: "1:197026936659:web:3881d145870960b84313a6",
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);
  

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account",
    
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();
  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid); //doc needs 3 arguments, database, collections, identifier that tells it what it was
    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    //check in the userdata not exists
    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt
            });
        }catch(error){
            console.log('error creating the user', error.message);
        }
    }
    return userDocRef;
  }