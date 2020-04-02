const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool.query(`
  SELECT *
  FROM users
  WHERE email = $1
  `, [email])
  .then((res) => {
    if (res.rows.length > 0) {
      return res.rows[0];
    } else {
      return null;
    }
  });
  
  // let user;
  // for (const userId in users) {
  //   user = users[userId];
  //   if (user.email.toLowerCase() === email.toLowerCase()) {
  //     break;
  //   } else {
  //     user = null;
  //   }
  // }
  // return Promise.resolve(user);
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool.query(`
  SELECT *
  FROM users
  WHERE id = $1
  `, [id])
  .then((res) => {
    if (res.rows.length > 0) {
      return res.rows[0];
    } else {
      return null;
    }
  })
  .catch((err) => {
    console.err(err);
  })
  // return Promise.resolve(users[id]);
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  return pool.query(`
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;
  `, [user.name, user.email, user.password])
  .then ((res) => {
    if (res.rows.length > 0) {
      return res.rows[0];
    } else {
      return null;
    }
  })
  .catch ((err) => {
    console.error(err);
  })
  // const userId = Object.keys(users).length + 1;
  // user.id = userId;
  // users[userId] = user;
  // return Promise.resolve(user);
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {

  return pool.query(`
  SELECT reservations.*, properties.*, avg(property_reviews.rating) AS average_rating
  FROM reservations
  JOIN properties ON properties.id = property_id
  JOIN property_reviews ON reservations.id = reservation_id
  WHERE reservations.guest_id = $1 AND reservations.end_date < Now()::date
  GROUP BY reservations.id, properties.id
  ORDER BY reservations.start_date DESC
  LIMIT $2
  `, [guest_id, limit])
  .then((res) => {
    if (res.rows.length > 0) {
      return res.rows;
    } else {
      return null;
    }
  })
  .catch((err) => {
    console.error(err);
  })
  // return getAllProperties(null, 2);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {

  const queryParams = [];

  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }

  if (options.owner_id) {
    if(queryString.length > 0) {
      queryString += `AND `;
    } else {
      queryString += `WHERE `;
    }
    queryParams.push(`${options.owner_id}`);
    queryString += `owner_id = $${queryParams.length} `;
  }

  if (options.minimum_price_per_night) {
    if(queryString.length > 0) {
      queryString += `AND `;
    } else {
      queryString += `WHERE `;
    }
    queryParams.push(`${options.minimum_price_per_night * 100}`);
    queryString += `cost_per_night >= $${queryParams.length} `;
  }

  if (options.maximum_price_per_night) {
    if(queryString.length > 0) {
      queryString += `AND `;
    } else {
      queryString += `WHERE `;
    }
    queryParams.push(`${options.maximum_price_per_night * 100}`);
    queryString += `cost_per_night <= $${queryParams.length} `;
  }

  if (options.minimum_rating) {
    if(queryString.length > 0) {
      queryString += `AND `;
    } else {
      queryString += `WHERE `;
    }
    queryParams.push(`${options.minimum_rating}`);
    queryString += `rating >= $${queryParams.length} `;
  }

  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  console.log(queryString, queryParams);

  return pool.query(queryString, queryParams)
  .then((res) => { 
    return res.rows;
  })
  .catch((err) => {
    console.error(err);
  })

  // const limitedProperties = {};
  // for (let i = 1; i <= limit; i++) {
  //   limitedProperties[i] = properties[i];
  // }
  // return Promise.resolve(limitedProperties);
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;