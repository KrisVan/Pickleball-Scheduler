import { useParams } from 'react-router-dom'

export default function Profile() {
    const { username } = useParams()
    return(
        <div>
            <h2> Profile of {username} </h2>
        </div>
    )
}