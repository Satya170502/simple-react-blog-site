import {Link} from 'react-router-dom'
import {auth} from '../config/firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import { signOut } from 'firebase/auth';
export const Navbar=()=>{
    const [user]=useAuthState(auth);
    const logout =async()=>{
      await signOut(auth);
    };

    //use referrerpolicy when image is not loading
    return( 
        <div className='navbar'>
         <div className="links">
         <Link to="/">Home</Link>
         <Link to="/login">Login</Link>
         <Link to="/logout">Logout</Link>
         </div>
         
         <div className='user'>
            {user &&(
                <>
             <p>{user?.displayName}</p>

             <img src={user?.photoURL|| "" } width="25" height="25" referrerPolicy='no-referrer' /> 

             <button onClick={logout}>Log Out</button>
             </>
            )
 
            }
           
         </div>
        </div>
        );
}