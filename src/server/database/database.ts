import { Client } from '@elastic/elasticsearch';

// Decoded Elasticsearch endpoint
const elasticsearchEndpoint = 'https://a499015b410647109b93d25d55fb430d.us-central1.gcp.cloud.es.io'; // Replace this with your decoded endpoint

// Elasticsearch API key
const apiKey = 'Njg3ZmY4Y2UtOTNiMS00OWUzLWE1ZTgtNDg2OGQwYzZlZTMxOmY1YjQ3MjgwLWJjNzQtNGFkZC1hZDg2LWYzNzgyMTEyY2MwZQ=='; // Replace 'your-api-key' with your actual API key

// Create Elasticsearch client with API key authentication
const client = new Client({ 
    node: elasticsearchEndpoint,
    auth: {
        apiKey,
    }
});

// Test the connection
async function testConnection() {
    try {
        const response = await client.ping();
        if (response) {
            console.log('Elasticsearch cluster is running');
        } else {
            console.error('Elasticsearch cluster is not running');
        }
    } catch (error) {
        console.error('Error connecting to Elasticsearch:', error);
    }
}

testConnection();
