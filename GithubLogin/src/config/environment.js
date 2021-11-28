import Config from 'react-native-config';

const Environment = {
  APP_CLIENT_ID: Config.APP_CLIENT_ID,
  APP_CLIENT_SECRET: Config.APP_CLIENT_SECRET,
  APP_REDIRECT_URI: Config.APP_REDIRECT_URI,
  BASE_URL: 'https://github.com/',
  API_BASE_URL: 'https://api.github.com/',
};

export default Environment;
