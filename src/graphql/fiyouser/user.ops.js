import { gql } from "@apollo/client";

/** Queries */
export const GET_USERS = gql`
  query GetUsers($user_ids: [String!], $offset: Int) {
    getUsers(user_ids: $user_ids, offset: $offset) {
      status {
        success
        message
      }
      users {
        id
        username
        avatar
      }
    }
  }
`;

export const SEARCH_USERS = gql`
  query SearchUsers($query: String!) {
    searchUsers(query: $query) {
      status {
        success
        message
      }
      users {
        id
        full_name
        username
        avatar
      }
    }
  }
`;

export const GET_BASIC_USER = gql`
  query GetBasicUser($username: String!) {
    getUser(username: $username) {
      status {
        success
        message
      }
      user {
        id
        full_name
        username
        avatar
      }
    }
  }
`;

export const GET_USER = gql`
  query GetUser($username: String!) {
    getUser(username: $username) {
      status {
        success
        message
      }
      user {
        id
        full_name
        username
        bio {
          text
          links
          track {
            id
            title
            artist
          }
        }
        account_type
        dob
        gender
        profession
        avatar
        banner
        followers_count
        following_count
        posts_count
        relation {
          follow {
            follow_status
            is_followed
          }
          mate {
            mate_status
          }
        }
      }
    }
  }
`;

/** Mutations */
export const UPDATE_USER = gql`
  mutation UpdateUser($updated_fields: UpdatedFieldsInput!) {
    updateUser(updated_fields: $updated_fields) {
      status {
        success
        message
      }
      user {
        full_name
        username
        bio {
          text
          links
          track {
            id
            title
            artist
          }
        }
        account_type
        dob
        gender
        profession
        avatar
        banner
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser {
    deleteUser {
      status {
        success
        message
      }
    }
  }
`;
