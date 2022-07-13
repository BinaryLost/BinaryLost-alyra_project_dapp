var  Web3  =  require('web3');
web3  =  new  Web3(new  Web3.providers.HttpProvider('https://ropsten.infura.io/v3/4b6ebd310196467da1e1b4c1fa7836ca'));

console.log('Calling Contract.....');

var  abi  =  [
    {
        "inputs": [],
        "name": "retrieve",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "num",
                "type": "uint256"
            }
        ],
        "name": "store",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
var  addr  =  "0x354953E6bbb8925960a4d91386091cFA045b3Daf";

var  Contract  =  new  web3.eth.Contract(abi, addr);
console.log(Contract);

// FUNCTION must the name of the function you want to call.
Contract.methods.retrieve().call().then(console.log);