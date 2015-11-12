var env = require("./env");
var eth = env.eth;
var _ = require("underscore")._

//console.log(env.types.getData("/"));
console.log(env.types.getData("/DSBalanceDB"));
var code = "0x"+ env.types.getData("/DSBalanceDB/bin");

var DSBalanceDB = env.eth.contract(JSON.parse(env.types.getData("/DSBalanceDB/abi")));
//console.log(DSBalanceDB);
var dbs = ["mkr_db", "dai_db"];
_.each(dbs, function(name) {
	var ok = DSBalanceDB.new({
		data: code,
		from: env.eth.coinbase,
		gas: 3000000
	}, function( err, db ) {
		if( err ) { throw (err); }
		if( db.address ) {
			if( name == "mkr_db" ) {
				console.log("adding 1 mil");
				db.add_balance(env.eth.coinbase, env.web3.toBigNumber("1000000000000000000000000"));
			}
			env.deployed.push("/"+name, db.address);
		} else { console.log("wait...") }
	});
});
