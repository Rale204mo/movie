import React, { useEffect, useState } from 'react';
import { auth, doSignOut } from '../firebase';

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(setUser);
    return () => unsub && unsub();
  }, []);

  if (!user) {
    return <p className="text-muted text-center mt-5">Not signed in</p>;
  }

  // Generate initials
  const initials =
    (user.displayName
      ? user.displayName
          .split(' ')
          .map((n) => n[0])
          .join('')
      : user.email[0]
    ).toUpperCase();

  // Generate consistent color from name or email
  const getColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 50%)`; // bright but balanced color
  };

  const avatarColor = getColor(user.email || user.displayName || 'user');

  return (
    <div className="container mt-4 text-center">
      <h2 className="mb-3">Profile</h2>

      <div
        style={{
          width: 100,
          height: 100,
          borderRadius: '50%',
          overflow: 'hidden',
          background: user.photoURL ? 'transparent' : avatarColor,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 36,
          fontWeight: 'bold',
          color: '#fff',
          boxShadow: '0 0 10px rgba(0,0,0,0.2)',
        }}
      >
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt="Profile"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          initials
        )}
      </div>

      <p className="mt-3">
        <strong>{user.displayName || 'Anonymous User'}</strong>
        <br />
        <span className="text-muted">{user.email}</span>
      </p>

      <button className="btn btn-outline-danger mt-2" onClick={doSignOut}>
        Sign Out
      </button>
    </div>
  );
}
