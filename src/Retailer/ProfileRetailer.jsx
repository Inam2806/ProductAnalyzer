import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/RetailerProfile.scss';

const RetailerProfile = () => {
    const [profile, setProfile] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/auth/Retailerprofile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProfile(response.data.profile);
            } catch (error) {
                console.error('Profile retrieval failed:', error);
                setIsLoggedIn(false);
                setToken(null);
                localStorage.removeItem('token');
            }
        };

        fetchProfile();
    }, [token]);

    const handleEditProfile = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const handleSaveProfile = async () => {
        try {
            // Prepare updated profile data to send to backend
            const updatedProfile = {
                ...profile,
                retailer_name: document.getElementById('retailerName').value,
                retailer_address: document.getElementById('address').value,
                retailer_city: document.getElementById('city').value,
                retailer_state: document.getElementById('state').value,
                retailer_zip: document.getElementById('zip').value,
                retailer_phone: document.getElementById('phone').value,
                retailer_fax: document.getElementById('fax').value,
                retailer_website: document.getElementById('website').value,
                retailer_pincode: document.getElementById('pincode').value,
            };

            const response = await axios.put('http://localhost:5000/api/auth/Retailerprofile', updatedProfile, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setProfile(response.data.registration);
            setIsEditing(false);
        } catch (error) {
            console.error('Profile update failed:', error);
            // Handle error state or display error message
        }
    };

    if (!isLoggedIn) {
        return <p>Please log in to view your profile.</p>;
    }

    if (!profile) {
        return <p>Loading profile...</p>;
    }

    return (
        <div className="retailer-profile">
            <h1>Retailer Profile</h1>
            <form className="profile-form">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" value={profile.username} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={profile.email} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="retailerCode">Retailer Code</label>
                    <input type="text" id="retailerCode" value={profile.retailerCode} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="retailerName">Retailer Name</label>
                    {isEditing ? (
                        <input type="text" id="retailerName" defaultValue={profile.retailer_name} />
                    ) : (
                        <input type="text" id="retailerName" value={profile.retailer_name} readOnly />
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    {isEditing ? (
                        <input type="text" id="address" defaultValue={profile.retailer_address} />
                    ) : (
                        <input type="text" id="address" value={profile.retailer_address} readOnly />
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="city">City</label>
                    {isEditing ? (
                        <input type="text" id="city" defaultValue={profile.retailer_city} />
                    ) : (
                        <input type="text" id="city" value={profile.retailer_city} readOnly />
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="state">State</label>
                    {isEditing ? (
                        <input type="text" id="state" defaultValue={profile.retailer_state} />
                    ) : (
                        <input type="text" id="state" value={profile.retailer_state} readOnly />
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="zip">ZIP</label>
                    {isEditing ? (
                        <input type="text" id="zip" defaultValue={profile.retailer_zip} />
                    ) : (
                        <input type="text" id="zip" value={profile.retailer_zip} readOnly />
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    {isEditing ? (
                        <input type="text" id="phone" defaultValue={profile.retailer_phone} />
                    ) : (
                        <input type="text" id="phone" value={profile.retailer_phone} readOnly />
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="fax">Fax</label>
                    {isEditing ? (
                        <input type="text" id="fax" defaultValue={profile.retailer_fax} />
                    ) : (
                        <input type="text" id="fax" value={profile.retailer_fax} readOnly />
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="website">Website</label>
                    {isEditing ? (
                        <input type="text" id="website" defaultValue={profile.retailer_website} />
                    ) : (
                        <input type="text" id="website" value={profile.retailer_website} readOnly />
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="pincode">Pincode</label>
                    {isEditing ? (
                        <input type="text" id="pincode" defaultValue={profile.retailer_pincode} />
                    ) : (
                        <input type="text" id="pincode" value={profile.retailer_pincode} readOnly />
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="registrationDate">Registration Date</label>
                    <input
                        type="text"
                        id="registrationDate"
                        value={new Date(profile.registrationDate).toLocaleDateString()}
                        readOnly
                    />
                </div>

                {isEditing ? (
                    <div className="form-group buttons">
                        <button type="button" onClick={handleSaveProfile}>Save</button>
                        <button type="button" onClick={handleCancelEdit}>Cancel</button>
                    </div>
                ) : (
                    <button type="button" onClick={handleEditProfile}>Edit Profile</button>
                )}
            </form>
        </div>
    );
};

export default RetailerProfile;
