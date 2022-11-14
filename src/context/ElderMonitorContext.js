import {useContext , createContext} from 'react';

export const MonitorContext = createContext({
   monitor: '',
   setMonitor: () => {}
}) 

export const useMonitorContext = () => useContext(MonitorContext);

