import React from 'react';

const AboutUs = () => {
    const services = [
        {
            icon: 'images/icons/layers.png',
            title: 'Latest Courses',
            text: `Explore new horizons by enrolling in our latest programming courses tailored to today's industry programming standards.`,
        },
        {
            icon: 'images/icons/core.png',
            title: 'Full Interview preparation',
            text: `Ace your interviews with our comprehensive preparation guide, designed to equip you with the skills to impress`,
        },
        {
            icon: 'images/icons/paperdesk.png',
            title: 'Live Projects',
            text: `Gain practical experience through our live projects, fostering real-world skills in a dynamic environment.`,
        },
     
    ];

    return (
        <section className="section bg-light" id="about">
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="title text-center">
                            <h6 className="text-primary small-title">About us</h6>
                            <h4>Who are we </h4>
                            <p className="text-muted">We are edtech company which helps student in learning coding 
                            skills.</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {services.map((service, index) => (
                        <div key={index} className="col-xl-4 col-sm-6">
                            <div className="services-box p-4 bg-white mt-4">
                                <div className="services-img float-start me-4">
                                    <img src={service.icon} alt="" />
                                </div>
                                <h5>{service.title}</h5>
                                <div className="overflow-hidden">
                                    <p className="text-muted">{service.text}</p>
                                    
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default AboutUs;
