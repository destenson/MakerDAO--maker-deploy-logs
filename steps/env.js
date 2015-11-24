var fs = require("fs");
var jsondb = require('node-json-db');
var Web3 = require("web3");


var web3 = new Web3();
exports.web3 = web3;
exports.eth = web3.eth;

web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
web3.eth.defaultAccount = web3.eth.coinbase;


exports.types = new jsondb("unformatted_types", true, true);
exports.deployed = new jsondb("contexts/eth/deployed.json", true, true);


exports.get_web3_type = function(name) {
	return web3.eth.contract(JSON.parse(exports.types.getData("/contracts/"+name+"/abi")));
}
