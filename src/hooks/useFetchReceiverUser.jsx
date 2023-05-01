import { useState, useEffect } from "react";
import { getRequest } from "../uitils/serviceCalls";
import { getUserApi } from "../uitils/apiUrls";

function useFetchReceiverUser(chat, user) {
  const [receivedUser, setReceiveeUser] = useState(null);
  const [error, setError] = useState(null);
  const receiverId = chat.members?.find((id) => id !== user?._id);

  const getUser = async () => {
    if (!receiverId) return;

    const response = await getRequest(`${getUserApi}/${receiverId}`);

    if (response.error) {
      return setError(response);
    }
    setReceiveeUser(response);
  };
  useEffect(() => {
    getUser();

    return () => {};
  }, []);

  return { receivedUser, error };
}
export default useFetchReceiverUser;
