import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Title} from 'react-native-paper';
import * as ProductUtils from './../utils/products';
import CategoriesComponent from './Categories';
import ProductCardComponent from './ProductCard';
import SearchbarComponent from './Searchbar';

const ProductsViewComponent = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    return ProductUtils.fetchProducts().onSnapshot(
      (querySnapshot) => {
        setProducts(ProductUtils.convertToProducts(querySnapshot));
      },
      (error) => console.log(error),
    );
  }, []);

  return (
    <View style={styles.rootView}>
      <FlatList
        ListHeaderComponent={
          <React.Fragment>
            <SearchbarComponent />
            <CategoriesComponent />
            <View style={styles.titleView}>
              <Title>Newest Additions</Title>
            </View>
          </React.Fragment>
        }
        centerContent={true}
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={(c) => (
          <ProductCardComponent key={c.index} product={c.item} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rootView: {
    flex: 1,
  },
  productView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  marginView: {
    padding: 20,
  },
  imageView: {
    height: 150,
    width: 150,
  },
  titleView: {
    margin: 20,
  },
});

export default ProductsViewComponent;
