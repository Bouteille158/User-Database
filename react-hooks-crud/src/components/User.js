import React, { useState, useEffect } from "react";
import UserDataService from "../services/UserService";

const User = props => {
    const initialUserState = {
        id: null,
        first_name: "",
        last_name: "",
        address: "",
        isActive: false
    };
    const [currentUser, setcurrentUser] = useState(initialUserState);
    const [message, setMessage] = useState("");

    const getUser = id => {
        UserDataService.get(id)
        .then(response => {
            setcurrentUser(response.data);
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    };

    useEffect(() => {
        getUser(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setcurrentUser({ ...currentUser, [name]: value });
    };

    const updateisActive = status => {
        var data = {
            id: currentUser.id,
            first_name: currentUser.first_name,
            last_name: currentUser.last_name,
            address: currentUser.address,
            isActive: status
        };

        UserDataService.update(currentUser.id, data)
        .then(response => {
            setcurrentUser({ ...currentUser, isActive: status });
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    };

    const updateUser = () => {
        UserDataService.update(currentUser.id, currentUser)
        .then(response => {
            console.log(response.data);
            setMessage("The user was updated successfully!");
        })
        .catch(e => {
            console.log(e);
        });
    };

    const deleteUser = () => {
        UserDataService.remove(currentUser.id)
        .then(response => {
            console.log(response.data);
            props.history.push("/users");
        })
        .catch(e => {
            console.log(e);
        });
    };

    return (
        <div>
        {currentUser ? (
            <div className="edit-form">
            <h4>User</h4>
            <form>
                <div className="form-group">
                <label htmlFor="first_name">First name</label>
                <input
                    type="text"
                    className="form-control"
                    id="first_name"
                    name="first_name"
                    value={currentUser.first_name}
                    onChange={handleInputChange}
                />
                </div>
                <div className="form-group">
                <label htmlFor="last_name">Last name</label>
                <input
                    type="text"
                    className="form-control"
                    id="last_name"
                    name="last_name"
                    value={currentUser.last_name}
                    onChange={handleInputChange}
                />
                </div>
                <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    value={currentUser.address}
                    onChange={handleInputChange}
                />
                </div>

                <div className="form-group">
                <label>
                    <strong>Status : </strong>
                </label>
                {currentUser.isActive ? "isActive" : "isInactive"}
                </div>
            </form>

            {currentUser.isActive ? (
                <button
                className="badge badge-primary mr-2"
                onClick={() => updateisActive(false)}
                >
                Deactivate
                </button>
            ) : (
                <button
                className="badge badge-primary mr-2"
                onClick={() => updateisActive(true)}
                >
                Activate
                </button>
            )}

            <button className="badge badge-danger mr-2" onClick={deleteUser}>
                Delete
            </button>

            <button
                type="submit"
                className="badge badge-success"
                onClick={updateUser}
            >
                Update
            </button>
            <p>{message}</p>
            </div>
        ) : (
            <div>
            <br />
            <p>Please click on a User...</p>
            </div>
        )}
        </div>
    );
};

export default User;