import { Grid } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import EventCard from '../CardShow/CardShow';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from '@mui/material';


const Home = () => {

  const [shows, setShows] = useState([]); // מצב עבור המופעים
  const [hovered, setHovered] = useState(null); // מצב לניהול הכרטיס שהועבר מעליו

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState(0);
  const [ticketId, setTicketId] = useState('');


  const handleClickOpen = (ticketId) => {
    setTicketId(ticketId)
    setOpen(true);
};

  const handleClose = () => {
      setOpen(false);
  };

  const handleSubmit = (event) => {
      event.preventDefault();
      // פה תוכל לטפל במידע של הטופס
      console.log('Submitted Name:', name);
      handleClose();
  };

  useEffect(() => {
    const getAll = async () => {
      try {
        const res = await axios.get('http://localhost:3001/shows');
        console.log(res); // הדפסת ה-res
        setShows(res.data); // עדכון state עם המידע מה-API
      } catch (error) {
        console.error('Error fetching data:', error); // הדפסת שגיאה אם יש
      }
    };

    getAll();
  }, []);

  const handleBuyTicket = async (ticketId) => {
    
    try {
      console.log(name,email,phone,amount);
      const dataToSend = { email, name, phone, amount, ticketId };

      await axios.post('http://localhost:3001/orderticket', {dataToSend});
      alert(`כרטיס הוזמן בהצלחה!`); // הודעה על הצלחה
    } catch (error) {
      console.error('Error buying ticket:', error); // הדפסת שגיאה אם יש
      alert('אירעה שגיאה בהזמנת הכרטיס.'); // הודעת שגיאה
    }
  };

  return (
    <Grid container justifyContent="center" sx={{ padding: 2 }}>
  {shows.map((event) => (
    <Grid item xs={12} sm={6} md={4} key={event.id} sx={{ margin: '1cm' }}> 
      <EventCard
        name={event.name}
        date={event.date}
        location={event.location}
        price={event.price}
        numAvailableTickets={event.numAvailableTickets}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
        isHovered={false}
        onBuyTicket={() => handleClickOpen(event.id)}
      />
    </Grid>
    
  ))}
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>הזמנת כרטיס</DialogTitle>
    <DialogContent>
        <form onSubmit={handleSubmit}>
            <TextField
                autoFocus
                margin="dense"
                label="שם"
                type="text"
                fullWidth
                variant="standard"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <TextField
                autoFocus
                margin="dense"
                label="מייל"
                type="email"
                fullWidth
                variant="standard"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                autoFocus
                margin="dense"
                label="טלפון"
                type="phone"
                fullWidth
                variant="standard"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <TextField
                autoFocus
                margin="dense"
                label="מספר כרטיסים"
                type="number"
                fullWidth
                variant="standard"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
        </form>
    </DialogContent>
    <DialogActions>
        <Button onClick={handleClose}>ביטול</Button>
        <Button onClick={handleBuyTicket} type="submit" form="my-form">אישור</Button>
    </DialogActions>
</Dialog>
</Grid>


  );
};

export default Home;
