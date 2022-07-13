var Web3 = require('web3');

web3 = new

Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/4b6ebd310196467da1e1b4c1fa7836ca'));

var ethTx = ('0xf650a2e94996a4a995c4f28294d6819adf89385be9049f35e54b81b301918a64');

web3.eth.getTransaction(ethTx, function (err, result) {
    // console.log(result)
    if (!err && result !== null) {
        // console.log(result); // Log all the transaction info
        // console.log('From Address: ' + result.from); // Log the from address
        console.log('To Address: ' + result.to); // Log the to address
        // console.log('Ether Transacted: ' + (web3.utils.fromWei(result.value, 'ether'))); // Get the value, convert from Wei to Ether and log it
    } else {
        console.log('Error!', err); // Dump errors here
    }
});