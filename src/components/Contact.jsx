import React from 'react'

const Contact = () => {
  return (
    <section id="contacts" className="container">
      <form action="/home" method="post" className="row d-flex justify-content-center align-content-center">
        <h1 className="text-center">Contact us</h1>
        <div className="form-group m-0 mt-2">
          <label htmlFor="name">Name</label>
          <input type="name" className="form-control" id="name" placeholder="Enter Name" required/>
        </div>
        <div className="form-group m-0 mt-2">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" placeholder="Enter Name" required/>
        </div>
        <div className="form-group mt-2">
          <label htmlFor="texareaMessage">How can we help you</label>
          <textarea className="form-control" id="texareaMessage" rows="4" placeholder="Enter message" required></textarea>
        </div>
        <button type="submit" className="mt-3 btn btn-secondary submitformBtn">Submit</button>
      </form>
    </section>
  )
}

export default Contact