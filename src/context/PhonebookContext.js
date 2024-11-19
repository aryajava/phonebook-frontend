import { createContext, useContext, useReducer } from 'react';
import { phonebookReducer, initialState } from '../reducers/phonebookReducer';

const PhonebookContext = createContext();

export const PhonebookProvider = ({ children }) => {
  const [state, dispatch] = useReducer(phonebookReducer, initialState);
  return (
    <PhonebookContext.Provider value={{ state, dispatch }}>
      {children}
    </PhonebookContext.Provider>
  );
};

export const usePhonebookContext = () => {
  return useContext(PhonebookContext);
};