import { prisma } from '@/config';

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

const ticketsRepository = {
  findTicketsTypes,
  findTicketByEnrollmentId,
};

export default ticketsRepository;
