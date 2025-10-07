import axios from 'axios';

let accessToken = null;


export const setApiToken = (newToken) => {
    accessToken = newToken;
};

export const getApiToken = () => accessToken;


export const userServiceAPI = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true, 
});


export const courseServiceAPI = axios.create({
    baseURL: 'http://localhost:4000',
});



export const setupInterceptors = (authContext) => {
    

    const services = [userServiceAPI, courseServiceAPI];

    services.forEach(service => {

        service.interceptors.request.use(
            (config) => {
                const currentToken = getApiToken();
                if (currentToken) {
                    config.headers['Authorization'] = `Bearer ${currentToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        service.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;
                
             
                if (error.response?.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    try {
                    
                        const { data } = await userServiceAPI.post('/auth/refresh');
                        
                        authContext.setAccessToken(data.accessToken);
                        originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
                        
                        return service(originalRequest);
                    } catch (refreshError) {
                        authContext.logout();
                        return Promise.reject(refreshError);
                    }
                }
                return Promise.reject(error);
            }
        );
    });
};

