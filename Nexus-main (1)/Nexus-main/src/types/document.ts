export interface Document {
  id: string;
  name: string;
  size: number;
  type: string;
  status: DocumentStatusType;
  uploadedAt: Date;
  lastModified: Date;
  sharedWith: string[];
  signedBy: string[];
  file: File;
}

export type DocumentStatusType = 'draft' | 'in_review' | 'signed';

export interface SignatureData {
  id: string;
  documentId: string;
  userId: string;
  userName: string;
  signatureDataUrl: string;
  timestamp: Date;
}

export interface DocumentShare {
  id: string;
  documentId: string;
  sharedWithUserId: string;
  sharedWithUserName: string;
  sharedByUserId: string;
  sharedByUserName: string;
  permissions: DocumentPermission[];
  sharedAt: Date;
}

export type DocumentPermission = 'view' | 'comment' | 'edit' | 'sign';