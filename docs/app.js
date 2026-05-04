// DES and 3DES are implemented manually. AES uses the browser Web Crypto API.

// -----------------------------
// DES tables
// -----------------------------
const IP = [58,50,42,34,26,18,10,2,60,52,44,36,28,20,12,4,62,54,46,38,30,22,14,6,64,56,48,40,32,24,16,8,57,49,41,33,25,17,9,1,59,51,43,35,27,19,11,3,61,53,45,37,29,21,13,5,63,55,47,39,31,23,15,7];
const FP = [40,8,48,16,56,24,64,32,39,7,47,15,55,23,63,31,38,6,46,14,54,22,62,30,37,5,45,13,53,21,61,29,36,4,44,12,52,20,60,28,35,3,43,11,51,19,59,27,34,2,42,10,50,18,58,26,33,1,41,9,49,17,57,25];
const E_BOX = [32,1,2,3,4,5,4,5,6,7,8,9,8,9,10,11,12,13,12,13,14,15,16,17,16,17,18,19,20,21,20,21,22,23,24,25,24,25,26,27,28,29,28,29,30,31,32,1];
const P_BOX = [16,7,20,21,29,12,28,17,1,15,23,26,5,18,31,10,2,8,24,14,32,27,3,9,19,13,30,6,22,11,4,25];
const PC1 = [57,49,41,33,25,17,9,1,58,50,42,34,26,18,10,2,59,51,43,35,27,19,11,3,60,52,44,36,63,55,47,39,31,23,15,7,62,54,46,38,30,22,14,6,61,53,45,37,29,21,13,5,28,20,12,4];
const PC2 = [14,17,11,24,1,5,3,28,15,6,21,10,23,19,12,4,26,8,16,7,27,20,13,2,41,52,31,37,47,55,30,40,51,45,33,48,44,49,39,56,34,53,46,42,50,36,29,32];
const SHIFT_TABLE = [1,1,2,2,2,2,2,2,1,2,2,2,2,2,2,1];
const S_BOX = [
  [[14,4,13,1,2,15,11,8,3,10,6,12,5,9,0,7],[0,15,7,4,14,2,13,1,10,6,12,11,9,5,3,8],[4,1,14,8,13,6,2,11,15,12,9,7,3,10,5,0],[15,12,8,2,4,9,1,7,5,11,3,14,10,0,6,13]],
  [[15,1,8,14,6,11,3,4,9,7,2,13,12,0,5,10],[3,13,4,7,15,2,8,14,12,0,1,10,6,9,11,5],[0,14,7,11,10,4,13,1,5,8,12,6,9,3,2,15],[13,8,10,1,3,15,4,2,11,6,7,12,0,5,14,9]],
  [[10,0,9,14,6,3,15,5,1,13,12,7,11,4,2,8],[13,7,0,9,3,4,6,10,2,8,5,14,12,11,15,1],[13,6,4,9,8,15,3,0,11,1,2,12,5,10,14,7],[1,10,13,0,6,9,8,7,4,15,14,3,11,5,2,12]],
  [[7,13,14,3,0,6,9,10,1,2,8,5,11,12,4,15],[13,8,11,5,6,15,0,3,4,7,2,12,1,10,14,9],[10,6,9,0,12,11,7,13,15,1,3,14,5,2,8,4],[3,15,0,6,10,1,13,8,9,4,5,11,12,7,2,14]],
  [[2,12,4,1,7,10,11,6,8,5,3,15,13,0,14,9],[14,11,2,12,4,7,13,1,5,0,15,10,3,9,8,6],[4,2,1,11,10,13,7,8,15,9,12,5,6,3,0,14],[11,8,12,7,1,14,2,13,6,15,0,9,10,4,5,3]],
  [[12,1,10,15,9,2,6,8,0,13,3,4,14,7,5,11],[10,15,4,2,7,12,9,5,6,1,13,14,0,11,3,8],[9,14,15,5,2,8,12,3,7,0,4,10,1,13,11,6],[4,3,2,12,9,5,15,10,11,14,1,7,6,0,8,13]],
  [[4,11,2,14,15,0,8,13,3,12,9,7,5,10,6,1],[13,0,11,7,4,9,1,10,14,3,5,12,2,15,8,6],[1,4,11,13,12,3,7,14,10,15,6,8,0,5,9,2],[6,11,13,8,1,4,10,7,9,5,0,15,14,2,3,12]],
  [[13,2,8,4,6,15,11,1,10,9,3,14,5,0,12,7],[1,15,13,8,10,3,7,4,12,5,6,11,0,14,9,2],[7,11,4,1,9,12,14,2,0,6,10,13,15,3,5,8],[2,1,14,7,4,10,8,13,15,12,9,0,3,5,6,11]]
];

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();
const state = { lastCipherByAlgorithm: {} };

