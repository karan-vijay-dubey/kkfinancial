import type { ConsultationRequest } from "@shared/schema";
import { randomUUID } from "crypto";

export interface StoredConsultationRequest extends ConsultationRequest {
  id: string;
  createdAt: Date;
  status: "pending" | "contacted" | "completed";
}

export interface IStorage {
  createConsultationRequest(request: ConsultationRequest): Promise<StoredConsultationRequest>;
  getConsultationRequests(): Promise<StoredConsultationRequest[]>;
  getConsultationRequestById(id: string): Promise<StoredConsultationRequest | undefined>;
  updateConsultationStatus(id: string, status: StoredConsultationRequest["status"]): Promise<StoredConsultationRequest | undefined>;
}

export class MemStorage implements IStorage {
  private consultationRequests: Map<string, StoredConsultationRequest>;

  constructor() {
    this.consultationRequests = new Map();
  }

  async createConsultationRequest(request: ConsultationRequest): Promise<StoredConsultationRequest> {
    const id = randomUUID();
    const storedRequest: StoredConsultationRequest = {
      ...request,
      id,
      createdAt: new Date(),
      status: "pending",
    };
    this.consultationRequests.set(id, storedRequest);
    return storedRequest;
  }

  async getConsultationRequests(): Promise<StoredConsultationRequest[]> {
    return Array.from(this.consultationRequests.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getConsultationRequestById(id: string): Promise<StoredConsultationRequest | undefined> {
    return this.consultationRequests.get(id);
  }

  async updateConsultationStatus(
    id: string,
    status: StoredConsultationRequest["status"]
  ): Promise<StoredConsultationRequest | undefined> {
    const request = this.consultationRequests.get(id);
    if (request) {
      request.status = status;
      this.consultationRequests.set(id, request);
      return request;
    }
    return undefined;
  }
}

export const storage = new MemStorage();
