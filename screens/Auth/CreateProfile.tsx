import React, { useState } from 'react'
import { RootStackScreenProps } from '../../types/navigation/types'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native';
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
import ImageCarousel from '../../components/UI/ImageCarousel';
import StyledText from '../../components/UI/StyledText';
import Icon from '../../components/Icon';


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
    const data = [
        {
            link: 'https://gateway.ipfscdn.io/ipfs/bafkreibypw2ovrxub6mcpgw4e7gh3753emni5qtan3o3m6kdvpse3cmi44',
        },
        {
            link: 'https://gateway.ipfscdn.io/ipfs/QmS2wmPQwnbpuZtqbRmEKPqNPCR39a2FTpEF7iv5G7Nixd',
        },
        {
            link: 'https://gateway.ipfscdn.io/ipfs/QmZXK1cSNrj9SDZKnGaHJP9hdZvvUjUwf7uUiYqjnA5eX7',
        },
        {
            link: 'https://lens.infura-ipfs.io/ipfs/QmVBfhfgfhGsRVxTNURVUgceqyzjdVe11ic5rCghmePuKX',
        },
        {
            link: 'https://gateway.ipfscdn.io/ipfs/bafybeiehsyi2xtlfr7zmsuadruhwvodc4sxs6oh57bzd3fhd2mcjsybaiy',
        },
        {
            link: 'https://gateway.ipfscdn.io/ipfs/bafkreibypw2ovrxub6mcpgw4e7gh3753emni5qtan3o3m6kdvpse3cmi44',
        },
        {
            link: 'https://gateway.ipfscdn.io/ipfs/QmS2wmPQwnbpuZtqbRmEKPqNPCR39a2FTpEF7iv5G7Nixd',
        },
        {
            link: 'https://gateway.ipfscdn.io/ipfs/QmZXK1cSNrj9SDZKnGaHJP9hdZvvUjUwf7uUiYqjnA5eX7',
        },
        {
            link: 'https://lens.infura-ipfs.io/ipfs/QmVBfhfgfhGsRVxTNURVUgceqyzjdVe11ic5rCghmePuKX',
        },
        {
            link: 'https://gateway.ipfscdn.io/ipfs/bafybeiehsyi2xtlfr7zmsuadruhwvodc4sxs6oh57bzd3fhd2mcjsybaiy',
        },
        {
            link: 'https://gateway.ipfscdn.io/ipfs/bafkreibypw2ovrxub6mcpgw4e7gh3753emni5qtan3o3m6kdvpse3cmi44',
        },
        {
            link: 'https://gateway.ipfscdn.io/ipfs/QmS2wmPQwnbpuZtqbRmEKPqNPCR39a2FTpEF7iv5G7Nixd',
        },
        {
            link: 'https://gateway.ipfscdn.io/ipfs/QmZXK1cSNrj9SDZKnGaHJP9hdZvvUjUwf7uUiYqjnA5eX7',
        },
        {
            link: 'https://lens.infura-ipfs.io/ipfs/QmVBfhfgfhGsRVxTNURVUgceqyzjdVe11ic5rCghmePuKX',
        },
        {
            link: 'https://gateway.ipfscdn.io/ipfs/bafybeiehsyi2xtlfr7zmsuadruhwvodc4sxs6oh57bzd3fhd2mcjsybaiy',
        },
    ]
    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={{ width: '100%', alignItems: 'center', flex: 1 }}>
                <View style={styles.textContainer}>
                    <StyledText title={'Create your'} style={{ color: 'white', fontSize: 30, fontWeight: '700' }} />
                    <StyledText title={'Test Profile'} style={{ color: primary, fontSize: 38, fontWeight: '700' }} />

                </View>
                <ImageCarousel data={data} autoPlay={true} />
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
                <View style={styles.desc}>
                    <View style={styles.descContainer}>
                        <View>
                            <Icon name='compass_filled' size={30} />
                        </View>
                        <View  style={{
                            width: '80%'
                        }}>
                            <Text style={styles.descTitleText}>Click</Text>
                            <Text style={styles.descText}>
                                Click on create handle and check for available handles
                            </Text>
                        </View>
                    </View>
                    <View style={styles.descContainer}>
                        <View>
                            <Icon name='mirror' size={30} />
                        </View>
                        <View style={{
                            width: '80%'
                        }}>
                            <Text style={styles.descTitleText}>Sign</Text>
                            <Text style={styles.descText}>
                                Sign the dispatcher and explore lensplay
                            </Text>
                        </View>
                    </View>
                </View>
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
        </KeyboardAvoidingView>
    )
}

export default CreateProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // width: '100%',
        flexDirection: 'column',
        backgroundColor: "black",
        justifyContent: "space-between",
        paddingBottom: 20,
        alignItems: 'center',
        paddingVertical: 40,
        // paddingHorizontal: 10
    },
    desc: {
        marginVertical: 40
    },
    white: {
        color: 'white'
    },
    textContainer: {
        marginVertical: 20,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        width: "90%",
        marginVertical: 12,
        height: 60
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
        height: '100%'
    },
    textStyle: {
        color: "white",
        fontWeight: "700",
        marginBottom: 4,
        fontSize: 16,
    },
    descContainer: {

        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 10,
        // backgroundColor: 'red'

    },
    descTitleText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '600',
        opacity: 0.8
    },
    descText: {
        color: 'white',
        fontSize: 12,
        opacity: 0.5
    },
    buttonContainer: {
        paddingHorizontal: 16,
        width: "100%",
        paddingVertical: 20
    }
});