import { prisma } from '@/config';

async function findTicketsTypes() {
  return await prisma.ticketType.findMany();
}

const ticketsRepository = {
  findTicketsTypes,
};

export default ticketsRepository;
