import React, { useState, useEffect } from "react";
import UserDataService from "../services/UserService";
import { Link } from "react-router-dom";

const UsersList = () => {
const [users, setUsers] = useState([]);
const [currentUser, setcurrentUser] = useState(null);
const [currentIndex, setCurrentIndex] = useState(-1);
const [searchfirst_name, setSearchfirst_name] = useState("");

    useEffect(() => {
        retrieveUsers();
    }, []);

    const onChangeSearchfirst_name = e => {
        const searchfirst_name = e.target.value;
        setSearchfirst_name(searchfirst_name);
    };

    const retrieveUsers = () => {
        UserDataService.getAll()
        .then(response => {
            setUsers(response.data);
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    };

    const refreshList = () => {
        retrieveUsers();
        setcurrentUser(null);
        setCurrentIndex(-1);
    };

    const setActiveUser = (user, index) => {
        setcurrentUser(user);
        setCurrentIndex(index);
    };

    const removeAllUsers = () => {
        UserDataService.removeAll()
        .then(response => {
            console.log(response.data);
            refreshList();
        })
        .catch(e => {
            console.log(e);
        });
    };

    const findByfirst_name = () => {
        UserDataService.findByfirst_name(searchfirst_name)
        .then(response => {
            setUsers(response.data);
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    };

    return (
        <div className="list row">
        <div className="col-md-8">
            <div className="input-group mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="Search by first name"
                value={searchfirst_name}
                onChange={onChangeSearchfirst_name}
            />
            <div className="input-group-append">
                <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={findByfirst_name}
                >
                Search
                </button>
            </div>
            </div>
        </div>
        <div className="col-md-6">
            <h4>Users List</h4>

            <ul className="list-group">
            {users &&
                users.map((user, index) => (
                <li
                    className={
                    "list-group-item " + (index === currentIndex ? "active" : "")
                    }
                    onClick={() => setActiveUser(user, index)}
                    key={index}
                >
                    {user.first_name}
                </li>
                ))}
            </ul>

            <button
            className="m-3 btn btn-sm btn-danger"
            onClick={removeAllUsers}
            >
            Remove all
            </button>
        </div>
        <div className="col-md-6">
            {currentUser ? (
            <div>
                <h4>User</h4>
                <div>
                <label>
                    <strong>First name :</strong>
                </label>{" "}
                {currentUser.first_name}
                </div>
                <div>
                <label>
                    <strong>Last name :</strong>
                </label>{" "}
                {currentUser.last_name}
                </div>
                <div>
                <label>
                    <strong>Address :</strong>
                </label>{" "}
                {currentUser.address}
                </div>
                <div>
                <label>
                    <strong>Status :</strong>
                </label>{" "}
                {currentUser.isActive ? "isActive" : "isInactive"}
                </div>

                <Link
                to={"/users/" + currentUser.id}
                className="badge badge-warning"
                >
                Edit
                </Link>
            </div>
            ) : (
            <div>
                <br />
                <p>Please click on a user...</p>
            </div>
            )}
        </div>
        </div>
    );
};

export default UsersList;