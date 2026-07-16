CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    phonenumber VARCHAR(30),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS cars (
    id SERIAL PRIMARY KEY,
    carname VARCHAR(150) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    "imageUrl" TEXT DEFAULT '',
    description TEXT DEFAULT '',
    available BOOLEAN DEFAULT true,
    type VARCHAR(100) DEFAULT 'General',
    rating NUMERIC(2,1) DEFAULT 5,
    discount NUMERIC(5,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,

    user_id INTEGER NOT NULL,
    car_id INTEGER NOT NULL,

    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,

    status VARCHAR(50) DEFAULT 'Pending',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(user_id)
    REFERENCES users(id)
    ON DELETE CASCADE,

    FOREIGN KEY(car_id)
    REFERENCES cars(id)
    ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,

    booking_id INTEGER NOT NULL,

    user_id INTEGER,

    amount NUMERIC(10,2) NOT NULL,

    method VARCHAR(50),

    status VARCHAR(50) DEFAULT 'Pending',

    paid_at TIMESTAMP,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,


    FOREIGN KEY(booking_id)
    REFERENCES bookings(id)
    ON DELETE CASCADE,

    FOREIGN KEY(user_id)
    REFERENCES users(id)
    ON DELETE SET NULL
);


INSERT INTO users
(firstname,lastname,email,password,role,phonenumber)
VALUES
(
'Admin',
'User',
'admin@gmail.com',
'$2a$10$7EqJtq98hPqEX7fNZaFWoO5u5Lh1b7p8e8pJ7nW5Jf0k5nYxZ7fQ6',
'admin',
'000000000'
)
ON CONFLICT(email) DO NOTHING;


INSERT INTO cars
(carname,price,type)
VALUES
('Toyota Camry',120,'Sedan'),
('BMW X5',300,'SUV'),
('Mercedes C Class',250,'Luxury')
ON CONFLICT DO NOTHING;