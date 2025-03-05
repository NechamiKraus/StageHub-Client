import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const card = {
  title: 'Plants',
  phone: 'Plants are essential for all life.',
  email: '',

};


function UserDashboard({details}) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        backgroundColor: '#f5f5f5', // רקע בהיר לדוגמה
      }}
    >
      <Card
        sx={{
          width: '65%',
          height: '80%',
          padding: 2,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
       <CardContent>
          <Typography variant="h5" component="div">
            {details ? details.name : 'No details available'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {details ? details.email : 'No email available'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {details ? details.phone : 'No phone available'}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default UserDashboard;
