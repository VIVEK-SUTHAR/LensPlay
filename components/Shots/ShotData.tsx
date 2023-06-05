import { default as React, useCallback } from "react";
import { Dimensions, Pressable, ScrollView, StyleSheet, View } from "react-native";
import getRawurl from "utils/getRawUrl";
import Avatar from "components/UI/Avatar";
import Heading from "components/UI/Heading";
import StyledText from "components/UI/StyledText";
import { black, white } from "constants/Colors";
import { ShotsPublication } from "customTypes/index";
import { VideoCreator } from "components/VIdeo";
import extractURLs from "utils/extractURL";
import { STATIC_ASSET } from "constants/index";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import Icon from "components/Icon";

function ShotData({
  item,
  descriptionRef,
}: {
  item: ShotsPublication;
  descriptionRef: any;
}) {
  const handleSheet = useCallback(() => {
    descriptionRef?.current?.snapToIndex(0);
  }, []);

  return (
    <>
      <View
        style={{
          position: "absolute",
          width: Dimensions.get("window").width,
          zIndex: 0,
          bottom: 10,
          padding: 10,
        }}
      >
        <View style={{ marginVertical: 10 }}>
          <View style={{ width: "auto", maxWidth: 250 }}>
            <Pressable onPress={handleSheet}>
              <Heading
                style={{
                  color: "white",
                  fontSize: 16,
                  fontWeight: "600",
                }}
                numberOfLines={1}
                title={item?.metadata?.name}
              />
              <StyledText
                style={{
                  color: white[300],
                  fontSize: 12,
                  fontWeight: "500",
                }}
                numberOfLines={2}
                title={item?.metadata?.description}
              />
            </Pressable>
            <View
              style={{
                width: "auto",
                flexDirection: "row",
                alignItems: "center",
                marginTop: 8,
              }}
            >
              <Avatar
                src={getRawurl(item?.profile?.picture)}
                height={40}
                width={40}
              />
              <View style={{ marginLeft: 8 }}>
                <StyledText
                  style={{ color: "white", fontSize: 16, fontWeight: "500" }}
                  title={item?.profile?.name || item?.profile?.id}
                />
                <StyledText
                  style={{ color: white[300], fontSize: 12, fontWeight: "500" }}
                  title={item?.profile?.handle}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

export default React.memo(ShotData);

function DiscriptionSheet({ item }: { item: ShotsPublication }) {
  return (
    <View
					style={{
						flex: 1,
					}}
				>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
							paddingHorizontal: 16,
						}}
					>
						<Heading
							title={"Description"}
							style={{
								fontSize: 20,
								color: white[800],
								fontWeight: "600",
							}}
						/>
						<Pressable
							onPress={() => {
								// ref?.current?.close();
							}}
						>
							<Icon name="close" size={16} />
						</Pressable>
					</View>
					<View
						style={{
							borderBottomColor: black[300],
							borderBottomWidth: 1.5,
							marginTop: 8,
						}}
					/>
					<BottomSheetScrollView>
						<View style={{ paddingHorizontal: 16 }}>
							<StyledText
								title={item?.metadata?.name}
								style={{
									fontSize: 18,
									fontWeight: "600",
									marginVertical: 8,
									color: "white",
									textAlign: "left",
								}}
							/>
							<View
								style={{
									paddingVertical: 10,
									width: "100%",
									paddingHorizontal: 8,
									alignSelf: "center",
									justifyContent: "space-between",
									flexDirection: "row",
									borderBottomColor: "gray",
									borderBottomWidth: 1,
								}}
							>
								<View style={styles.verticleCenter}>
									<StyledText
										title={item?.stats?.totalUpvotes || 0}
										style={styles.statsLabel}
									/>
									<StyledText title="Likes" style={{ color: "white" }} />
								</View>
								<View style={styles.verticleCenter}>
									<StyledText
										title={item?.stats?.totalAmountOfCollects || 0}
										style={styles.statsLabel}
									/>
									<StyledText title="Collects" style={{ color: "white" }} />
								</View>
								<View style={styles.verticleCenter}>
									<StyledText
										title={item?.stats?.totalAmountOfMirrors || 0}
										style={styles.statsLabel}
									/>
									<StyledText title="Mirrors" style={{ color: "white" }} />
								</View>
							</View>
							<StyledText
								title={
									extractURLs(item?.metadata?.description) ||
									"No description provided by crator"
								}
								style={{
									textAlign: "justify",
									color: "white",
									marginTop: 16,
									fontSize: 14,
									fontWeight: "500",
								}}
							/>
							<StyledText
								title={`Posted via ${
									item?.appId?.charAt(0)?.toUpperCase() +
										item?.appId?.slice(1) || "LensPlay"
								}`}
								style={{
									color: "white",
									marginTop: 16,
									fontSize: 14,
									fontWeight: "500",
								}}
							/>
							<StyledText
								title={"Uploaded By"}
								style={{
									color: "white",
									marginTop: 16,
									fontSize: 14,
									fontWeight: "500",
								}}
							/>

							<View style={{
                marginBottom: 24
              }}>
              <VideoCreator
								alreadyFollowing={item?.profile?.isFollowedByMe || false}
								avatarLink={getRawurl(item?.profile?.picture) || STATIC_ASSET}
								profileId={item?.profile?.id}
								uploadedBy={item?.profile?.name || item?.profile?.handle}
								showSubscribeButton={false}
								showSubscribers={true}
								subscribersCount={item?.profile?.stats?.totalFollowers}
							/>
              </View>
						</View>
					</BottomSheetScrollView>
				</View>
  );
}

export { DiscriptionSheet };

const styles = StyleSheet.create({
	statsLabel: {
		color: "white",
		fontSize: 18,
		fontWeight: "700",
	},
	verticleCenter: {
		alignItems: "center",
	},
});
