import { useState, useEffect } from "react";

import { auth } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";

import { Navigate } from 'react-router-dom';
 
const Security = ({ children }) => {
    
    const [loading, setLoading] = useState(true);
    const [login, setLogin] = useState(false);

    useEffect(() => {
        async function checkLogin () {
            const submit = onAuthStateChanged(auth, (user) => {
                if (user) {
                    const userData = {
                        uid: user.uid,
                        email: user.email
                    };

                    localStorage.setItem('@detailUser', JSON.stringify(userData));
                    setLoading(false);
                    setLogin(true);
                } else {
                    setLoading(false);
                    setLogin(false);
                }
            });
        };

        checkLogin();
    }, []);

    if (loading) {
        return (
            <div></div>
        );
    }

    if (!login) {
        return <Navigate to='/login'/>
    }
    
    
    return children;
}


export default Security;