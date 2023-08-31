import {auth,provider} from '../config/firebase';
import {signInWithPopup} from 'firebase/auth';
import {useNavigate} from "react-router-dom";


export const Login=()=>{
    const navigate=useNavigate();
    const signinwithgoogle= async()=>{
     const result=await signInWithPopup(auth,provider)
     console.log(result);
     navigate("/");
};
    return( 
        <div>
           <p>Sign in With Google to Continue</p>
           <button onClick={signinwithgoogle}>Sign In With Google</button>
        </div>
        );
}