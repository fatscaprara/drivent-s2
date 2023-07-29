import { notFoundError, unauthorizedError } from '@/errors';
import { CardPaymentType, PaymentType } from '@/protocols';
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

async function postPaymentProcess(ticketId: number, userId: number, cardData: CardPaymentType) {
  const ticket = await ticketsRepository.findTicketById(ticketId);

  if (!ticket) throw notFoundError();

  const { enrollmentId } = ticket;
  const enrollment = await enrollmentRepository.findById(enrollmentId);

  if (!enrollment) throw notFoundError();

  if (enrollment.userId !== userId) throw unauthorizedError();

  const ticketWithType = await ticketsRepository.findTicketWithTypeById(ticketId);
  const data: PaymentType = {
    ticketId,
    value: ticketWithType.TicketType.price,
    cardIssuer: cardData.issuer,
    cardLastDigits: cardData.number.toString().slice(-4),
  };
  const payment = await paymentRepository.createPayment(ticketId, data);

  await ticketsRepository.ticketProcessPayment(ticketId);

  return payment;
}

const paymentsService = {
  getPaymentByTicketId,
  postPaymentProcess,
};

export default paymentsService;
