try {
  const response = await fetch('http://localhost:4200/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message: 'Hello' })
  });
  console.log('Status:', response.status);
  const data = await response.json();
  console.log('Response JSON:', data);
} catch (error) {
  console.error('Error connecting to local server:', error.message);
}
