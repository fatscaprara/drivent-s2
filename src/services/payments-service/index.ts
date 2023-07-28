import { notFoundError, unauthorizedError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import paymentRepository from '@/repositories/payment-repository';
import ticketsRepository from '@/repositories/ticket-repository';

async function getPaymentByTicketId(userId: number, ticketId: number) {
  const ticket = await ticketsRepository.findTicketById(ticketId);

  if (!ticket) throw notFoundError();

  const { enrollmentId } = ticket;
  const enrollment = await enrollmentRepository.findById(enrollmentId);

  if (!enrollment) throw notFoundError();

  if (enrollment.userId !== userId) throw unauthorizedError();

  const payment = await paymentRepository.findPaymentByTicketId(ticketId);

  if (!payment) throw notFoundError();

  return payment;
}

const paymentsService = {
  getPaymentByTicketId,
};

export default paymentsService;
