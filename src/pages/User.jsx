import React, { useEffect } from 'react';
import Account from '../components/Account';
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

            <h2 className="sr-only">Accounts</h2>
            <Account
                title="Argent Bank Checking (x8349)"
                amount="$2,082.79"
                description="Available Balance"
            />
            <Account
                title="Argent Bank Savings (x6712)"
                amount="$10,928.42"
                description="Available Balance"
            />
            <Account
                title="Argent Bank Credit Card (x8349)"
                amount="$184.30"
                description="Current Balance"
            />
        </main>
    );
}

export default User;