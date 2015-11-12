var env = require("./env");
var asset0 = env.get_web3_type("DSAsset0Impl");

var mkr_db = env.deployed.getData("/mkr_db");
var ens_db = env.deployed.getData("/ens_db");
var dai_db = env.deployed.getData("/dai_db");

function asset_setup(name, db) {
	var code = "0x"+ env.types.getData("/DSAsset0Impl/bin");
	var ok = asset0.new([db], {
		data: code,
		from: env.eth.coinbase,
		gas: 3000000
	}, function( err, asset ) {
		if( err ) { throw (err); }
		if( asset.address ) {
			env.deployed.push("/"+name, asset.address);
		} else { console.log("wait...") }
	});

}

asset_setup("MKR", mkr_db);
asset_setup("DAI", dai_db);
