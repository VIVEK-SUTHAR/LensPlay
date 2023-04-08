import React, { useState } from 'react'
import { RootStackScreenProps } from '../../types/navigation/types'
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { dark_primary, primary } from '../../constants/Colors';
import { useAuthStore, useProfile, useThemeStore, useToast } from '../../store/Store';
import Button from '../../components/UI/Button';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { ToastType } from '../../types/Store';
import createProfile from '../../utils/lens/createProfile';
import getProfiles from '../../utils/lens/getProfiles';
import enableDispatcher from '../../utils/lens/enableDispatcher';
import createSetDispatcherTypedData from '../../utils/createSetDispatcherTypedData';
import broadcastTransaction from '../../utils/lens/broadcastTransaction';


const CreateProfile = ({ navigation }: RootStackScreenProps<"CreateProfile">) => {
    const [handle, setHandle] = useState<string>("");
    const [isloading, setIsloading] = useState<boolean>(false);
    const theme = useThemeStore();
    const { accessToken, refreshToken, setAccessToken, setRefreshToken } = useAuthStore();
    const { currentProfile, setCurrentProfile } = useProfile();
    const connector = useWalletConnect();
    const toast = useToast();


    const handleDefaultProfile = async (address: string) => {
        const defaultProfile = await getProfiles(address);
        if (defaultProfile) {
            setCurrentProfile(defaultProfile);
            return defaultProfile;
        }
        else {
            console.log('no profile found');
        }
    }

    const EnableDispatcher = async (id: string, token: string) => {
        const address = connector.accounts[0];
        const data = await enableDispatcher(id, token);
        console.log('dispatcher enabled');

        const formattedTypedData = createSetDispatcherTypedData(data);
        console.log('got the typed data');

        const message = JSON.stringify(formattedTypedData);
        const msgParams = [address, message];
        const sig = await connector.signTypedData(msgParams);
        console.log('signed typed data');


        const brodcast = broadcastTransaction(data?.data?.createSetDispatcherTypedData?.id, sig, accessToken);
        console.log('brodcasted');
        setIsloading(false);
    }

    const createHandle = async () => {
        setIsloading(true);
        const address = connector.accounts[0];

        try {
            const request = {
                handle,
                profilePictureUri: null,
                followNFTURI: null,
                followModule: null,
            };
            const response = await createProfile(request, accessToken);

            if (response?.data?.createProfile?.__typename !== "RelayError") {
                setTimeout(async () => {
                    console.log('profile created');
                    const profile = await handleDefaultProfile(address);
                    console.log('got the profile', profile);

                    await EnableDispatcher(profile?.id, accessToken);
                    navigation.navigate("Root");
                }, 10000);

            } else if (response?.data?.createProfile?.reason === "HANDLE_TAKEN") {
                toast.show("Handle already taken", ToastType.ERROR, true);
            }
            else {
                toast.show("Handle already taken", ToastType.ERROR, true);
            }

        }


        catch (error) {
            if (error instanceof Error) {
                console.log("[Error]:Error in create profile");
                console.log(error);
            }
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                {/* <StyledText title="Enter " style={styles.textStyle} /> */}
                <TextInput
                    numberOfLines={2}
                    multiline={true}
                    value={handle}
                    style={styles.input}
                    placeholderTextColor="gray"
                    selectionColor={theme.PRIMARY}
                    onChange={(e) => {
                        e.preventDefault();
                        setHandle(e.nativeEvent.text);
                    }}
                    placeholder='Enter Test handle'
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    title="Create Handle"
                    width={"100%"}
                    py={12}
                    bg={primary}
                    borderRadius={50}
                    textStyle={{
                        textAlign: "center",
                        fontSize: 16,
                        fontWeight: "600",
                        color: "white",
                    }}
                    isLoading={isloading}
                    onPress={async () => {
                        // await handleDefaultProfile(connector.accounts[0]);
                        await createHandle();
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

export default CreateProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        justifyContent: "space-between",
        paddingBottom: 20,
        alignItems: 'center'
    },
    white: {
        color: 'white'
    },
    inputContainer: {
        width: "90%",
        marginVertical: 12,
    },
    input: {
        backgroundColor: dark_primary,
        color: "white",
        borderWidth: 1,
        marginTop: 18,
        paddingHorizontal: 16,
        // paddingVertical: 8,
        borderRadius: 8,
        fontSize: 16,
    },
    textStyle: {
        color: "white",
        fontWeight: "700",
        marginBottom: 4,
        fontSize: 16,
    },
    buttonContainer: {
        paddingHorizontal: 16,
        width: "100%"
    }
});