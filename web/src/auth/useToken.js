import { useState } from "react";
import { TOKEN_KEY } from "../config";

function useToken() {
  const [token, setToken] = useState(() =>
    window.localStorage.getItem(TOKEN_KEY)
  );

  const saveToken = (val) => {
    window.localStorage.setItem(TOKEN_KEY, val);
    setToken(val);
  };

  return [token, saveToken];
}

export default useToken;
