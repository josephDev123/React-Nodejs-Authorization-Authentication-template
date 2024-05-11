export function getCredential() {
  const credentialsStr = decodeURIComponent(document.cookie);
  const credentialsParts = credentialsStr.split(";");
  // console.log(credentialsStr);
  const tokenData: any = {};
  const userData: any = {};

  for (const part of credentialsParts) {
    const [name, value] = part.trim().split("="); // Trim spaces around the key and value

    try {
      const parsedValue = JSON.parse(value);
      if (name === "token") {
        tokenData[name] = parsedValue;
      } else if (name === "user") {
        userData[name] = parsedValue;
      }
    } catch (error) {
      // Handle non-JSON values, e.g., token
      if (name === "token") {
        tokenData[name] = value;
      }
    }
  }

  return { tokenData, userData };
}
