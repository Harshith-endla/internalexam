const express = require('express');
const app = express();
const port = 3005;

// Use middleware to parse the request body
app.use(express.urlencoded({ extended: true }));

// Route to display the form
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Calculator</title>
     </head>
     <body>
        <h1>Simple Math Calculator</h1>
        <form action="/calculator" method="POST">
          <label for="num1">Number 1:</label>
          <input type="number" id="num1" name="num1" required><br><br>
          
          <label for="num2">Number 2:</label>
          <input type="number" id="num2" name="num2" required><br><br>
          
          <label for="operation">Select Operation:</label>
          <select id="operation" name="operation" required>
            <option value="add">Add</option>
            <option value="subtract">Subtract</option>
            <option value="multiply">Multiply</option>
            <option value="divide">Divide</option>
          </select><br><br>
          
          <button type="submit">Calculate</button>
        </form>
        <style>
      body {
        text-align: center;
        margin-top: 50px;
      }
      input,
      select,
      button {
        margin: 10px;
        padding: 10px;
        font-size: 16px;
      }
    </style>
      </body>
    </html>
  `);
});

// Route to handle form submission and calculate the sum
app.post('/calculator', (req, res) => {
  const num1 = parseFloat(req.body.num1);
  const num2 = parseFloat(req.body.num2);
  const operation = req.body.operation;

  let result;
  let operationSymbol;

  // Perform the operation based on the user's choice
  switch (operation) {
    case 'add':
      result = num1 + num2;
      operationSymbol = '+';
      break;
    case 'subtract':
      result = num1 - num2;
      operationSymbol = '-';
      break;
    case 'multiply':
      result = num1 * num2;
      operationSymbol = '*';
      break;
    case 'divide':
      if (num2 === 0) {
        result = 'Cannot divide by zero';
      } else {
        result = num1 / num2;
      }
      operationSymbol = '/';
      break;
    default:
      result = 'Invalid operation';
      operationSymbol = '';
  }

  res.send(`
    <html>
      <head>
        <title>Result</title>
      </head>
      <body>
        <h1>Result of ${operation.charAt(0).toUpperCase() + operation.slice(1)}</h1>
        <p>${num1} ${operationSymbol} ${num2} = ${result}</p>
        <a href="/">Go back to the form</a>
      </body>
       <style>
      body {
        text-align: center;
        margin-top: 50px;
      }
      p {
      font-size: 20px;
      }
     </style>
    </html>
  `);
});


app.listen(port,'0.0.0.0', () => {
  console.log(`Server is running at http://localhost:${port}`);
});
