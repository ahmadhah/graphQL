import { useEffect } from 'react'
import axios from 'axios'

const api = axios.create({
    // ! base url is starting point of your API
    baseURL: 'https://api.github.com',
    //? 
    headers: {
        //* process.env me 1 object milta, ar us me tmam tokens jo apny store kiye hoty, wo hoty us me
        Authorization: `bearer ${process.env.REACT_APP_GITHUB_ACCESS_TOKEN}` // agr token yha direct likh dain gy
        //! to wo publically available ho jye ga,,  is liye .env file me rkhty      
    }
});

function GithubAPI() {
    // const { REACT_APP_MY_ENV } = process.env;
    // const fetchData_js = async (organizationName) => {
    //     const QUERY_ORGANIZATION = `query {
    //         organization(login: "${organizationName}") {
    //             name
    //             description
    //             url
    //             createdAt
    //         }
    //         viewer {
    //             login
    //             email
    //             company
    //             repositories(first: 5) {
    //                 edges {
    //                     node {
    //                         name
    //                     }
    //                 }
    //             }
    //         }
    //     }`;
    //     // ? graphql me 1 hi method use krty,,, Post ka
    //     const res = await api.post('/graphql', { query: QUERY_ORGANIZATION })
    //     console.log('GraphQL Response: ', res);
    // }

    const fetchData_ql = async (organizationName) => {
        //todo Note : queryOrganization is our function , recieving some params
        const QUERY_ORGANIZATION = `query queryOrganization($organizationName: String!){
            organization(login: $organizationName) {
                name
                description
                url
                createdAt
            }
            viewer {
                login
                email
                company
                repositories(first: 5) {
                    edges { 
                        node {
                            name
                        }
                    }
                }
            }
        }`;

        const res = await api.post('/graphql', {
            query: QUERY_ORGANIZATION,
            variables: {
                organizationName //todo Note : jo name oper func parameter ko pas kiya tha same name hi yaha pass krain gy
            }
        })

        const { data:{data:{viewer:{repositories:{edges}}}}} = res;
        // console.log(process.env.REACT_APP_GITHUB_ACCESS_TOKEN)
        console.log('GraphQL Response: ', edges);
    }

// ! mutation kro,, add star kro,, ar usky bd,,hmain starrable ki body wala code la kr return krwa do

    const addStart = async (repositoryId) => {
        const MUTATION_ADD_START = `mutation addStart($repositoryId: ID!) {
            addStar(input: {starrableId: $repositoryId}) {
                starrable {
                    viewerHasStarred
                }
            }
        }`;

        const res = await api.post('/graphql', { query: MUTATION_ADD_START, variables: { repositoryId } })
        console.log('GraphQL Response: ', res);
    }

    useEffect(() => {
        // fetchData_ql("the-road-to-learn-react")
        // addStart("MDEwOlJlcG9zaXRvcnkyMDMzMTA0MjU=")
        // addStart('Paste here ID_OF_Repo, where you want to give star')
        
    }, [])

    return (
        <div>

        </div>
    );
}

export default GithubAPI;
