import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import ticketsService from '@/services/tickets-service';

export async function getTicketTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const types = await ticketsService.getTicketTypes();

    res.send(types);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}
