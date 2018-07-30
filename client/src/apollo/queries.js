import gql from 'graphql-tag'

const ItemFields = gql`
  fragment ItemFields on Item {
    
     id
     title
     imageurl
     description
     created
     tags {
       id
       title
     }
     itemowner {
       id
       fullname
       email
       bio
     }
     borrower {
       id
       fullname
       email
       bio
     }
    
    # See the Apollo docs for instructions on how to use fragments:
    # https://www.apollographql.com/docs/angular/features/fragments.html
  }
`
export const ITEM_QUERY = gql`
  query item {
    items {
      ...ItemFields
    }
  }
  ${ItemFields}
`

export const ALL_ITEMS_QUERY = gql`
  query ($id: ID!) {
    items( filter:$id ){
      ...ItemFields
    }
  }
  ${ItemFields}
`

export const ALL_USER_ITEMS_QUERY = gql`
  query user($id: ID!) {
    fullname
    email
    bio
    items {
      ...ItemFields
    }
    borrowed {
      ...ItemFields
    }
  }
  ${ItemFields}
`

export const ALL_TAGS_QUERY = gql`
    query {
    tags {
      title
      id
    }
  }
  `


export const ADD_ITEM_MUTATION = gql`
  mutation addItem($item: NewItemInput!, $image: Upload!) {
    items {
    ...ItemFields
    }
  }
  ${ItemFields}
`
export const VIEWER_QUERY = gql`
  query {
    viewer {
      id
      email
      fullname
      bio
    }
  }
`
export const LOGOUT_MUTATION = gql`
  mutation {
    logout
  }
`

export const SIGNUP_MUTATION = gql`
  mutation signup($user: SignUpInput!) {
    signup(user: $user) {
      id
    }
  }
`

export const LOGIN_MUTATION = gql`
  mutation login($user: LoginInput!) {
    login(user: $user) {
      id
    }
  }
`
