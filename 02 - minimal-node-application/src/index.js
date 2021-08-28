import 'dotenv/config';       //*for getting .env file
import 'cross-fetch/polyfill'       //* dependencies apolo-boost
import ApolloClient, { gql } from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',       //* github graphql server  
  request: operation => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${process.env.GITHUB_TOKEN_ACCESS}`
      }
    });
  }
});


// const GET_ORG_DETAILS = gql` 
//   query {
//     organization(login: "facebook") {
//       name
//       url
//       description
//     }
//   }
// `;

//* axios me hm POST ki mdad sy query krty thy
// mgr is me hm query method use krty

// client.query({
//   query: GET_ORG_DETAILS
// }).then(res => console.log('GET_ORG_DETAILS >>>', res));




// // Query with Variables

const GET_ORG_DETAILS_VARIABLE = gql`
  query getOrganization($org: String!){
    organization(login: $org) {
      name
      url
      description
    }
  }
`;

client.query({
  query: GET_ORG_DETAILS_VARIABLE,
  variables: {
    name: "qutbITech"
  }
}).then(res => console.log('GET_ORG_DETAILS_VARIABLE >>>', res));




// // MUTATION

// const ADD_STAR = gql`
//   mutation ($repoId: ID!) {
//     addStar(input: { starrableId: $repoId }) {
//       starrable {
//         viewerHasStarred
//       }
//     }
//   }
// `

// client.mutate({
//   mutation: ADD_STAR,
//   variables: {
//     repoId: "IdiDidiDIDidiDIDIdid"
//   }
// })
// .then(d => console.log(JSON.stringify(d)))
// .catch(err => console.log('Err: ' , err));