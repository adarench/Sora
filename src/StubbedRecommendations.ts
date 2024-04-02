export type ListRecommendationsCommandItem = {
  accountId: string;
  actionType: string;
  currencyCode: string;
  currentResourceSummary: string;
  currentResourceType: string;
  estimatedMonthlyCost: number;
  estimatedMonthlySavings: number;
  estimatedSavingsPercentage: number;
  implementationEffort: string;
  lastRefreshTimestamp: Date;
  recommendationId: string;
  recommendationLookbackPeriodInDays: number;
  recommendedResourceSummary: string;
  recommendedResourceType: string;
  region: string;
  resourceArn: string;
  resourceId: string;
  restartNeeded: boolean;
  rollbackPossible: boolean;
  source: string;
  tags: { key: string; value: string }[];
};

export type CostRecommendation = ListRecommendationsCommandItem & {
  TerraformScript?: string;
};

const StubbedTerraformScripts = [
  `provider "aws" {
    region = "us-east-1"
  }
  
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_subnet" "main" {
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.1.0/24"
}

resource "aws_security_group" "allow_ssh" {
  name        = "allow_ssh"
  description = "Allow SSH inbound traffic"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "example" {
  ami           = "ami-0c02fb55956c7d316" # Make sure to use the latest AMI for your region
  instance_type = "t3.medium"
  subnet_id     = aws_subnet.main.id
  security_groups = [aws_security_group.allow_ssh.name]

  tags = {
    Name = "ExampleInstance"
  }
}
  `,
];

/*

	•	EC2 (Migrate to Graviton): Potential savings of approximately $1,000 per month (around 2% of total savings).
	•	Lambda (Upgrade): Potential savings of approximately $1,000 per month (around 2% of total savings).
	•	EBS (Rightsize): Potential savings of approximately $1,000 per month (around 2% of total savings).
	•	EC2 Auto Scale (Rightsize): Potential savings of approximately $1,000 per month (around 2% of total savings).
	•	RDS Reserved (Purchase Savings Plan): Potential savings of approximately $2,000 per month (around 4% of total savings).
*/

