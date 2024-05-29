import { View, Text, Alert, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { Post } from "../components/Post";
import { Loading } from "../components/Loading";

export const HomeScreen = () => {
  const [items, setItems] = useState();
  const [loading, setLoading] = useState(true);

  const fetchPosts = () => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/photos?_limit=20")
      .then(async (response) => {
        const data = await response.json();
        setItems(data);
      })
      .catch((err) => {
        Alert.alert("Ошибка", "Ошибка получения данных");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      fetchPosts();
    }, 5000);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={{ paddingTop: 10, width: "100%" }}>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <Post title={item?.title} thumbnailUrl={item?.thumbnailUrl} />
        )}
      />
    </View>
  );
};
