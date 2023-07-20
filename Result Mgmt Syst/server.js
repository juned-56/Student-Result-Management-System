const express = require('express');
const crypto = require('crypto');
const session = require('express-session');
// Generate a random secret key
const secretKey = crypto.randomBytes(32).toString('hex');
const app = express();
const port = 3000;

// Set up database connection
const { Pool } = require('pg');
const pool = new Pool({ 
  user: 'postgres',
  host: 'localhost',
  database: 'resultmgmtsystm',
  password: 'postgres',
  port: 5432
});

// Set up view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Homepage route
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/student', (req, res) => {
    res.render('student', { error: '', result: null });
  });
  

// Student view route
app.get('/student', (req, res) => {
  res.render('student');
});

// Student search route
app.post('/student', (req, res) => {
  const { rollNumber, dob } = req.body;
  const query = 'SELECT * FROM results WHERE roll_number = $1 AND dob = $2';
  const values = [rollNumber, dob];
  pool.query(query, values, (err, result) => {
    if (err) {
      console.error('Error retrieving student:', err);
      res.render('index', { error: 'An error occurred while retrieving the student.', result: null });
    } else {
      if (result.rows.length === 0) {
        // Handle case when student record with the specified roll number and DOB does not exist
        res.render('index', { error: 'No student record found for the provided roll number and date of birth.', result: null });
      } else {
        const student = result.rows[0];
        res.render('student', { student });
      }
    }
  });
});

//Teacher View All Student Result
app.get('/teacher', (req, res) => {
    const query = 'SELECT * FROM results';
    pool.query(query, (err, result) => {
      if (err) {
        console.error('Error retrieving student results:', err);
        res.render('teacher', { error: 'An error occurred. Please try again later.', results: [] });
      } else {
        res.render('teacher', { error: '', results: result.rows });
      }
    });
  });

// Add student route
app.post('/add', (req, res) => {
  const { rollNumber, name, dob, marks } = req.body;
  const query = 'INSERT INTO results (roll_number, name, dob, marks) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [rollNumber, name, dob, marks];
  pool.query(query, values, (err, result) => {
    if (err) {
      console.error('Error adding student:', err);
      res.render('teacher', { error: 'An error occurred while adding the student. Please try again.', results: [] });
    } else {
      res.redirect('/teacher');
    }
  });
});

// Edit student route
app.get('/edit', (req, res) => {
  const rollNumber = req.query.rollNumber;
  const query = 'SELECT * FROM results WHERE roll_number = $1';
  const values = [rollNumber];
  pool.query(query, values, (err, result) => {
    if (err) {
      console.error('Error retrieving student:', err);
      res.redirect('/teacher');
    } else {
      if (result.rows.length === 0) {
        // Handle case when student record with the specified roll number does not exist
        res.redirect('/teacher');
      } else {
        const student = result.rows[0];
        res.render('edit', { student });
      }
    }
  });
});

// Update student route
app.post('/edit', (req, res) => {
  const { rollNumber, name, dob, marks } = req.body;
  const query = 'UPDATE results SET dob = $1, name = $2, marks = $3 WHERE roll_number = $4';
  const values = [dob, name, marks, rollNumber];
  pool.query(query, values, (err, result) => {
    if (err) {
      console.error('Error updating student:', err);
      res.redirect('/teacher');
    } else {
      res.redirect('/teacher');
    }
  });
});

// Delete student route
app.get('/delete', (req, res) => {
  const rollNumber = req.query.rollNumber;
  const query = 'DELETE FROM results WHERE roll_number = $1';
  const values = [rollNumber];
  pool.query(query, values, (err, result) => {
    if (err) {
      console.error('Error deleting student:', err);
    }
    res.redirect('/teacher');
  });
});

// ...

// Student logout route
app.get('/student/logout', (req, res) => {
  res.redirect('/');
});

// Teacher logout route
app.get('/teacher/logout', (req, res) => {
  res.redirect('/');
});


//====================Teacher login===============
//// Use express-session middleware with the generated secret key
app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: false
}));

//middleware after setting up the session middleware
app.post('/teacher/login', (req, res) => {
  const { username, password } = req.body;
  // Implement logic to check teacher's login credentials
  // For demonstration purposes, we'll use a simple example where username and password are hardcoded.
  const validUsername = 'teacher123';
  const validPassword = 'password123';

  if (username === validUsername && password === validPassword) {
    // Set a session property to maintain the teacher's login status
    req.session.isLoggedIn = true;
    res.redirect('/teacher');
  } else {
    res.render('index', {showAlert: true, alertMessage: 'Invalid credentials. Please try again.'});  //error: 'Invalid credentials. Please try again.' }
  }
});
// Custom middleware to check teacher's login status
const teacherAuthMiddleware = (req, res, next) => {
  if (req.session.isLoggedIn) {
    // Teacher is logged in, allow access to the next route
    next();
  } else {
    // Teacher is not logged in, redirect to the login page
    res.redirect('/');
  }
};

// Apply the teacherAuthMiddleware to the teacher dashboard route
app.get('/teacher', teacherAuthMiddleware, (req, res) => {
  // Render the teacher dashboard
  res.render('teacher');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
