import { DocumentStatusEnum } from "./enums/document-status";
import { DocumentTypeEnum } from "./enums/document-type";

interface DocumentHistoryItem {
  timestamp: Date;
  status: DocumentStatusEnum;
  type?: DocumentTypeEnum;
  documentNumber?: string;
  message?: string;
  reviewerId?: string;
}

interface DocumentAddress {
  line1: string;
  line2: string;
  postalCode: string;
  city: string;
  state: string;
  country: string;
}

export interface DocumentEntity {
  accountId: string;
  status: DocumentStatusEnum;
  type: DocumentTypeEnum;
  documentNumber: string;
  history: Array<DocumentHistoryItem>;
  fullName: string;
  birthDate: string;
  phone?: string;
  address?: DocumentAddress;
  documentPictureUrl?: string;
  selfieWithDocumentUrl?: string;
}
