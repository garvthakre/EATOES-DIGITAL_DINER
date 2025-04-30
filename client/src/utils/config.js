 
const config = {
    apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    environment: process.env.NODE_ENV || 'development',
    isProduction: process.env.NODE_ENV === 'production',
    appName: 'Digital Diner'
  };
  
  export default config;