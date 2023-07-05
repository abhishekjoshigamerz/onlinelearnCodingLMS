import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useSelector, useDispatch } from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import {useFetchCourseByIdQuery} from '../../features/course/coursesSlice';
import { setCartData } from '../../features/cart/cartStore';


import './ViewCourse.css';
const parse = require('html-react-parser');

const ViewCourse = () => {
    const courseId = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {data, isError, isFetching, isLoading, isSuccess } = useFetchCourseByIdQuery(courseId.id);
    
   if (isSuccess && data && data.course) {
    console.log(data.course.topics);
    
    } else if (isLoading || isFetching) {
        console.log('Loading...');
    }    
    if(isError){
        console.log(isError.message);
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>Something went wrong!</h1>
                        
                    </div>
                </div>
            </div>
        )
    }

    const enrollNow = (course) => {

        console.log('Added to cart');
        console.log(course);
        const courseData = {
            courseID: course._id,
            courseName: course.name,
            coursePrice: course.price,
            courseImage: course.image,
            id: course._id,
        }
        dispatch(setCartData(courseData));
        alert('Course added to cart');
        navigate('/cart');
    }
    

    return (
        <>
        {
            isSuccess && data ? 
            (
                <div>
            <Header />
           
            <div className="course-header bg-dark text-white p-3 d-flex justify-content-between align-items-center ">
    <div className="col-md-8 col-12 d-flex flex-column align-items-center me-auto">
        <h1>{data.course.name}</h1>
        <p>{data.course.summary}</p>
    </div>
        <div className="course-box col-md-4 col-12 position-relative bg-white text-center p-2 rounded shadow">
            <img src="https://placehold.co/400" alt={data.course.name} className="w-100" />
            <p>{data.course.price}</p>
            <button className="enroll-button btn btn-primary w-100" onClick={(event)=>enrollNow(data.course)}>Enroll Now</button>
        </div>
    </div>

            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-8">
                        
                        <p>{parse(data.course.description)}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <h2>Topics Covered</h2>
                        <div className="accordion" id="topicsAccordion">
                            {data.course.topics.map((topic, index) => (
                                <div className="accordion-item" key={index}>
                                    <h2 className="accordion-header" id={`heading${index}`}>
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="false" aria-controls={`collapse${index}`}>
                                            {topic.name}
                                        </button>
                                    </h2>
                                    <div id={`collapse${index}`} className="accordion-collapse collapse" aria-labelledby={`heading${index}`} data-bs-parent="#topicsAccordion">
                                        <div className="accordion-body">
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                        </div>
                    </div>
                </div>
            </div>
           <Footer />
        </div> 
            ) : 
            (
                <div>Loading...</div>
            )

        }
    
        
       </>

    );
}

export default ViewCourse;
