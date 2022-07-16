import "./ContractAddress.css"
import {useEffect, useState} from "react";
import useEth from "../../contexts/EthContext/useEth";

function ContractAddress() {
  const [contractAddress,setContractAddress] = useState(null);
  const { state: { contract } } = useEth();

  useEffect(() => {
    getContractData();
  },[contractAddress])

  const getContractData = async () => {
    try {
      setContractAddress(contract._address)
    }catch (error){
    }
  }
  return <div id="contract-address-reminder" className="sub-container"><span className="bold">L'adresse du contrat est : </span ><span className="contract-address">{contractAddress}</span></div>
}

export default ContractAddress;
