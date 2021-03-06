let restaurant;
var map;

/**
 * Initialize Google map, called from HTML.
 */
window.initMap = () => {
  fetchRestaurantFromURL((error, restaurant) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      self.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: restaurant.latlng,
        scrollwheel: false
      });

      setMapTitle = () => {
        let iFrame = document.querySelector('#map iframe');
        iFrame.setAttribute('title', `Google map with ${restaurant.name} locations`);
      };
      
      fillBreadcrumb();
      DBHelper.mapMarkerForRestaurant(self.restaurant, self.map);
      self.map.addListener('tilesloaded', setMapTitle);  
    };
  });
}

/**
 * Get current restaurant from page URL.
 */
fetchRestaurantFromURL = (callback) => {
  if (self.restaurant) { // restaurant already fetched!
    callback(null, self.restaurant)
    return;
  }
  const id = getParameterByName('id');
  if (!id) { // no id found in URL
    error = 'No restaurant id in URL'
    callback(error, null);
  } else {
    DBHelper.fetchRestaurantById(id, (error, restaurant) => {
      self.restaurant = restaurant;
      if (!restaurant) {
        console.error(error);
        return;
      }
      fillRestaurantHTML();
      callback(null, restaurant)
    });
  }
}

/**
 * Create restaurant HTML and add it to the webpage
 */
fillRestaurantHTML = (restaurant = self.restaurant) => {
  const name = document.getElementById('restaurant-name');
  name.innerHTML = restaurant.name;

  const isFavorite = restaurant.is_favorite ? JSON.parse(restaurant.is_favorite) : false;

  const star = document.querySelector('#favorite-button');
  const starIcon = document.querySelector('#favorite-icon');

  starIcon.src = isFavorite ? './img/yellow-star.png' : './img/grey-star.png';
  star.addEventListener('click', () => toggleFavorite(restaurant));

  const address = document.getElementById('restaurant-address');
  address.innerHTML = restaurant.address;

  const image = document.getElementById('restaurant-img');
  image.className = 'restaurant-img'
  image.src = DBHelper.imageUrlForRestaurant(restaurant);
  image.alt = `Image of the ${restaurant.name} restaurant`;

  const cuisine = document.getElementById('restaurant-cuisine');
  cuisine.innerHTML = restaurant.cuisine_type;

  // fill operating hours
  if (restaurant.operating_hours) {
    fillRestaurantHoursHTML();
  }
  // fill reviews
  const id = getParameterByName('id');
  DBHelper.getReviewsForRestaurant(id, fillReviewsHTML);
}

/**
 * Toggling favourite restaurant
 */

const addToFavorites = restaurantId => {
  restaurant = self.restaurant;
  restaurant.is_favorite = true;
  DBHelper.addToFavorites(restaurantId);
  const starIcon = document.querySelector('#favorite-icon');
  starIcon.src = './img/yellow-star.png';
}

const removeFromFavorites = restaurantId => {
  restaurant = self.restaurant;
  restaurant.is_favorite = false;
  DBHelper.removeFromFavorites(restaurantId);
  const starIcon = document.querySelector('#favorite-icon');
  starIcon.src = './img/grey-star.png';
}

const toggleFavorite = (restaurant = self.restaurant) => {
  const isFavorite = restaurant.is_favorite ? JSON.parse(restaurant.is_favorite) : false;
  isFavorite ? removeFromFavorites(restaurant.id) : addToFavorites(restaurant.id);
}

/**
 * Create restaurant operating hours HTML table and add it to the webpage.
 */
fillRestaurantHoursHTML = (operatingHours = self.restaurant.operating_hours) => {
  const hours = document.getElementById('restaurant-hours');
  for (let key in operatingHours) {
    const row = document.createElement('tr');

    const day = document.createElement('td');
    day.innerHTML = key;
    row.appendChild(day);

    const time = document.createElement('td');
    time.innerHTML = operatingHours[key];
    row.appendChild(time);

    hours.appendChild(row);
  }
}

/**
 * Create all reviews HTML and add them to the webpage.
 */

const appendReview = review => {
  const container = document.getElementById('reviews-container');
  const ul = document.getElementById('reviews-list');
  ul.appendChild(createReviewHTML(review));
  container.appendChild(ul);
}

const fillReviewsHTML = (error, reviews) => {
  const container = document.getElementById('reviews-container');
  const title = document.createElement('h3');
  title.innerHTML = 'Reviews';
  container.appendChild(title);

  if (error) {
    console.log(error);
    return;
  }

  if (!reviews) {
    const noReviews = document.createElement('p');
    noReviews.innerHTML = 'No reviews yet!';
    container.appendChild(noReviews);
    return;
  }

  for (const review of reviews) {
      appendReview(review);
  }
};

/**
 * Create review HTML and add it to the webpage.
 */
createReviewHTML = (review) => {
  const li = document.createElement('li');
  const name = document.createElement('p');
  name.innerHTML = review.name;
  li.appendChild(name);

  /*const date = document.createElement('p');
  date.innerHTML = new Date(review.createdAt);
  li.appendChild(date);*/

  const rating = document.createElement('p');
  rating.innerHTML = `Rating: ${review.rating}`;
  li.appendChild(rating);

  const comments = document.createElement('p');
  comments.innerHTML = review.comments;
  li.appendChild(comments);

  return li;
}

/** 
* Create new review and send it to the dbs
*/
addNewReview = () => {
  // get form data
  const form = document.querySelector('#new-review');
  form.addEventListener('submit', event => {
    event.preventDefault();
    const restaurant_id = getParameterByName('id');
    const name = document.querySelector('#name').value;
    const rating = document.querySelector('#rating').value;
    const comments = document.querySelector('#comments').value;

    const review = {
      restaurant_id,
      name,
      rating,
      comments
    }
    appendReview(review);
    // add data to the server
    // DBHelper.addNewReview(review);
    DBHelper.submitOrSyncReview(review);
    DBHelper.saveSingleReviewForRestaurant(review);
  })
}

addNewReview();

/**
 * Add restaurant name to the breadcrumb navigation menu
 */
fillBreadcrumb = (restaurant=self.restaurant) => {
  const breadcrumb = document.getElementById('breadcrumb');
  const li = document.createElement('li');
  li.innerHTML = restaurant.name;
  breadcrumb.appendChild(li);
}

/**
 * Get a parameter by name from page URL.
 */
getParameterByName = (name, url) => {
  if (!url)
    url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
    results = regex.exec(url);
  if (!results)
    return null;
  if (!results[2])
    return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}