import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// MySQL connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

app.get('/api/quote', (req, res) => {
    const query = 'SELECT quote, author FROM quotes ORDER BY RAND() LIMIT 1';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching quote:', err);
            res.status(500).send('Error fetching quote');
            return;
        }

        if (results.length > 0) {
            res.json({
                quote: results[0].quote,
                author: results[0].author
            });
        } else {
            res.status(404).send('No quotes found');
        }
    });
});

app.post('/api/login', (req, res) => {
    const { userId, password } = req.body;
    const query = 'SELECT password FROM login WHERE userId = ?';

    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching user:', err);
            res.status(500).json({ success: false, message: 'Server error' });
            return;
        }

        if (results.length > 0) {
            const user = results[0];

            // Directly compare the provided password with the stored password
            if (user.password === password) {
                res.json({ success: true, message: 'Login successful' });
            } else {
                res.json({ success: false, message: 'Incorrect password' });
            }
        } else {
            res.json({ success: false, message: 'User does not exist' });
        }
    });
});




app.post('/api/logged', (req, res) => {
    const { user } = req.body;

    // Check if userId exists in the request
    if (!user) {
        return res.status(400).json({ success: false, message: 'User ID is required' });
    }

    const query = 'SELECT type, name FROM login WHERE userId = ?'; // SQL query to fetch type and name

    db.query(query, [user], (err, results) => {
        if (err) {
            console.error('Error fetching user type:', err); // Log the error for debugging
            return res.status(500).json({ success: false, message: 'Server error' }); // Server error handling
        }

        if (results.length > 0) {
            const { type, name } = results[0]; // Destructure type and name from the first result
            return res.json({ success: true, type, name }); // Send back type and name in JSON response
        } else {
            return res.status(404).json({ success: false, message: 'User not found' }); // User not found case
        }
    });
});



app.post('/registration', (req, res) => {

    const { userID, password, name, dob, email, type } = req.body;

    // Input validation
    if (!name || !userID || !password || !dob || !email) {
        return res.json({ success: false, message: 'All fields are required' });
    }

    // Check if userID already exists
    const checkSql = 'SELECT * FROM login WHERE userID = ?';
    db.query(checkSql, [userID], (checkErr, checkResult) => {
        if (checkErr) {
            console.error('Failed to check user ID:', checkErr);
            return res.json({ success: false, message: 'Database error' });
        }

        if (checkResult.length > 0) {
            // User ID already exists
            return res.json({ success: false, message: 'UserID already exists, please choose another' });
        }

        // If userID does not exist, proceed to insert
        const insertSql = 'INSERT INTO login (userID, password, name, dob, email, type) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [userID, password, name, dob, email, type];

        db.query(insertSql, values, (insertErr, insertResult) => {
            if (insertErr) {
                console.error('Failed to insert user data:', insertErr);
                res.json({ success: false, message: 'Failed to register' });
            } else {
                console.log('Registered successfully:', insertResult);
                res.json({ success: true, message: 'Registration successful' });
            }
        });
    });
});

app.get('/getQuestion', (req, res) => {
    let currentQuestionId = parseInt(req.query.lastId) || 0;
    const query = `SELECT * FROM questions WHERE question_id > ? ORDER BY question_id ASC LIMIT 1`;
    db.query(query, [currentQuestionId], (error, results) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.json({ message: 'No more questions available' });
        } else {
            res.json(results[0]);
        }
    });
});

app.post('/api/changePassword', (req, res) => {
    const { userId, dob, newPassword } = req.body;

    // Check if all fields are provided
    if (!userId || !dob || !newPassword) {
        return res.status(400).json({ message: 'Please provide all required fields: userId, dob, newPassword' });
    }

    const query = 'UPDATE login SET password = ? WHERE userId = ? AND dob = ?';

    db.query(query, [newPassword, userId, dob], (err, result) => {
        if (err) {
            console.error('Error updating password:', err);
            return res.status(500).json({ message: 'Database error', error: err });
        }

        if (result.affectedRows > 0) {
            // If the update was successful
            return res.status(200).json({ message: 'Password updated successfully' });
        } else {
            // If no rows were updated, meaning the userId and dob did not match
            return res.status(400).json({ message: 'User not found or incorrect dob' });
        }
    });
});
