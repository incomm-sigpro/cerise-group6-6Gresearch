import { Address, Inventory, UserCorporation } from "@prisma/client";

export type CreateCorporationDTO = {
  name: string;
  cnpj: string;
  address?: Address;
  energyConsumption: string;
  airConditioners: string;
  computers: string;
  employeeTransportation: string;
  mainActivity: string;
  suppliers: string;
  wasteGeneration: string;
  userCorporation?: UserCorporation[];
  inventories?: Inventory[];
}