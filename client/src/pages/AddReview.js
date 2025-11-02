import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../firebase';

export default function AddReview() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(u => setUser(u));
    return () => unsub && unsub();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!user) return alert('You must be logged in to submit a review.');

    try {
      const author = user.displayName || user.email;
      await axios.post('/api/reviews', { title, content, author, rating });
      alert('Review submitted successfully!');
      setTitle('');
      setContent('');
      setRating(5);
    } catch (err) {
      alert('Error submitting review.');
      console.error(err);
    }
  };

  if (!user) {
    return <p className="text-muted">Please log in to add a review.</p>;
  }

  return (
    <div>
      <h2>Add Review</h2>
      <form onSubmit={submit}>
        <div className="mb-3">
          <input
            className="form-control"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="Your review"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="4"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Rating (1–5 ⭐):</label>
          <select
            className="form-select"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((r) => (
              <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>

        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}
