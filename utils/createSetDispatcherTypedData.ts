function createSetDispatcherTypedData(response) {
    const typedData = response?.data?.createSetDispatcherTypedData?.typedData;
    const types = typedData?.types;
    const values = typedData?.value;
    const domain = typedData?.domain;

    const formattedTypedData = {
        types: {
            EIP712Domain: [
                { 
                    name: "name", 
                    type: "string" 
                },
                { 
                    name: "version", 
                    type: "string" 
                },
                { 
                    name: "chainId", 
                    type: "uint256" 
                },
                { 
                    name: "verifyingContract", 
                    type: "address" 
                },
            ],
            SetDispatcherWithSig: [
                {
                    name: "profileId",
                    type: "uint256"
                },
                {
                    name: "dispatcher",
                    type: "address"
                },
                {
                    name: "nonce",
                    type: "uint256"
                },
                {
                    name: "deadline",
                    type: "uint256"
                }
            ]
        },
        domain: {
            name: domain?.name,
            version: domain?.version,
            chainId: domain?.chainId,
            verifyingContract: domain?.verifyingContract,
        },
        primaryType: "SetDispatcherWithSig",
        message: {
            profileId: values?.profileId,
            dispatcher: values?.dispatcher,
            nonce: values?.nonce,
            deadline: values?.deadline,
        },
    };
    return formattedTypedData;
}

export default createSetDispatcherTypedData;