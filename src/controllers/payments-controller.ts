import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentsService from '@/services/payments-service';

export async function getPaymentByTicketId(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketId = Number(req.query.ticketId);

    if (!ticketId) return res.sendStatus(httpStatus.BAD_REQUEST);

    const { userId } = req;
    const payment = await paymentsService.getPaymentByTicketId(userId, ticketId);

    res.send(payment);
  } catch (error) {
    if (error.name === 'UnauthorizedError') return res.sendStatus(httpStatus.UNAUTHORIZED);

    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function postPaymentProcess(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const { ticketId, cardData } = req.body;

    const payment = await paymentsService.postPaymentProcess(ticketId, userId, cardData);

    if (!payment) return res.sendStatus(httpStatus.NOT_FOUND);

    res.send(payment);
  } catch (error) {
    if (error.name === 'UnauthorizedError') return res.sendStatus(httpStatus.UNAUTHORIZED);

    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
