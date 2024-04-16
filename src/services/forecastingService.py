import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from xgboost import XGBRegressor
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
from sklearn.preprocessing import PolynomialFeatures

# Load your dataset
data = pd.read_csv('/Users/adarench/Downloads/archive-7/AmazonDynamoDB.csv')  # Adjust the path as necessary

# Replace 'inf' with NaN and then fill with a large fixed value
data.replace([np.inf, -np.inf], np.nan, inplace=True)
data.fillna(1e9, inplace=True)  # Adjust this value based on your data

# Handle categorical columns with one-hot encoding
categorical_columns = ['TermType', 'LeaseContractLength', 'PurchaseOption', 'OfferingClass', 
                       'Product Family', 'serviceCode', 'Location', 'Location Type', 
                       'Volume Type', 'Group', 'Group Description', 'usageType', 'operation', 
                       'serviceName']
data = pd.get_dummies(data, columns=categorical_columns)

# Add polynomial features to capture non-linear interactions
poly = PolynomialFeatures(degree=2, include_bias=False)
numeric_features = data.select_dtypes(include=[np.number]).columns
data_poly = poly.fit_transform(data[numeric_features])
data_poly = pd.DataFrame(data_poly, columns=poly.get_feature_names_out(numeric_features))

# Define features (X) and target (y) using the polynomial features DataFrame
X = data_poly.drop('PricePerUnit', axis=1, errors='ignore')  # Make sure 'PricePerUnit' is in your DataFrame
y = data['PricePerUnit'].astype(float)

# Split the dataset into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize and tune the XGBRegressor
model = XGBRegressor(
    n_estimators=200,
    learning_rate=0.05,
    max_depth=4,
    subsample=0.9,
    colsample_bytree=0.9,
    objective='reg:squarederror',
    random_state=42
)

# Train the model
model.fit(X_train, y_train)

# Predict and evaluate
predictions = model.predict(X_test)
mse = mean_squared_error(y_test, predictions)
mae = mean_absolute_error(y_test, predictions)
r2 = r2_score(y_test, predictions)

# Output results
print(f"Mean Squared Error: {mse}")
print(f"Mean Absolute Error: {mae}")
print(f"R^2 Score: {r2}")

# Plot actual vs predicted values
plt.figure(figsize=(10, 6))
plt.scatter(y_test, predictions, alpha=0.5, color='red')
plt.plot(y_test, y_test, color='blue')
plt.title('Actual vs Predicted Costs')
plt.xlabel('Actual Costs')
plt.ylabel('Predicted Costs')
plt.legend(['Actual', 'Predicted'])
plt.grid(True)
plt.show()
