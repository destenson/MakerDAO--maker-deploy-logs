var fs = require("fs");
var _ = require("underscore")._

var unparsed_types = JSON.parse(fs.readFileSync("unformatted_types.json"))["contracts"];
//console.log(unparsed_types);
var out = {};
var types = ["DSAsset0Impl", "DSBalanceDB", "DSBasicAuthority", "DSMap"];
_.each(unparsed_types, function(val, name) {
    //console.log(name);
	if( types.indexOf(name) != -1 ) {
        //console.log("found name");
		out[name] = val;
	}
});
//console.log(out);

fs.writeFileSync("types.json", JSON.stringify(out));
