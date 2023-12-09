import {signInWithGooglePopup,createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'


const SignIn = () => {
    const logGoogleUser = async () => {
        try{
            const {user} = await signInWithGooglePopup();
            const userDocRef = await createUserDocumentFromAuth(user);
            console.log(user);
            console.log("Autenticazione riuscita")
        }catch(err){
            console.log("Autenticazione fallita")
        }
        
    }
    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign in with Google</button>
        </div>
    )
}

export default SignIn;