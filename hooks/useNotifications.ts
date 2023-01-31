import { useQuery } from "@apollo/client";
import React from "react";
import { View, Text } from "react-native";
import notificationsQuery from "../apollo/Queries/notificationsQuery";
import { useProfile } from "../store/Store";
const useNotifications = () => {
	const activeProfile = useProfile();

	const { data, error, loading } = useQuery(notificationsQuery, {
		variables: {
			pid: activeProfile.currentProfile?.id,
		},
	});
	return { data, error, loading };
};
export default useNotifications;
