import crypto, { verify } from "crypto";

export function genPassword(password) {
  var salt = crypto.randomBytes(32).toString("hex");
  var genHash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return {
    salt: salt,
    hash: genHash,
  };
}

export function validatePassword(password, hash, salt) {
  // hash is from the database
  var hashVerify = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  console.log("hashVerify: ", hashVerify);
  return hash === hashVerify;
}
