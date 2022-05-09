import {PostCard,PostWidget,Categories} from '../components';
import FeaturedPosts from '../sections/FeaturedPosts';
import {getPosts} from '../services';
import Header from '../components/Header';
export default function Home({posts}) {
  return (
    <>
    <Header/>
    <div className="container mx-auto px-10 mb-8">
   <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post, index) => (
            <PostCard key={index} post={post.node} />
            ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
// export default Home;
export async function getStaticProps(){
const posts=(await getPosts()) || [];
return {
  props:{posts},
};
}