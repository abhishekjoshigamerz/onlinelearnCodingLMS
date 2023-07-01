import { apiSlice } from "../../app/api/apiSlice";

export const courseApiSlice = apiSlice.injectEndpoints({


    endpoints: (builder) => ({
        fetchCourses: builder.query({
            query: () => ({
                url: 'courses',
                method: 'GET'
            })
        }),
        fetchCourseById: builder.query({
            query: (id) => ({
                url: `course/${id}`,
                method: 'GET'

            })
        })
    }),  
});

export const {
    useFetchCoursesQuery,
    useFetchCourseByIdQuery
} = courseApiSlice;
