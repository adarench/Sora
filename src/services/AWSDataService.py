import json
import boto3
from elasticsearch import Elasticsearch, RequestsHttpConnection
from requests_aws4auth import AWS4Auth

def lambda_handler(event, context):
    # AWS setup
    region = 'us-east-1'  # Specify your AWS region
    service = 'es'
    credentials = boto3.Session().get_credentials()
    awsauth = AWS4Auth(credentials.access_key, credentials.secret_key, region, service, session_token=credentials.token)

    # Elasticsearch client setup
    es_host = 'your-elasticsearch-domain'  # Elasticsearch domain endpoint
    es = Elasticsearch(
        hosts=[{'host': es_host, 'port': 443}],
        http_auth=awsauth,
        use_ssl=True,
        verify_certs=True,
        connection_class=RequestsHttpConnection
    )

    s3 = boto3.client('s3')

    # Process each record from the S3 event
    for record in event['Records']:
        bucket_name = record['s3']['bucket']['name']
        key = record['s3']['object']['key']

        # Get the object from S3
        response = s3.get_object(Bucket=bucket_name, Key=key)
        body = response['Body'].read()
        document = json.loads(body.decode('utf-8'))  # Assuming the file is JSON and UTF-8 encoded

        # Index document into Elasticsearch
        es.index(index='your-index', doc_type='_doc', id=key, body=document)

    return {
        'statusCode': 200,
        'body': json.dumps('Data processed successfully')
    }
