'use client';

import { useEffect } from 'react';
import socket from '@/lib/websocket';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
//import { addEvent } from '@/store/slices/eventsSlice';
import { addEvent, togglePause } from '@/store/slices/eventsSlice';

import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

export default function EventsFeed() {
  const dispatch = useAppDispatch();
  const events = useAppSelector((state) => state.events.list);
  const paused = useAppSelector((state) => state.events.paused);

  useEffect(() => {
    socket.on('payment_event', (event) => {
      dispatch(addEvent(event));
    });

    return () => {
      socket.off('payment_event');
    };
  }, [dispatch]);

  const getColor = (type: string) => {
    if (type === 'payment_received') return 'green';
    if (type === 'payment_failed') return 'red';
    if (type === 'payment_refunded') return 'orange';
    return 'gray';
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Live Events
        </Typography>
        <button onClick={() => dispatch(togglePause())}>
          {paused ? 'Resume Feed' : 'Pause Feed'}
        </button>
        <List>
          {events.map((event, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={
                  <span style={{ color: getColor(event.type), fontWeight: 600 }}>
                    {event.type.replace('_', ' ')} - ${event.payment.amount}
                  </span>
                }
                secondary={event.timestamp}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}