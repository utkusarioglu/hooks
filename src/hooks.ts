import { HooksManager } from "./hooks-manager";

export function useHook() {
  return "UberApp";
}

export function useFakeApi(): { title: string, body: string, userId: string }[] {
  const { useState, useEffect } = HooksManager.getCoupling("react");
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then(setList);
  }, []);

  useEffect

  return list;
}

export type LoginAttemptResponse = LoginAttemptSuccess | LoginAttemptFail | LoginAttemptIdle | LoginAttemptFetch;

type LoginAttemptIdle = {
  state: "idle"
}

type LoginAttemptFetch = {
  state: "fetch"
}

type LoginAttemptFail = {
  state: "fail";
}

type LoginAttemptSuccess = {
  state: "success"
  username: string
}

type LoginCredentials = {
  username: string;
  password: string;
}

type TryLoginFunction = (LoginCredentials: LoginCredentials) => void;
type SetIdleFunction = () => void;

type UseFakeApiReturn = [LoginAttemptResponse, TryLoginFunction, SetIdleFunction];

export function useFakeLogin(): UseFakeApiReturn  {
  const { useState } = HooksManager.getCoupling("react");
  const [login, setLogin] = useState<LoginAttemptResponse>({state: "idle"}); 
  
  const tryLogin: TryLoginFunction = ({ username, password }) => {
    setLogin({ state: "fetch" });

    setTimeout(() => { 
      if (username === "janavar" && password === "1") {
        setLogin({
          state: "success",
          username: "Janavariye"
        })
      } else {
        setLogin({state: "fail"})
      }
    }, 1000);
  }

  const setIdle = () => {
    setLogin({ state: "idle" });
  }

  return [login, tryLogin, setIdle];
}
