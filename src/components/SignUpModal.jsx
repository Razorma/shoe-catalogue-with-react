import React, { useState } from 'react'

const SignUpModal = () => {
    const [signFormData, setSignFormData] = useState(
        {username: "",lastName:'',email:"", password: ""}
    )
    function handleChange(event) {
        const {name, value, type, checked} = event.target
        setSignFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }



  return (
    <form className="modal fade" id="signUpModal" tabIndex="-1" aria-labelledby="signUpModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="signUpModalLabel">Sign Up</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="SignUp-box">
              <div className="error text-center">
                <p className="signUpmess "></p>
              </div>
              <div className="usename-box form-group">
                <label htmlFor="SignUpUsename" className="loginLabel">Name</label>
                <input onChange={handleChange}type="text" name="username" id="SignUpUsename" className="form-control SignUp-username" value=""
                  />
              </div>
              <div className="surname-box form-group">
                <label htmlFor="surname" className="loginLabel">Surname</label>
                <input onChange={handleChange}type="text" name="lastName" id="surname" className="form-control surname" value="" />
              </div>
              <div className="email-box form-group">
                <label htmlFor="email-box" className="emailLabel">Email</label>
                <input onChange={handleChange}type="email" name="email" id="email-box" className="form-control SignUp-email" required/>
              </div>
              <div className="password-box form-group">
                <label htmlFor="SignUpPassword" className="loginLabel">Password</label>
                <input onChange={handleChange}type="password" name="password" id="SignUpPassword" className="form-control SignUp-password"
                  />
              </div>

            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary loginButtonModal" data-bs-toggle="modal"
              data-bs-target="#loginModal">Login</button>
            <button type="submit" className="btn btn-primary signUpButton">SignUp</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default SignUpModal