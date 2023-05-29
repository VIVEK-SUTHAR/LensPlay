import { RefObject } from "react";
import { FlatList, FlatListProps } from "react-native";
import Animated from "react-native-reanimated";
import { HeaderConfig } from "screens/BottomTabs/Profile/Profile";
export type ScrollPair = {
  list: RefObject<FlatList>;
  position: Animated.SharedValue<number>;
};
const useScrollSync = (
  scrollPairs: ScrollPair[],
  headerConfig: HeaderConfig
) => {
  const sync: NonNullable<FlatListProps<any>["onMomentumScrollEnd"]> = (
    event
  ) => {
    const { y } = event.nativeEvent.contentOffset;

    const { heightCollapsed, heightExpanded } = headerConfig;

    const headerHeightDiff = heightExpanded - heightCollapsed;

    for (const { list, position } of scrollPairs) {
      const scrollPosition = position.value ?? 0;
      if (scrollPosition > headerHeightDiff && y > headerHeightDiff) {
        continue;
      }
      list.current?.scrollToOffset({
        offset: Math.min(y, headerHeightDiff),
        animated: false,
      });
    }
  };

  return { sync };
};
export default useScrollSync;
