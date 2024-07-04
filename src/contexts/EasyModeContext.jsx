import { createContext, useState } from "react";

export const EasyModeContext = createContext(null);

export const EasyModeProvider = ({ children }) => {

    const [easyMode, setEasyMode] = useState(false);

    return (
        <EasyModeContext.Provider value = {{ easyMode, setEasyMode }}>
            {children}
        </EasyModeContext.Provider>
    );
};

//export default EasyModeProvider;