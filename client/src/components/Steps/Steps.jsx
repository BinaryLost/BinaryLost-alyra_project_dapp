import {useState} from "react";
import useEth from "../../contexts/EthContext/useEth";
import './Steps.css'

function Steps() {
    const { state } = useEth();
    const [contractAddress,setContractAddress] = useState(null);
    const [currentStep,setCurrentStep] = useState(null);

    const getContractData = async () => {
        try {
            setContractAddress(await state.artifact.networks[state.networkID].address);
        }catch (error){
        }
    }
    getContractData();

    return (
        <>
            <h2>Le déroulement du vote</h2>
            <h3></h3>

            <p><span className="bold">Adresse du contrat : </span><span id="address-container">{ contractAddress }</span> </p>
            <p>
                Le propriétaire du contrat ouvrira la session des propositions après avoir ajouté les électeurs.
                Une fois la sessions des propositions closes, l'ouverture de la session de vote aura lieu.
                la proposition ayant récolté le plus de votes sera retenue.
            </p>
            <ul>
                <li>Etape précédente:</li>
                <li>Etape actuelle: {currentStep}</li>
                <li>Etape suivante:</li>
            </ul>

        </>
    )
}

export default Steps;
