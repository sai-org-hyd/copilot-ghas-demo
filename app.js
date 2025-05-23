const express = require('express');
const app = express();
const port = 3000;

// 1. Assignment in Condition (always true)
function insecureLogin(inputUser) {
  let validUser = "admin";
  if (validUser = inputUser) {  // Mistake: assignment, not comparison
    console.log("Logged in as", validUser);  // Always logs user input
    return true;
  }
  return false;
}

// 2. Too Many Arguments
function fragilePayment(name, cardNo, expiry, cvv, address, phone, email) {
  // Very fragile API – easy to misuse
  console.log("Payment processed for", name);
}

// 3. Simulated SQL Injection
function simulateSQLInjection(userInput) {
  const query = `SELECT * FROM users WHERE name = '${userInput}'`;
  console.log("Executing:", query);  // Unsafe string interpolation
}

// 4. Insecure Eval
function runUserScript(script) {
  console.log("Evaluating user script...");
  eval(script);  // 🚨 Very dangerous
}

// 5. Leaking Sensitive Info
function printTokens() {
  const token = "token";
  console.log("DEBUG LOG: Auth token is", token);  // Never log secrets
}

// Demo routes
app.get('/login', (req, res) => {
  const user = req.query.user || "guest";
  insecureLogin(user);
  res.send("Login checked. (Always succeeds due to bug)");
});

app.get('/pay', (req, res) => {
  fragilePayment("Alice", "1234123412341234", "12/25", "123", "Earth", "1234567890", "alice@example.com");
  res.send("Payment route called (fragile API demo)");
});

app.get('/sql-test', (req, res) => {
  simulateSQLInjection(req.query.name || "guest");
  res.send("SQL test simulated");
});

app.get('/eval', (req, res) => {
  const userCode = req.query.code || "console.log('Hello from eval')";
  runUserScript(userCode);  // Eval executes code from URL param!
  res.send("Eval route executed");
});

app.get('/debug', (req, res) => {
  printTokens();
  res.send("Token printed in logs (should not happen)");
});

app.listen(port, () => {
  console.log(`Demo app with multiple vulnerabilities running at http://localhost:${port}`);
});
