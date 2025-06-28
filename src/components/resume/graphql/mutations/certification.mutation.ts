import { gql, useMutation } from '@apollo/client';

export const CREATE_CERTIFICATE = gql`
  mutation CreateCertificate($input: CreateCertificateInput!) {
    createCertificate(input: $input) {
      id
      name
      issuer
      issuedDate
      expiryDate
    }
  }
`;

export const useCreateCertificate = () => {
  return useMutation(CREATE_CERTIFICATE);
};

export const DELETE_CERTIFICATE = gql`
  mutation DeleteCertificate($id: String!) {
    deleteCertificate(id: $id)
  }
`;

export const useDeleteCertificate = () => {
  return useMutation(DELETE_CERTIFICATE);
};
