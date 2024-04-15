import openai

class IntentProcessor:
    def __init__(self, openai_api_key):
        openai.api_key = openai_api_key

    def extract_intent(self, query):
        response = openai.Completion.create(
            engine="davinci",
            prompt=query,
            max_tokens=50
        )
        # Assuming the response text directly maps to intent and parameters
        # This parsing might be more complex depending on the output format
        text = response.choices[0].text.strip()
        intent, params = self.parse_response(text)
        return intent, params

    def parse_response(self, text):
        # Placeholder: Implement logic based on how response text formats intent and parameters
        # Example:
        if "cost optimization" in text:
            return "cost_optimization", {"service": "EC2", "date_range": "last quarter"}
        return "unknown", {}

# Example usage
if __name__ == "__main__":
    processor = IntentProcessor("your-openai-api-key")
    query = "I need a cost optimization report for EC2 last quarter."
    intent, params = processor.extract_intent(query)
    print("Intent:", intent)
    print("Parameters:", params)
