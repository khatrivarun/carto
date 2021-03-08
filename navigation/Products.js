import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import ProductsOverviewPage from '../pages/products/ProductsOverview';
import ProductPage from '../pages/products/Product';
import CartPage from '../pages/products/Cart';
import routes from '../constants/routes';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native-paper';
import * as AuthActions from './../utils/auth';

const ProductsStack = createStackNavigator();

const ProductsNavigator = () => {
  const navigation = useNavigation();
  return (
    <ProductsStack.Navigator
      initialRouteName={routes.pages.products_overview_page}>
      <ProductsStack.Screen
        name={routes.pages.products_overview_page}
        component={ProductsOverviewPage}
        options={{
          headerTitle: '',
          headerLeft: () => (
            <Button
              onPress={() => {
                navigation.dispatch(DrawerActions.openDrawer());
              }}>
              <Icon size={23} name="md-menu" color="white" />
            </Button>
          ),
          headerRight: () => (
            <Button
              onPress={async () => {
                await AuthActions.logout();
              }}>
              <Icon size={23} name="md-menu" color="white" />
            </Button>
          ),
        }}
      />
      <ProductsStack.Screen
        name="single_product_page"
        options={{
          headerTitle: '',
        }}
        component={ProductPage}
      />
      <ProductsStack.Screen
        name={routes.pages.cart_page}
        options={{
          headerTitle: '',
        }}
        component={CartPage}
      />
    </ProductsStack.Navigator>
  );
};

export default ProductsNavigator;
