import { Dispatch, SetStateAction, useCallback, useState } from 'react';

const readLocalStorage = <T>(
  key: string,
  initial: T | (() => T),
): (() => T) => {
  return () => {
    const initialValue = initial instanceof Function ? initial() : initial;

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (e) {
      console.error(e);
      return initialValue;
    }
  };
};

const useLocalStorageState = <T>(
  key: string,
  initial: T | (() => T),
): [T, Dispatch<SetStateAction<T>>] => {
  const [state, setState] = useState(readLocalStorage(key, initial));

  const setStateWithLocalStorage = useCallback(
    (v: T | ((old: T) => T)) => {
      const newValue = v instanceof Function ? v(state) : v;

      setState(newValue);

      try {
        window.localStorage.setItem(key, JSON.stringify(newValue));
      } catch (e) {
        console.error(e);
      }
    },
    [state, setState],
  );

  return [state, setStateWithLocalStorage];
};

export default useLocalStorageState;
