export interface Brief {
  id: number;
}

export interface BuyerBrief extends Brief {
  projectTitle: string;
  projectDescription: string;
  projectBudget: number;
  projectDeadline: string;
  projectFiles: string[];
}

export interface Milestone {
  id: number;
  title: string;
  description: string;
  amount: number;
  deadline: string;
  status: string;
  files: string[];
  createdAt: string;
  updatedAt: string;
  completedAt: string;
  paidAt: string;
}

export interface SellerBrief extends Brief {
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
