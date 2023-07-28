import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { createTicket, getTicket, getTicketTypes } from '@/controllers/tickets-controller';

const ticketsRouter = Router();

ticketsRouter.get('/tickets/types', authenticateToken, getTicketTypes);
ticketsRouter.get('/tickets', authenticateToken, getTicket);
ticketsRouter.post('/tickets', authenticateToken, createTicket);

export { ticketsRouter };
