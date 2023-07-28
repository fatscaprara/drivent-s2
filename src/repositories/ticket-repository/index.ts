import { prisma } from '@/config';
import { CreateTicketType } from '@/protocols';

async function findTicketsTypes() {
  return await prisma.ticketType.findMany();
}

async function findTicketByEnrollmentId(enrollmentId: number) {
  return await prisma.ticket.findFirst({
    include: {
      TicketType: true,
    },
    where: {
      enrollmentId,
    },
  });
}

async function createTicket(data: CreateTicketType) {
  return await prisma.ticket.create({
    data,
  });
}

const ticketsRepository = {
  findTicketsTypes,
  findTicketByEnrollmentId,
  createTicket,
};

export default ticketsRepository;
