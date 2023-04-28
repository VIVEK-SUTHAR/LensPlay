import React, { useEffect, useState } from 'react'
import { RootStackScreenProps } from '../../types/navigation/types'
import { Animated, Dimensions, Easing, Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { dark_primary, primary } from '../../constants/Colors';
import { useAuthStore, useProfile, useThemeStore, useToast } from '../../store/Store';
import Button from '../../components/UI/Button';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { ToastType } from '../../types/Store';
import getProfiles from '../../utils/lens/getProfiles';
import createSetDispatcherTypedData from '../../utils/createSetDispatcherTypedData';
import StyledText from '../../components/UI/StyledText';
import Icon from '../../components/Icon';
import { StatusBar } from 'expo-status-bar';
import { Scalars, useBroadcastMutation, useCreateProfileMutation, useCreateSetDispatcherTypedDataMutation } from '../../types/generated';
import { LinearGradient } from 'expo-linear-gradient';


const CreateProfile = ({ navigation }: RootStackScreenProps<"CreateProfile">) => {
    const [handle, setHandle] = useState<string>("");
    const [isloading, setIsloading] = useState<boolean>(false);
    const theme = useThemeStore();
    const { accessToken, refreshToken, setAccessToken, setRefreshToken } = useAuthStore();
    const { currentProfile, setCurrentProfile } = useProfile();
    const connector = useWalletConnect();
    const toast = useToast();
    const [dynamicText, setDynamicText] = useState('Create Handle');
    const windowHeight = Dimensions.get('screen').height;
    const windowWidth = Dimensions.get('screen').width;


    const handleDefaultProfile = async (address: Scalars['EthereumAddress']) => {
        const defaultProfile = await getProfiles({
            ownedBy: address
        });
        if (defaultProfile) {
            setCurrentProfile(defaultProfile);
            return defaultProfile;
        }
    }

    const [createProfile] = useCreateProfileMutation({
        onError: (e) => {
            toast.show("Error in create profile!", ToastType.ERROR, true);
            setIsloading(false);
            setDynamicText('Create Handle');
            // console.log(e);
        },
    });

    const [setDispatcher] = useCreateSetDispatcherTypedDataMutation({
        onError: (e) => {
            toast.show("Error in setting", ToastType.ERROR, true);
            setIsloading(false);
            setDynamicText('Create Handle');
            // console.log(e);
        },
    });

    const [broadcastTransaction] = useBroadcastMutation({
        onError: (e) => {
            toast.show("error in broadcast", ToastType.ERROR, true);
            setIsloading(false);
            setDynamicText('Create Handle');
            // console.log(e);
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

        const formattedTypedData = createSetDispatcherTypedData(data);

        const message = JSON.stringify(formattedTypedData);
        const msgParams = [address, message];
        const sig = await connector.signTypedData(msgParams);

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
        setIsloading(false);
        setDynamicText('Create Handle');
    }

    const createHandle = async () => {
        setIsloading(true);
        setDynamicText('Creating Handle');
        const address = connector.accounts[0];
        if(handle.includes(".test")){
            toast.show("Omit .test", ToastType.ERROR, true);
            setIsloading(false);
            setDynamicText('Create Handle');
            return;
        }
        try {
            const request = {
                handle: handle.replace(/\s/g, ""),
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
                    const profile = await handleDefaultProfile(address);
                    if (profile) {
                        setDynamicText('Signing Dispatcher');

                        await EnableDispatcher(profile?.id);
                        navigation.navigate("Root");
                    }
                    else {
                        setDynamicText("Create Handle");
                        setIsloading(false);
                        toast.show("Error while creating profile", ToastType.ERROR, true);
                    }
                }, 5000);

            } else if (response?.data?.createProfile?.reason === "HANDLE_TAKEN") {
                toast.show("Handle already taken", ToastType.ERROR, true);
                setIsloading(false);
                setDynamicText('Create Handle');
            }
            else {
                toast.show("Error while creating handle", ToastType.ERROR, true);
                setIsloading(false);
                setDynamicText('Create Handle');
            }
        }


        catch (error) {
            if (error instanceof Error) {
                // console.log("[Error]:Error in create profile");
                // console.log(error);
                setIsloading(false);
                setDynamicText('Create Handle');
            }
        }
    }
    
    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <StatusBar backgroundColor="black" style="auto" />
            <LinearGradient
        colors={["#2D3436", "black", "#000000"]}
        style={{ flex: 1 }}
      >
        <ScrollView>
                <View style={[styles.container, { height: windowHeight }]}>
                        <View style={{
                            position: "relative",
                            marginTop: -100
                        }}>
                            <Animated.Image source={require('../../assets/images/circle.png')} style={{
                                height: 400,
                                width: 400,
                            }}/>
                            <View style={{position: "absolute", height: 400, width: 400,flex: 1, justifyContent: "center", alignItems: "center"}}>
                            <Image source={require('../../assets/images/icon.png')} style={{
                                height: 50,
                                width: 50,
                                // backgroundColor: "red"
                            }}/>
                            </View>
                        </View>
                        {/* <ImageCarousel data={data} autoPlay={true} /> */}
                        <View style={styles.textContainer}>
                            <StyledText title={'Create your'} style={{ color: 'white', fontSize: 34, fontWeight: '700' }} />
                            <StyledText title={'Test Profile'} style={{ color: primary, fontSize: 42, fontWeight: '700' }} />

                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                numberOfLines={2}
                                multiline={false}
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
                            title={dynamicText}
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
                            isDynamic={isloading}
                            onPress={async () => {
                                await createHandle();
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
      </LinearGradient>
        </KeyboardAvoidingView>
    )
}

export default CreateProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
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
        marginTop: 80,
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