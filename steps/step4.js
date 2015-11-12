var env = require("./env");
var mar = env.get_web3_type("DSMap");
var code = env.types.getData("/DSMap/bin");

console.log("code:",code);

mar.new({
	data: "0x"+code,
	from: env.eth.coinbase,
	gas: 3000000
}, function(err, map) {
	if(err) throw err;
	if( map.address ) {
		map.set( "MKR", env.deployed.getData("/MKR") );
		map.set( "DAI", env.deployed.getData("/DAI") );
		env.deployed.push("/MAR", map.address);
	}
});


