import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logOut } from '../../features/auth/authSlice';



const baseQuery = fetchBaseQuery({
    baseUrl: 'https://code.freeeducationindia.com/api/',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if(token){
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;        
    }    

});

const baseQueryWithReauth = async (args, api, extraOptions) => {

    let result = await baseQuery(args, api, extraOptions);

    if(result.error?.originalStatus === 401){

    }else if(result.error?.originalStatus === 403){
        console.log('Sending refresh token');
        //send refresh token to get new access token
        const refreshResult = await baseQuery('/refreshToken', api, extraOptions); 
        console.log('Refresh result', refreshResult);
        if(refreshResult?.data){
            const user = api.getState().auth.user;
            api.dispatch(setCredentials({...refreshResult.data, user}));
            //retry the original request
            result = await baseQuery(args, api, extraOptions);
        }else{
            api.dispatch(logOut());

        }
    }

    return result;

}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({})
});