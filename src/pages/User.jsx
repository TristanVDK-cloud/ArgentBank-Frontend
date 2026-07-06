import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from '../redux/authSlice';


function User() {

    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const firstName = useSelector((state) => state.auth.firstName);
    const lastName = useSelector((state) => state.auth.lastName);

    useEffect(() => {

        const fetchUserProfile = async () => {

            try {
                const response = await fetch("http://localhost:3001/api/v1/user/profile", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    dispatch(setProfile(data.body));
                }
            } catch (error) {
                console.error("Erreur profil:", error);
            }
        };
        if (token) {
            fetchUserProfile();
        }
    }, [token]);

    return (
        <main className="main bg-dark">
            <div className="header">
                <h1>Welcome Back<br />{firstName} {lastName}!</h1>
                <button className="edit-button">Edit Name</button>
            </div>
        </main>
    );
}

export default User;