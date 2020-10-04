import React, { useState } from "react";
import UserDataService from "../services/UserService";

const AddUser = () => {
    const initialUserState = {
        id: null,
        first_name: "",
        last_name: "",
        address: "",
        isActive: false
    };
    const [user, setUser] = useState(initialUserState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const saveUser = () => {
        var data = {
        first_name: user.first_name,
        last_name: user.last_name,
        address: user.address
        };

    UserDataService.create(data)
        .then(response => {
            setUser({
                id: response.data.id,
                first_name: response.data.first_name,
                last_name: response.data.last_name,
                address: response.data.address,
                isActive: response.data.isActive
            });
            setSubmitted(true);
            console.log(response.data);
        })
        .catch(e => {
        console.log(e);
        });
    };

    const newUser = () => {
        setUser(initialUserState);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
            <div>
                <h4>You submitted successfully!</h4>
                <button className="btn btn-success" onClick={newUser}>
                    Add
                </button>
            </div>
            ) : (
            <div>
                <div className="form-group">
                <label htmlFor="first_name">First name</label>
                    <input
                    type="text"
                    className="form-control"
                    id="first_name"
                    required
                    value={user.first_name}
                    onChange={handleInputChange}
                    name="first_name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="last_name">Last name</label>
                    <input
                    type="text"
                    className="form-control"
                    id="last_name"
                    required
                    value={user.last_name}
                    onChange={handleInputChange}
                    name="last_name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                    type="text"
                    className="form-control"
                    id="address"
                    required
                    value={user.address}
                    onChange={handleInputChange}
                    name="address"
                    />
                </div>
            
                <button onClick={saveUser} className="btn btn-success">
                    Submit
                </button>
            </div>
            )}
        </div>
    );
};

export default AddUser;