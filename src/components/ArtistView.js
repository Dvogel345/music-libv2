import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";


const ArtistView = () => {
  const { id } = useParams();
  const [artistData, setArtistData] = useState([]);
  // console.log(id)
  const navigate = useNavigate();

  useEffect(() => {
    const API_URL = `https://itunes.apple.com/lookup?id=${id}&entity=album`;
    const fetchData = async () => {
      const response = await fetch(API_URL);
      const resData = await response.json();
      console.log(resData)
      setArtistData(resData.results);
    };
    fetchData();
  }, [id]);

  const justAlbums = artistData.filter(entry => entry.collectionType === 'Album')

  const renderAlbums = justAlbums.map((album, i) => {
    return (
        <div key={i}>
          <Link to={`/album/${album.collectionId}`}>
            <p>{album.collectionName}</p>
          </Link >
        </div>
    )
})

const navButtons = () => {
  return (
      <div>
          <button onClick={() => navigate(-1)}>Back</button>
          <button onClick={() => navigate('/')}>Home</button>
      </div>
  )
}

return (
    <div>
        <h2>The id passed was: {id}</h2>
        <p>Artist Data Goes Here!</p>
        {artistData.length > 0 ? <h2>{artistData[0].artistName}</h2> : <h2>Loading...</h2>}
   
        {navButtons()}
        {renderAlbums}
    </div>
)
};

export default ArtistView;


            
