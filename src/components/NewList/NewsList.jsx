import React from 'react';
import { getPosts } from '../../services/news-service';
import './NewsList.scss';
import { Link } from "react-router-dom";
import Config from '../../Config';
import messages from '../../messages/messages';
import { injectIntl, intlShape  } from '@edx/frontend-platform/i18n';

const NewsList = ({ intl }) => {
   console.log(intl)
    const [posts, setPosts] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [loading, setLoading] = React.useState(true);
 
    const pageSize = 10;
 
    React.useEffect(() => {
      document.title = intl.formatMessage(messages['News']);
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
             <h1 className='text-center'>{intl.formatMessage(messages['News'])}</h1>
             <div className='post-list'>
                {posts.map((p,i) => <p key={p.id}>{(page-1) * pageSize + i + 1}. <Link to={Config().subRoute + '/' + p.id}>{p.title}</Link></p>)}
             </div>
             <nav aria-label="Page navigation example">
                <ul className="pagination">
                   <li className={page === 1 ?'page-item disabled' : 'page-item'}>
                      <a className="page-link" aria-disabled={page === 1 ? true : false} aria-label="Previous" onClick={() => getNewPosts(Math.max(1,page - 1))}>
                      <span aria-hidden="true">{intl.formatMessage(messages['Previous'])}</span>
                      </a>
                   </li>
                   <li className={page === 10 ?'page-item disabled' : 'page-item'}>
                      <a className="page-link"  aria-disabled={page === 3 ? true : false} aria-label="Next" onClick={() => getNewPosts(Math.min(10,page + 1))}>
                      <span aria-hidden="true">{intl.formatMessage(messages['Next'])}</span>
                      </a>
                   </li>
                </ul>
               </nav>
          </div>
       )
    }
}

NewsList.propTypes = {
   intl: intlShape.isRequired,
 };

export default injectIntl(NewsList);