function getElement(id) {
  return document.getElementById(id);
}

function stringToBytes(text) {
  return textEncoder.encode(text);
}

function bytesToString(bytes) {
  return textDecoder.decode(bytes);
}

function bytesToHex(bytes) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("").toUpperCase();
}

function hexToBytes(hexText) {
  const cleanHex = hexText.replace(/\s+/g, "").toUpperCase();
  if (!cleanHex || cleanHex.length % 2 !== 0 || /[^0-9A-F]/.test(cleanHex)) {
    throw new Error("Ciphertext must be valid hexadecimal text.");
  }

  const bytes = new Uint8Array(cleanHex.length / 2);
  for (let i = 0; i < cleanHex.length; i += 2) {
    bytes[i / 2] = parseInt(cleanHex.slice(i, i + 2), 16);
  }
  return bytes;
}

function textKeyToHex(keyText, neededBytes, keyName) {
  const keyBytes = stringToBytes(keyText);
  if (keyBytes.length !== neededBytes) {
    throw new Error(`${keyName} must be exactly ${neededBytes} characters.`);
  }
  return bytesToHex(keyBytes);
}

function padBytes(dataBytes, blockSize) {
  const paddingLength = blockSize - (dataBytes.length % blockSize || blockSize) || blockSize;
  const paddedBytes = new Uint8Array(dataBytes.length + paddingLength);
  paddedBytes.set(dataBytes);
  paddedBytes.fill(paddingLength, dataBytes.length);
  return paddedBytes;
}

function unpadBytes(dataBytes, blockSize) {
  const paddingLength = dataBytes[dataBytes.length - 1];
  if (paddingLength < 1 || paddingLength > blockSize) {
    throw new Error("The decrypted text has invalid padding.");
  }

  for (let i = dataBytes.length - paddingLength; i < dataBytes.length; i++) {
    if (dataBytes[i] !== paddingLength) {
      throw new Error("The decrypted text has invalid padding.");
    }
  }

  return dataBytes.slice(0, dataBytes.length - paddingLength);
}

function hexToBin(hexText) {
  return hexText.split("").map((digit) => parseInt(digit, 16).toString(2).padStart(4, "0")).join("");
}

function binToHex(bitText) {
  let hexText = "";
  for (let i = 0; i < bitText.length; i += 4) {
    hexText += parseInt(bitText.slice(i, i + 4), 2).toString(16).toUpperCase();
  }
  return hexText;
}

function permute(bitText, table) {
  return table.map((position) => bitText[position - 1]).join("");
}

function shiftLeft(bitText, shiftCount) {
  return bitText.slice(shiftCount) + bitText.slice(0, shiftCount);
}

function xorBits(firstBits, secondBits) {
  let answer = "";
  for (let i = 0; i < firstBits.length; i++) {
    answer += firstBits[i] === secondBits[i] ? "0" : "1";
  }
  return answer;
}

function makeDesRoundKeys(keyHex) {
  let keyBits = permute(hexToBin(keyHex), PC1);
  let left = keyBits.slice(0, 28);
  let right = keyBits.slice(28);
  const roundKeys = [];

  for (let round = 0; round < 16; round++) {
    left = shiftLeft(left, SHIFT_TABLE[round]);
    right = shiftLeft(right, SHIFT_TABLE[round]);
    roundKeys.push(permute(left + right, PC2));
  }

  return roundKeys;
}

function applySBox(inputBits) {
  let outputBits = "";

  for (let box = 0; box < 8; box++) {
    const block = inputBits.slice(box * 6, box * 6 + 6);
    const row = parseInt(block[0] + block[5], 2);
    const column = parseInt(block.slice(1, 5), 2);
    outputBits += S_BOX[box][row][column].toString(2).padStart(4, "0");
  }

  return outputBits;
}

