import React from 'react'
import DashboardHeader from '../Dashboard/DashboardHeader';
import Sidebar from '../Dashboard/Sidebar';
import Course from '../Course/Course';
import {useFetchCoursesQuery} from '../../features/course/coursesSlice';
import { setCartData } from '../../features/cart/cartStore';
import { NavLink,useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
export const DashboardCourses = () => {
   const isAuthenticated = useSelector((state) => state.auth.user);
   const userId = useSelector((state) => state.auth.id);
   const navigate = useNavigate();
   const {data, isError, isFetching, isLoading, isSuccess } = useFetchCoursesQuery();
   const courseAddedInCart = useSelector((state) => state.cart.cart);
   const dispatch = useDispatch();
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

    if(isLoading){
      return (
        <p>Loading ...</p>
      )
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



    console.log(data.courses[0].students);
  return (
    <>
        <DashboardHeader />
        <div class="container-fluid">
            <div class="row">
                <Sidebar />
                <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <p className="h4">Available Programming Courses</p>
      </div>
      <div className='row'>
        {isSuccess && data && 
            data.courses.filter(course => !course.students.includes(userId)).map((course) => (
              
                <div class="col-md-4"> 
                  <div class="card">
                      <img src="https://placehold.co/400" class="card-img-top" alt="..." />
                        <div class="card-body">
                          <h5 class="card-title">{course.name}</h5>
                          <p class="card-text">{course.summary}</p>
                          <button  class="btn btn-primary" onClick={()=>addToCart(course)}>Add to Cart</button> &nbsp;
                          <NavLink to={`/course/${course._id}`}  className="btn btn-primary ">View Course</NavLink>
                        </div>
                    </div>
                </div>
            ))
        }
      </div>     
    </main>

            </div>
        </div>    
    </>
  )
}
