import React, { useState } from 'react';

function App() {
  const [userDetails, setUserDetails] = useState(null);
  const [boxColor, setBoxColor] = useState('#FFFFFF'); 

  const fetchRandomUser = async () => {
    try {
      const response = await fetch('https://dummyjson.com/users');
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userData = await response.json();
      const randomUserIndex = Math.floor(Math.random() * userData.users.length);
      const randomUser = userData.users[randomUserIndex];
      setUserDetails(randomUser);
      changeBoxColor();
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const changeBoxColor = () => {
    const randomColor = getRandomColor();
    setBoxColor(randomColor);
  };

  const getRandomColor = () => {
    const colors = ['red', 'blue', 'pink', 'green', '#ffeb3b', '#ff9800'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div >
      <h1 className='text-center mt-5'>Random User On Refresh</h1>
      <div style={{width:'100%'}} className='d-flex align-items-center justify-content-center flex-column'>
      <button className='btn btn-danger' onClick={fetchRandomUser}>REFRESH</button>
      <div className='border rounded' style={{ backgroundColor: boxColor, padding: '20px', marginTop: '20px',width:'600px',height:'600px' }}>
        {userDetails && (

        
            <>
          <div className='d-flex align-items-center justify-content-center flex-column p-5'>
              {userDetails.image && <img style={{width:'200px',height:'200px'}} src={userDetails.image} alt="User" />}
              <p style={{fontSize:'25px'}} className='mt-3 fw-bolder'>{userDetails.firstName} {userDetails.lastName}</p>
              <p className=' fw-bolder' style={{marginTop:'-16px'}}>{userDetails.gender}</p>
          </div>

          <div className='d-flex align-items-center justify-content-around'>
              <p>Birth-Date<br />{userDetails.birthDate}</p>
              <p>Age<br />{userDetails.age}</p>
          </div>
          <div className='d-flex align-items-center justify-content-around'>
              <p>Weight<br />{userDetails.weight}</p>
              <p>Height <br />{userDetails.height}</p>
          </div>
          </>
          
        )}
      </div>
      </div>
    </div>
  );
}

export default App;