import { gql, useQuery } from '@apollo/client';
import type { Certificate } from '../../types/certification.type';

export const GET_CERTIFICATES = gql`
  query GetCertificates($type: CertificateType!) {
    getCertificates(type: $type) {
      id
      name
      issuer
      issuedDate
      expiryDate
      userId
      createdAt
      updatedAt
      type
    }
  }
`;

export const useGetCertificates = (type: 'LICENSE' | 'AWARD') => {
  return useQuery<{ getCertificates: Certificate[] }>(GET_CERTIFICATES, {
    variables: { type },
  });
};
