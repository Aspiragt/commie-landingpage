import React, { useState, useMemo } from 'react';
import { View, StyleSheet, Dimensions, FlatList, ViewToken } from 'react-native';
import { useTheme } from 'react-native-paper';

const { width: screenWidth } = Dimensions.get('window');
const ITEM_WIDTH = screenWidth * 0.8;
const ITEM_SPACING = 16;

interface HorizontalCarouselProps<T> {
  data: T[];
  renderItem: ({ item, index }: { item: T; index: number }) => React.ReactNode;
  itemWidth?: number;
  containerStyle?: object;
}

export const HorizontalCarousel = <T extends any>({
  data,
  renderItem,
  itemWidth = ITEM_WIDTH,
  containerStyle,
}: HorizontalCarouselProps<T>) => {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  const styles = useMemo(() => StyleSheet.create({
    container: {
      marginVertical: theme.spacing.m,
    },
    itemContainer: {
      width: itemWidth,
      marginHorizontal: ITEM_SPACING / 2,
    },
    dotContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: theme.spacing.s,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginHorizontal: 4,
    },
  }), [theme, itemWidth]);

  const onViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index || 0);
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            {renderItem({ item, index })}
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={itemWidth + ITEM_SPACING}
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        contentContainerStyle={{ paddingHorizontal: (screenWidth - itemWidth) / 2 }}
      />
      <View style={styles.dotContainer}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: index === activeIndex 
                  ? theme.colors.primary 
                  : theme.colors.surfaceVariant,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};
