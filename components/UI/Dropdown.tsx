import React, { FC, ReactElement, useRef, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  View,
} from "react-native";
import { dark_primary } from "constants/Colors";
import Icon from "components/Icon";
import StyledText from "components/UI/StyledText";

interface Props {
  label: string;
  data: Array<{ label: string; value: string }>;
  onSelect: (item: { label: string; value: string }) => void;
  width: string;
}

const Dropdown: FC<Props> = ({ label, data, onSelect,width }) => {
  const DropdownButton = useRef();
  const [visible, setVisible] = useState<boolean>(false);
  const [selected, setSelected] = useState(undefined);
  const [dropdownTop, setDropdownTop] = useState<number>(0);

  const toggleDropdown = (): void => {
    visible ? setVisible(false) : openDropdown();
  };

  const openDropdown = (): void => {
    DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py + 22);
    });
    setVisible(true);
  };

  const onItemPress = (item): void => {
    setSelected(item);
    onSelect(item);
    setVisible(false);
  };

  const renderItem = ({ item }): ReactElement<any, any> => (
    <>
      <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
        <StyledText title={item.reason} style={{ color: "white" }} />
      </TouchableOpacity>
    </>
  );

  const renderDropdown = (): ReactElement<any, any> => {
    return (
      <Modal
        visible={visible}
        transparent
        animationType="none"
        statusBarTranslucent={false}
      >
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}
        >
          <View style={[styles.dropdown, { top: dropdownTop }]}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(_, index) => index.toString()}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <View>
      <StyledText
        title={label}
        style={{
          color: "white",
          fontSize: 18,
          alignSelf: "flex-start",
          marginVertical: 12,
          fontWeight: "700",
        }}
      />
      <TouchableOpacity
        ref={DropdownButton}
        style={[
          styles.button,
          {
            width:width,
            borderColor: visible ? "#2A9D5C" : "transparent",
            borderWidth: 1,
          },
        ]}
        onPress={toggleDropdown}
      >
        {renderDropdown()}
        <Text style={styles.buttonText}>
          {(selected && selected.reason) || label}
        </Text>
        <Icon name="arrowDown" size={16} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    // width: "100%",
    marginVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1d1d1d",
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 16,
    zIndex: 1,
  },
  buttonText: {
    flex: 1,
    color: "white",
  },
  icon: {
    marginRight: 10,
  },
  dropdown: {
    position: "absolute",
    backgroundColor: dark_primary,
    borderRadius: 8,
    width: "90%",
    shadowColor: "#000000",
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5,
  },
  overlay: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    color: "white",
    paddingHorizontal: 10,
    paddingVertical: 16,
  },
});
export default Dropdown;
