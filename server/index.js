// ----------------- server/index.js -----------------
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const fs = require('fs');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ---------- Firebase Admin Initialization ----------
const keyPath = './serviceAccountKey.json';

if (fs.existsSync(keyPath)) {
  const serviceAccount = require(keyPath);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log('✅ Firebase Admin initialized with service account.');
} else {
  try {
    admin.initializeApp();
    console.warn('⚠️ No serviceAccountKey.json found. Running with default credentials.');
  } catch (e) {
    console.error('❌ Failed to initialize Firebase Admin:', e);
  }
}

const db = admin.firestore();

// ---------- API ROUTES ----------

// Get all reviews
app.get('/api/reviews', async (req, res) => {
  try {
    const snap = await db.collection('reviews').orderBy('createdAt', 'desc').get();
    const reviews = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(reviews);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ error: 'Failed to fetch reviews.' });
  }
});

// Add a new review (with rating)
app.post('/api/reviews', async (req, res) => {
  try {
    const { title, content, author, rating } = req.body;

    if (!title || !content)
      return res.status(400).json({ error: 'Title and content required.' });

    // Rating should be a number (1–5 ideally)
    const safeRating = Number(rating);
    if (isNaN(safeRating) || safeRating < 1 || safeRating > 5)
      return res.status(400).json({ error: 'Rating must be between 1 and 5.' });

    const newReview = {
      title,
      content,
      author: author || 'Anonymous',
      rating: safeRating,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = await db.collection('reviews').add(newReview);
    res.status(201).json({ id: docRef.id, message: 'Review added successfully.', review: newReview });
  } catch (err) {
    console.error('Error adding review:', err);
    res.status(500).json({ error: 'Failed to add review.' });
  }
});

// Update review (including rating)
app.put('/api/reviews/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, rating } = req.body;

    if (!title || !content)
      return res.status(400).json({ error: 'Title and content required.' });

    const updateData = { title, content };
    if (rating !== undefined) {
      const safeRating = Number(rating);
      if (isNaN(safeRating) || safeRating < 1 || safeRating > 5)
        return res.status(400).json({ error: 'Rating must be between 1 and 5.' });
      updateData.rating = safeRating;
    }

    await db.collection('reviews').doc(id).update(updateData);
    res.json({ message: 'Review updated successfully.', id });
  } catch (err) {
    console.error('Error updating review:', err);
    res.status(500).json({ error: 'Failed to update review.' });
  }
});

// Delete review
app.delete('/api/reviews/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('reviews').doc(id).delete();
    res.json({ message: 'Review deleted successfully.', id });
  } catch (err) {
    console.error('Error deleting review:', err);
    res.status(500).json({ error: 'Failed to delete review.' });
  }
});

// ---------- Server Start ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
