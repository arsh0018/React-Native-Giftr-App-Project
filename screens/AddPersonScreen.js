import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  StyleSheet,
} from "react-native";
import PeopleContext from "../PeopleContext";
import { useNavigation } from "@react-navigation/native";
import DatePicker from "react-native-modern-datepicker";
export default function AddPersonScreen() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const { addPerson } = useContext(PeopleContext);
  const navigation = useNavigation();
  const savePerson = () => {
    if (name && dob) {
      addPerson(name, dob);
      navigation.goBack();
    } else {
      setModalVisible(!modalVisible);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={"padding"}
      style={{
        flex: 1,
        alignContent: "center",
        padding: 5,
        marginVertical: 10,
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontStyle: "italic", fontSize: 15, color: "green" }}>
              {"Name"}
            </Text>
            <TextInput
              placeholder="Enter Name"
              value={name}
              onChangeText={setName}
              style={{
                borderBottomColor: "lightgrey",
                borderBottomWidth: 1,
                marginVertical: 10,
                marginBottom: 15,
              }}
            />
            <Text
              style={{
                fontStyle: "italic",
                fontSize: 20,
                marginBottom: 6,
                color: "green",
              }}
            >
              {"Date of Birth"}
            </Text>
            <DatePicker
              onSelectedChange={(selectedDate) => {
                setDob(selectedDate);
              }}
              options={{
                backgroundColor: "white",
                textHeaderColor: "black",
                textDefaultColor: "black",
                selectedTextColor: "white",
                mainColor: "red",
                textSecondaryColor: "#777",
                borderColor: "blue",
              }}
              style={{
                width: "90%",
                alignSelf: "center",
                borderRadius: 10,
                padding: 20,
                borderWidth: 1,
                borderBlockColor: "black",
                margin: 15,
              }}
              current={"2000-01-01"}
              selected={"2000-01-10"}
              maximumDate={new Date().toDateString()}
              mode="calendar"
            ></DatePicker>
            <Modal
              animationType="none"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View
                style={{
                  top: "70%",
                }}
              >
                <View
                  style={{
                    margin: 10,
                    backgroundColor: "white",
                    borderRadius: 5,
                    alignItems: "center",
                    padding: 5,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      textAlign: "center",
                      marginVertical: 10,
                      color: "black",
                    }}
                  >
                    {"Please enter both name and date of birth"}
                  </Text>
                  <Button title="Close" color={"blue"} onPress={savePerson} />
                </View>
              </View>
            </Modal>
          </View>
          <View style={Platform.OS === "ios" ? styles.ios : styles.andriod}>
            <Button
              title="Save"
              color={"blue"}
              onPress={() => setModalVisible(!modalVisible)}
            />
            <Button
              title="Cancel"
              color={"red"}
              onPress={() => navigation.goBack()}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  andriod: {
    alignContent: "center",
    padding: 5,
    marginVertical: 10,
  },

  ios: {
    gap: 70,
    flexDirection: "row",
    justifyContent: "center",
    padding: 5,
    marginVertical: 10,
  },
});
