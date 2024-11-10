import { useParams } from 'react-router-dom';
import { Role } from "../../enums/role";
import React, { useState } from 'react';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';

const FormContainer = styled(Container)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  });
  
  const FormBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '400px',
  });
const SignIn: React.FC  = () => {
    
    const { role } = useParams();

    const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async(event: React.FormEvent) => {
    event.preventDefault();
    // Handle login logic here
    try {
        const res = await axios.post(`http://localhost:3001/login/${Role[role]}`,{email,password});
        console.log(res.data);
        localStorage.setItem("token",res.data.token) 
        localStorage.setItem("id",res.data.id) 
        const result = await axios.get(`http://localhost:3001/${Role[role]}/details/${res.data.id}`,{
            headers: {
                'auth-token': res.data.token 
              },  
              params: {
                id: res.data.id 
              }
            });
        localStorage.setItem("userName", result.data.name)
      } catch (error) {
        console.error('Error fetching data:', error); // הדפסת שגיאה אם יש
      }
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <FormContainer>
        <h1>Hello {Role[role]}!🤗</h1>
      {/* <Typography variant="h4" gutterBottom>
      </Typography> */}
      <FormBox component="form" onSubmit={handleLogin}>
        <TextField
          type='email'
          label="מייל"
          variant="outlined"
          margin="normal"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          dir='rtl'
        />
        <TextField
          label="סיסמה"
          type="password"
          variant="outlined"
          margin="normal"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          התחבר
        </Button>
        <link rel="stylesheet" href="" />עדיין לא רשום? לחץ כאן 

      </FormBox>
    </FormContainer>
  );

};

export default SignIn;






