import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getTicket, getTicketTypes } from '@/controllers/tickets-controller';

const ticketsRouter = Router();

ticketsRouter.get('/tickets/types', authenticateToken, getTicketTypes);
ticketsRouter.get('tickets', authenticateToken, getTicket);

export { ticketsRouter };
