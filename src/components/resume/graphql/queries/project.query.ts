// src/resume/graphql/queries/project.query.ts

import { gql, useQuery } from '@apollo/client';
import type { Project } from '../../types/project.type';

export const GET_PROJECTS = gql`
  query GetMyProjects {
    getMyProjects {
      id
      name
      description
      type
      startDate
      endDate
      techStack
      responsibility
    }
  }
`;

export const useGetProjects = () => {
  return useQuery<{ getMyProjects: Project[] }>(GET_PROJECTS);
};
