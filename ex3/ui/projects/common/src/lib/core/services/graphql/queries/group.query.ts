import { gql } from 'apollo-angular';

export const GET_GROUPS = gql`
query getGroups {
  allGroups {
    nodes {
      id,
      name
    }
  }
}

`;

export const GET_GROUP = gql`
query getGroup($id: Int!) {
  groupById(id: $id) {
    name,
    id,
  }
}
`;

export const GET_ALL_TASKS = gql`
query getAllTask {
  allTasks {
    nodes {
      name
      id
      description
      taskGroupsByTaskId {
        nodes {
          sentAt
          groupId
        }
      }
    }
  }
}`;
