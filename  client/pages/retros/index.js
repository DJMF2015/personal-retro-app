import { useState, useEffect } from 'react';
import { useSession, getSession, signOut } from 'next-auth/client';
import styled, { keyframes } from 'styled-components';
import Navbar from '../../components/Navbar';
import RetroPlaceholder from '../../components/retros/RetroPlaceholder'
import RetroList from '../../components/retros/RetroList';
import AccessDenied from '../../components/utils/AccessDenied';
import InfiniteScroll from "react-infinite-scroll-component";
import HamburgerMenu from '/styles/HamburgerMenu.module.css';
import useMediaQuery from '../../helpers/useWatchMedia'
import Pagination from '../../helpers/pagination'; 
/**
 * Retros index for fetching api data from backend
 * @returns api data and renders pagination and infinite scroll loader for retros 
 */

export default function Retros() {
  const [session, loading] = useSession();
  const [hasMore, setHasMore] = useState(true);  
  const isDesktop = useMediaQuery("(max-width: 450px)");
  const [retros, setRetros] = useState([]);
  const [posts, setPosts] = useState([]);

  //pagination hook logic
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(4)// max no. of retros per page
  const totalNoOfPages = Math.ceil(retros.length / postsPerPage);//total pages to return
  const indexLastPost = currentPage * postsPerPage;
  const indexFirstPost = indexLastPost - postsPerPage;
  const paginatedPosts = retros.slice(indexFirstPost, indexLastPost) 

  useEffect(() => {
     fetch("/api/retros") 
       .then(res => res.json())
       .then(retros => setRetros(retros.data)) 
       setPosts(retros.slice(indexFirstPost, indexLastPost))
   }, [])
 
  const getMorePosts = () => {
    setTimeout(() => {
      morePosts()
    }, 1000);
  }

  //fetch 4 more posts for infinite scrolling  
  const morePosts = () => {
    const nextRetros = retros.slice(posts.length, posts.length + postsPerPage)
    setPosts(posts.concat(nextRetros))
    setHasMore(posts.length < retros.length)
  }

  if (!loading && !session) {
    return <AccessDenied />
  }

  if (loading) return <div className={HamburgerMenu.loading}> </div>
  if (!retros) return <div className={HamburgerMenu.loading}></div> 

  return (
    <>
      <Navbar />

      {!isDesktop ? <>
        {retros.length === 0 ? <RetroPlaceholder /> :
          <RetroList items={paginatedPosts} numberOfPages={totalNoOfPages} />
        }

        <Pagination
          currentPage={currentPage} 
          pageSize={postsPerPage}
          totalNoOfPages={totalNoOfPages}
          onPageChange={currentPage => setCurrentPage(currentPage)}
        />
      </>
        :
        <>
          {isDesktop &&
            <InfiniteScroll
              pageNumber={0}
              dataLength={posts.length}
              next={getMorePosts}
              hasMore={hasMore}
              loader={<div className={HamburgerMenu.loading}> </div>}
              endMessage={<LoadingRoot style={{ color: 'white' }}>Nothing more to show</LoadingRoot>} >
              <RetroList items={posts} />
            </InfiniteScroll>
          }
        </>
      }

    </>
  );

}

const gradientAnimation = keyframes`
  0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`;

const LoadingRoot = styled.div`
  animation: ${gradientAnimation} 7s linear infinite;
  background: linear-gradient(45deg, #f1c40f,#298fee, #11c958, #a120bb, #d6612a,#16a085, #2c3e50, #f39c12, #95a5a6);
  background-size: 600% 600%;
  color: #fff;
  width: 100%;
  margin-bottom:10px;
  padding: 25px;
`;
