import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Appbar, useTheme, Text, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  showTitle?: boolean;
  showProfile?: boolean;
  showSearch?: boolean;
  showNotifications?: boolean;
  showAdd?: boolean;
  subtitle?: string;
  onBackPress?: () => void;
  onSearchPress?: () => void;
  onNotificationsPress?: () => void;
  onAddPress?: () => void;
  onProfilePress?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  showTitle = true,
  showProfile = true,
  showSearch = true,
  showNotifications = true,
  showAdd = true,
  subtitle,
  onBackPress,
  onSearchPress,
  onNotificationsPress,
  onAddPress,
  onProfilePress,
}) => {
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      navigation.goBack();
    }
  };

  const handleSearchPress = () => {
    if (onSearchPress) {
      onSearchPress();
    } else {
      navigation.navigate('Search');
    }
  };

  const handleNotificationsPress = () => {
    if (onNotificationsPress) {
      onNotificationsPress();
    } else {
      // TODO: Implementar navegación a notificaciones
    }
  };

  const handleAddPress = () => {
    if (onAddPress) {
      onAddPress();
    } else {
      // TODO: Implementar menú de creación
    }
  };

  const handleProfilePress = () => {
    if (onProfilePress) {
      onProfilePress();
    } else {
      navigation.navigate('Profile', {});
    }
  };

  const styles = StyleSheet.create({
    header: {
      backgroundColor: theme.colors.surface,
      elevation: 2,
    },
    titleContainer: {
      flex: 1,
      alignItems: 'center',
    },
    title: {
      color: theme.colors.onSurface,
      fontSize: 20,
      fontWeight: '600',
    },
    subtitle: {
      color: theme.colors.onSurfaceVariant,
      fontSize: 14,
    },
    avatar: {
      marginLeft: 16,
      marginRight: 8,
    },
    touchable: {
      marginHorizontal: 8,
    },
  });

  return (
    <Appbar.Header style={styles.header}>
      {showBack ? (
        <Appbar.BackAction
          color={theme.colors.onSurface}
          onPress={handleBackPress}
        />
      ) : (
        showProfile && (
          <TouchableOpacity onPress={handleProfilePress} style={styles.touchable}>
            <Avatar.Image
              size={36}
              source={{ uri: 'https://i.pravatar.cc/150' }} // TODO: Usar avatar del usuario actual
              style={styles.avatar}
            />
          </TouchableOpacity>
        )
      )}

      {showSearch && (
        <Appbar.Action
          icon="magnify"
          color={theme.colors.onSurface}
          onPress={handleSearchPress}
        />
      )}

      {showTitle && (
        <View style={styles.titleContainer}>
          <Text variant="titleLarge" style={styles.title}>{title}</Text>
          {subtitle && <Text variant="bodySmall" style={styles.subtitle}>{subtitle}</Text>}
        </View>
      )}

      {showNotifications && (
        <Appbar.Action
          icon="bell-outline"
          color={theme.colors.onSurface}
          onPress={handleNotificationsPress}
        />
      )}

      {showAdd && (
        <Appbar.Action
          icon="plus"
          color={theme.colors.onSurface}
          onPress={handleAddPress}
        />
      )}
    </Appbar.Header>
  );
};
