import { useEffect } from 'react'
import { 
    auth,
    signInWithGooglePopup, 
    createUserDocumentFromAuth, 
    signInWithGoogleRedirect 
} from "../../assets/firebase/firebase.utils";
import { getRedirectResult } from "firebase/auth";

const SignIn = () => {
    useEffect(() => {
        fetchRedirect()
    }, [])

    const fetchRedirect = async() => {
        const res = await getRedirectResult(auth)
        if(res) {            
        const userDocRef = await createUserDocumentFromAuth(res.user)
 
        }
    }

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user)
    }

  
    return (
        <div>
            <h1>Sign in page</h1>
            <button onClick={logGoogleUser}> Sign in with Google Popup </button>
            <button onClick={signInWithGoogleRedirect}> Sign in with Google Redirect </button>
        </div>
    )

};

export default SignIn;