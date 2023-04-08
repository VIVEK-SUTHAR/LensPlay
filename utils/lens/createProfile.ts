import { client } from "../../apollo/client";
import createProfileMutation from "../../apollo/mutations/createProfileMutation";

const createProfile = async (request: any, accessToken: string) => {
    try {
        const response = client.mutate({
            mutation: createProfileMutation,
            variables: {
                request: request
            },context: {
                headers: {
                    "x-access-token": `Bearer ${accessToken}`,
                  },
            }
        })
        console.log(response);
        
        return response;
    } catch (error) {
        console.log("[Error]:Error in creatig profile");
        console.log(error);
        
    }
}

export default createProfile;