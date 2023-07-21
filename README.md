# Student-Result-Management-System
In this project there is two module (Student Module, Teacher Module) Teacher can Login and perform CRUD on Student(Add New Student, Update Student, View All Student, Delete Student) and Student Can login by using there Roll Number and Date of Birth). Technology used HTML, CSS, JavaScript, Nodejs, PostgresSQL

Steps for setup project.

1. Set up the environment:
Install Node.js and PostgreSQL on your machine.
Create a new directory for your project.
Open a terminal or command prompt and navigate to the project directory.

2. Initialize the project:
Run the following command to create a new Node.js project:
npm init
Follow the prompts to set up your project and create a package.json file.

3. Install required packages:
Install the necessary packages by running the following commands:
npm install express pg ejs

4. Create project structure:
Create the following directory structure within your project directory:
|- public/
|  |- css/
|  |  |- style.css
|  |- js/
|     |- main.js
|- views/
   |- index.ejs
   |- student.ejs
   |- teacher.ejs
|- server.js


5. Create the database:

Set up a PostgreSQL database and create a table named results with the following columns:
id (serial, primary key)
roll_number (varchar)
dob (date)
marks (integer)
name (varchar)

6. Open your web browser and visit http://localhost:3000 to access the application.
