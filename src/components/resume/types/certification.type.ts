export interface Certificate {
  id: string;
  name: string;
  issuer?: string;
  issuedDate: string;
  expiryDate?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  type: string;
}
