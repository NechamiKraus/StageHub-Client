import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useNavigate } from 'react-router-dom';

function UserDashboard({user}) {

  const navigate = useNavigate();

  const navigateToDiary = () => {
    navigate('diary');
  };
  const navigateToUserList = (usreRole) => {
    navigate(`user-list/${usreRole}`);
  }

  const translations = {
    coaches: "מאמנים",
    actors: "שחקנים",
    providers: "ספקים",
    directors: "במאים",
  };
  
  const translateToHebrew = (word) => {
    return translations[word] || word; 
  };

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
          justifyContent: 'space-between',
          alignItems: 'center',
          display: 'flex',
          width: '65%',
          height: '80%',
          padding: 2,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
       <CardContent>
          <Typography variant="h5" component="div">
            {user ? user.name : 'No user available'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user ? user.email : 'No email available'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user ? user.phone : 'No phone available'}
          </Typography>

        </CardContent>
        <CardContent style={{width: '22%'}}>
          <Typography onClick={navigateToDiary} style={{cursor: 'pointer'}} variant="h6" component="div">
          <div style={{textDecoration: "underline", marginBottom: "10%"}}>
          <CalendarMonthIcon style={{ verticalAlign: "middle" , marginLeft: '5%'}}/>
            {"יומן חזרות"}
            </div> 
          </Typography>
          {user.list.map((item, index) => (            
            <Typography  key={index} variant="h6" style={{cursor:"pointer"}} onClick={() => navigateToUserList(item)}>
              <div style={{textDecoration: "underline", marginBottom: "10%"}}>
              <FormatListBulletedIcon style={{ verticalAlign: "middle" , marginLeft: '5%' }}/>
               {""+"לרשימת ה"+translateToHebrew(item)}
              </div>
              
            </Typography>
          ))}
        </CardContent>

      </Card>
    </Box>
  );
}

export default UserDashboard;
