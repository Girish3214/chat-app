import axios from "./baseAxios";

const postRequest = async (api, body) => {
  try {
    const response = await axios.post(api, body);

    return response.data;
  } catch (error) {
    console.log(error);
    return { error: true, msg: error?.response?.data?.msg };
  }
};

export { postRequest };
