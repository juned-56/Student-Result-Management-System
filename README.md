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

7. Teacher login
username: teacher123
password: password123

<img width="959" alt="image" src="https://github.com/juned-56/Student-Result-Management-System/assets/73770571/03160931-3a22-42ed-bc5c-1bb147157b6c">

<img width="960" alt="image" src="https://github.com/juned-56/Student-Result-Management-System/assets/73770571/7d3fff04-e4f1-4d2f-813b-b7179473326e">

<img width="960" alt="image" src="https://github.com/juned-56/Student-Result-Management-System/assets/73770571/d23159f6-d170-4e5f-aa40-0197fd12ed55">

<img width="960" alt="image" src="https://github.com/juned-56/Student-Result-Management-System/assets/73770571/eafeb718-96da-4ec4-a050-6ea019a683b8">



