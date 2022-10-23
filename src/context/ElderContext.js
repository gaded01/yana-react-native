import {useContext , createContext} from 'react';

export const ElderContext = createContext({
   elder: '',
   setElder: () => {}
}) 

export const useElderContext = () => useContext(ElderContext);

