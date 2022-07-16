import {useRef, useEffect, useState} from "react";
import useEth from "../../contexts/EthContext/useEth";
import './Voters.css'
import StyledButton from "../Buttons/StyledButton";

function Voters() {

    const voterEle = useRef(null);

    const { state: { contract, accounts } } = useEth();
    const [inputValue,setInputValue] = useState('');
    const [inputAddValue,setInputAddValue] = useState('');
    const [voterAddress,setVoterAddress] = useState('');
    const [voterHasVoted,setVoterHasVoted] = useState(false);
    const [voterProposalVotedId,setVoterProposalVotedId] = useState(0);
    const [voterIsRegistered,setVoterIsRegistered] = useState(false);
    const [addresses,setAddresses] = useState([]);


    useEffect(() => {
        voterEle.current.classList.add("flash");
        const flash = setTimeout(() => {
            voterEle.current.classList.remove("flash");
        }, 300);
        return () => {
            clearTimeout(flash);
        };
    }, [voterAddress,voterHasVoted,voterProposalVotedId,voterIsRegistered]);

    const handleInputGetVoterChange = e => {
        setInputValue(e.target.value);
    };

    const handleInputAddVoterChange = e => {
        setInputAddValue(e.target.value);
    };

    const getVoter = async () => {
        const value = await contract.methods.getVoter(inputValue).call({ from: accounts[0] })
        setVoterAddress(inputValue);
        setVoterHasVoted(value.hasVoted);
        setVoterIsRegistered(value.isRegistered);
        setVoterProposalVotedId(value.votedProposalId);
    };

    const addVoter = async () => {
        try{
            const transac = await contract.methods.addVoter(inputAddValue).send({ from: accounts[0] });
            getVoter(inputAddValue)
            console.log("l'adresse est celle ci: " + transac.events.dataStored.returnValues.addr);
            console.log("la data est celle ci: " + transac.events.dataStored.returnValues.data);
            console.log(transac.message);
        }catch(error){
            console.log(error.message);
        }
    };

    return (
        <>
            <h2>les électeurs</h2>
            <p>Nous sommes transparents. A tout moment vous pouvez visualiser le vote d'un autre électeur. Il vous faudra l'adresse publique
            du wallet.</p>

            <h3>Liste des électeurs</h3>
            <div>
                {addresses.map((address) => (
                    <tr><td>{address.returnValues.addr}</td></tr>
                ))}
            </div>

            <h3>Détail d'un électeur</h3>
            <div className="section-block">
                <div>
                    <input
                    type="text"
                    placeholder="address, ex: 0xdf......."
                    value={inputValue}
                    onChange={handleInputGetVoterChange}
                    />
                    <StyledButton click={getVoter} text="Visualiser un électeur" />
                </div>
                <div id="voter-container" ref={voterEle}>
                    {voterAddress.length > 0 &&
                        <>
                        Electeur: <strong>{voterAddress}</strong>
                        <br/>
                        Enregistré: <strong>{voterIsRegistered ? "oui" : "non"}</strong>
                        <br/>
                        A voté: <strong>{voterHasVoted ? "oui" : "non"}</strong>
                        <br/>
                        Proposition votée: <strong>{voterProposalVotedId}</strong>
                        </>
                    }
            </div>
            </div>
            <h3>Ajouter un électeur</h3>
            <p>Attention, seul le propriétaire peut ajouter un électeur</p>
            <div  className="section-block">
                <input
                    type="text"
                    placeholder="address, ex: 0xdf......."
                    value={inputAddValue}
                    onChange={handleInputAddVoterChange}
                />
                <StyledButton click={addVoter} text="Ajouter un électeur" />
            </div>
        </>
    )
}

export default Voters;
