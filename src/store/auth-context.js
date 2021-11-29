import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({ //object that will contain a component
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email, password) => {}
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
    
        if (storedUserLoggedInInformation === '1') {
          setIsLoggedIn(true);
        }
      }, []); //executed AFTER every component evaluation when dependencies change
      // since no dependencies, it will only run once on first load
    
    const logoutHandler = () => {
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(false);
    };

    const loginHandler = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(true);
    };

    return (
        <AuthContext.Provider
            value={{ isLoggedIn: isLoggedIn, onLogout: logoutHandler, onLogin: loginHandler }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext; //make available in other files. 
//Now we need to wrap components that need it