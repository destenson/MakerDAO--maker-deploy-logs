    solc asset/interface.sol asset/asset0.sol auth/auth.sol auth/authority.sol auth/basic_authority.sol data/balance_db.sol data/map.sol --optimize --combined-json bin,abi,bin-runtime > ../../unformatted_types.json
    node format_types.js
    node steps/step1.js
    node steps/step2.js
    node steps/step3.js
    node steps/step4.js
