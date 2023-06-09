import React from 'react';
import { memo } from "react";
import { getPosts } from '../../services/news-service';
import './NewsList.scss';
import { Link } from "react-router-dom";

const NewsList = () => {
    const [posts, setPosts] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [loading, setLoading] = React.useState(true);
 
    const pageSize = 10;
 
    React.useEffect(() => {
      document.title = 'News';
       getPosts(page, pageSize).then(response => {
          console.log(response);
          setPosts(response.data);
          setLoading(false);
       });
    }, [page])
 
    const getNewPosts = (selectedPage) => {
       setPage(selectedPage);
    }
 
    if(loading) {
       return(         
          <div className="d-flex justify-content-center mt-3">
             <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden"></span>
             </div>
          </div>   
       )
      
    } else {
       return (
          <div className='container mt-3'>
             <div className='fw-bold'>Posts:</div>
             <div className='post-list'>
                {posts.map((p,i) => <p key={p.id}>{(page-1) * pageSize + i + 1}. <Link to={'/' + p.id}>{p.title}</Link></p>)}
             </div>
             <nav aria-label="Page navigation example">
                <ul className="pagination">
                   <li className={page === 1 ?'page-item disabled' : 'page-item'}>
                      <a className="page-link" aria-disabled={page === 1 ? true : false} aria-label="Previous" onClick={() => getNewPosts(Math.max(1,page - 1))}>
                      <span aria-hidden="true">Previous</span>
                      </a>
                   </li>
                   <li className={page === 3 ?'page-item disabled' : 'page-item'}>
                      <a className="page-link"  aria-disabled={page === 3 ? true : false} aria-label="Next" onClick={() => getNewPosts(Math.min(3,page + 1))}>
                      <span aria-hidden="true">Next</span>
                      </a>
                   </li>
                </ul>
               </nav>
          </div>
       )
    }
}

export default memo(NewsList);