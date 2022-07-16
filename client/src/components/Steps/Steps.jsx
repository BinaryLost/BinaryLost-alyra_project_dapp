import {useState, useEffect} from "react";
import useEth from "../../contexts/EthContext/useEth";
import './Steps.css'

function Steps() {
    const { state: { contract, accounts } } = useEth();
    const [currentStep,setCurrentStep] = useState(null);
    const workflowStatusArray =  [
        'Etape d\'enregistrement des électeurs ouverte',
        'Etape des propositions ouverte',
        'Etape des propositions terminée',
        'Etape des votes ouverte',
        'Etape des votes terminée',
        'Les votes ont été comptabilisés'
    ]

    useEffect(() => {
        getCurrentStep();
    }, []);


    const getCurrentStep = async () => {
        try {
            const value = await contract.methods.workflowStatus().call({ from: accounts[0] })
            setCurrentStep(workflowStatusArray[value])
        }catch (error){
        }
    }

    return (
        <>
            <h2>Le déroulement du vote</h2>
            <h3 className="bold" id="current-step">{currentStep}</h3>

            <p>
                Le propriétaire du contrat ouvrira la session des propositions après avoir ajouté les électeurs.
                Une fois la sessions des propositions closes, l'ouverture de la session de vote aura lieu.
                la proposition ayant récolté le plus de votes sera retenue.
            </p>


        </>
    )
}

export default Steps;
