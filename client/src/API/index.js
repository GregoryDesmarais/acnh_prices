import axios from "axios";

export default {

    getFish: () => {
        return axios.get("/api/info/getFish")
            .then(res => res)
            .catch(err => {
                //Axios formats the error is such a way that you are unable to access the response data object.
                //The following line will make the object accessible.
                err = Object.assign({}, err);
                return err.response;
            })
    },
    getBugs: () => {
        return axios.get("/api/info/getBugs")
            .then(res => res)
            .catch(err => {
                //Axios formats the error is such a way that you are unable to access the response data object.
                //The following line will make the object accessible.
                err = Object.assign({}, err);
                return err.response;
            })
    },
    getAll: () => {
        return axios.get("/api/info/getAll")
            .then(res => res)
            .catch(err => {
                //Axios formats the error is such a way that you are unable to access the response data object.
                //The following line will make the object accessible.
                err = Object.assign({}, err);
                return err.response;
            })
    },

}