import React, { useState } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useGitHubUsers } from "../../hooks/useGithubUsers";
import { SearchInput } from "../../components/SearchInput";
import { UserList } from "../../components/UserList";
import { RootStackParamList } from "../../navigation/types";
import { getStyles } from "./styles";
import { useTheme } from "@/src/context/ThemeContext";
import { ThemeToggle } from "@/src/components/ThemeToggle";

export const HomeScreen: React.FC = () => {
  const [search, setSearch] = useState("");
  const [searchTrigger, setSearchTrigger] = useState<string | undefined>();
  const { users, loading } = useGitHubUsers(searchTrigger);

  const { colors } = useTheme();
  const styles = getStyles(colors);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleSearch = () => {
    const trimmed = search.trim();
    setSearchTrigger(trimmed || undefined);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Usuarios de GitHub</Text>
        <ThemeToggle />
      </View>
      <SearchInput
        value={search}
        onChange={setSearch}
        onSubmit={handleSearch}
      />

      <UserList
        users={users}
        loading={loading}
        onUserPress={(user) =>
          navigation.navigate("UserDetail", { username: user.login })
        }
      />
    </View>
  );
};