export const StubbedRecommendations: CostRecommendation[] = [
  {
    accountId: "363894659705",
    actionType: "MigrateToGraviton",
    currencyCode: "USD",
    currentResourceSummary: "t2.medium",
    currentResourceType: "EC2",
    estimatedMonthlyCost: 10.293,
    estimatedMonthlySavings: 3.921,
    estimatedSavingsPercentage: 28,
    implementationEffort: "VeryHigh",
    lastRefreshTimestamp: new Date("2024-01-24T15:00:00Z"),
    recommendationId:
      "MzYzODk0NjU5NzA1XzI0NmI4MzU1LWYyMDYtNDI4NS04NWMxLTk4MzkyNWU4NDA1ZQ==",
    recommendationLookbackPeriodInDays: 14,
    recommendedResourceSummary: "Downsize EC2 instance to t3.medium.",
    recommendedResourceType: "Ec2Instance",
    region: "us-east-1",
    resourceArn:
      "arn:aws:ec2:us-east-1:363894659705:instance/i-09b800f8f4794753d",
    resourceId: "i-09b800f8f4794753d",
    restartNeeded: true,
    rollbackPossible: true,
    source: "ComputeOptimizer",
    tags: [],
    TerraformScript: StubbedTerraformScripts[0],
  },
  {
    recommendationId: "rec-5678efgh",
    accountId: "987654321098",
    region: "eu-west-1",
    resourceId: "i-1a2b3c4d5e6f7g8h",
    resourceArn:
      "arn:aws:ec2:eu-west-1:987654321098:instance/i-1a2b3c4d5e6f7g8h",
    currentResourceType: "CloudWatch Logs",
    recommendedResourceType: "LambdaFunction",
    estimatedMonthlySavings: 50.0,
    estimatedSavingsPercentage: 15,
    estimatedMonthlyCost: 330.0,
    currencyCode: "EUR",
    implementationEffort: "Low",
    restartNeeded: false,
    actionType: "Upgrade",
    rollbackPossible: true,
    currentResourceSummary: "Current Lambda configuration...",
    recommendedResourceSummary:
      "Adjust log retention policies to automatically expire logs that are not needed for compliance. ",
    lastRefreshTimestamp: new Date("2024-01-24T15:00:00Z"),
    recommendationLookbackPeriodInDays: 7,
    source: "ComputeOptimizer",
    tags: [{ key: "Env", value: "Production" }],
  },
  {
    recommendationId: "rec-9abcd123",
    accountId: "123456789012",
    region: "ap-southeast-1",
    resourceId: "vol-1234abcd",
    resourceArn: "arn:aws:ec2:ap-southeast-1:123456789012:volume/vol-1234abcd",
    currentResourceType: "S3 - Standard Storage",
    recommendedResourceType: "EbsVolume",
    estimatedMonthlySavings: 25.75,
    estimatedSavingsPercentage: 30,
    estimatedMonthlyCost: 85.83,
    currencyCode: "USD",
    implementationEffort: "Medium",
    restartNeeded: false,
    actionType: "Rightsize",
    rollbackPossible: true,
    currentResourceSummary: "Current EBS volume configuration...",
    recommendedResourceSummary:
      "Transition to S3 Intelligent-Tiering for data with unknown or changing access patterns to reduce storage costs.",
    lastRefreshTimestamp: new Date("2024-01-23T10:30:00Z"),
    recommendationLookbackPeriodInDays: 30,
    source: "CostExplorer",
    tags: [{ key: "Project", value: "WebAppUpgrade" }],
  },
  {
    recommendationId: "rec-efgh5678",
    accountId: "112233445566",
    region: "us-west-2",
    resourceId: "asg-00112233",
    resourceArn:
      "arn:aws:autoscaling:us-west-2:112233445566:autoScalingGroup:asg-00112233",
    currentResourceType: "RDS - db.t3.large MySQL",
    recommendedResourceType: "Ec2AutoScalingGroup",
    estimatedMonthlySavings: 120.47,
    estimatedSavingsPercentage: 22,
    estimatedMonthlyCost: 547.21,
    currencyCode: "USD",
    implementationEffort: "High",
    restartNeeded: true,
    actionType: "Rightsize",
    rollbackPossible: false,
    currentResourceSummary: "Current Auto Scaling Group configuration...",
    recommendedResourceSummary:
      "Resize the RDS instance to a smaller type during periods of low activity and consider using Reserved Instances for steady-state workloads.",
    lastRefreshTimestamp: new Date("2024-01-26T09:00:00Z"),
    recommendationLookbackPeriodInDays: 60,
    source: "ComputeOptimizer",
    tags: [{ key: "Service", value: "WebServer" }],
  },
  {
    recommendationId: "rec-ijkl91011",
    accountId: "556677889900",
    region: "eu-central-1",
    resourceId: "db-1234abcd",
    resourceArn: "arn:aws:rds:eu-central-1:556677889900:db:db-1234abcd",
    currentResourceType: "Elastic Load Balancer",
    recommendedResourceType: "RdsReservedInstances",
    estimatedMonthlySavings: 230.0,
    estimatedSavingsPercentage: 18,
    estimatedMonthlyCost: 1275.0,
    currencyCode: "EUR",
    implementationEffort: "Medium",
    restartNeeded: false,
    actionType: "PurchaseReservedInstances",
    rollbackPossible: true,
    currentResourceSummary: "Current RDS Reserved Instance configuration...",
    recommendedResourceSummary:
      "Consolidate underutilized load balancers and switch to Application Load Balancer which is more cost-effective than Classic Load Balancer.",
    lastRefreshTimestamp: new Date("2024-01-25T14:00:00Z"),
    recommendationLookbackPeriodInDays: 45,
    source: "CostExplorer",
    tags: [{ key: "Environment", value: "Production" }],
  },
  // More data...
];

