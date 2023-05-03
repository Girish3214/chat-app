import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { postRequest, getRequest } from "../uitils/serviceCalls";
import { getChatsApi, getUserApi, messagesApi } from "../uitils/apiUrls";

const AppChatContext = createContext();

const AppChatProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);

  const [messages, setMessages] = useState(null);
  const [isMessageLoading, setIsMessageLoading] = useState(false);
  const [messagesError, setMessagesError] = useState(null);

  const [sendMessagesError, setSendMessagesError] = useState(null);
  const [newMessage, setNewMessage] = useState(null);

  const [potentialChats, setPotentialChats] = useState([]);

  const createChat = useCallback(async (firstId, secondId) => {
    const response = await postRequest(getChatsApi, {
      firstId,
      secondId,
    });
    if (response.error) {
      return console.log("Error in creating chat", response);
    }
    setUserChats((prev) => [...prev, response]);
  }, []);

  const updateCurrentChat = useCallback(async (chat) => {
    setCurrentChat(chat);
  }, []);

  const getUsers = async () => {
    if (user) {
      const response = await getRequest(`${getUserApi}`);

      if (response.error) {
        console.log(error);
        return;
      }
      const newChats = response.filter((resUser) => {
        let isChatCreated = false;
        if (user._id === resUser._id) return false;
        if (userChats) {
          isChatCreated = userChats.some(
            (chat) =>
              chat.members[0] === resUser._id || chat.members[1] === resUser._id
          );
        }
        return !isChatCreated;
      });
      setPotentialChats(newChats);
    }
  };

  useEffect(() => {
    getUsers();
    return () => {};
  }, [userChats]);

  const getUserChats = async () => {
    if (user?._id) {
      setIsChatLoading(true);
      setUserChatsError(null);
      const response = await getRequest(`${getChatsApi}/${user?._id}`);

      setIsChatLoading(false);
      if (response.error) {
        return setUserChatsError(response);
      }
      setUserChats(response);
    }
  };

  useEffect(() => {
    getUserChats();

    return () => {};
  }, [user]);

  const getmessages = async () => {
    setIsMessageLoading(true);
    setMessagesError(null);
    if (currentChat?._id) {
      const response = await getRequest(`${messagesApi}/${currentChat?._id}`);

      setIsMessageLoading(false);
      if (response.error) {
        return setMessagesError(response);
      }
      setMessages(response);
    }
  };

  useEffect(() => {
    getmessages();

    return () => {};
  }, [currentChat]);

  const sendTextMessage = useCallback(
    async (text, sender, currentChat, setTextMessage) => {
      if (!text) return;
      const response = await postRequest(messagesApi, {
        senderId: sender._id,
        text,
        chatId: currentChat._id,
      });

      if (response.error) {
        return setSendMessagesError(response);
      }

      setNewMessage(response);
      setMessages((prev) => [...prev, response]);
      setTextMessage("");
    },
    []
  );

  return (
    <AppChatContext.Provider
      value={{
        userChats,
        isChatLoading,
        userChatsError,
        potentialChats,
        currentChat,
        messages,
        isMessageLoading,
        messagesError,
        createChat,
        updateCurrentChat,
        sendTextMessage,
      }}
    >
      {children}
    </AppChatContext.Provider>
  );
};

const useGlobalChatContext = () => {
  return useContext(AppChatContext);
};

export { AppChatContext, AppChatProvider, useGlobalChatContext };
