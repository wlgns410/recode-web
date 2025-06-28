import { gql, useMutation } from '@apollo/client';

export const CREATE_EDUCATION = gql`
  mutation CreateEducation($input: CreateEducationInput!) {
    createEducation(input: $input) {
      id
      schoolName
      major
      degree
      startDate
      endDate
    }
  }
`;

export const useCreateEducation = () => {
  return useMutation(CREATE_EDUCATION);
};

export const DELETE_EDUCATION = gql`
  mutation DeleteEducation($id: String!) {
    deleteEducation(id: $id)
  }
`;

export const useDeleteEducation = () => {
  return useMutation(DELETE_EDUCATION);
};
