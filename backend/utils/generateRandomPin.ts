export function generateRandomPIN() {
  const length = 7;
  let pin = "";

  for (let i = 0; i < length; i++) {
    const digit = Math.floor(Math.random() * 10); // Generate a random digit (0-9)
    pin += digit.toString();
  }

  return pin;
}

// Example usage:
//   const otpPIN = generateRandomPIN();
//   console.log("Generated OTP PIN:", otpPIN);
