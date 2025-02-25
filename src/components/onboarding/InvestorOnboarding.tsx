import { useState } from "react";
import OnboardingLayout from "./OnboardingLayout";
import AccountRegistration from "./InvestorSteps/AccountRegistration";
import EmailVerification from "./InvestorSteps/EmailVerification";
import InvestorProfile from "./InvestorSteps/InvestorProfile";
import KYCVerification from "./InvestorSteps/KYCVerification";
import WalletSetup from "./InvestorSteps/WalletSetup";
import ApprovalPending from "./InvestorSteps/ApprovalPending";

export default function InvestorOnboarding() {
  const [step, setStep] = useState(1);
  const totalSteps = 6;

  const renderStep = () => {
    switch (step) {
      case 1:
        return <AccountRegistration onNext={() => setStep(2)} />;
      case 2:
        return (
          <EmailVerification
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
          />
        );
      case 3:
        return (
          <InvestorProfile
            onBack={() => setStep(2)}
            onNext={() => setStep(4)}
          />
        );
      case 4:
        return (
          <KYCVerification
            onBack={() => setStep(3)}
            onNext={() => setStep(5)}
          />
        );
      case 5:
        return (
          <WalletSetup onBack={() => setStep(4)} onNext={() => setStep(6)} />
        );
      case 6:
        return <ApprovalPending onBack={() => setStep(5)} />;
      default:
        return null;
    }
  };

  const stepTitles = [
    "Welcome & Account Registration",
    "Email Verification & 2FA",
    "Investor Profile & Qualification",
    "KYC & AML Verification",
    "Wallet Setup & Compliance",
    "Approval Status",
  ];

  const stepDescriptions = [
    "Register and begin your investor onboarding",
    "Verify your email and set up two-factor authentication",
    "Complete your investor profile and qualification checks",
    "Submit required documentation for KYC/AML",
    "Set up your Guardian-compliant investment wallet",
    "Track your application and compliance status",
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