function desBlock(blockHex, roundKeys) {
  let blockBits = permute(hexToBin(blockHex), IP);
  let left = blockBits.slice(0, 32);
  let right = blockBits.slice(32);

  for (let round = 0; round < 16; round++) {
    const expandedRight = permute(right, E_BOX);
    const xoredRight = xorBits(expandedRight, roundKeys[round]);
    const sboxOutput = applySBox(xoredRight);
    const pboxOutput = permute(sboxOutput, P_BOX);
    const newRight = xorBits(left, pboxOutput);
    left = right;
    right = newRight;
  }

  return binToHex(permute(right + left, FP));
}

function desEncryptBytes(dataBytes, keyText) {
  const keyHex = textKeyToHex(keyText, 8, "DES key");
  const roundKeys = makeDesRoundKeys(keyHex);
  const paddedHex = bytesToHex(padBytes(dataBytes, 8));
  let cipherHex = "";

  for (let i = 0; i < paddedHex.length; i += 16) {
    cipherHex += desBlock(paddedHex.slice(i, i + 16), roundKeys);
  }

  return cipherHex;
}

function desDecryptToBytes(cipherHex, keyText) {
  const keyHex = textKeyToHex(keyText, 8, "DES key");
  const roundKeys = makeDesRoundKeys(keyHex).reverse();
  const cleanCipher = bytesToHex(hexToBytes(cipherHex));
  let plainHex = "";

  if (cleanCipher.length % 16 !== 0) {
    throw new Error("DES ciphertext length must be a multiple of 16 hex characters.");
  }

  for (let i = 0; i < cleanCipher.length; i += 16) {
    plainHex += desBlock(cleanCipher.slice(i, i + 16), roundKeys);
  }

  return unpadBytes(hexToBytes(plainHex), 8);
}

function tripleDesEncryptBytes(dataBytes, key1, key2, key3) {
  const k1 = makeDesRoundKeys(textKeyToHex(key1, 8, "3DES key 1"));
  const k2 = makeDesRoundKeys(textKeyToHex(key2, 8, "3DES key 2")).reverse();
  const k3 = makeDesRoundKeys(textKeyToHex(key3, 8, "3DES key 3"));
  const paddedHex = bytesToHex(padBytes(dataBytes, 8));
  let cipherHex = "";

  for (let i = 0; i < paddedHex.length; i += 16) {
    const step1 = desBlock(paddedHex.slice(i, i + 16), k1);
    const step2 = desBlock(step1, k2);
    const step3 = desBlock(step2, k3);
    cipherHex += step3;
  }

  return cipherHex;
}

function tripleDesDecryptToBytes(cipherHex, key1, key2, key3) {
  const k1 = makeDesRoundKeys(textKeyToHex(key1, 8, "3DES key 1")).reverse();
  const k2 = makeDesRoundKeys(textKeyToHex(key2, 8, "3DES key 2"));
  const k3 = makeDesRoundKeys(textKeyToHex(key3, 8, "3DES key 3")).reverse();
  const cleanCipher = bytesToHex(hexToBytes(cipherHex));
  let plainHex = "";

  if (cleanCipher.length % 16 !== 0) {
    throw new Error("3DES ciphertext length must be a multiple of 16 hex characters.");
  }

  for (let i = 0; i < cleanCipher.length; i += 16) {
    const step1 = desBlock(cleanCipher.slice(i, i + 16), k3);
    const step2 = desBlock(step1, k2);
    const step3 = desBlock(step2, k1);
    plainHex += step3;
  }

  return unpadBytes(hexToBytes(plainHex), 8);
}

async function aesImportKey(keyText) {
  const keyBytes = stringToBytes(keyText);
  if (keyBytes.length !== 16) {
    throw new Error("AES key must be exactly 16 characters for AES-128.");
  }
  return crypto.subtle.importKey("raw", keyBytes, { name: "AES-CBC" }, false, ["encrypt", "decrypt"]);
}

async function aesEncryptBytes(dataBytes, keyText) {
  const key = await aesImportKey(keyText);
  const iv = crypto.getRandomValues(new Uint8Array(16));
  const cipherBuffer = await crypto.subtle.encrypt({ name: "AES-CBC", iv }, key, dataBytes);
  return `${bytesToHex(iv)}:${bytesToHex(new Uint8Array(cipherBuffer))}`;
}

