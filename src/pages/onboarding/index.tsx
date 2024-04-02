import { CircularProgress } from "@mui/material";
import { Button } from "components/ui/button";
import { Input } from "components/ui/input";
import { InfoIcon } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { Layout } from "~/components/Layout";

/*
  Role ARN arn:aws:im::123456789012:user/
  External ID c625de4b-8ecd-49bc-8f77-11adcbf9cf2c
  Account Name aws-so-1-9
*/
export default function OnboardingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleAddAccount = () => {
    setLoading(true);
    // timeout for 2000ms

    setTimeout(() => {
      void router.push("/dashboard");
    }, 2000);

    // await router.push("/dashboard");
  };

  return (
    <div className="flex h-full items-center justify-center bg-primary text-white">
      <div className="flex w-[600px] flex-col gap-2 text-black">
        {/* <h1>Onboarding</h1> */}
        <div className="flex items-center justify-center gap-2">
          <div className="mr-2 w-[200px] text-right text-white">Role ARN</div>
          <Input
            type="text"
            placeholder="Role ARN"
            value="arn:aws:im::123456789012:user/"
          />
          <InfoIcon className="w-6 text-white" />
        </div>
        <div className="flex items-center gap-2">
          <div className="mr-2 w-[200px] text-right text-white">
            External ID
          </div>

          <Input
            type="text"
            placeholder="External ID"
            value="c625de4b-8ecd-49bc-8f77-11adcbf9cf2c"
          />
          <InfoIcon className="w-6 text-white" />
        </div>

        <div className="flex items-center gap-2">
          <div className="mr-2 w-[200px] text-right text-white">
            Account Name
          </div>

          <Input type="text" placeholder="Account Name" value="aws-so-1-9" />
          <InfoIcon className="w-6 text-white" />
        </div>
        <div className="flex justify-end">
          <Button
            variant="secondary"
            className="mr-[25px] flex w-28 items-center justify-center"
            onClick={() => handleAddAccount()}
          >
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Add Account"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
