# decision_service.py
# Import necessary service classes
from es_data_loader import ESDataLoader
from recommendation_service import RecommendationService
from anomaly_detection_service import AnomalyDetectionService
from compliance_service import ComplianceService
from forecasting_service import ForecastingService

class DecisionService:
    def __init__(self, es_host, es_index):
        self.data_loader = ESDataLoader(es_host, es_index)
        self.recommendation_service = RecommendationService()
        self.anomaly_detection_service = AnomalyDetectionService()
        self.compliance_service = ComplianceService()
        self.forecasting_service = ForecastingService()

    def handle_query(self, intent, params):
        # Fetch data relevant to the intent from Elasticsearch
        data = self.data_loader.fetch_data(intent, params)

        # Decision logic to route to the appropriate model based on intent
        if intent == 'cost_optimization':
            return self.recommendation_service.optimize_costs(data)
        elif intent == 'usage_report':
            return self.recommendation_service.generate_report(data)
        elif intent == 'anomaly_detection':
            return self.anomaly_detection_service.detect(data)
        elif intent == 'compliance_check':
            return self.compliance_service.check_compliance(data)
        elif intent == 'forecasting':
            return self.forecasting_service.perform_forecasting(data)
        else:
            return {'action': 'unknown', 'details': 'No action could be determined for the given intent.'}

# Example usage might be omitted in actual implementation and handled by a controller or handler elsewhere in your system
