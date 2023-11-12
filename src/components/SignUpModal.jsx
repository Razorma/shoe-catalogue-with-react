import React, { useState } from "react";

const SignUpModal = ({ shoesRequests, signUpError,setSignUpError}) => {
  const signUpEmail = document.querySelector(".SignUp-email");
  const signUpmess= document.querySelector(".signUpmess");
  
  

  const [signFormData, setSignFormData] = useState({
    username: "",
    lastName: "",
    email: "",
    password: "",
  });
  function handleChange(event) {
    const { name, value } = event.target;
    setSignFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }


  function handleSubmit(event) {
       
    if (signUpEmail.validity.typeMismatch) {  
      return;
    }else {
      if (signFormData.username === "") {
        signUpmess.classList.add("text-danger")
        setSignUpError("Please enter Name") 
        
        setTimeout(() => {
          setSignUpError("") 
          signUpmess.classList.remove("text-danger")
        }, 3000)

    } else if (signFormData.password === "") {
      signUpmess.classList.add("text-danger")  

      setSignUpError("Please enter Password")
      setTimeout(() => {
        setSignUpError("")
        signUpmess.classList.remove("text-danger")
      }, 3000)

    } else if (signFormData.lastName === "") {
      signUpmess.classList.add("text-danger")
      setSignUpError("Please enter Surname")
        setTimeout(() => {
            signUpmess.innerHTML = ""
            signUpmess.classList.remove("text-danger")
        }, 3000)

    } else if (signFormData.email === "") {
        signUpmess.classList.add("text-danger")
        setSignUpError("Please enter Email")
        signUpmess.innerHTML = 
        setTimeout(() => {

          setSignUpError("")
            signUpmess.classList.remove("text-danger")
        }, 3000)

    } else {
        shoesRequests.signUp(signFormData.username, signFormData.password, signFormData.lastName, signFormData.email)
            .then((results) => {
                let response = results.data;
                console.log(response)
                if (response.error) {
                    signUpmess.classList.add("text-danger")
                    setSignUpError("User already exists") 
                    setTimeout(() => {
                      setSignUpError("") 
                        signUpmess.classList.remove("text-danger")
                    }, 3000)
                }

                if (response.status === 'success') {
                    signUpmess.classList.add("text-green")
                    setSignUpError( 'User successfully added') 
                    setTimeout(() => {
                      setSignUpError( '') 
                      signUpmess.classList.remove("text-green")
                    }, 3000)
                    setSignFormData({
                      username: "",
                      lastName: "",
                      email: "",
                      password: "",
                    });
                  
                }

            })
        
    }

      
    }
    event.preventDefault()
    
  }

  return (
    <form
      className="modal fade"
      id="signUpModal"
      tabIndex="-1"
      aria-labelledby="signUpModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="signUpModalLabel">
              Sign Up
            </h1>
            <button
              type="button"
              className="btn-close btnClose"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="SignUp-box">
              <div className="error text-center">
                <p className="signUpmess ">{signUpError}</p>
              </div>
              <div className="usename-box form-group">
                <label htmlFor="SignUpUsename" className="loginLabel">
                  Name
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="username"
                  id="SignUpUsename"
                  className="form-control SignUp-username"
                  value={signFormData.username}
                />
              </div>
              <div className="surname-box form-group">
                <label htmlFor="surname" className="loginLabel">
                  Surname
                </label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="lastName"
                  id="surname"
                  className="form-control surname"
                  value={signFormData.lastName}
                />
              </div>
              <div className="email-box form-group">
                <label htmlFor="email-box" className="emailLabel">
                  Email
                </label>
                <input
                  onChange={handleChange}
                  type="email"
                  name="email"
                  id="email-box"
                  className="form-control SignUp-email"
                  value={signFormData.email}
                  required
                />
              </div>
              <div className="password-box form-group">
                <label htmlFor="SignUpPassword" className="loginLabel">
                  Password
                </label>
                <input
                  onChange={handleChange}
                  type="password"
                  name="password"
                  id="SignUpPassword"
                  className="form-control SignUp-password"
                  value={signFormData.password}
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary loginButtonModal"
              data-bs-toggle="modal"
              data-bs-target="#loginModal"
            >
              Login
            </button>
            <button
              type="submit"
              className="btn btn-primary signUpButton"
              onClick={handleSubmit}
            >
              SignUp
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignUpModal;
