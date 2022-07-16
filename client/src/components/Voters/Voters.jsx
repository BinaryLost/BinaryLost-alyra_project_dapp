import {useRef, useEffect, useState} from "react";
import useEth from "../../contexts/EthContext/useEth";
import './Voters.css'
import StyledButton from "../Buttons/StyledButton";

function Voters({ setNotification }) {

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

    useEffect(() => {
        logAdresses();
    }, []);


    const logAdresses = async () => {
        let options = {
            fromBlock: '0',
            to: 'latest'
        };
        const listAddresses = await contract.getPastEvents('VoterRegistered', options).then(
            (r)=>{
                let toArray = [];
                for (const k in r){
                    toArray[k] = r[k].returnValues[0];
                }
                setAddresses(toArray);
            }
        );
        return listAddresses;
    };


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
            const eventChange = await transac.events.VoterRegistered.returnValues.voterAddress;
            setNotification(`L'électeur ${eventChange} a bien été ajouté à la liste`);
            logAdresses();
        }catch(error){
            console.error(error.message);
        }
    };

    return (
        <>
            <h2>les électeurs</h2>
            <p>Nous sommes transparents. A tout moment vous pouvez visualiser le vote d'un autre électeur. Il vous faudra l'adresse publique
            du wallet.</p>

            <h3>Liste des électeurs</h3>
            {addresses.map((ad) => (
                <div className="list-voters" key={ad}>{ad}</div>
            ))}

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
