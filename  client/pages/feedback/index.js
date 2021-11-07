import { useState, useEffect } from 'react';
import { useSession, getSession, signOut } from 'next-auth/client';
import styled, { keyframes } from 'styled-components';
import Navbar from '../../components/Navbar';
import FeedbackPlaceholder from '../../components/retros/RetroPlaceholder'
import FeedbackList from '../../components/feedback/FeedbackList';
import { ArrowRight } from '@styled-icons/bootstrap/ArrowRight'
import { ArrowLeft } from '@styled-icons/bootstrap/ArrowLeft'
import AccessDenied from '../../components/utils/AccessDenied';
import InfiniteScroll from "react-infinite-scroll-component";
import HamburgerMenu from '/styles/HamburgerMenu.module.css'
import useMediaQuery from '../../helpers/useWatchMedia'
/**
 * Feedback index for fetching api data from backend
 * @returns api data and renders pagination and infinite scroll loader for retros 
 */

   const Feedback = () => {
    // const { data, isLoading, isError } = useFeedback();
    const [session, loading] = useSession();
    const [pageNumber, setPageNumber] = useState(1)
    const [postNumber] = useState(4)// max no. of retros per page
    const [feedback, setFeedback] = useState([]);
    const [posts, setPosts] = useState([]);

    const [hasMore, setHasMore] = useState(true);  //is required to call next function and show endMessage
    const isDesktop = useMediaQuery("(max-width: 450px)");

    //pagination hook logic
    const indexLastPost = pageNumber * postNumber;
    const indexFirstPost = indexLastPost - postNumber;
    const paginatedPosts = feedback.slice(indexFirstPost, indexLastPost)
    const numberOfPages = Math.ceil(feedback.length / postNumber);//total pages to return

    useEffect(() => {
        fetch("/api/feedback")
            .then(res => res.json())
            .then(feedback => setFeedback(feedback.data))
        setPosts(feedback.slice(indexFirstPost, indexLastPost))
    }, [])
      
    const getMorePosts = () => {
        setTimeout(() => {
            morePosts()
        }, 1000);
    }

    //fetch 4 more posts for scrolling  
    const morePosts = () => {
        const nextFeedback = feedback.slice(posts.length, posts.length + 4)
        setPosts(posts.concat(nextFeedback))
        setHasMore(posts.length < feedback.length)
    }

    // previous pagination
    const handleBackArrow = () => {
        if (pageNumber === 1) return
        setPageNumber((pageNumber) => Math.min(pageNumber - 1, numberOfPages))
    }

    //next pagination
    const handleNextArrow = () => {
        if (pageNumber === numberOfPages) {
            return numberOfPages;
        }
        setPageNumber((pageNumber) => Math.min(pageNumber + 1, numberOfPages))
    }

    if (!loading && !session) {
        return <AccessDenied />
    }

    if (loading) return <div>Loading...</div>;

    if (!feedback) return <div>Loading...</div>;
    return (
        <>
            <Navbar />

            <Wrapper>
                {!isDesktop ? <>
                    {feedback.length === 0 ?  <FeedbackPlaceholder/> :
                        <FeedbackList items={paginatedPosts} numberOfPages={numberOfPages} />
                    }

                    {<ArrowIconBack style={{
                        height: '65px',
                        width: '85px'
                    }} onClick={handleBackArrow}></ArrowIconBack>}

                    {<ArrowIconRight style={{
                        height: '65px',
                        width: '85px'
                    }} onClick={handleNextArrow}></ArrowIconRight>}
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
                                <FeedbackList items={posts} />
                            </InfiniteScroll>
                        }
                    </>
                }
            </Wrapper>

        </>
    );

}

export default Feedback

const ArrowIconRight = styled(ArrowRight)`
  display: ${({ isMobile }) => (isMobile ? 'none' : 'block')};
  color: black; 
  margin-left: 75vw; 
  margin-top: -5em;
  margin-bottom: 2rem;
`;
const ArrowIconBack = styled(ArrowLeft)`
  display: ${({ isMobile }) => (isMobile ? 'none' : 'block')};
  color: black; 
  margin-left:15vw;  
  margin-bottom:1rem;
`;

const Wrapper = styled.div`
${ArrowIconRight} ,${ArrowIconBack} {
  &:hover,
  &:focus {
    box-shadow: 0 10px 20px -5px rgba(0.7, 1, 1, 0.35);
    border-radius: 100px;
    background-color: ghostwhite;
  }
}
`;

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
