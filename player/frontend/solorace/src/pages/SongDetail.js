import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

const SongDetail = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [song, setSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const audioRef = useRef(null);

  const imageUrls = [
    'https://cdn.mos.cms.futurecdn.net/2uCFgX5ZuKxE57jRERM6K3-1200-80.png.webp',
    'https://cdn.mos.cms.futurecdn.net/bpjQqua2XXbbYMJwhdNm8S-1200-80.jpg.webp',
    'https://cdn.mos.cms.futurecdn.net/e8abf5651bdae5c3199bd0220359378a-1200-80.jpg.webp',
    'https://cdn.mos.cms.futurecdn.net/dcd23479c38e7e6342630f0cddd722df-1200-80.jpg.webp',
    'https://cdn.mos.cms.futurecdn.net/a8089cff0cae91f7c3606c56d5681969-1200-80.jpg.webp',
    'https://cdn.mos.cms.futurecdn.net/c1014820fcc07be8dbec0b185e2449e9-1200-80.jpg.webp',
    'https://cdn.mos.cms.futurecdn.net/9fcb5e54cf9efef3634c8938ad1d2292-1200-80.jpg.webp',
    'https://cdn.mos.cms.futurecdn.net/52ddfc3199785c5a96b06dd0c028be92-1200-80.jpg.webp',
    'https://cdn.mos.cms.futurecdn.net/jyjxbD8GvmqNnZK6YH7UYB-1200-80.jpg.webp'
  ];

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    return imageUrls[randomIndex];
  };

  useEffect(() => {
    fetch(`http://localhost:3000/songs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSong(data);
        setImageUrl(getRandomImage()); 
      })
      .catch((error) => console.error('Error fetching song:', error));
  }, [id]);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const newTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleNext = () => {
    fetch(`http://localhost:3000/songs/${(parseInt(id) + 1) % 10 || 1}`)
      .then((res) => res.json())
      .then((data) => {
        setSong(data);
        setImageUrl(getRandomImage());
        navigate(`/songs/${data.id}`);
        audioRef.current.play(); 
        setIsPlaying(true);
      })
      .catch((error) => console.error('Error fetching next song:', error));
  };

  const handlePrevious = () => {
    if (parseInt(id) > 1) {
      fetch(`http://localhost:3000/songs/${(parseInt(id) - 1) || 10}`) // Assuming 10 songs total, adjust as necessary
        .then((res) => res.json())
        .then((data) => {
          setSong(data);
          setImageUrl(getRandomImage()); 
          navigate(`/songs/${data.id}`); 
          audioRef.current.play(); 
          setIsPlaying(true); 
                })
        .catch((error) => console.error('Error fetching previous song:', error));
    }
  };

  return (
    <div className="song-detail-container">
      {imageUrl && (
        <div className="image-box">
          <img src={imageUrl} alt="Song Artwork" className="song-image" />
        </div>
      )}

      <h2 className="song-name">{song ? song.name : 'Loading...'}</h2>

      {song ? (
        <>
          <audio
            ref={audioRef}
            src={`http://localhost:3000/songs/${song.path}`}
            onTimeUpdate={handleTimeUpdate}
          />
          <div className="audio-controls">
            <div className="progress-bar-container">
              <input
                type="range"
                min="0"
                max="100"
                value={(currentTime / duration) * 100 || 0}
                onChange={handleSeek}
                className="progress-bar"
              />
            </div>
            <div className="control-buttons">
              <button onClick={handlePrevious} className="prev-button">Previous</button>
              <button onClick={handlePlayPause} className="play-pause-button">
                {isPlaying ? 'Pause' : 'Play'}
              </button>
              <button onClick={handleNext} className="next-button">Next</button>
            </div>
          </div>
          <div className="time-display">
            <span>{formatTime(currentTime)}</span> / <span>{formatTime(duration)}</span>
          </div>
        </>
      ) : (
        <p>Loading song details...</p>
      )}

      <style jsx>{`
        .song-detail-container {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          background-color: #121212;
          color: #fff;
          padding: 20px;
          height: 100vh;
        }

        .image-box {
          width: 200px;
          height: 200px;
          background-color: #444;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 20px;
          border-radius: 10px;
        }

        .song-image {
          max-width: 100%;
          max-height: 100%;
          border-radius: 8px;
        }

        .song-name {
          font-size: 24px;
          font-weight: bold;
          text-align: center;
          margin-bottom: 15px;
        }

        .audio-controls {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 20px;
        }

        .progress-bar-container {
          width: 100%;
          margin: 10px 0;
        }

        .progress-bar {
          width: 100%;
          height: 5px;
          -webkit-appearance: none;
          background-color: #333;
          border-radius: 5px;
          outline: none;
        }

        .progress-bar::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 15px;
          width: 15px;
          border-radius: 50%;
          background: #ff5722;
        }

        .control-buttons {
          display: flex;
          justify-content: center;
          margin-top: 10px;
        }

        .play-pause-button, .prev-button, .next-button {
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          padding: 10px 20px;
          margin: 0 10px;
          cursor: pointer;
        }

        .play-pause-button:hover, .prev-button:hover, .next-button:hover {
          background-color: #0056b3;
        }

        .time-display {
          font-size: 14px;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};

export default SongDetail;
