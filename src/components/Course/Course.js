import {react, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useFetchCoursesQuery} from '../../features/course/coursesSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import { setCartData } from '../../features/cart/cartStore';



import './Course.css';
const parse = require('html-react-parser');

export const Course = () => {

    const {data, isError, isFetching, isLoading, isSuccess } = useFetchCoursesQuery();
    const isAuthenticated = useSelector((state) => state.auth.user);
    console.log('Is user authenticated or not');
    console.log(isAuthenticated);

    const navigate = useNavigate();

    const dispatch = useDispatch();
    console.log(data);
    const courseAddedInCart = useSelector((state) => state.cart.cart);

    if(isError){
       return ( 
       <section class="section" id="courses">
            <div class="container-fluid">
                <div class="row justify-content-center">
                    <div class="col-lg-6">
                        <div class="title text-center">
                            <p>Something went wrong!</p>
                        </div>
                    </div>
                </div>
            </div>        
        </section>
       );
        
    }

    const addToCart = async(course) => {
        
        
        let courseData = {
            
            courseID: course._id,
            courseName: course.name,
            coursePrice: course.price,
            courseImage: course.image,
        }
        // console.log(courseData);
        if(!isAuthenticated){
            navigate('/login');
            return;
        }
        console.log(courseAddedInCart);
       dispatch(setCartData(courseData));


        
         alert('Added to cart');

    }
    

  return (
    <>
    <section class="section" id="courses">
            <div class="container-fluid">
               
                <div class="row justify-content-center">
                    <div class="col-lg-6">
                        <div class="title text-center">
                            <h6 class="text-primary small-title">Our Courses</h6>
                            <h4>Learn programming in Java, Javascript, PHP</h4>
                            <p class="text-muted">Learn at your pace , Code at your pace.</p>
                        </div>
                    </div>
                </div>
                
                {/* <div class="row">
                    
                    <div class="col-lg-4 col-sm-6">
                     {isSuccess && 
                        data.courses.map((course) => (
                            <div className="course-card">
                                <h2>{course.name}</h2>
                                <img src="https://placehold.co/400" alt={course.name} className="course-image" />
                                <p>{parse(course.summary)}</p>
                                <span className="course-price">{course.price == 0 ? 'Free' : course.price}</span>
                                <div className="buttons">
                                    <button to className="add-to-cart" onClick={()=>addToCart(course)}>Add to Cart</button>
                                    <NavLink to={'/course/'+course._id} className="add-to-wishlist">View Course</NavLink>
                                </div>
                            </div>
                        ))
                    }
   
                      
                    </div>
                </div> */}
                <div class="row">
    {isSuccess && 
        data.courses.map((course) => (
            <div class="col-lg-3 col-sm-6">
                <div className="course-card">
                    <h2>{course.name}</h2>
                    <img src="https://placehold.co/400" alt={course.name} className="course-image" />
                    <p>{parse(course.summary)}</p>
                    <span className="course-price">{course.price == 0 ? 'Free' : course.price}</span>
                    <div className="buttons">
                        <button className="add-to-cart" onClick={()=>addToCart(course)}>Add to Cart</button>
                        <NavLink to={'/course/'+course._id} className="add-to-wishlist">View Course</NavLink>
                    </div>
                </div>
            </div>
        ))
    }
</div>

            </div>    
        </section>

    
    </>
  );
};

export default Course;
