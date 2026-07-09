import React, { useEffect, useState } from 'react';
import Account from '../components/Account';
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from '../redux/authSlice';
import { Navigate } from 'react-router-dom';
import './styles/_user.scss';


function User() {

    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const tokenInStorage = localStorage.getItem('token') || sessionStorage.getItem('token')
    const firstName = useSelector((state) => state.auth.firstName);
    const lastName = useSelector((state) => state.auth.lastName);
    const userName = useSelector((state) => state.auth.userName);
    const [isEditing, setIsEditing] = useState(false);
    const [newUserName, setNewUserName] = useState('');

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

    if (!token && !tokenInStorage) {
        return <Navigate to="/login" />;
    }

    const handleSave = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3001/api/v1/user/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    userName: newUserName,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                dispatch(setProfile(data.body));
                setIsEditing(false);
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour du profil :", error);
        }
    };

    return (
        <main className="main bg-dark">
            <div className="header">
                {isEditing ? (
                    <div className="edit-user-info">
                        <h1>Edit user info</h1>
                        <form onSubmit={handleSave}>
                            <div className='input-wrapper-edit'>
                                <label htmlFor="username">User Name:</label>
                                <input
                                    type="text"
                                    id="username"
                                    placeholder={userName}
                                    onChange={(e) => setNewUserName(e.target.value)}
                                />
                            </div>
                            <div className="input-wrapper-edit">
                                <label htmlFor="firstname">First name:</label>
                                <input
                                    type="text"
                                    id="firstname"
                                    value={firstName}
                                    disabled
                                />
                            </div>
                            <div className="input-wrapper-edit">
                                <label htmlFor="lastname">Last name:</label>
                                <input
                                    type="text"
                                    id="lastname"
                                    value={lastName}
                                    disabled
                                />
                            </div>
                            <div className="edit-button">
                                <button type="submit" className="edit-button">Save</button>
                                <button type="button" className="edit-button" onClick={() => setIsEditing(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <>
                        <h1>Welcome Back<br />{firstName} {lastName}!</h1>
                        <button className="edit-button" onClick={() => setIsEditing(true)}>Edit Name</button>
                    </>
                )}

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