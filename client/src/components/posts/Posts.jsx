import './posts.css'
import { format, formatISO9075 } from 'date-fns';
import { Link } from 'react-router-dom';

const Posts = ({ _id, title, summary, cover, content, createdAt, author }) => {
    return (
        <div className='post'>
            <div className="image">
                <Link to={`/post/${_id}`}>
                    <img src={'http://localhost:5000/' + cover} alt="" />
                </Link>
            </div>
            <div className="content">
                <Link to={`/post/${_id}`}>
                    <h2 >{title}</h2>
                </Link>
                <h4 className="info">
                    <a href="" >{author.username}</a>
                    <time>{format(new Date(createdAt), "MMM d, yyyy HH:mm")}</time>
                </h4>
                <p> {summary}</p>
            </div>

        </div>
    )
}

export default Posts
