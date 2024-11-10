import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import EventCard from '../CardShow/CardShow';

const events = [
  { id: 1, name: 'מופע 1', date: '2024-09-01' },
  { id: 2, name: 'מופע 2', date: '2024-09-05' },
  { id: 3, name: 'מופע 1', date: '2024-09-01' },
  { id:4, name: 'מופע 1', date: '2024-09-01' },
  { id: 5, name: 'מופע 1', date: '2024-09-01' },
  { id: 6, name: 'מופע 1', date: '2024-09-01' },
  // הוסף עוד מופעים כאן
];
const SignUp = () => {
    const [hovered, setHovered] = useState<number | null>(null); // מצב לניהול הכרטיס שהועבר מעליו

    return (
      <Grid container spacing={2}>
        {events.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <EventCard
              id={event.id}
              name={event.name}
              date={event.date}
              onMouseEnter={() => setHovered(event.id)} // הגדרת מצב כשעוברים מעל הכרטיס
              onMouseLeave={() => setHovered(null)} // הגדרת מצב כשעוזבים את הכרטיס
              isHovered={hovered === event.id} // מצב ההבהרה
            />
          </Grid>
        ))}
      </Grid>
    );
  };


export default SignUp;