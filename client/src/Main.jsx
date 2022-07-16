import {useState} from "react";
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
  const { state } = useEth();
  const [notification, setNotification] = useState('');

  const main =
    <>
        <ContractAddress />
        <Steps />
        <Voters setNotification={setNotification} />
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
