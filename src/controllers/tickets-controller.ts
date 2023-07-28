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

export async function getTicket(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const ticket = await ticketsService.getTicketByUserId(userId);

    return res.send(ticket);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function createTicket(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const { ticketTypeId } = req.body;

    await ticketsService.createTicket(userId, ticketTypeId);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
