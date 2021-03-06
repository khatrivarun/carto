import React from 'react';
import {
  Button,
  Card,
  Dialog,
  Headline,
  Paragraph,
  Portal,
  Title,
} from 'react-native-paper';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import * as AuthUtils from './../../utils/auth';
import * as ReviewUtils from './../../utils/reviews';
import StarReviewComponent from './ReviewForm';
import {useNavigation} from '@react-navigation/native';
import routes from '../../constants/routes';

/**
 * Card Component to display individual reviews by user.
 * Interaction includes deleting and updating the review.
 * @param review The actual review object
 * @param productId ID of the product
 */
const UserReviewCardComponent = ({review, productId}) => {
  // Navigation hook.
  const navigation = useNavigation();

  /**
   * Function to delete the review object from database.
   */
  const deleteReview = async () => {
    // Deletes the review object from firestore.
    await ReviewUtils.deleteReview(review, productId);
  };

  /**
   * Routes the user to the update review page
   */
  const routeToUpdateReviewPage = () => {
    // Params to send to the next page
    const routeParams = {
      id: productId,
      isEdit: true,
      review: review,
      starsGiven: review.stars,
      text: review.review,
      images: review.images,
    };

    // Pushing the review form on stack.
    navigation.navigate(routes.pages.review_page, routeParams);
  };

  return (
    <React.Fragment>
      <Card style={styles.mainView}>
        <Card.Content>
          <View style={styles.reviewView}>
            <Headline style={styles.reviewNameText}>
              Your Review of {review.productData.title}
            </Headline>
            <Button mode="outlined" icon="star">
              {review.stars}
            </Button>
          </View>
          {review.images.length > 0 && (
            <React.Fragment>
              <Title>Product Images</Title>
              <FlatList
                centerContent={true}
                data={review.images}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(image) => image}
                renderItem={(image) => (
                  <Image
                    source={{uri: image.item}}
                    style={styles.reviewImageStyles}
                  />
                )}
              />
            </React.Fragment>
          )}
          <Paragraph>
            {review.review.length > 0 ? review.review : 'No Review'}
          </Paragraph>
        </Card.Content>
        {AuthUtils.currentUser().uid === review.reviewerId && (
          <Card.Actions>
            <View style={styles.buttonView}>
              <Button onPress={routeToUpdateReviewPage}>Update Review</Button>
              <Button onPress={deleteReview}>Delete Review</Button>
            </View>
          </Card.Actions>
        )}
      </Card>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  mainView: {
    margin: 20,
  },
  starsText: {
    padding: 10,
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  reviewView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewNameText: {maxWidth: 200},
  buttonView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  reviewImageStyles: {
    width: 400,
    height: 300,
    margin: 5,
  },
});

export default UserReviewCardComponent;
