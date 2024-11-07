import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const GetAll = () => {
  const apiURL = "http://localhost:3000/songs";
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(apiURL)
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/songs/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Song deleted successfully!");
        setData(data.filter((song) => song.id !== id));  
      } else {
        alert("Failed to delete song.");
      }
    } catch (error) {
      console.error("Error deleting song:", error);
      alert("An error occurred while deleting the song.");
    }
  };

  const formattedData = data.map((song) => {
    return (
      <div className="song-item" key={song.id}>
        <div className="song-info">
          <p className="song-name">{song.name}</p>
          <p className="song-id">{song.id}</p>
        </div>
        <div>
          <Link to={`/songs/${song.id}`} className="btn btn-primary">
            Play
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(song.id)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  });

  const styles = `
    body {
      background-color: #121212;  /* Dark background */
      color: #fff;  /* Light text color */
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }

    h1 {
      text-align: center;
      color: #ddd;
      margin-top: 20px;
    }

    .song-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      border-bottom: 1px solid #444;  /* Dark border */
      margin-bottom: 8px;
      background-color: #1e1e1e;  /* Slightly lighter background for song items */
      border-radius: 6px;
    }

    .song-info {
      display: flex;
      flex-direction: column;
    }

    .song-name {
      font-size: 16px;
      font-weight: 600;
      color: #fff;  /* White text for song name */
      margin: 0;
    }

    .song-id {
      font-size: 12px;
      color: #bbb;  /* Lighter gray for the song ID */
      margin: 0;
    }

    .btn {
      padding: 8px 16px;
      font-size: 14px;
      border-radius: 4px;
      cursor: pointer;
      margin-left: 10px;
      transition: background-color 0.3s ease;
    }

    .btn-primary {
      color: #fff;
      background-color: #007bff;
      border: none;
    }

    .btn-primary:hover {
      background-color: #0056b3;
    }

    .btn-danger {
      color: #fff;
      background-color: #dc3545;
      border: none;
    }

    .btn-danger:hover {
      background-color: #c82333;
    }

    .add-song-button {
      display: block;
      margin: 20px auto;
      padding: 10px 20px;
      font-size: 16px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    .add-song-button:hover {
      background-color: #0056b3;
    }
  `;

  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);

  return (
    <>
      <h1>All Songs</h1>
      {formattedData}
      <Link to="/add-song">
        <button className="add-song-button">Add Song</button>
      </Link>
    </>
  );
};

export default GetAll;
