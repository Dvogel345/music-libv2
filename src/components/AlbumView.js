import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


const AlbumView = () => {
    const { artist, id } = useParams()
    const [ albumData, setAlbumData ] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const API_URL = `https://itunes.apple.com/lookup?id=${id}&entity=song`

            const response = await fetch(API_URL)
            const resData = await response.json()
            
            setAlbumData(resData.results)
        }
        fetchData()
    }, [artist, id])

    const justSongs = albumData.filter(entry => entry.kind === 'song')

    const renderSongs = justSongs.map((song, i) => {
        return (
            <div key={i}>
                <p>{song.trackCensoredName}</p>
            </div>
        )
    })

    const navButtons = () => {
        return (
            <div>
                <button onClick={() => navigate(-1)}>Back</button>
                <button onClick={() => navigate.push('/')}>Home</button>
            </div>
        )
    }

    return (
        <div>
            {navButtons()}
            {renderSongs}
        </div>
    ) 
}

export default AlbumView
