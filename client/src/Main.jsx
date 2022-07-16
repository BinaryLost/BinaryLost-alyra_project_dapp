import useEth from "./contexts/EthContext/useEth";
import NoticeNoArtifact from "./components/NoticeNoArtifact";
import NoticeWrongNetwork from "./components/NoticeWrongNetwork";
import Banner from "./components/Intro/Banner";
import Footer from "./components/Footer";
import Voters from "./components/Voters/Voters";
import Steps from "./components/Steps/Steps";

function Main() {
  const { state } = useEth();

  const main =
    <>
        <Steps />
        <Voters />
    </>;

  return (
    <div className="main">
        <Banner />
        <br/>
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
