import {Link} from 'react-router-dom'

const VideoCard = props => {
  const {each} = props
  const {name, logoUrl, id} = each
  return (
    <li>
      <Link to={`/courses/${id}`}>
        <img src={logoUrl} alt={name} />
        <p>{name}</p>
      </Link>
    </li>
  )
}

export default VideoCard
