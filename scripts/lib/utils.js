export function parseJwt(token) {
  const base64Payload = token.split(".")[1];
  const payload = Buffer.from(base64Payload, "base64");

  return JSON.parse(payload.toString());
}