async function aesDecryptToBytes(cipherText, keyText) {
  const parts = cipherText.trim().split(":");
  if (parts.length !== 2) {
    throw new Error("AES ciphertext must use this format: IV_HEX:CIPHER_HEX");
  }

  const key = await aesImportKey(keyText);
  const iv = hexToBytes(parts[0]);
  const cipherBytes = hexToBytes(parts[1]);
  const plainBuffer = await crypto.subtle.decrypt({ name: "AES-CBC", iv }, key, cipherBytes);
  return new Uint8Array(plainBuffer);
}

function readKeys(algorithm) {
  if (algorithm === "DES") {
    return { key1: getElement("key1").value };
  }

  if (algorithm === "3DES") {
    return {
      key1: getElement("key1").value,
      key2: getElement("key2").value,
      key3: getElement("key3").value
    };
  }

  return { key1: getElement("key1").value };
}

async function runCrypto() {
  const algorithm = getElement("algorithmSelect").value;
  const operation = getElement("operationSelect").value;
  const inputText = getElement("messageInput").value;
  const keys = readKeys(algorithm);
  const startTime = performance.now();
  let outputText = "";

  if (algorithm === "DES" && operation === "encrypt") {
    outputText = desEncryptBytes(stringToBytes(inputText), keys.key1);
  }

  if (algorithm === "DES" && operation === "decrypt") {
    outputText = bytesToString(desDecryptToBytes(inputText, keys.key1));
  }

  if (algorithm === "3DES" && operation === "encrypt") {
    outputText = tripleDesEncryptBytes(stringToBytes(inputText), keys.key1, keys.key2, keys.key3);
  }

  if (algorithm === "3DES" && operation === "decrypt") {
    outputText = bytesToString(tripleDesDecryptToBytes(inputText, keys.key1, keys.key2, keys.key3));
  }

  if (algorithm === "AES" && operation === "encrypt") {
    outputText = await aesEncryptBytes(stringToBytes(inputText), keys.key1);
  }

  if (algorithm === "AES" && operation === "decrypt") {
    outputText = bytesToString(await aesDecryptToBytes(inputText, keys.key1));
  }

  const endTime = performance.now();
  showResult(outputText, endTime - startTime);
  state.lastCipherByAlgorithm[algorithm] = operation === "encrypt" ? outputText : state.lastCipherByAlgorithm[algorithm];
}

function showResult(outputText, elapsedMs) {
  const algorithm = getElement("algorithmSelect").value;
  const operation = getElement("operationSelect").value;
  const outputIsText = operation === "decrypt";

  getElement("resultTitle").textContent = outputIsText ? "Plaintext" : "Ciphertext";
  getElement("resultBox").textContent = outputText;
  getElement("timeValue").textContent = `${elapsedMs.toFixed(3)} ms`;
  getElement("inputBytes").textContent = stringToBytes(getElement("messageInput").value).length;
  getElement("outputBytes").textContent = outputIsText ? stringToBytes(outputText).length : outputText.replace(/[^0-9A-F]/gi, "").length / 2;
  getElement("modeName").textContent = `${algorithm} ${operation}`;
}

function showError(error) {
  getElement("resultTitle").textContent = "Error";
  getElement("resultBox").textContent = error.message;
  getElement("timeValue").textContent = "0.000 ms";
}

function updateKeyFields() {
  const algorithm = getElement("algorithmSelect").value;
  const keyFields = getElement("keyFields");

  if (algorithm === "DES") {
    keyFields.innerHTML = `
      <label>
        <span>DES key, exactly 8 characters</span>
        <input id="key1" value="12345678" spellcheck="false">
      </label>
    `;
  }

  if (algorithm === "3DES") {
    keyFields.innerHTML = `
      <div class="two-column">
        <label>
          <span>3DES key 1, 8 characters</span>
          <input id="key1" value="12345678" spellcheck="false">
        </label>
        <label>
          <span>3DES key 2, 8 characters</span>
          <input id="key2" value="ABCDEFGH" spellcheck="false">
        </label>
      </div>
      <label>
        <span>3DES key 3, 8 characters</span>
        <input id="key3" value="87654321" spellcheck="false">
      </label>
    `;
  }

  if (algorithm === "AES") {
    keyFields.innerHTML = `
      <label>
        <span>AES-128 key, exactly 16 characters</span>
        <input id="key1" value="1234567890ABCDEF" spellcheck="false">
      </label>
    `;
  }

  updateLabels();
}

