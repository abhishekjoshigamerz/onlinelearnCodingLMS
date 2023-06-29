import { apiSlice } from "../../app/api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchUsers: builder.query({
            query: (email) => ({
                url: `users/get-data/${email}`,
                method: 'GET'
            })
        }),
        changePassword: builder.mutation({
            query: ({email,password,token})=>({
                url: `/users/change-password/`,
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${token}`,
                },
                body: {
                    email,
                    password
                }
            })
        }),
        recentTransactions: builder.query({
            query:(userid)=>({
                url:`/users/recent-transactions/${userid}`,
                method: 'GET',
               
            }),
        }),
        changePasswordEmail : builder.mutation({
            query: ({email})=>({
                url: `/users/send-changed-password-email/`,
                method: 'POST',
                body: {
                    email,
                }
            })
        }),

    }),
    
});


export const {
    useFetchUsersQuery,
    useChangePasswordMutation,
    useRecentTransactionsQuery,
    useChangePasswordEmailMutation,
} = usersApiSlice;





