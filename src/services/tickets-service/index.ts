import ticketsRepository from '@/repositories/ticket-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { notFoundError } from '@/errors';

async function getTicketTypes() {
  const types = await ticketsRepository.findTicketsTypes();

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

const ticketsService = {
  getTicketTypes,
  getTicketByUserId,
};

export default ticketsService;