function updateLabels() {
  const algorithm = getElement("algorithmSelect").value;
  const operation = getElement("operationSelect").value;
  getElement("runButton").textContent = operation === "encrypt" ? "Encrypt" : "Decrypt";
  getElement("messageLabel").textContent = operation === "encrypt" ? "Plaintext" : "Ciphertext";
  getElement("resultTitle").textContent = operation === "encrypt" ? "Ciphertext" : "Plaintext";
  getElement("modeName").textContent = `${algorithm} ${operation}`;
}

function useSample() {
  const algorithm = getElement("algorithmSelect").value;
  const operation = getElement("operationSelect").value;
  const savedCipher = state.lastCipherByAlgorithm[algorithm];

  if (operation === "decrypt" && savedCipher) {
    getElement("messageInput").value = savedCipher;
    return;
  }

  if (algorithm === "DES") {
    getElement("messageInput").value = operation === "encrypt" ? "The biology final answers are hidden inside the hollow leg of the third table in the back of the silent study zone. Look for the red sticker." : "F7829BB509329F82F20A03B69CC29F7F0689B36C366B2CEB06ADFC3A88E41421C4B5B346656A16E12A9E1711C3406FD85B36F631BC87072D4B3DEAEFCEE1246EB2D7CE1396122F7EE2D7E2B3A8D3A62117404D0C937FBCD0049172E6601F5D120C52D95631DFA15E5931B1FE5AD33E073B9F30BBDD8D8A2E2E6DBE8F113849836150C121C56E562298E7AE3317642207";
    getElement("key1").value = "BioHack1";
  }

  if (algorithm === "3DES") {
    getElement("messageInput").value = operation === "encrypt" ? "The Founders Circle will convene at 9:00 PM behind the old clock tower. Bring the blue notebook; it serves as your entry pass." : "60219A35A9F43D8D45D18C1E2292D85B3B927290C63EA02107CFD0E155717B487DF95DBB63E5561C2BF89ADDF440541DBB477D008FD9698633788428F4927E10C164BED63BDDFEBA026ECE6B7E3798696248429B022FFD850CE04F3D6FE0C6661792213CE0F5C6F0C41E889A2D34B3A5181A7FFD084152742891266BFFF50C25";
    getElement("key1").value = "ClockTow";
    getElement("key2").value = "erMidnig";
    getElement("key3").value = "htCircle";
  }

  if (algorithm === "AES") {
    getElement("messageInput").value = operation === "encrypt" ? "Access the basement through the service elevator using the keycard hidden in 'Introduction to Cryptography' in the library’s third floor, aisle four." : "2905E8AB4465959351D6E9DA3626555C:2704605AACEA135A8AC9A68083FD69758666489A8CEF330802E0DC894DE5555D32EEDC674781EC9998B145ACAD953B8C92D73D60253B95DB369FE2FBEA605E61353B8552FD4C31DBDD329D2D1A36EE89405E7A38948B03E3A44B627678F9B8EE90B2F0AD176CD8831EECD58FDC18BABB6CE55E9A7A4B2DC5EAD17048DD3F3E532D37808580C4ED3EBB18C8E804827B23FC775F4FFB35EC2130E151726FEAB00F";
    getElement("key1").value = "DontTellTheDean!";
  }

}

getElement("cryptoForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    await runCrypto();
  } catch (error) {
    showError(error);
  }
});

getElement("algorithmSelect").addEventListener("change", () => {
  updateKeyFields();
  useSample();
});

getElement("operationSelect").addEventListener("change", () => {
  updateLabels();
  useSample();
});

getElement("sampleButton").addEventListener("click", useSample);

getElement("clearButton").addEventListener("click", () => {
  getElement("messageInput").value = "";
  getElement("resultBox").textContent = "";
  getElement("inputBytes").textContent = "0";
  getElement("outputBytes").textContent = "0";
  getElement("timeValue").textContent = "0.000 ms";
});

updateKeyFields();
updateLabels();
