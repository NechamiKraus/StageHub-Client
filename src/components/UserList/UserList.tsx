import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardHeader, CardContent, Typography, CircularProgress } from '@mui/material';

const UserList = ({ roleList }) => {

  const roleUser = localStorage.getItem('userRole');
const [data, setData] = useState([]);
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(`http://localhost:3001/${roleUser}/${roleList}`);
        
        const response = await axios.get(`http://localhost:3001/${roleUser}/${roleList}`, {
          headers: {
            'auth-token': localStorage.getItem('token'),
          },
        });
        setData(response.data);
        setLoading(false);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [ roleList]);
  
  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">שגיאה: {error}</Typography>;
  }

  return (
    <Grid container spacing={3} padding={2}>
      {data.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
            <CardHeader title={item.name} subheader={`תפקיד: ${item.role}`} />
            <CardContent>
              <Typography variant="body1">
                <strong>מנהל:</strong> {item.managerId}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>טלפון:</strong> {item.phone}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>אימייל:</strong> {item.email}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
  
};

export default UserList;
