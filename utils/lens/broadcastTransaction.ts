import { client } from "../../apollo/client";
import brodcastTransactionMutation from "../../apollo/mutations/broadcastTransactionMutation";
import {Scalars} from '../../types/generated'

const broadcastTransaction = async (id, signature, accessToken: Scalars["Jwt"] ) => {
    try {   
        const response = client.mutate({
            mutation: brodcastTransactionMutation,
            variables: {
                request:{
                    id,
                    signature
                }
            },context: {
                headers: {
                    "x-access-token": `Bearer ${accessToken}`,
                  },
            }
        })
        return response;
    } catch (error) {
        console.log("[Error]:Error in refreshing new tokens ");
        console.log(error);
        
    }
}

export default broadcastTransaction;