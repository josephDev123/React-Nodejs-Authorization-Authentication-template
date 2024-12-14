import { User } from "../types/UserSessionType";

interface SetUserSessionProps {
  key: string;
  value: Record<string, any>;
}

export const getUserSession = (): User | Record<string, never> => {
  const localStorage = window.localStorage.getItem("user");
  if (localStorage) {
    return JSON.parse(localStorage) as User;
  }
  return {};
};

export const SetUserSession = ({ key, value }: SetUserSessionProps) => {
  localStorage.setItem(key, JSON.stringify(value));
};
