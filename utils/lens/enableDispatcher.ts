import { client } from "../../apollo/client";
import enableDispatcherMutation from "../../apollo/mutations/enableDispatcherMutation";
import {Scalars} from '../../types/generated'

const enableDispatcher = async (profileId: Scalars["ProfileId"], accessToken: Scalars["Jwt"] ) => {
    try {   
        const response = client.mutate({
            mutation: enableDispatcherMutation,
            variables: {
                id: profileId
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

export default enableDispatcher;