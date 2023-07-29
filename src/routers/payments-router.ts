import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getPaymentByTicketId, postPaymentProcess } from '@/controllers/payments-controller';
import { paymentSchema } from '@/schemas/payment-schemas';

const paymentsRouter = Router();

paymentsRouter.get('/payments', authenticateToken, getPaymentByTicketId);
paymentsRouter.post('/payments/process', authenticateToken, validateBody(paymentSchema), postPaymentProcess);

export { paymentsRouter };
