import React from 'react';
import { getPostById } from '../../services/news-service';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import './NewsDetails.scss';
import Config from '../../Config';
import messages from '../../messages/messages';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';

const NewsDetails = ({ intl }) => {
    const [post, setPost] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [hasError, setHasError] = React.useState(false);

    const params = useParams()
 
    console.log(params);
    
    React.useEffect(() => {
       getPostById(Number(params.slug)).then(response => {
          console.log(response.data)
          setPost(response.data);
          document.title = intl.formatMessage(messages['News']) + ' | ' + response.data.title;
          setLoading(false);
       }).catch(err => {
          setHasError(true);
          setLoading(false);
       });
    }, [params.id])
 
    if (loading) {
       return(         
          <div className="d-flex justify-content-center mt-3">
             <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden"></span>
             </div>
          </div>   
       )
    } else {
       return (
       <div className='container mt-3 details'>
          <p><Link to={Config().subRoute}>&lt; {intl.formatMessage(messages['News'])}</Link></p>
          <h1>{post?.title}</h1>
          <p>{post?.body}</p>
          {hasError && <div className='text-center'>{intl.formatMessage(messages['Post not found'])}.</div>}
       </div>)
    }
}

NewsDetails.propTypes = {
   intl: intlShape.isRequired,
 };

export default injectIntl(NewsDetails);