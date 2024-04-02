# Import necessary libraries
import pandas as pd
from xgboost import XGBRegressor
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score

# Load your dataset
# Make sure to adjust 'path_to_your_dataset.csv' to the actual path of your dataset
data = pd.read_csv('path_to_your_dataset.csv')

# Assume 'cost' is your target variable and the rest are features
X = data.drop('cost', axis=1)
y = data['cost']

# Split the dataset into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize the XGBRegressor
model = XGBRegressor(
    n_estimators=100,  # Number of trees
    learning_rate=0.1,  # Step size shrinkage
    max_depth=3,  # Depth of tree
    subsample=0.8,  # Subsample ratio of the training instances
    colsample_bytree=0.8,  # Subsample ratio of columns when constructing each tree
    objective='reg:squarederror',  # Loss function
    random_state=42  # Seed
)

# Train the model on the training data
model.fit(X_train, y_train)

# Predict on the testing data
predictions = model.predict(X_test)

# Calculate and print evaluation metrics
mse = mean_squared_error(y_test, predictions)
mae = mean_absolute_error(y_test, predictions)
r2 = r2_score(y_test, predictions)

print(f"Mean Squared Error: {mse}")
print(f"Mean Absolute Error: {mae}")
print(f"R^2 Score: {r2}")

# Hyperparameter tuning
param_grid = {
    'n_estimators': [50, 100, 200],
    'max_depth': [3, 5, 7],
    'learning_rate': [0.01, 0.1, 0.2]
}

search = GridSearchCV(model, param_grid, cv=3, scoring='neg_mean_squared_error')
search.fit(X_train, y_train)

print(f"Best parameters: {search.best_params_}")
model = search.best_estimator_

# Prepare new data for predictions (this is just an example, adjust according to your actual features)
# Make sure the columns match those in your original dataset
X_new = pd.DataFrame([[0.5, 0.2, 300]], columns=['cpu_utilization', 'memory_usage', 'network_traffic'])

# Make predictions with the tuned model
forecast = model.predict(X_new)

print(f"Forecasted values: {forecast}")
