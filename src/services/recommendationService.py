# model integration point, raw input to insight*/

from AWSDataService import AWSDataService
from anomalyDetectionService import AnomalyDetectionService
from forecastingService import ForecastingService
import uuid

class RecommendationService:
    def __init__(self):
        self.aws_data_service = AWSDataService()
        self.anomaly_detection_service = AnomalyDetectionService()
        self.forecasting_service = ForecastingService()

    def generate_recommendations(self):
        """Generate personalized cost-saving recommendations."""
        # Fetch AWS data
        aws_usage_data = self.aws_data_service.fetch_data()

        # Detect anomalies
        anomalies = self.anomaly_detection_service.detect(aws_usage_data)

        # Forecast future usage/cost
        forecast = self.forecasting_service.forecast(aws_usage_data)

        # Generate recommendations based on anomalies and forecasts
        recommendations = []

        # Example: Generate a recommendation based on detected anomalies
        for anomaly in anomalies:
            recommendations.append({
                'id': self.generate_unique_id(),
                'type': 'Anomaly',
                'description': f"Anomaly detected in {anomaly['resource']}. Consider reviewing usage patterns.",
                'details': anomaly
            })

        # Example: Generate a recommendation based on forecasted cost savings
        if forecast['potential_savings'] > 0:
            recommendations.append({
                'id': self.generate_unique_id(),
                'type': 'Cost Saving',
                'description': f"Forecasting analysis suggests a potential cost saving of {forecast['potential_savings']}. Consider optimizing resources.",
                'details': forecast
            })

        return recommendations

    @staticmethod
    def generate_unique_id():
        """Generate a unique ID for each recommendation."""
        return str(uuid.uuid4())

# Example usage
if __name__ == "__main__":
    service = RecommendationService()
    recommendations = service.generate_recommendations()
    for recommendation in recommendations:
        print(recommendation)
