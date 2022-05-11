import { GraphQLClient,gql } from "graphql-request";
// const graphqlAPI=process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphqlAPI="https://api-eu-central-1.graphcms.com/v2/cl2nsqk0b307x01z453bcbqrq/master";
const TOKEN="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NTE1MTkzMDEsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEuZ3JhcGhjbXMuY29tL3YyL2NsMm5zcWswYjMwN3gwMXo0NTNiY2JxcnEvbWFzdGVyIiwiaHR0cHM6Ly9tYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiMmFmYTBiOTUtNWU5Yy00MWMyLTg0NjYtNzc4YTM4MmFhZDdiIiwianRpIjoiY2wycDN5OHZwNGMyYTAxeHJna3plZ2drNyJ9.js4_lVUd13X_5IdtgUWqvaKE2tR16ujNHb3tKNGP4_MLeuE8Jf2KoFBKACbhmZgst4gjJGZFvrXw5kOAggGH2GxqGclxF81s1HAE0rc8ACCmhMFvcauLQbRg2RjpdOeznWFJBGbz7MIDrjipg08h182XXC5UnE-pcw3ZnhojdSXHeKsXnyBCFJm1Ir-P3z--LOOiJVyEcANMwDrchShQNlDm_ni4lInnnZgzhuhMhDqF3slC361fxzU-PJF38yAdys9saYgMjmPPUzExTg-jjuL315FFL2Ct00W4V9-7FzPSVD9OUNO8-tIXSHn6hdnbgXogvzjcb3qdH1XEh8zzWn2zUkVeVzplocHocIXXzHLvpjIbbw4KzfQe_-cRNSu7zMdsSIC6MxD2YL05O2fxIh7m57sgSvsc7PXSIrl5phGsBMkptFoGDg6nmZTZzOPYf0cHH49FMZvpCXtsZOgfxnIe1afFFusHw5Wo8tgXuFVT_obWX4MnGCcztvaKKintVWwIVdruMp5mu14CkW37LUbgD2sOq82ZSojRtyM-Vy_42EVbFmyCjTJ1KhitrCwdIF2r249MRS_-ksbg9ue-X6aXaSYyiOYrXnKhpjQjFQ0t4J-rcgZEq9SkeNcReaR5oCkrCaQ4-iExH3tIVLtkdc2CdTc2l34zR5oK7yvrEbQ";
export default async function asynchandler(req,res){
    const graphQLClient=new GraphQLClient((graphqlAPI),{
        headers:{
            authorization:`Bearer ${TOKEN}`
        }
    });
    const query=gql`
    mutation CreateComment($name:String!,$email:String!,$comment:String!,$slug:String!){
        createComment(data:{name:$name,email:$email,comment:$comment,post:{connect:{slug:$slug}}}) {id}
    }
    `
    const result=await graphQLClient.request(query,{
        name:req.body.name,
        email:req.body.email,
        comment:req.body.comment,
        slug:req.body.slug
    })
    res.status(200).send(result);
}