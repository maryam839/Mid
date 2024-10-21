import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, Dimensions, TouchableOpacity,TextInput } from 'react-native';
import { useFetch } from '@/hooks/useFetch'; 
import { FruitProps } from '@/assets/data/type';
import { Ionicons } from '@expo/vector-icons'; 

const screenWidth = Dimensions.get('window').width;

const fruitImages: { [key: string]: string } = {
  Mango: 'https://foodish-api.com/images/pizza/pizza12.jpg', 
  Orange: 'https://foodish-api.com/images/pizza/pizza11.jpg',
  Coconut: 'https://foodish-api.com/images/pizza/pizza10.jpg',
  Pineapple: 'https://foodish-api.com/images/pizza/pizza14.jpg',
};

const MainComponent: React.FC = () => {
  const { data, loading, error } = useFetch('https://simple-grocery-store-api.online/products'); 

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  const enhancedData = data.map((item: FruitProps) => ({
    ...item,
    image: fruitImages[item.name] || 'https://foodish-api.com/images/pizza/pizza1.jpg', 
  }));

  const renderItem = ({ item, index }: { item: FruitProps; index: number }) => {
    const isLargeCard = index % 3 === 0; 
    return (
      <View style={isLargeCard ? styles.largeCard : styles.smallCard}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>${item.price?.toFixed(2)}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Search bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="#888" />
        <TextInput
          placeholder="Search for products"
          style={styles.searchInput}
        />
        <Ionicons name="filter" size={24} color="#888" style={styles.filterIcon} />
      </View>

      <View style={styles.categoriesContainer}>
        <TouchableOpacity style={[styles.categoryCard, styles.fruitCard]}>
          <Ionicons name="logo-apple" size={24} color="white" />
          <Text style={styles.categoryText}>Fruits</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.categoryCard, styles.defaultCard]}>
          <Ionicons name="leaf" size={24} color="white" />
          <Text style={styles.categoryText}>Vegetables</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.categoryCard, styles.defaultCard]}>
          <Ionicons name="bowling-ball-outline" size={24} color="white" />
          <Text style={styles.categoryText}>Bakery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.categoryCard, styles.defaultCard]}>
          <Ionicons name="cafe-outline" size={24} color="white" />
          <Text style={styles.categoryText}>Milk</Text>
        </TouchableOpacity>
      </View>

      {/* FlatList for fruits */}
      <FlatList
        data={enhancedData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginHorizontal: 15,
    marginVertical: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  filterIcon: {
    marginLeft: 10,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  categoryCard: {
    width: screenWidth * 0.2,
    height: screenWidth * 0.2,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  fruitCard: {
    backgroundColor: '#4CAF50', 
  },
  defaultCard: {
    backgroundColor: '#CCCCCC', 
  },
  categoryText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  largeCard: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    width: screenWidth * 0.65, 
    height: screenWidth * 0.75, 
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  smallCard: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    width: screenWidth * 0.32, 
    height: screenWidth * 0.4,  
    alignItems: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '65%',
    resizeMode: 'cover',
    borderRadius: 8,
  },
  textContainer: {
    width: '100%',
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  },
});

export default MainComponent;