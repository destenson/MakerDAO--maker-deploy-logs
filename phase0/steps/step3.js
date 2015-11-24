var env = require("./env");
var auth = env.get_web3_type("DSBasicAuthority");
var code = env.types.getData("/contracts/DSBasicAuthority/bin");

auth.new({
	data: code,
	from: env.eth.coinbase,
	gas: 3000000
}, function(err, auth) {
	if( err ) { throw (err); }
	if( auth.address ) {
		var MKR = env.get_web3_type("DSAsset0Impl").at(env.deployed.getData("/MKR"));
		var DAI = env.get_web3_type("DSAsset0Impl").at(env.deployed.getData("/DAI"));
		var mkr_db = env.get_web3_type("DSBalanceDB").at(env.deployed.getData("/mkr_db"))
		var dai_db = env.get_web3_type("DSBalanceDB").at(env.deployed.getData("/dai_db"))

		var me = env.eth.coinbase;

		mkr_db._ds_update_authority(MKR.address, 0);
		dai_db._ds_update_authority(auth.address, 1);
		MKR._ds_update_authority(auth.address, 1);
		DAI._ds_update_authority(auth.address, 1);

		auth.set_can_call(me, MKR.address, 0x0, true);
		auth.set_can_call(me, DAI.address, 0x0, true);
		auth.set_can_call(me, dai_db.address, 0x0, true);
		auth.set_can_call(DAI.address, dai_db.address, 0x0, true);

		env.deployed.push("/maker_auth", auth.address);
	}
});
