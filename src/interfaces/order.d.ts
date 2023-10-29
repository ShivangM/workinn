import { UserData } from './user';

interface ProjectFile {
  name: string;
  url: string;
  type: string;
}

export interface BuyerBrief {
  projectTitle: string;
  projectDescription: string;
  projectBudget: number;
  projectDeadline: string;
  projectFiles: ProjectFile[];
}

export interface Milestone {
  id: number;
  title: string;
  description: string;
  amount: number;
  deadline: string;
  status: string;
  files: ProjectFile[];
  createdAt: string;
  updatedAt: string;
  completedAt: string;
  paidAt: string;
}

export interface SellerBrief {
  summary: string;
  milestones: Milestone[];
}

export enum OrderStatus {
  NEGOTIATION = 'NEGOTIATION',
  AWAITING_SIGNATURE = 'AWAITING_SIGNATURE',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface Order {
  id: string;
  buyerId: string;
  sellerId: string;
  serviceId: string;
  buyersBrief: BuyerBrief;
  sellersBrief: SellerBrief;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  completedAt: string;
  cancelledAt?: string;
}
