import CustomNavbar from "./components/CustomNavbar";
import CustomHero from "./components/CustomHero";
import CustomEra from "./components/CustomEra";
import CustomHowItWorks from "./components/CustomHowItWorks";
import CustomPaidAds from "./components/CustomPaidAds";
import IntentProofDashboard from "./components/IntentProofDashboard";
import CustomPlans from "./components/CustomPlans";
import CustomFinal from "./components/CustomFinal";

export default function Home() {
  return (
    <>
      <CustomNavbar />
      <main>
        <CustomHero />
        <CustomEra />
        <CustomHowItWorks />
        <CustomPaidAds />
        <IntentProofDashboard />
        <CustomPlans />
        <CustomFinal />
      </main>
    </>
  );
}
