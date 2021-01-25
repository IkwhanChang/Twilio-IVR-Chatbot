import axios from "axios";

export const setHeaders = token => {
    // Set the default token header
    axios.defaults.headers.common['authorization'] = token;
    axios.defaults.headers.post['authorization'] = token;
    axios.defaults.headers.get['authorization'] = token;
    axios.defaults.headers.delete['authorization'] = token;
  };