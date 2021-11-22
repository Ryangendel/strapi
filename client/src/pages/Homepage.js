import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from "axios"
import { useTheme } from '../hooks/userContext';
import {useNavigate} from 'react-router-dom';
import { useMutation, useQuery, gql } from '@apollo/client'

const REGISTER = gql `
mutation {
    user(input: { username: "username", email: "email", password: "password" }) {
      jwt
      user {
        username
        email
      }
    }
  }
`

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(2),

        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '300px',
        },
        '& .MuiButtonBase-root': {
            margin: theme.spacing(2),
        },
    },
}));



const Homepage = ({ handleClose }) => {

    
    const navigate = useNavigate();
    const [addProfile, { error }] = useMutation(REGISTER);
    const { currentUser, setCurrentUser } = useTheme();
    const classes = useStyles();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = (userInfo) => {
        axios
            .post('http://localhost:1337/auth/local/register', {
                username: userInfo.firstName,
                email: userInfo.email,
                password: userInfo.password,
            })
            .then(async response => {
                console.log('Well done!');
                console.log('User profile', response.data.user);
                console.log('User token', response.data.jwt);
                await setCurrentUser({userprofile:response.data.user,token:response.data.jwt})
                let randomRestId=Math.floor(Math.random() * (2 - 1 + 1)) + 1;
                navigate(`/restaurants/${randomRestId}`);
            })
            .catch(error => {
                console.log('An error occurred:', error.response);
            });
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            // Execute mutation and pass in defined parameter data as variables
            const { data } = await addProfile({
              variables: { username:"ryan", email:"email@gmail.com", password:"password" },
            });
            console.log("BELOW IS THE DATA")
            console.log(data)
            console.log("BELOW IS THE DATA")
          } catch (err) {
            console.error(err);
          }
        
        console.log(firstName, lastName, email, password);
        login({ firstName, lastName, email, password })
    };

    return (
        <form className={classes.root} onSubmit={handleSubmit}>
            <TextField
                label="First Name"
                variant="filled"
                required
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
            />
            <TextField
                label="Last Name"
                variant="filled"
                required
                value={lastName}
                onChange={e => setLastName(e.target.value)}
            />
            <TextField
                label="Email"
                variant="filled"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <TextField
                label="Password"
                variant="filled"
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <div>
                <Button variant="contained" onClick={handleClose}>
                    Cancel
        </Button>
                <Button type="submit" variant="contained" color="primary">
                    Signup
        </Button>
            </div>
        </form>
    );
};

export default Homepage;