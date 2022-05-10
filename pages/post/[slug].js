import React from 'react'
import {useRouter} from 'next/router';
import PostWidget from '../../components/PostWidget';
import { Categories } from '../../components';
import { getPosts, getPostsDetails } from '../../services';
import CommentsForm from '../../components/CommentsForm';
import Loader from '../../components/Loader';
import PostDetailsa from '../../components/PostDetailsa';
const PostDetails = ({post}) => {
    const router=useRouter();
    if(router.isFallback){
        // return "Loading...";
      return <Loader/>
    }
  return (
    <>
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
         <PostDetailsa post={post}/>
         
      <CommentsForm slug={post.slug}/>
         {/* <Author author={post.author}/> */}         
        </div>
        <div className="col-span-1 lg:col-span-4">
           <div className="relative lg:sticky top-8">
            <PostWidget slug={post.slug} categories={post.categories.map((category)=>category.slug)}/>
            <Categories/>
           </div>
        </div>
      </div>
    </div>
    </>
  )
}
export default PostDetails;
export async function getStaticProps({params}){
 const data= await getPostsDetails(params.slug);
 console.log(data);
 return{
     props:{
         post:data
     }
 };
}
export async function getStaticPaths(){
const posts=await getPosts();
return{
    paths:posts.map(({node:{slug}})=>({params:{slug}})),
    fallback:true
}
}