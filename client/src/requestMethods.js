import axios from "axios";

const BASE_URL = "http://localhost:5003/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODc2NTNhNTQ5MjRjOGMzOGMzYzhiZSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2NTI2MDMwOCwiZXhwIjoxNjY1NTE5NTA4fQ.oqRC0vXg8CnTRKzSjRwxfYqVQg9e-q1DkSzFAGVbRJw";

export const publicRequest = axios.create({
    baseURL : BASE_URL
});

export const userRequest = axios.create({
    baseURL : BASE_URL,
    header : {token : "Bearer "+TOKEN}
});