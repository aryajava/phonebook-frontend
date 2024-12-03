import { createContext, useContext, useReducer } from 'react';
import { phonebookReducer, initialState } from '../reducers/phonebookReducer';

// Membuat konteks baru untuk Phonebook
// createContext adalah fungsi dari React yang digunakan untuk membuat konteks baru. 
// Kode ini membuat PhonebookContext yang akan digunakan untuk menyediakan dan mengakses state global.
const PhonebookContext = createContext();

// Komponen Provider untuk menyediakan state dan dispatch ke komponen anak
export const PhonebookProvider = ({ children }) => {
  // Menggunakan useReducer untuk mengelola state dengan reducer dan initialState
  // useReducer adalah hook dari React yang mirip dengan useState, tetapi digunakan untuk state yang lebih kompleks
  // useReducer menerima dua argumen, yaitu reducer dan initialState
  // mengembalikan array yang berisi state dan dispatch
  const [state, dispatch] = useReducer(phonebookReducer, initialState);

  return (
    // Menyediakan state dan dispatch ke komponen anak melalui context
    // Memungkinkan komponen anak untuk mengakses state dan dispatch tanpa perlu mengoper props melalui banyak level komponen
    <PhonebookContext.Provider value={{ state, dispatch }}>
      {children}
    </PhonebookContext.Provider>
  );
};

// Hook custom untuk menggunakan PhonebookContext
export const usePhonebookContext = () => {
  // useContext adalah hook dari React yang digunakan untuk mengakses konteks yang telah dibuat dengan createContext
  return useContext(PhonebookContext);
};