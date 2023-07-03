import { apiSlice } from "../../app/api/apiSlice";

//get topics Slice here by courseId
export const topicsApiSlice = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        fetchTopics: builder.query({
            query: (topicId) => ({
                url: `/gettopic/${topicId}`,
                method: 'GET'
            })
        }),
        markAssignmentComplete: builder.mutation({
            query:({topicId,courseId,email,token})=>({
                url:`/markascomplete/`,
                method:'POST',
                headers:{
                    'Authorization': `Bearer ${token}`,
                },
                body:{
                    topicId,
                    courseId,
                    email
                }
            })
        }),    
    }),
    
});


export const {
    useFetchTopicsQuery,
    useMarkAssignmentCompleteMutation
} = topicsApiSlice;