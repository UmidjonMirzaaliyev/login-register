import React, { useRef } from "react";
import styles from "./style.module.css";

function Register() {
  const usernameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const rePasswordRef = useRef("");

  function validate(username, email, password, Repassword) {
    if (username.current.value < 3) {
      alert("Username yaroqli emas");
      username.current.focus();
      username.current.style.outlineColor = "red";
      return;
    }
    if (email.current.value < 3) {
      alert("email yaroqli emas");
      username.current.focus();
      username.current.style.outlineColor = "red";
      return;
    }
    if (password.current.value < 3) {
      alert("password yaroqli emas");
      username.current.focus();
      username.current.style.outlineColor = "red";
      return;
    }
    if (Repassword.current.value < 3) {
      alert("repassword yaroqli emas");
      username.current.focus();
      username.current.style.outlineColor = "red";
      return;
    }
    return true;
  }

  function handleForm(event) {
    event.preventDefault();

    const isValid = validate(usernameRef, emailRef, passwordRef, rePasswordRef);
    if (!isValid) {
      return;
    }
    const user = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    fetch("https://auth-rg69.onrender.com/api/auth/signup", {
      method: "POST",
      headers: {
        'Content-type': "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data =>{
        if(data.message == 'Failed! Email is already use!'){
          alert(data.message)
          emailRef.current.focus()
          return
        }
        if(data.message == 'Failed! Username is already use!'){
          alert(data.message)
          usernameRef.current.focus()
          return
        }
      })
      .catch(err =>{
        console.log(err =>{
          console.log(err);
        });
      })
  }
  return (
    <div>
      <h1 className={styles.title}>REGISTER PAGE</h1>
      <form className={styles.form}>
        <input
          ref={usernameRef}
          type="text"
          placeholder="Please enter username"
        />
        <input
          ref={emailRef}
          type="email"
          placeholder="Please enter email"
        />
        <input
          ref={passwordRef}
          type="password"
          placeholder="Please enter password"
        />
        <input ref={rePasswordRef} type="password" placeholder="Repassword" />

        <button onClick={handleForm}>REGISTER</button>
      </form>
    </div>
  );
}

export default Register;
