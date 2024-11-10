// EventCard.tsx
import React, { useState } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';

interface EventCardProps {
  id: number;
  name: string;
  date: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isHovered: boolean;
}

const EventCard: React.FC<EventCardProps> = ({  name, date, location, price, numAvailableTickets, onMouseEnter, onMouseLeave, isHovered, onBuyTicket }) => {
  const [isLocallyHovered, setIsLocallyHovered] = useState(false);

  return (
    <Card
    onMouseEnter={() => {
      setIsLocallyHovered(true);
      onMouseEnter(); // להעביר את האירוע גם להורה
    }}
    onMouseLeave={() => {
      setIsLocallyHovered(false);
      onMouseLeave();
    }}
      sx={{
        width: 250, // רוחב קבוע לכרטיס
        height: 'auto', // גובה אוטומטי כדי להתאים לתוכן
        backgroundColor: isLocallyHovered ? '#f5f5f5' : 'white',
        boxShadow: isLocallyHovered ? 3 : 1,
        margin: '10px', // הוספת שוליים בין הכרטיסים
        textAlign: 'center', // טקסט במרכז
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ marginBottom: 1 }}>{name}</Typography>
        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
          תאריך: {new Date(date).toLocaleDateString()} {/* עיצוב התאריך */}
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: 1 }}>מיקום: {location}</Typography>
        <Typography variant="body2" sx={{ marginBottom: 1 }}>מחיר: ₪{price}</Typography>
        <Typography variant="body2" sx={{ marginBottom: 1 }}>כרטיסים זמינים: {numAvailableTickets}</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={onBuyTicket}
          sx={{ marginTop: 1 }} // הוספת מרווח בין הכפתור לתוכן הקודם
        >
          הזמן כרטיס
        </Button>
      </CardContent>
    </Card>
  );
};


export default EventCard;
