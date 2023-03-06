import { gql } from 'apollo-angular';

export const UPDATE_TASK_GROUP_STATUS = gql`
mutation updateTaskGroupStatus($taskId: Int!, $groupId: Int!) {
  updateTaskStatusInGroup(input: {groupid: $groupId, taskid: $taskId}) {
    clientMutationId
  }
}
`;
