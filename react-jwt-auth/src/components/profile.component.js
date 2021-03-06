import React, { Component } from "react";
import AuthService from "../services/auth.service"
import UserService from '../services/user.service';


export default class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: AuthService.getCurrentUser()
        };
    }

    render() {

        const { currentUser } = this.state;

        if (!currentUser) {
            return (
                <div>Необходима авторизация</div>
            )
        }

        UserService.getProfileData().then(
            profileData => {
                console.log("profile data came", profileData);
            },
            error => {
                return (<div>
                    {error.toString()}
                </div>)
            }
        )

        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>
                        <strong>{currentUser.username}</strong> Profile
                    </h3>
                </header>

                <p>
                    <strong>Token: </strong>
                    {/*{currentUser['access_token'].substring(0, 20)} ...{" "}*/}
                    {/*{currentUser['access_token'].substr(currentUser['access_token'].length -20)}*/}
                </p>
                <p>
                    <strong>Id: </strong>
                    {currentUser.id}
                </p>
                <p>
                    <strong>Email: </strong>
                    {currentUser.email}
                </p>
                <strong>Authorities: </strong>
                    <ul>
                        {currentUser.roles &&
                            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)
                        }
                    </ul>
            </div>
        );
    }
}