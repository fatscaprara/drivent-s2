import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import ticketsService from '@/services/tickets-service';
import { notFoundError } from '@/errors';

export async function getTicketTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const types = await ticketsService.getTicketTypes();

    if (!types) throw notFoundError();

    res.send(types);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function getTicket(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const ticket = await ticketsService.getTicketByUserId(userId);

    if (!ticket) throw notFoundError();

    return res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function createTicket(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const { ticketTypeId } = req.body;

    if (!ticketTypeId) return res.sendStatus(400);

    const ticket = await ticketsService.createTicket(userId, ticketTypeId);

    res.status(httpStatus.CREATED).send(ticket);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
