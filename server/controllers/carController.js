const pool = require('../db');

// GET all cars
exports.getAllCars = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cars ORDER BY id ASC');

    const cars = result.rows.map(car => ({
      id: car.id,
      carname: car.carname,
      price: car.price,
      imageUrl: car.imageUrl || '',
      description: car.description || 'No description available',
      available: car.available ?? true,
      type: car.type || 'General',
      rating: car.rating ?? 5,
      discount: car.discount ?? 0
    }));

    res.json(cars);
  } catch (err) {
    console.error('Error fetching cars:', err);
    res.status(500).json({ message: 'Error fetching cars', error: err.message });
  }
};

// GET single car
exports.getCarById = async (req, res) => {
  const id = Number(req.params.id);
  try {
    const result = await pool.query('SELECT * FROM cars WHERE id=$1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Car not found' });

    const car = result.rows[0];
    res.json({
      id: car.id,
      carname: car.carname,
      price: car.price,
      imageUrl: car.imageUrl || '',
      description: car.description || 'No description available',
      available: car.available ?? true,
      type: car.type || 'General',
      rating: car.rating ?? 5,
      discount: car.discount ?? 0
    });
  } catch (err) {
    console.error('Error fetching car:', err);
    res.status(500).json({ message: 'Error fetching car', error: err.message });
  }
};

// CREATE car
exports.createCar = async (req, res) => {
  const { carname, price, imageUrl, available, description, type, rating, discount } = req.body;

  if (!carname || price === undefined || price === null) {
    return res.status(400).json({ message: 'Car name and price are required' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO cars 
      (carname, price, "imageUrl", available, description, type, rating, discount)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [
        carname,
        Number(price),
        imageUrl?.trim() || '',
        available !== undefined ? Boolean(available) : true,
        description?.trim() || '',
        type?.trim() || 'General',
        rating !== undefined ? Number(rating) : 5,
        discount !== undefined ? Number(discount) : 0
      ]
    );

    const car = result.rows[0];
    res.status(201).json({ message: 'Car created successfully', car });
  } catch (err) {
    console.error('Error creating car:', err);
    res.status(500).json({ message: 'Internal server error while adding car', error: err.message });
  }
};

// UPDATE car
exports.updateCar = async (req, res) => {
  const id = Number(req.params.id);
  const { carname, price, imageUrl, available, description, type, rating, discount } = req.body;

  if (!carname || price === undefined || price === null) {
    return res.status(400).json({ message: 'Car name and price are required' });
  }

  try {
    const result = await pool.query(
      `UPDATE cars SET
       carname=$1, price=$2, "imageUrl"=$3, available=$4,
       description=$5, type=$6, rating=$7, discount=$8
       WHERE id=$9 RETURNING *`,
      [
        carname,
        Number(price),
        imageUrl?.trim() || '',
        available !== undefined ? Boolean(available) : true,
        description?.trim() || '',
        type?.trim() || 'General',
        rating !== undefined ? Number(rating) : 5,
        discount !== undefined ? Number(discount) : 0,
        id
      ]
    );

    if (result.rows.length === 0) return res.status(404).json({ message: 'Car not found' });

    const car = result.rows[0];
    res.json({
      message: 'Car updated successfully',
      car: {
        id: car.id,
        carname: car.carname,
        price: car.price,
        imageUrl: car.imageUrl || '',
        description: car.description || 'No description available',
        available: car.available ?? true,
        type: car.type || 'General',
        rating: car.rating ?? 5,
        discount: car.discount ?? 0
      }
    });
  } catch (err) {
    console.error('Error updating car:', err);
    res.status(500).json({ message: 'Internal server error while updating car', error: err.message });
  }
};

exports.deleteCar = async (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (!id || isNaN(id)) {
    return res.status(400).json({ message: "Invalid car ID" });
  }

  try {
    const result = await pool.query(
      'DELETE FROM cars WHERE id=$1 RETURNING *',
      [id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ message: "Car not found" });
    }

    return res.status(200).json({
      message: "Car deleted successfully",
      id: result.rows[0].id
    });

  } catch (err) {
    console.error("DELETE CAR ERROR:", err);
    return res.status(500).json({
      message: "Error deleting car",
      error: err.message
    });
  }
};

// DELETE car
// exports.deleteCar = async (req, res) => {
//   const id = Number(req.params.id);
//   try {
//     const result = await pool.query('DELETE FROM cars WHERE id=$1 RETURNING *', [id]);
//     if (result.rows.length === 0) return res.status(404).json({ message: 'Car not found' });
//     res.json({ message: `Car with ID ${id} deleted successfully` });
//   } catch (err) {
//     console.error('Error deleting car:', err);
//     res.status(500).json({ message: 'Error deleting car', error: err.message });
//   }
// };
// DELETE car
// exports.deleteCar = async (req, res) => {
//   try {
//     const id = Number(req.params.id);

//     // ✅ safety check
//     if (!id || isNaN(id)) {
//       return res.status(400).json({ message: 'Invalid car ID' });
//     }

//     const result = await pool.query(
//       'DELETE FROM cars WHERE id = $1 RETURNING *',
//       [id]
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).json({ message: 'Car not found' });
//     }

//     return res.status(200).json({
//       message: 'Car deleted successfully',
//       deletedCar: result.rows[0]
//     });

//   } catch (err) {
//     console.error('Error deleting car:', err);
//     return res.status(500).json({
//       message: 'Error deleting car',
//       error: err.message
//     });
//   }
// };