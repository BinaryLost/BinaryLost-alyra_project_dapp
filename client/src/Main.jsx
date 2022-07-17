import {useState, useEffect} from "react";
import useEth from "./contexts/EthContext/useEth";
import NoticeNoArtifact from "./components/NoticeNoArtifact";
import NoticeWrongNetwork from "./components/NoticeWrongNetwork";
import Banner from "./components/Intro/Banner";
import Footer from "./components/Footer";
import Voters from "./components/Voters/Voters";
import Steps from "./components/Steps/Steps";
import Notification from "./components/Notification/Notification";
import ContractAddress from "./components/ContractAddress/ContractAddress";


function Main() {
  const { state: { contract, accounts } } = useEth();
  const { state } = useEth();
  const [notification, setNotification] = useState('');
  const workflowStatusArray =  [
      'Etape d\'enregistrement des électeurs ouverte',
      'Etape des propositions ouverte',
      'Etape des propositions terminée',
      'Etape des votes ouverte',
      'Etape des votes terminée',
      'Les votes ont été comptabilisés'
  ];
  const [currentStep,setCurrentStep] = useState(null);

  const getCurrentStep = async () => {
      try{
           await contract.methods.workflowStatus().call({ from: accounts[0] }).then(
              (r) => {
                  setCurrentStep(workflowStatusArray[r]);
              }
          );
      }catch (error){}
  }
  getCurrentStep();

  const main =
    <>
        <ContractAddress />
        <Steps currentStep={currentStep} setCurrentStep={setCurrentStep} />
        <Voters workflowStatusArray={workflowStatusArray} currentStep={currentStep} setNotification={setNotification} />
    </>;

  return (
    <div className="main">
        <Notification notification={notification} />
        <Banner />
        {
            !state.artifact ? <NoticeNoArtifact /> :
                !state.contract ? <NoticeWrongNetwork /> :
                    main
        }
        <Footer />
    </div>
  );
}

export default Main;
