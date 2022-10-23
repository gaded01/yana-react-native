import {useContext , createContext} from 'react';

export const TestStatusContext = createContext({
   testStatus: '',
   setTestStatus: () => {}
}) 

export const useTestStatusContext = () => useContext(TestStatusContext);

