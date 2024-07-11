import axios from "axios";

const request = axios.create({
    baseURL: "https://localhost:7127/api/"
});

const handleRequest = async (axiosPromise) => {
    try {
        const res = await axiosPromise;
        return res.data
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const get = async (url, options = {}) => {
    return await handleRequest(request.get(url, options));
}

const post = async (url, data, options = {}) => {
    return await handleRequest(request.post(url, data, options));
}

const put = async (url, data, options = {}) => {
    return await handleRequest(request.put(url, data, options));
}

const patch = async (url, options = {}) => {
    return await handleRequest(request.patch(url, options));
}

const remove = async (url, options = {}) => {
    return await handleRequest(request.delete(url, options));
}

export { get, post, put, patch, remove }
export default request;