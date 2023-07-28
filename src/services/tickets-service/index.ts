import ticketsRepository from '@/repositories/ticket-repository';

async function getTicketTypes() {
  const types = await ticketsRepository.findTicketsTypes();

  return types;
}

const ticketsService = {
  getTicketTypes,
};

export default ticketsService;
