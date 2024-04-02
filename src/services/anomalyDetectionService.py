# anomaly detection model

from sklearn.ensemble import IsolationForest
import pandas as pd

df = pd.read_csv('path_to_your_data.csv')

# Initialize Isolation Forest
iso_forest = IsolationForest(n_estimators=100, contamination='auto', random_state=42)

iso_forest.fit(df[['cpu_utilization', 'disk_reads', 'disk_writes', 'network_in', 'network_out']])

df['anomaly'] = iso_forest.predict(df[['cpu_utilization', 'disk_reads', 'disk_writes', 'network_in', 'network_out']])

anomalies = df[df['anomaly'] == -1]
print(anomalies)

#-1 indicates an anomaly 1 indicates normal


