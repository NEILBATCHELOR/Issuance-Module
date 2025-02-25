import { useState } from "react";
import OnboardingLayout from "./OnboardingLayout";
import AccountRegistration from "./IssuerSteps/AccountRegistration";
import TwoFactorAuth from "./IssuerSteps/TwoFactorAuth";
import OrganizationInfo from "./IssuerSteps/OrganizationInfo";
import ComplianceInfo from "./IssuerSteps/ComplianceInfo";
import WalletSetup from "./IssuerSteps/WalletSetup";
import FinalReview from "./IssuerSteps/FinalReview";

export default function IssuerOnboarding() {
  const [step, setStep] = useState(1);
  const totalSteps = 6;

  const renderStep = () => {
    switch (step) {
      case 1:
        return <AccountRegistration onNext={() => setStep(2)} />;
      case 2:
        return (
          <TwoFactorAuth onBack={() => setStep(1)} onNext={() => setStep(3)} />
        );
      case 3:
        return (
          <OrganizationInfo
            onBack={() => setStep(2)}
            onNext={() => setStep(4)}
          />
        );
      case 4:
        return (
          <ComplianceInfo onBack={() => setStep(3)} onNext={() => setStep(5)} />
        );
      case 5:
        return (
          <WalletSetup onBack={() => setStep(4)} onNext={() => setStep(6)} />
        );
      case 6:
        return (
          <FinalReview
            onBack={() => setStep(5)}
            onNext={() => console.log("Submit")}
          />
        );
    }
  };

  const stepTitles = [
    "Welcome & Account Registration",
    "Email Verification & 2FA",
    "Organization Details & Legal Setup",
    "Compliance & Due Diligence",
    "SPV Wallet & Smart Contract Setup",
    "Final Review & Approval",
  ];

  const stepDescriptions = [
    "Register and begin your issuer onboarding",
    "Verify your email and set up two-factor authentication",
    "Provide organization details and legal documentation",
    "Complete compliance checks and due diligence",
    "Set up your SPV wallet and configure smart contracts",
    "Review all details and submit for approval",
  ];

  return (
    <OnboardingLayout
      currentStep={step}
      totalSteps={totalSteps}
      title={stepTitles[step - 1]}
      description={stepDescriptions[step - 1]}
    >
      {renderStep()}
    </OnboardingLayout>
  );
}
