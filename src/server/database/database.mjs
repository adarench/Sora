import { Client } from '@elastic/elasticsearch';
import config from 'config';

// Load the elastic configuration
const elasticConfig = config.get('elastic');
console.log(elasticConfig)

// Check if the configuration is loaded properly
if (!elasticConfig) {
  console.error('Elasticsearch configuration is missing or invalid.');
  process.exit(1); // Exit the process if configuration is missing or invalid
}

// Create Elasticsearch client after configuration is loaded
const client = new Client({
  cloud: {
    id: elasticConfig.cloudID
  },
  auth: {
    username: elasticConfig.username,
    password: elasticConfig.password
  }
});

// Now you can use the Elasticsearch client
client.info()
  .then(response => console.log(response))
  .catch(error => console.error(error));
