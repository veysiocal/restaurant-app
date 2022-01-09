import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Card from '../UI/Card';
import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    restaurantId: 'restaurant1',
    products: [
      {
        id: 'product1',
        price: 10,
        title: 'Veysi Product',
        description: 'First Product Description',
      },
      {
        id: 'product2',
        price: 16,
        title: 'Veysi Product2',
        description: 'Second Product Description',
      },
    ]
  },
  {
    restaurantId: 'restaurant2',
    products: [
      {
        id: 'product1',
        price: 10,
        title: 'Salih Product',
        description: 'First Product Description',
      },
      {
        id: 'product2',
        price: 16,
        title: 'Salih Product2',
        description: 'Second Product Description',
      },
    ]
  },
  {
    restaurantId: 'restaurant3',
    products: [
      {
        id: 'product1',
        price: 10,
        title: 'ömer Product',
        description: 'First Product Description',
      },
      {
        id: 'product2',
        price: 16,
        title: 'ömer Product2',
        description: 'Second Product Description',
      },
    ]
  }
];

const DUMMY_RESTAURANTS = [
  {
    id: 'restaurant1',
    title: 'Veysi Restaurant',
    description: 'Kebap & Lahmacun',
    district: 'Maltepe',
    category: 'Kebap',
  },
  {
    id: 'restaurant2',
    title: 'Salih Restaurant',
    description: 'Kebap & Patates',
    district: 'Üsküdar',
    category: 'Kebap',
  },
  {
    id: 'restaurant3',
    title: 'Ömer Restaurant',
    description: 'Döner & Litle Litle in the Middle',
    district: 'Ümraniye',
    category: 'Döner',
  },
  {
    id: 'restaurant4',
    title: 'Ömrestaurant4',
    description: 'Sulu &Litle Litle in the Middle',
    district: 'Ataşehir',
    category: 'Sulu',
  },
  {
    id: 'restaurant5',
    title: 'Restaurant5',
    description: 'Burger & Litle Litle in the Middle',
    district: 'Bostancı',
    category: 'Burger',
  },
  {
    id: 'restaurant6',
    title: 'Restaurant6',
    description: 'Pizza & Litle Litle in the Middle',
    district: 'Kadıköy',
    category: 'Pizza',
  },
];


const Products = () => {
  const params = useParams();

  const restaurants = useSelector(state => state.admin.restaurants)
  const activeProducts = useSelector(state => state.admin.activeProducts);

  const restaurant = restaurants.find(restaurant => restaurant.id === params.restaurantId)
  const products = activeProducts.filter(restaurant => restaurant.restaurantId === params.restaurantId);

  return (
    <section className={classes.productsCustom}>
      <div className={classes.container} >
      <div className={classes.onlyLogo} />

        <Card className={classes.containerCustom}>
          <header>
            <h4>{restaurant.title}</h4>
            <h5>{restaurant.district}</h5>
          </header>
          <p>
            {restaurant.description}
            {restaurant.start} - {restaurant.end}
          </p>
        </Card>
      </div>
      <div >
        <ul className={classes.productItemsList}>
          {products.map(product => (
            <ProductItem key={product.id} id={product.id} name={product.name} fee={product.price} description={product.description} start={product.start} end={product.end} />)
          )}
        </ul>
      </div>
    </section>
  );
};

export default Products;