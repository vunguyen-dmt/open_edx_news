import React from 'react';
import { getPostById } from '../../services/news-service';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import './NewsDetails.scss';

const NewsDetails = () => {
    const [post, setPost] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const params = useParams()
 
    console.log(params);
    
    React.useEffect(() => {
       getPostById(Number(params.slug)).then(response => {
          console.log(response.data)
          setPost(response.data);
          document.title = 'News | ' + response.data.title;
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
          <p><Link to="/">&lt; News</Link></p>
          <h1>{post?.title}</h1>
          <p>{post?.body}</p>
       </div>)
    }
}

export default NewsDetails;