import React from "react";
import Tabs, { Tab } from "components/UI/Tabs";
import ProfileManagers from "components/settings/ProfileManagers";
import ProfilesManaged from "components/settings/ProfilesManaged";

const ProfileManager = () => {
	return (
		<Tabs>
			<Tab.Screen name="ProfileManagers" component={ProfileManagers} />
			<Tab.Screen name="ProfileManaged" component={ProfilesManaged} />
		</Tabs>
	);
};

export default ProfileManager;
