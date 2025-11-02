import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { auth } from '../firebase';
import { Link } from 'react-router-dom';

export default function Reviews(){
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(()=> {
    const unsub = auth.onAuthStateChanged(u=> setUser(u));
    axios.get('/api/reviews').then(r=> setReviews(r.data)).catch(()=>{});
    return ()=> unsub && unsub();
  },[]);

  const remove = async (id) => {
    if(!window.confirm('Delete review?')) return;
    try{
      await axios.delete('/api/reviews/'+id);
      setReviews(reviews.filter(r=> r.id!==id));
    }catch(e){ alert('Delete failed'); }
  };

  return (
    <div>
      <h2>All Reviews</h2>
      <div className="row">
        {reviews.length===0 && <p className="text-muted">No reviews yet.</p>}
        {reviews.map(r=>(
          <div className="col-md-6" key={r.id}>
            <div className="card card-custom mb-3 p-3">
              <h5>{r.title}</h5>
              <p className="text-muted small">By {r.author || 'Anonymous'}</p>
              <p>{r.content}</p>
              
              {user && (user.displayName===r.author || user.email===r.author) && (
                <div>
                  <Link to={'/edit/'+r.id} className="btn btn-sm btn-outline-light me-2">Edit</Link>
                  <button className="btn btn-sm btn-danger" onClick={()=>remove(r.id)}>Delete</button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
