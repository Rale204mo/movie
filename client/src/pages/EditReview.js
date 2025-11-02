import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditReview() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5); // ⭐ added state for rating
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('/api/reviews')
      .then((r) => {
        const rev = r.data.find((x) => x.id === id);
        if (rev) {
          setTitle(rev.title);
          setContent(rev.content);
          if (rev.rating) setRating(rev.rating);
        }
      })
      .catch(() => {});
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/reviews/' + id, { title, content, rating }); // ⭐ send rating to backend
      alert('Review updated successfully!');
      navigate('/reviews');
    } catch (err) {
      alert('Error updating review.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Review</h2>
      <form onSubmit={submit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            className="form-control"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Review Content</label>
          <textarea
            className="form-control"
            placeholder="Your review"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="5"
            required
          />
        </div>

        {/* ⭐ New Rating Input */}
        <div className="mb-3">
          <label className="form-label">Rating</label>
          <select
            className="form-select"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            required
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n} Star{n > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>

        <button className="btn btn-success">Update Review</button>
      </form>
    </div>
  );
}
