import { prisma } from '@/config';
import { PaymentType } from '@/protocols';

async function findPaymentByTicketId(ticketId: number) {
  return await prisma.payment.findFirst({
    where: { ticketId },
  });
}

async function createPayment(ticketId: number, dataPayment: PaymentType) {
  return await prisma.payment.create({
    data: {
      ticketId,
      ...dataPayment,
    },
  });
}

const paymentRepository = {
  findPaymentByTicketId,
  createPayment,
};

export default paymentRepository;
