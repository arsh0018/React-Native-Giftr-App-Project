import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Button,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import PeopleContext from "../PeopleContext";
import { Icon } from "react-native-elements";

export default function IdeaScreen({ route }) {
  const { id } = route.params;
  const { getIdeasForPerson, deleteIdea, getPersonById } =
    useContext(PeopleContext);
  const navigation = useNavigation();

  const [ideas, setIdeas] = useState([]);
  const [personName, setPersonName] = useState("");
  const aspectRatio = 2 / 3;
  const thumbnailWidth = Dimensions.get("window").width * 0.3;
  const thumbnailHeight = thumbnailWidth * aspectRatio;

  useEffect(() => {
    (async () => {
      const person = getPersonById(id);
      setPersonName(person.name);
      const ideasList = await getIdeasForPerson(id);
      setIdeas(ideasList);
    })();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.ideaContainer}>
      <Image
        source={{ uri: item.imageUri }}
        style={{ width: thumbnailWidth, height: thumbnailHeight }}
      />
      <View style={styles.ideaDetails}>
        <Text style={styles.ideaText}>{item.name}</Text>
        <TouchableOpacity
          onPress={async () => {
            try {
              await deleteIdea(id, ideaId);
              const updatedIdeas = await getIdeasForPerson(id);
              setIdeas(updatedIdeas);
            } catch (e) {
              console.log(e);
            }
          }}
        >
          <Icon name="delete" type="material" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>

      <Text style={styles.heading}>{personName}'s Gift Ideas</Text>
     
      {ideas.length === 0 ? (
        <Text>No gift ideas found. Please Add your first idea.</Text>
      ) : (
        <FlatList
          data={ideas}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("AddIdeaScreen", { id })}
      >
        <Icon name="add" type="material" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  ideaContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  ideaDetails: {
    flex: 1,
    marginLeft: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ideaText: {
    fontSize: 18,
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor: "blue",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
