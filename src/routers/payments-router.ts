import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getPaymentByTicketId } from '@/controllers/payments-controller';

const paymentsRouter = Router();

paymentsRouter.get('/payments', authenticateToken, getPaymentByTicketId);

export default paymentsRouter;
