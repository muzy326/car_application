

// Get all cars
const getAllCars = async () => {
  const result = await db.query(
    'SELECT * FROM cars ORDER BY id'
  );
  return result.rows;
};

// Get car by ID
const getCarById = async (id) => {
  const result = await db.query(
    'SELECT * FROM cars WHERE id = $1',
    [id]
  );
  return result.rows[0];
};

// Create a new car
const createCar = async (car) => {
  const { carname, price, image, available } = car;

  const result = await db.query(
    `INSERT INTO cars (carname, price, image, available)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [carname, price, image, available]
  );

  return result.rows[0];
};

// Update car
const updateCar = async (id, car) => {
  const { carname, price, image, available } = car;

  const result = await db.query(
    `UPDATE cars
     SET carname = $1,
         price = $2,
         image = $3,
         available = $4
     WHERE id = $5
     RETURNING *`,
    [carname, price, image, available, id]
  );

  return result.rows[0];
};

// Delete car
const deleteCar = async (id) => {
  await db.query(
    'DELETE FROM cars WHERE id = $1',
    [id]
  );
};

module.exports = {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar
};