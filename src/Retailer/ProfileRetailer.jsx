import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style/RetailerProfile.scss';

const RetailerProfile = () => {
    const [profile, setProfile] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/auth/Retailerprofile`, {
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
                    <input type="text" id="retailerName" value={profile.retailer_name} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" value={profile.retailer_address} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" value={profile.retailer_city} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input type="text" id="state" value={profile.retailer_state} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="zip">ZIP</label>
                    <input type="text" id="zip" value={profile.retailer_zip} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input type="text" id="phone" value={profile.retailer_phone} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="fax">Fax</label>
                    <input type="text" id="fax" value={profile.retailer_fax} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="website">Website</label>
                    <input type="text" id="website" value={profile.retailer_website} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="pincode">Pincode</label>
                    <input type="text" id="pincode" value={profile.retailer_pincode} readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="registrationDate">Registration Date</label>
                    <input type="text" id="registrationDate" value={new Date(profile.registrationDate).toLocaleDateString()} readOnly />
                </div>
            </form>
        </div>
    );
};

export default RetailerProfile;
