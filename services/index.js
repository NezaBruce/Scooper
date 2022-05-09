import {request,gql} from 'graphql-request';
const graphqlAPI=process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
export const getPosts=async()=>{
    const query= gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
    `
    const resutl=await request(graphqlAPI,query);
    return resutl.postsConnection.edges;
}
export const getPostsDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug : String!) {
      post(where: {slug: $slug}) {
        title
        excerpt
        featuredImage {
          url
        }
        author{
          name
          bio
          photo {
            url
          }
        }
        createdAt
        slug
        content {
          raw
        }
        categories {
          name
          slug
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.post;
};
// export const getPostsDetails=async(slug)=>{
//     const query= gql`
//     query GetPostDetails($slug:String!) {
//         post (where:{slug:$slug}){
//               author {
//                 bio
//                 name
//                 id
//                 photo {
//                   url
//                 }
//               }
//               createdAt
//               slug
//               title
//               excerpt
//               featuredImage {
//                 url
//               }
//               categories {
//                 name
//                 slug
//               }
//               content{
//                 raw
//               }
//             }
//           }     
//     `
//     const resutl=await request(graphqlAPI,query,{slug});
//     // return resutl.postsConnection.edges;
//     return resutl.post;
// }
export const getRecentPosts=async ()=>{
    const query=gql`
    query GetRecentPost(){
        posts(
        orderBy:createdAt_ASC
        last:3
    )  {
        title
        featuredImage{
            url
        }
        createdAt
        slug
    }
  }
    `
    const resutl=await request(graphqlAPI,query);
    return resutl.posts;
}
export const getSimilarPosts=async (categories,slug)=>{
    const query=gql`
    query GetPostDetails($slug: String!,$categories:[String!]){        
        posts(
            where:{slug_not : $slug,AND:{categories_some:{slug_in:$categories}}}
            last:3
        ){
            title
            featuredImage{
                url
            }
            createdAt
            slug
        }
    }
    `
    const resutl=await request(graphqlAPI,query,{slug,categories});
    return resutl.posts;
}
export const getFeaturedPosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts(where: {featuredPost: true}) {
        author {
          name
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        title
        slug
        createdAt
      }
    }   
  `;

  const result = await request(graphqlAPI, query);

  return result.posts;
};
export const getCategories=async ()=>{
    const query=gql`
    query GetCategories(){        
            categories{
                name
                slug
            }
    }
    `
    const resutl=await request(graphqlAPI,query);
    return resutl.categories;
}
export const getComments = async (slug) =>{
  const query = gql`
  query GetComments($slug:String!){
    comments(where :{post:{slug:$slug}}){
      name
      createdAt
      comment
    }
  }
  `
  const resutl=await request(graphqlAPI,query,{slug});
  return resutl.comments;
}