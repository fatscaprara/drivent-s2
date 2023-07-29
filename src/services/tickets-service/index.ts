import { TicketStatus, TicketType } from '@prisma/client';
import ticketsRepository from '@/repositories/ticket-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { notFoundError } from '@/errors';
import { CreateTicketType } from '@/protocols';

async function getTicketTypes() {
  const types: TicketType[] = await ticketsRepository.findTicketsTypes();

  if (!types) throw notFoundError();

  return types;
}

async function getTicketByUserId(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) throw notFoundError();

  const enrollmentId = enrollment.id;
  const ticket = ticketsRepository.findTicketByEnrollmentId(enrollmentId);

  if (!ticket) throw notFoundError();

  return ticket;
}

async function createTicket(userId: number, ticketTypeId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) throw notFoundError();

  const data: CreateTicketType = {
    ticketTypeId,
    enrollmentId: enrollment.id,
    status: TicketStatus.RESERVED,
  };

  await ticketsRepository.createTicket(data);

  const enrollmentId = enrollment.id;
  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollmentId);

  if (!ticket) throw notFoundError();

  return ticket;
}

const ticketsService = {
  getTicketTypes,
  getTicketByUserId,
  createTicket,
};

export default ticketsService;
