// src/resume/graphql/mutations/project.mutation.ts

import { gql, useMutation } from '@apollo/client';
import type { Project } from '../../types/project.type';

export const CREATE_PROJECT = gql`
  mutation CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      id
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation DeleteProject($id: String!) {
    deleteProject(id: $id)
  }
`;

export const useCreateProject = () => {
  return useMutation<{ createProject: Project }, { input: any }>(CREATE_PROJECT);
};

export const useDeleteProject = () => {
  return useMutation<{ deleteProject: boolean }, { id: string }>(DELETE_PROJECT);
};
