import axios from "axios";
import { useContext, createContext } from "react";
import { API_BASE_URL, TOKEN_KEY } from "../config";
import useToken from "./useToken";

async function requestUser(token) {
  if (!token) return null;

  try {
    const { data } = await axios.get("auth/user/", {
      headers: { Authorization: `Token ${token}` },
      baseURL: API_BASE_URL,
    });
    return data;
  } catch (err) {
    if (!err?.response) {
      return undefined; // no response
    } else {
      return null;
    }
  }
}

async function requestSignup(cred) {
  const { data } = await axios.post("auth/signup/", cred, {
    baseURL: API_BASE_URL,
  });
  return data;
}

async function requestLogin({ usernameOrEmail, password }) {
  const { data } = await axios.post(
    "auth/login/",
    // TODO: also accept email for login
    { username: usernameOrEmail, password },
    { baseURL: API_BASE_URL }
  );

  return data;
}

async function requestLogout() {
  const token = window.localStorage.getItem(TOKEN_KEY);
  if (!token) return null;

  await axios.post(
    "auth/logout/",
    {},
    {
      baseURL: API_BASE_URL,
      headers: { Authorization: `Token ${token}` },
    }
  );
}

async function requestResetPassword(cred) {
  const { data } = await axios.post("auth/reset_password/", cred, {
    baseURL: API_BASE_URL,
  });
  return data;
}

async function requestEditProfile(cred) {
  const { data } = await axios.post("auth/edit_profile/", cred, {
    baseURL: API_BASE_URL,
  });
  return data;
}

function useAuth() {
  const [token, setToken] = useToken();

  return {
    token,

    getUser: () => requestUser(token),

    signup: async (cred) => {
      const { user } = await requestSignup(cred);
      return user;
    },

    login: async (cred) => {
      const { user, token } = await requestLogin(cred);
      setToken(token);
      return user;
    },

    logout: async () => {
      await requestLogout();
      setToken(null);
    },

    resetPasword: requestResetPassword,
    editProfile: requestEditProfile,
  };
}

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return useContext(authContext);
}
