import React, { useState } from 'react'
import { RootStackScreenProps } from '../../types/navigation/types'
import { Dimensions, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { dark_primary, primary } from '../../constants/Colors';
import { useAuthStore, useProfile, useThemeStore, useToast } from '../../store/Store';
import Button from '../../components/UI/Button';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { ToastType } from '../../types/Store';
import getProfiles from '../../utils/lens/getProfiles';
import createSetDispatcherTypedData from '../../utils/createSetDispatcherTypedData';
import ImageCarousel from '../../components/UI/ImageCarousel';
import StyledText from '../../components/UI/StyledText';
import Icon from '../../components/Icon';
import { StatusBar } from 'expo-status-bar';
import { Scalars, useBroadcastMutation, useCreateProfileMutation, useCreateSetDispatcherTypedDataMutation } from '../../types/generated';


const CreateProfile = ({ navigation }: RootStackScreenProps<"CreateProfile">) => {
    const [handle, setHandle] = useState<string>("");
    const [isloading, setIsloading] = useState<boolean>(false);
    const theme = useThemeStore();
    const { accessToken, refreshToken, setAccessToken, setRefreshToken } = useAuthStore();
    const { currentProfile, setCurrentProfile } = useProfile();
    const connector = useWalletConnect();
    const toast = useToast();
    const windowHeight = Dimensions.get('screen').height;


    const handleDefaultProfile = async (address: Scalars['EthereumAddress']) => {
        const defaultProfile = await getProfiles({
            ownedBy: address
        });
        if (defaultProfile) {
            setCurrentProfile(defaultProfile);
            return defaultProfile;
        }
        else {
            console.log('no profile found');
        }
    }

    const [createProfile] = useCreateProfileMutation({
        onError: (e) => {
            toast.show("Error in create profile!", ToastType.ERROR, true);
            console.log(e);
            
        },
    });

    const [setDispatcher] = useCreateSetDispatcherTypedDataMutation({
        onError: (e) => {
            toast.show("Error in setting", ToastType.ERROR, true);
            console.log(e);
        },
    });

    const [broadcastTransaction] = useBroadcastMutation({
        onError: (e) => {
            toast.show("error in broadcast", ToastType.ERROR, true);
            console.log(e);
        },
    })




    const EnableDispatcher = async (id: Scalars["ProfileId"]) => {
        const address = connector.accounts[0];
        const data = await setDispatcher({
            variables: {
                request: {
                    profileId: id
                }
            },
            context: {
                headers: {
                    "x-access-token": `Bearer ${accessToken}`,
                },
            }
        });
        console.log('dispatcher enabled');

        const formattedTypedData = createSetDispatcherTypedData(data);
        console.log('got the typed data');

        const message = JSON.stringify(formattedTypedData);
        const msgParams = [address, message];
        const sig = await connector.signTypedData(msgParams);
        console.log('signed typed data');

        const broadcast = await broadcastTransaction(
            {
                variables: {
                    request: {
                        id: data?.data?.createSetDispatcherTypedData?.id,
                        signature: sig
                    }
                },
                context: {
                    headers: {
                        "x-access-token": `Bearer ${accessToken}`,
                    },
                }
            }
        )
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
            const response = await createProfile({
                variables: {
                    request,
                },
                context: {
                    headers: {
                        "x-access-token": `Bearer ${accessToken}`,
                    },
                }
            });

            if (response?.data?.createProfile?.__typename !== "RelayError") {
                setTimeout(async () => {
                    console.log('profile created');
                    const profile = await handleDefaultProfile(address);
                    console.log('got the profile', profile);

                    await EnableDispatcher(profile?.id);
                    navigation.navigate("Root");
                }, 5000);

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
            handle: 'iamharsh.test'
        },
        {
            link: 'https://gateway.ipfscdn.io/ipfs/QmS2wmPQwnbpuZtqbRmEKPqNPCR39a2FTpEF7iv5G7Nixd',
            handle: 'iamvivek.test'
        },
        {
            link: 'https://gateway.ipfscdn.io/ipfs/QmZXK1cSNrj9SDZKnGaHJP9hdZvvUjUwf7uUiYqjnA5eX7',
            handle: 'wagmi.test'
        },
        {
            link: 'https://lens.infura-ipfs.io/ipfs/QmVBfhfgfhGsRVxTNURVUgceqyzjdVe11ic5rCghmePuKX',
            handle: 'nader.test'
        },
        {
            link: 'https://gateway.ipfscdn.io/ipfs/bafybeiehsyi2xtlfr7zmsuadruhwvodc4sxs6oh57bzd3fhd2mcjsybaiy',
            handle: 'stani.test'
        },
        {
            link: 'https://gateway.ipfscdn.io/ipfs/bafkreibypw2ovrxub6mcpgw4e7gh3753emni5qtan3o3m6kdvpse3cmi44',
            handle: 'iamharsh.test'
        },
        {
            link: 'https://gateway.ipfscdn.io/ipfs/QmS2wmPQwnbpuZtqbRmEKPqNPCR39a2FTpEF7iv5G7Nixd',
            handle: 'iamvivek.test'
        },
        {
            link: 'https://gateway.ipfscdn.io/ipfs/QmZXK1cSNrj9SDZKnGaHJP9hdZvvUjUwf7uUiYqjnA5eX7',
            handle: 'wagmi.test'
        },
        {
            link: 'https://lens.infura-ipfs.io/ipfs/QmVBfhfgfhGsRVxTNURVUgceqyzjdVe11ic5rCghmePuKX',
            handle: 'nader.test'
        },
        {
            link: 'https://gateway.ipfscdn.io/ipfs/bafybeiehsyi2xtlfr7zmsuadruhwvodc4sxs6oh57bzd3fhd2mcjsybaiy',
            handle: 'stani.test'
        },
        {
            link: 'https://gateway.ipfscdn.io/ipfs/bafkreibypw2ovrxub6mcpgw4e7gh3753emni5qtan3o3m6kdvpse3cmi44',
            handle: 'iamharsh.test'
        },
        {
            link: 'https://gateway.ipfscdn.io/ipfs/QmS2wmPQwnbpuZtqbRmEKPqNPCR39a2FTpEF7iv5G7Nixd',
            handle: 'iamvivek.test'
        },
        {
            link: 'https://gateway.ipfscdn.io/ipfs/QmZXK1cSNrj9SDZKnGaHJP9hdZvvUjUwf7uUiYqjnA5eX7',
            handle: 'wagmi.test'
        },
        {
            link: 'https://lens.infura-ipfs.io/ipfs/QmVBfhfgfhGsRVxTNURVUgceqyzjdVe11ic5rCghmePuKX',
            handle: 'nader.test'
        },
        {
            link: 'https://gateway.ipfscdn.io/ipfs/bafybeiehsyi2xtlfr7zmsuadruhwvodc4sxs6oh57bzd3fhd2mcjsybaiy',
            handle: 'stani.test'
        },
    ]
    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <StatusBar backgroundColor="black" style="auto" />
            <ScrollView>
                <View style={[styles.container, { height: windowHeight }]}>
                    <View style={{ width: '100%', alignItems: 'center', flex: 1 }}>
                        <View style={styles.textContainer}>
                            <StyledText title={'Create your'} style={{ color: 'white', fontSize: 30, fontWeight: '700' }} />
                            <StyledText title={'Test Profile'} style={{ color: primary, fontSize: 38, fontWeight: '700' }} />

                        </View>
                        <ImageCarousel data={data} autoPlay={true} />
                        <View style={styles.inputContainer}>
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
                                <View style={{
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
                                fontSize: 20,
                                fontWeight: "600",
                                color: "black",
                            }}
                            isLoading={isloading}
                            onPress={async () => {
                                // await handleDefaultProfile(connector.accounts[0]);
                                await createHandle();
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default CreateProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "black",
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 20,
        paddingTop: 50

    },
    desc: {
        marginVertical: 40
    },
    white: {
        color: 'white'
    },
    textContainer: {
        marginVertical: 30,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        width: "90%",
        marginVertical: 8,
        height: 60
    },
    input: {
        backgroundColor: dark_primary,
        color: "white",
        borderWidth: 1,
        marginTop: 28,
        paddingHorizontal: 16,
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