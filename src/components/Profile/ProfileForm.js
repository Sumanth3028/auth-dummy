import { useRef ,useContext,useState} from 'react';
import AuthContext from '../../store/auth-context';
import { useNavigate } from 'react-router-dom';

import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const pwdInputRef=useRef('')
  const authCtx=useContext(AuthContext)
  const navigate=useNavigate()
  const [successful,setIsSuccessful]=useState(false)

  const submitHandler=(event)=>{
    event.preventDefault()
    
     
        const enteredPassword=pwdInputRef.current.value
    
      console.log(enteredPassword)
      

      fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBJDKJsw6vGx5JASyTEwuicIUqs-FV-7_o',{
        method: "POST",
        body: JSON.stringify({
          idToken:authCtx.token,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(res=>{
            setIsSuccessful(true)
            navigate('/')
      })
      
  }

  return (
    
      <form className={classes.form} onSubmit={submitHandler}>
        
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password'minLength='7' ref={pwdInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
      {successful && <p>Changed successfully</p>}
    </form>

  );
}

export default ProfileForm;