// export const StubbedRecommendations: CostRecommendation[] = [
//   {
//     accountId: "363894659705",
//     actionType: "MigrateToGraviton",
//     currencyCode: "USD",
//     currentResourceSummary: "t2.medium",
//     currentResourceType: "Ec2Instance",
//     estimatedMonthlyCost: 10.293,
//     estimatedMonthlySavings: 3.921,
//     estimatedSavingsPercentage: 28,
//     implementationEffort: "VeryHigh",
//     lastRefreshTimestamp: new Date("2024-01-24T15:00:00Z"),
//     recommendationId:
//       "MzYzODk0NjU5NzA1XzI0NmI4MzU1LWYyMDYtNDI4NS04NWMxLTk4MzkyNWU4NDA1ZQ==",
//     recommendationLookbackPeriodInDays: 14,
//     recommendedResourceSummary: "t4g.medium",
//     recommendedResourceType: "Ec2Instance",
//     region: "us-east-1",
//     resourceArn:
//       "arn:aws:ec2:us-east-1:363894659705:instance/i-09b800f8f4794753d",
//     resourceId: "i-09b800f8f4794753d",
//     restartNeeded: true,
//     rollbackPossible: true,
//     source: "ComputeOptimizer",
//     tags: [],
//     TerraformScript: StubbedTerraformScripts[0],
//   },
//   {
//     recommendationId: "rec-5678efgh",
//     accountId: "987654321098",
//     region: "eu-west-1",
//     resourceId: "i-1a2b3c4d5e6f7g8h",
//     resourceArn:
//       "arn:aws:ec2:eu-west-1:987654321098:instance/i-1a2b3c4d5e6f7g8h",
//     currentResourceType: "LambdaFunction",
//     recommendedResourceType: "LambdaFunction",
//     estimatedMonthlySavings: 50.0,
//     estimatedSavingsPercentage: 15,
//     estimatedMonthlyCost: 330.0,
//     currencyCode: "EUR",
//     implementationEffort: "Low",
//     restartNeeded: false,
//     actionType: "Upgrade",
//     rollbackPossible: true,
//     currentResourceSummary: "Current Lambda configuration...",
//     recommendedResourceSummary: "Recommended Lambda configuration...",
//     lastRefreshTimestamp: new Date("2024-01-24T15:00:00Z"),
//     recommendationLookbackPeriodInDays: 7,
//     source: "ComputeOptimizer",
//     tags: [{ key: "Env", value: "Production" }],
//   },
//   {
//     recommendationId: "rec-9abcd123",
//     accountId: "123456789012",
//     region: "ap-southeast-1",
//     resourceId: "vol-1234abcd",
//     resourceArn: "arn:aws:ec2:ap-southeast-1:123456789012:volume/vol-1234abcd",
//     currentResourceType: "EbsVolume",
//     recommendedResourceType: "EbsVolume",
//     estimatedMonthlySavings: 25.75,
//     estimatedSavingsPercentage: 30,
//     estimatedMonthlyCost: 85.83,
//     currencyCode: "USD",
//     implementationEffort: "Medium",
//     restartNeeded: false,
//     actionType: "Rightsize",
//     rollbackPossible: true,
//     currentResourceSummary: "Current EBS volume configuration...",
//     recommendedResourceSummary: "Recommended EBS volume configuration...",
//     lastRefreshTimestamp: new Date("2024-01-23T10:30:00Z"),
//     recommendationLookbackPeriodInDays: 30,
//     source: "CostExplorer",
//     tags: [{ key: "Project", value: "WebAppUpgrade" }],
//   },
//   {
//     recommendationId: "rec-efgh5678",
//     accountId: "112233445566",
//     region: "us-west-2",
//     resourceId: "asg-00112233",
//     resourceArn:
//       "arn:aws:autoscaling:us-west-2:112233445566:autoScalingGroup:asg-00112233",
//     currentResourceType: "Ec2AutoScalingGroup",
//     recommendedResourceType: "Ec2AutoScalingGroup",
//     estimatedMonthlySavings: 120.47,
//     estimatedSavingsPercentage: 22,
//     estimatedMonthlyCost: 547.21,
//     currencyCode: "USD",
//     implementationEffort: "High",
//     restartNeeded: true,
//     actionType: "Rightsize",
//     rollbackPossible: false,
//     currentResourceSummary: "Current Auto Scaling Group configuration...",
//     recommendedResourceSummary:
//       "Recommended Auto Scaling Group configuration...",
//     lastRefreshTimestamp: new Date("2024-01-26T09:00:00Z"),
//     recommendationLookbackPeriodInDays: 60,
//     source: "ComputeOptimizer",
//     tags: [{ key: "Service", value: "WebServer" }],
//   },
//   {
//     recommendationId: "rec-ijkl91011",
//     accountId: "556677889900",
//     region: "eu-central-1",
//     resourceId: "db-1234abcd",
//     resourceArn: "arn:aws:rds:eu-central-1:556677889900:db:db-1234abcd",
//     currentResourceType: "RdsReservedInstances",
//     recommendedResourceType: "RdsReservedInstances",
//     estimatedMonthlySavings: 230.0,
//     estimatedSavingsPercentage: 18,
//     estimatedMonthlyCost: 1275.0,
//     currencyCode: "EUR",
//     implementationEffort: "Medium",
//     restartNeeded: false,
//     actionType: "PurchaseReservedInstances",
//     rollbackPossible: true,
//     currentResourceSummary: "Current RDS Reserved Instance configuration...",
//     recommendedResourceSummary:
//       "Recommended RDS Reserved Instance configuration...",
//     lastRefreshTimestamp: new Date("2024-01-25T14:00:00Z"),
//     recommendationLookbackPeriodInDays: 45,
//     source: "CostExplorer",
//     tags: [{ key: "Environment", value: "Production" }],
//   },
//   // More data...
// ];
