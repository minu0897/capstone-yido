import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserProfile.css';

function UserProfile() {
    const [user, setUser] = useState({ id: '', nickname: '' });
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(true);

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
            alert('비밀번호가 성공적으로 변경되었습니다!');
            setPassword('');
        } catch (error) {
            alert('비밀번호 변경에 실패했습니다.');
            console.error('Failed to change password:', error);
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="user-profile">
            <h1>사용자 프로필</h1>
            <p>ID: {user.id}</p>
            <p>닉네임: {user.name}</p>
            <form onSubmit={handleSubmit}>
                <label>
                    새 비밀번호:
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </label>
                <button type="submit">비밀번호 변경</button>
            </form>
        </div>
    );
}

export default UserProfile;
