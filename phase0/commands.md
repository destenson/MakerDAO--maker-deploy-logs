    solc asset/* auth/* data/* --optimize --combined-json bin,abi,bin-runtime > ../unformatted_types.json
    node format_types.js
    node steps/step1.js
    node steps/step2.js
    node steps/step3.js
    node steps/step4.js
