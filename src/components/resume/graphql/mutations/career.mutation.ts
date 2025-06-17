import { gql, useMutation } from '@apollo/client';

export const CREATE_CAREER = gql`
  mutation CreateCareer($input: CreateCareerInput!) {
    createCareer(input: $input) {
      id
    }
  }
`;

export const DELETE_CAREER = gql`
  mutation DeleteCareer($id: String!) {
    deleteCareer(id: $id)
  }
`;

export function useCreateCareer() {
  return useMutation(CREATE_CAREER);
}

export function useDeleteCareer() {
  return useMutation(DELETE_CAREER);
}
