import { ProjectFile } from './typing';
import { UserData } from './user';

export interface BuyerBrief {
  projectTitle: string;
  projectDescription: string;
  projectBudget: number;
  projectDeadline: string;
  projectFiles: ProjectFile[];
}

export interface MilestoneInput {
  title: string;
  description: string;
  amount: number;
  deadline: string;
  files: ProjectFile[];
}

export interface Milestone extends MilestoneInput {
  id: number;
  status: MilestoneState;
  createdAt: string;
  updatedAt: string;
  completedAt: string;
  paidAt: string;
}

export interface SellerBriefInput {
  summary: string;
  milestones: MilestoneInput[];
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

enum MilestoneState {
  INCOMPLETE = 'INCOMPLETE',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
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
