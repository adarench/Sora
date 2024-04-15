from elasticsearch import Elasticsearch

class ESDataLoader:
    def __init__(self, host, index):
        self.client = Elasticsearch(hosts=[host])
        self.index = index

    def fetch_data(self, intent, params):
        query = self.build_query(intent, params)
        response = self.client.search(index=self.index, body=query, size=1000)
        return [hit['_source'] for hit in response['hits']['hits']]

    def build_query(self, intent, params):
        # Build Elasticsearch queries dynamically based on the intent and parameters
        if intent == 'cost_optimization':
            return {
                "query": {
                    "bool": {
                        "must": [
                            {"term": {"service": params.get('service', 'EC2')}},
                            {"range": {"date": {"gte": "now-3M/M", "lte": "now/M"}}}
                        ]
                    }
                }
            }
        return {"query": {"match_all": {}}}

# Example usage
if __name__ == "__main__":
    loader = ESDataLoader("http://localhost:9200", "your_index")
    data = loader.fetch_data("cost_optimization", {"service": "EC2", "date_range": "last quarter"})
    print(data)
