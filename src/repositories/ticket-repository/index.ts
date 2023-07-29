import { TicketStatus } from '@prisma/client';
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

async function findTicketById(id: number) {
  return await prisma.ticket.findFirst({
    include: {
      Enrollment: true,
    },
    where: {
      id,
    },
  });
}

async function findTicketWithTypeById(id: number) {
  return prisma.ticket.findFirst({
    include: {
      TicketType: true,
    },
    where: {
      id,
    },
  });
}

async function ticketProcessPayment(id: number) {
  return await prisma.ticket.update({
    data: {
      status: TicketStatus.PAID,
    },
    where: {
      id,
    },
  });
}

const ticketsRepository = {
  findTicketsTypes,
  findTicketByEnrollmentId,
  createTicket,
  findTicketById,
  findTicketWithTypeById,
  ticketProcessPayment,
};

export default ticketsRepository;
