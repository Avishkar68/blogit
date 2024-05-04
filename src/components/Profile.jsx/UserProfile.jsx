import React, { useEffect, useState } from 'react';
import { auth } from '../../Firebase/FirebaseConfig';

const UserProfile = () => {
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    });

    // Unsubscribe from the auth observer when component unmounts
    return unsubscribe;
  }, []);

  return (
    <div>
      {userEmail ? (
        <p>User Email: {userEmail}</p>
      ) : (
        <p>User not logged in</p>
      )}
    </div>
  );
};

export default UserProfile;
