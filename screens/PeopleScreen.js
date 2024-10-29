import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import {
  Button,
  FlatList,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import PeopleContext from "../PeopleContext";
import { Icon } from "react-native-elements";
import { format } from "date-fns";

export default function PeopleScreen({ navigation }) {
  const { people } = useContext(PeopleContext);

  const formatBirthday = (dob) => {
    const date = dob.split(" ")[0].split("/");
    const newDate = new Date(date.map((data) => `${data}`).join("-"));
    return format(newDate, "MMMM dd");
  };

  const sortedPeople = people.sort((a, b) => {
    const FirstDate = new Date(
      a.dob
        .split(" ")[0]
        .split("/")
        .map((data) => `${data}`)
        .join("-")
    );
    const SecondDate = new Date(
      b.dob
        .split(" ")[0]
        .split("/")
        .map((data) => `${data}`)
        .join("-")
    );
    if (FirstDate.getMonth() !== SecondDate.getMonth()) {
      return FirstDate.getMonth() - SecondDate.getMonth();
    } else {
      return FirstDate.getDate() - SecondDate.getDate();
    }
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        {people.length === 0 ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>No people added yet</Text>
          </View>
        ) : (
          <FlatList
            data={sortedPeople}
            style={styles.container}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.listTitle}>{item.name}</Text>
                  <Text style={styles.listDOB}>{formatBirthday(item.dob)}</Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("IdeaScreen", { id: item.id })
                  }
                >
                  <Icon name="lightbulb-outline" type="material" size={24} />
                </TouchableOpacity>
              </View>
            )}
          />
        )}

        <Button
          title="Add Person"
          onPress={() => {
            navigation.navigate("AddPersonScreen");
          }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
  listItem: {
    flex: 1,
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#cdcbcc",
    margin: 5,
  },
  listTitle: {
    fontSize: 20,
  },
  listDOB: {
    fontSize: 12,
    color: "#666",
  },
});
