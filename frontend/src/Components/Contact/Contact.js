import React from 'react';
import { FcSupport,FcHeadset,FcDepartment } from "react-icons/fc";
export const Contact = () => {

  const handleSubmit = (event) => {
    event.preventDefault();
    // Insert your form validation logic here
    console.log('Form Submitted');
  }

  return (
    <section className="section" id="contact">
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="title text-center mb-5">
                            <h6 className="text-primary small-title">Contact</h6>
                            <h4>Have any Questions ?</h4>
                            <p className="text-muted">At solmen va esser far uniform grammatica.</p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-4">
                        <div className="get-in-touch">
                            <h5>Get in touch</h5>
                            <p className="text-muted mb-5">At solmen va esser necessi far</p>

                            <div className="mb-3">
                                <div className="get-touch-icon float-start me-3">
                                   <h2><FcSupport size={22}/></h2>
                                </div>
                                <div className="overflow-hidden">
                                    <h5 className="font-16 mb-0">E-mail</h5>
                                    <p className="text-muted">example@abc.com</p>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="get-touch-icon float-start me-3">
                                    <h2><FcHeadset size={22} /></h2>
                                </div>
                                <div className="overflow-hidden">
                                    <h5 className="font-16 mb-0">Phone</h5>
                                    <p className="text-muted">012-345-6789</p>
                                </div>
                            </div>
                            <div className="mb-2">
                                <div className="get-touch-icon float-start me-3">
                                   <h2> <FcDepartment size={22} /></h2>
                                </div>
                                <div className="overflow-hidden">
                                    <h5 className="font-16 mb-0">Address</h5>
                                    <p className="text-muted">20 Rollins Road Cotesfield, NE 68829</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="custom-form bg-white">
                            <span id="error-msg"></span>
                                <form method="post" name="myForm" onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Name</label>
                                            <input name="name" id="name" type="text" className="form-control" placeholder="Enter your name" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email address</label>
                                            <input name="email" id="email" type="email" className="form-control" placeholder="Enter your email" />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="mb-3">
                                            <label htmlFor="subject" className="form-label">Subject</label>
                                            <input name="subject" id="subject" type="text" className="form-control" placeholder="Enter Subject" />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="mb-3">
                                            <label htmlFor="comments" className="form-label">Message</label>
                                            <textarea name="comments" id="comments" rows="4" className="form-control" placeholder="Enter your message"></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-lg-12 text-end">
                                        <input type="submit" id="submit" name="send" className="submitBnt btn btn-custom" value="Send Message" />
                                    </div>
                                </div>
                              
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default Contact;
