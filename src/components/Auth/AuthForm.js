import { useState, useRef } from "react";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const emailInputRef = useRef("");
  const passwordInputRef = useRef("");
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading,setIsLoading]=useState(false)
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler =  (event) => {
    event.preventDefault();

    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    
   

    setIsLoading(true)
    if (isLogin) {
    } else {
         
        fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBJDKJsw6vGx5JASyTEwuicIUqs-FV-7_o',
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      ).then(res=>{
        setIsLoading(false)
        if (res.ok) {
        } else {
           return res.json().then((data)=>{
            
            let errorMessage='Authentication Failed!'
            if(data && data.error && data.error.message){
              errorMessage=data.error.message
            }
            alert(errorMessage)
           })
          
        }
      })
      
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email" ref={emailInputRef}>
            Your Email
          </label>
          <input type="email" id="email" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password" ref={passwordInputRef}>
            Your Password
          </label>
          <input type="password" id="password" required />
        </div>
        <div className={classes.actions}>
          {!isLoading &&<button>{isLogin ? "Login" : "create account"}</button>}
          {isLoading && <p>Sending Request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
