import Axios from "axios";

const api = Axios.create({
    withCredentials: false,
});

api.interceptors.response.use(function (response) {
    // import('../stores/index').then(({store})=>{
    //   store.dispatch(hideLoading());
    // });
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function (err) {
    return err;
});

export default api;