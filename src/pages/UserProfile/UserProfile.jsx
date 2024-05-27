import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserProfile.css';
import { useLocation,Link, useNavigate } from 'react-router-dom';

function UserProfile() {
    const [user, setUser] = useState({ id: '', nickname: '' });
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/api/mypage');
                setUser(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put('/api/user/change-password', { newPassword: password });
            alert('Password changed successfully!');
            setPassword('');
        } catch (error) {
            alert('Failed to change password');
            console.error('Failed to change password:', error);
        }
    };

    const handleMyChannel =  () => {
        navigate('/mychannel');
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="user-profile">
            <h1>User Profile</h1>
            <p>ID: {user.memberId}</p>
            <p>nickname: {user.name}</p>
            <p>email: {user.email}</p>
            <p>role: {user.role}</p>
            <form onSubmit={handleSubmit}>
                <label>
                    New password:
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </label>
                <button type="submit">change password</button>
            </form>
            {user.role == "PROVIDER" && <button onClick={handleMyChannel} className='user-mychannel'>My Channel</button>}
        </div>
    );
}

export default UserProfile;
