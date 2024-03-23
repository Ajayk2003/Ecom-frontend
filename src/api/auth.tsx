
const getUserInfo = async () => {
  try { // Improved error handling using try-catch block
    const token = localStorage.getItem('token')
    const res = await fetch('http://localhost:5002/api/users/current', {
      body: JSON.stringify({ token }),
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    if (res.ok) {
      setUserData(data); // Store the user info in state
    } else {
      console.error('Error fetching user info:', data.message);
    }
  } catch (error) { // Catch unexpected errors
    console.error('An unexpected error occurred:', error);
    // Handle unexpected errors appropriately (e.g., display a generic error message)
  }
};