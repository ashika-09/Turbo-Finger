import { createContext, useContext, useState } from 'react';

const TestModeContext = createContext();

export const TestModeContextProvider = ({children}) => {

    const [TestTime, setTestTime] = useState(4);

    const values = {
        TestTime,
        setTestTime
    }
    
    return (
        <TestModeContext.Provider value={values}>
            {children}
        </TestModeContext.Provider>
    );
}

export const useTestMode = () => useContext(TestModeContext);