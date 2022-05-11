import React from 'react'
import useRouter from 'next/router';
import Loader from '../../components/Loader';
import AdjacentPosts from '../../sections/AdjacentPosts';
import { PostCard } from '../../components';
const Categories = ({posts}) => {
  const router=useRouter()
  if(router.isFallback()){
    return <Loader/>
  }
  return (
    <div className='container mx-auto mb-8 px-10'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
       <div className="col-span-1 lg:col-span-8">
         {/* <AdjacentPosts  */}
         {posts.map((item,key)=>{
            <PostCard key={key} post={item.node}/>
         })}
       </div>
       <div className="col-span-1 lg:col-span-4">
       <div className="relative lg:sticky top-8">
        <Categories/>
       </div>
      </div>
    </div>
    </div>
  )
}

export default Categories;
export async function getStaticProps({ params }) {
  const posts = await getCategoryPost(params.slug);

  return {
    props: { posts },
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const categories = await getCategories();
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}