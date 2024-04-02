import { useState } from "react";
import { api } from "~/utils/api";

const AWSPage = () => {
  const [ec2Instances, setEc2Instances] = useState({});
  const getEC2Instances = api.aws.getEC2Instances.useMutation();
  const listRecommendationsCommand =
    api.aws.listRecommendationsCommand.useMutation();
  const getRecommendationCommand =
    api.aws.getRecommendationCommand.useMutation();

  const handleGetEC2Instances = async () => {
    const response = await getEC2Instances.mutateAsync({});
    setEc2Instances(response);
    console.log(response);
  };

  const handleListRecommendationsCommand = async () => {
    const response = await listRecommendationsCommand.mutateAsync({});
    console.log(response);
  };

  const handleGetRecommendationCommand = async () => {
    const response = await getRecommendationCommand.mutateAsync({
      recommendationId:
        "MzYzODk0NjU5NzA1XzI0NmI4MzU1LWYyMDYtNDI4NS04NWMxLTk4MzkyNWU4NDA1ZQ==",
    });
    console.log(response);
  };

  return (
    <div>
      <h1>AWS</h1>
      <button onClick={async () => await handleGetEC2Instances()}>
        Get EC2 Instances
      </button>
      <br />
      <button onClick={async () => await handleListRecommendationsCommand()}>
        List Recommendations
      </button>
      <br />
      <button onClick={async () => await handleGetRecommendationCommand()}>
        Get Recommendation
      </button>
    </div>
  );
};

export default AWSPage;
