import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
const AddSong = () => {
  const [name, setName] = useState("");
  const [path, setPath] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newSong = { name, path, id };

    try {
      const response = await fetch("http://localhost:3000/songs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSong),
      });

      if (response.ok) {
        alert("Song added successfully!");
        setName("");
        setPath("");
        setId("");
        navigate("/getall");
      } else {
        alert("Failed to add song.");
      }
    } catch (error) {
      console.error("Error adding song:", error);
      alert("An error occurred while adding the song.");
    }
  };

  
  const styles = `
    .add-song-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #121212;
      height: 100vh;
      color: #fff;
    }

    h1 {
      font-size: 2rem;
      color: #fff;
      margin-bottom: 20px;
    }

    form {
      background-color: #1e1e1e;
      padding: 20px;
      border-radius: 8px;
      width: 100%;
      max-width: 400px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    }

    .form-group {
      margin-bottom: 15px;
    }

    .form-group label {
      display: block;
      font-size: 1rem;
      color: #bbb;
      margin-bottom: 5px;
    }

    .form-group input {
      width: 100%;
      padding: 10px;
      background-color: #333;
      border: 1px solid #444;
      border-radius: 4px;
      color: #fff;
      font-size: 1rem;
    }

    .form-group input:focus {
      outline: none;
      border-color: #007bff;
    }

    button {
      padding: 10px 20px;
      font-size: 1rem;
      background-color: #007bff;
      border: none;
      border-radius: 4px;
      color: #fff;
      cursor: pointer;
      width: 100%;
      margin-top: 20px;
      transition: background-color 0.3s;
    }

    button:hover {
      background-color: #0056b3;
    }

    .alert {
      background-color: #28a745;
      color: white;
      padding: 10px;
      border-radius: 4px;
      text-align: center;
    }

    .error {
      background-color: #dc3545;
      color: white;
      padding: 10px;
      border-radius: 4px;
      text-align: center;
    }
  `;

  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);

  return (
    <div className="add-song-container">
      <h1>Add New Song</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Song Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="path">Song Path</label>
          <input
            type="text"
            id="path"
            value={path}
            onChange={(e) => setPath(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="id">Song ID</label>
          <input
            type="number"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Song</button>
      </form>
    </div>
  );
};

export default AddSong;
    