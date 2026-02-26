import React, { useEffect, useState } from "react";
import "./App.css";

const API_URL = "https://backend-project-vc5f.onrender.com";

function Products() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [image, setImage] = useState(null);

  const fetchCollections = () => {
    fetch(`${API_URL}/collections`)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !image) {
      alert("Title and Image required");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("image", image);
    try {
      const res = await fetch(`${API_URL}/collections`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      setTitle("");
      setSubtitle("");
      setImage(null);
      fetchCollections();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    try {
      const res = await fetch(`${API_URL}/collections/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      fetchCollections();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="container">
      <h1 className="heading">Our Collection</h1>

      {/* ✅ Upload Card */}
      <div className="upload-card">
        <form className="upload-form" onSubmit={handleSubmit}>
          <h2>Add New Collection</h2>

          <input
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter Subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button type="submit">Upload</button>
        </form>
      </div>

      {/* Cards */}
      <div className="card-wrapper">
        {data.map((item) => (
          <div className="card" key={item._id}>
            <div className="image-wrapper">
              <img
                src={`${API_URL}/uploads/${item.image}`}
                alt={item.title}
                className="card-image"
              />
              <button
                className="delete-btn"
                onClick={() => handleDelete(item._id)}
              >
                ✕
              </button>
            </div>

            <div className="card-content">
              <h2>{item.title}</h2>
              <p>{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;