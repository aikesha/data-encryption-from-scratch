// Browser demo for DES, 3DES, and AES-128.
// The code is intentionally written in a simple student style.

const TABLES = {"initialPerm":[58,50,42,34,26,18,10,2,60,52,44,36,28,20,12,4,62,54,46,38,30,22,14,6,64,56,48,40,32,24,16,8,57,49,41,33,25,17,9,1,59,51,43,35,27,19,11,3,61,53,45,37,29,21,13,5,63,55,47,39,31,23,15,7],"expD":[32,1,2,3,4,5,4,5,6,7,8,9,8,9,10,11,12,13,12,13,14,15,16,17,16,17,18,19,20,21,20,21,22,23,24,25,24,25,26,27,28,29,28,29,30,31,32,1],"permutationP":[16,7,20,21,29,12,28,17,1,15,23,26,5,18,31,10,2,8,24,14,32,27,3,9,19,13,30,6,22,11,4,25],"sbox":[[[14,4,13,1,2,15,11,8,3,10,6,12,5,9,0,7],[0,15,7,4,14,2,13,1,10,6,12,11,9,5,3,8],[4,1,14,8,13,6,2,11,15,12,9,7,3,10,5,0],[15,12,8,2,4,9,1,7,5,11,3,14,10,0,6,13]],[[15,1,8,14,6,11,3,4,9,7,2,13,12,0,5,10],[3,13,4,7,15,2,8,14,12,0,1,10,6,9,11,5],[0,14,7,11,10,4,13,1,5,8,12,6,9,3,2,15],[13,8,10,1,3,15,4,2,11,6,7,12,0,5,14,9]],[[10,0,9,14,6,3,15,5,1,13,12,7,11,4,2,8],[13,7,0,9,3,4,6,10,2,8,5,14,12,11,15,1],[13,6,4,9,8,15,3,0,11,1,2,12,5,10,14,7],[1,10,13,0,6,9,8,7,4,15,14,3,11,5,2,12]],[[7,13,14,3,0,6,9,10,1,2,8,5,11,12,4,15],[13,8,11,5,6,15,0,3,4,7,2,12,1,10,14,9],[10,6,9,0,12,11,7,13,15,1,3,14,5,2,8,4],[3,15,0,6,10,1,13,8,9,4,5,11,12,7,2,14]],[[2,12,4,1,7,10,11,6,8,5,3,15,13,0,14,9],[14,11,2,12,4,7,13,1,5,0,15,10,3,9,8,6],[4,2,1,11,10,13,7,8,15,9,12,5,6,3,0,14],[11,8,12,7,1,14,2,13,6,15,0,9,10,4,5,3]],[[12,1,10,15,9,2,6,8,0,13,3,4,14,7,5,11],[10,15,4,2,7,12,9,5,6,1,13,14,0,11,3,8],[9,14,15,5,2,8,12,3,7,0,4,10,1,13,11,6],[4,3,2,12,9,5,15,10,11,14,1,7,6,0,8,13]],[[4,11,2,14,15,0,8,13,3,12,9,7,5,10,6,1],[13,0,11,7,4,9,1,10,14,3,5,12,2,15,8,6],[1,4,11,13,12,3,7,14,10,15,6,8,0,5,9,2],[6,11,13,8,1,4,10,7,9,5,0,15,14,2,3,12]],[[13,2,8,4,6,15,11,1,10,9,3,14,5,0,12,7],[1,15,13,8,10,3,7,4,12,5,6,11,0,14,9,2],[7,11,4,1,9,12,14,2,0,6,10,13,15,3,5,8],[2,1,14,7,4,10,8,13,15,12,9,0,3,5,6,11]]],"finalPerm":[40,8,48,16,56,24,64,32,39,7,47,15,55,23,63,31,38,6,46,14,54,22,62,30,37,5,45,13,53,21,61,29,36,4,44,12,52,20,60,28,35,3,43,11,51,19,59,27,34,2,42,10,50,18,58,26,33,1,41,9,49,17,57,25],"keyP":[57,49,41,33,25,17,9,1,58,50,42,34,26,18,10,2,59,51,43,35,27,19,11,3,60,52,44,36,63,55,47,39,31,23,15,7,62,54,46,38,30,22,14,6,61,53,45,37,29,21,13,5,28,20,12,4],"shiftTable":[1,1,2,2,2,2,2,2,1,2,2,2,2,2,2,1],"keyComp":[14,17,11,24,1,5,3,28,15,6,21,10,23,19,12,4,26,8,16,7,27,20,13,2,41,52,31,37,47,55,30,40,51,45,33,48,44,49,39,56,34,53,46,42,50,36,29,32],"sBox":[99,124,119,123,242,107,111,197,48,1,103,43,254,215,171,118,202,130,201,125,250,89,71,240,173,212,162,175,156,164,114,192,183,253,147,38,54,63,247,204,52,165,229,241,113,216,49,21,4,199,35,195,24,150,5,154,7,18,128,226,235,39,178,117,9,131,44,26,27,110,90,160,82,59,214,179,41,227,47,132,83,209,0,237,32,252,177,91,106,203,190,57,74,76,88,207,208,239,170,251,67,77,51,133,69,249,2,127,80,60,159,168,81,163,64,143,146,157,56,245,188,182,218,33,16,255,243,210,205,12,19,236,95,151,68,23,196,167,126,61,100,93,25,115,96,129,79,220,34,42,144,136,70,238,184,20,222,94,11,219,224,50,58,10,73,6,36,92,194,211,172,98,145,149,228,121,231,200,55,109,141,213,78,169,108,86,244,234,101,122,174,8,186,120,37,46,28,166,180,198,232,221,116,31,75,189,139,138,112,62,181,102,72,3,246,14,97,53,87,185,134,193,29,158,225,248,152,17,105,217,142,148,155,30,135,233,206,85,40,223,140,161,137,13,191,230,66,104,65,153,45,15,176,84,187,22],"invSBox":[82,9,106,213,48,54,165,56,191,64,163,158,129,243,215,251,124,227,57,130,155,47,255,135,52,142,67,68,196,222,233,203,84,123,148,50,166,194,35,61,238,76,149,11,66,250,195,78,8,46,161,102,40,217,36,178,118,91,162,73,109,139,209,37,114,248,246,100,134,104,152,22,212,164,92,204,93,101,182,146,108,112,72,80,253,237,185,218,94,21,70,87,167,141,157,132,144,216,171,0,140,188,211,10,247,228,88,5,184,179,69,6,208,44,30,143,202,63,15,2,193,175,189,3,1,19,138,107,58,145,17,65,79,103,220,234,151,242,207,206,240,180,230,115,150,172,116,34,231,173,53,133,226,249,55,232,28,117,223,110,71,241,26,113,29,41,197,137,111,183,98,14,170,24,190,27,252,86,62,75,198,210,121,32,154,219,192,254,120,205,90,244,31,221,168,51,136,7,199,49,177,18,16,89,39,128,236,95,96,81,127,169,25,181,74,13,45,229,122,159,147,201,156,239,160,224,59,77,174,42,245,176,200,235,187,60,131,83,153,97,23,43,4,126,186,119,214,38,225,105,20,99,85,33,12,125],"rcon":[0,1,2,4,8,16,32,64,128,27,54]};

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

function bytesToHex(bytes) {
  return Array.from(bytes).map(byte => byte.toString(16).padStart(2, '0')).join('').toUpperCase();
}

function hexToBytes(hexText) {
  const clean = hexText.replace(/\s+/g, '').toUpperCase();
  if (clean.length % 2 !== 0 || /[^0-9A-F]/.test(clean)) {
    throw new Error('Ciphertext must be hexadecimal text.');
  }
  const bytes = new Uint8Array(clean.length / 2);
  for (let i = 0; i < clean.length; i += 2) {
    bytes[i / 2] = parseInt(clean.slice(i, i + 2), 16);
  }
  return bytes;
}

function padData(bytes, blockSize) {
  const paddingLength = blockSize - (bytes.length % blockSize || 0);
  const result = new Uint8Array(bytes.length + paddingLength);
  result.set(bytes);
  result.fill(paddingLength, bytes.length);
  return result;
}

function unpadData(bytes) {
  const paddingLength = bytes[bytes.length - 1];
  if (paddingLength < 1 || paddingLength > bytes.length) {
    throw new Error('Padding is not valid. Check the key or ciphertext.');
  }
  for (let i = bytes.length - paddingLength; i < bytes.length; i++) {
    if (bytes[i] !== paddingLength) {
      throw new Error('Padding is not valid. Check the key or ciphertext.');
    }
  }
  return bytes.slice(0, bytes.length - paddingLength);
}

function hex2bin(hexText) {
  let result = '';
  for (const ch of hexText.toUpperCase()) {
    result += parseInt(ch, 16).toString(2).padStart(4, '0');
  }
  return result;
}

function bin2hex(binText) {
  let result = '';
  for (let i = 0; i < binText.length; i += 4) {
    result += parseInt(binText.slice(i, i + 4), 2).toString(16).toUpperCase();
  }
  return result;
}

function dec2bin(number) {
  return number.toString(2).padStart(4, '0');
}

function permute(text, table, size) {
  let result = '';
  for (let i = 0; i < size; i++) {
    result += text[table[i] - 1];
  }
  return result;
}

function shiftLeft(text, shifts) {
  let result = text;
  for (let i = 0; i < shifts; i++) {
    result = result.slice(1) + result[0];
  }
  return result;
}

function xorBits(left, right) {
  let result = '';
  for (let i = 0; i < left.length; i++) {
    result += left[i] === right[i] ? '0' : '1';
  }
  return result;
}

function generateDesRoundKeys(keyBytes) {
  let keyBin = hex2bin(bytesToHex(keyBytes));
  keyBin = permute(keyBin, TABLES.keyP, 56);

  let left = keyBin.slice(0, 28);
  let right = keyBin.slice(28, 56);
  const roundKeys = [];

  for (let i = 0; i < 16; i++) {
    left = shiftLeft(left, TABLES.shiftTable[i]);
    right = shiftLeft(right, TABLES.shiftTable[i]);
    roundKeys.push(permute(left + right, TABLES.keyComp, 48));
  }
  return roundKeys;
}

function desEncryptBlock(blockBytes, roundKeys) {
  let blockBin = hex2bin(bytesToHex(blockBytes));
  blockBin = permute(blockBin, TABLES.initialPerm, 64);

  let left = blockBin.slice(0, 32);
  let right = blockBin.slice(32, 64);

  for (let i = 0; i < 16; i++) {
    const rightExpanded = permute(right, TABLES.expD, 48);
    const xorValue = xorBits(rightExpanded, roundKeys[i]);
    let sboxText = '';

    for (let j = 0; j < 8; j++) {
      const group = xorValue.slice(j * 6, j * 6 + 6);
      const row = parseInt(group[0] + group[5], 2);
      const col = parseInt(group.slice(1, 5), 2);
      sboxText += dec2bin(TABLES.sbox[j][row][col]);
    }

    sboxText = permute(sboxText, TABLES.permutationP, 32);
    const result = xorBits(left, sboxText);
    left = result;

    if (i !== 15) {
      const temp = left;
      left = right;
      right = temp;
    }
  }

  const finalText = permute(left + right, TABLES.finalPerm, 64);
  return hexToBytes(bin2hex(finalText));
}

function desCryptBytes(bytes, keyBytes, decrypt) {
  const workingBytes = decrypt ? bytes : padData(bytes, 8);
  let roundKeys = generateDesRoundKeys(keyBytes);
  if (decrypt) roundKeys = roundKeys.reverse();

  const result = new Uint8Array(workingBytes.length);
  for (let i = 0; i < workingBytes.length; i += 8) {
    result.set(desEncryptBlock(workingBytes.slice(i, i + 8), roundKeys), i);
  }
  return decrypt ? unpadData(result) : result;
}

function tripleDesCryptBytes(bytes, keys, decrypt) {
  const workingBytes = decrypt ? bytes : padData(bytes, 8);
  const result = new Uint8Array(workingBytes.length);

  for (let i = 0; i < workingBytes.length; i += 8) {
    const block = workingBytes.slice(i, i + 8);
    let output;
    if (decrypt) {
      output = desCryptBlockNoPadding(block, keys[2], true);
      output = desCryptBlockNoPadding(output, keys[1], false);
      output = desCryptBlockNoPadding(output, keys[0], true);
    } else {
      output = desCryptBlockNoPadding(block, keys[0], false);
      output = desCryptBlockNoPadding(output, keys[1], true);
      output = desCryptBlockNoPadding(output, keys[2], false);
    }
    result.set(output, i);
  }
  return decrypt ? unpadData(result) : result;
}

function desCryptBlockNoPadding(block, key, decrypt) {
  let roundKeys = generateDesRoundKeys(key);
  if (decrypt) roundKeys = roundKeys.reverse();
  return desEncryptBlock(block, roundKeys);
}

function bytes2matrix(bytes) {
  const matrix = [[], [], [], []];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      matrix[i][j] = bytes[i + 4 * j];
    }
  }
  return matrix;
}

function matrix2bytes(matrix) {
  const bytes = [];
  for (let j = 0; j < 4; j++) {
    for (let i = 0; i < 4; i++) bytes.push(matrix[i][j]);
  }
  return new Uint8Array(bytes);
}

function addRoundKey(state, roundKey) {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) state[i][j] ^= roundKey[i][j];
  }
}

function subBytes(state) {
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) state[i][j] = TABLES.sBox[state[i][j]];
}

function invSubBytes(state) {
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) state[i][j] = TABLES.invSBox[state[i][j]];
}

function shiftRows(state) {
  state[1].push(state[1].shift());
  state[2].push(state[2].shift()); state[2].push(state[2].shift());
  state[3].unshift(state[3].pop());
}

function invShiftRows(state) {
  state[1].unshift(state[1].pop());
  state[2].push(state[2].shift()); state[2].push(state[2].shift());
  state[3].push(state[3].shift());
}

function gmul(a, b) {
  let p = 0;
  for (let i = 0; i < 8; i++) {
    if (b & 1) p ^= a;
    const highBit = a & 0x80;
    a = (a << 1) & 0xff;
    if (highBit) a ^= 0x1b;
    b >>= 1;
  }
  return p;
}

function mixColumns(state) {
  for (let j = 0; j < 4; j++) {
    const a = [state[0][j], state[1][j], state[2][j], state[3][j]];
    const t = a[0] ^ a[1] ^ a[2] ^ a[3];
    const u = a[0];
    a[0] ^= t ^ gmul(a[0] ^ a[1], 0x02);
    a[1] ^= t ^ gmul(a[1] ^ a[2], 0x02);
    a[2] ^= t ^ gmul(a[2] ^ a[3], 0x02);
    a[3] ^= t ^ gmul(a[3] ^ u, 0x02);
    for (let i = 0; i < 4; i++) state[i][j] = a[i];
  }
}

function invMixColumns(state) {
  for (let j = 0; j < 4; j++) {
    const a0 = state[0][j], a1 = state[1][j], a2 = state[2][j], a3 = state[3][j];
    state[0][j] = gmul(a0, 14) ^ gmul(a1, 11) ^ gmul(a2, 13) ^ gmul(a3, 9);
    state[1][j] = gmul(a0, 9) ^ gmul(a1, 14) ^ gmul(a2, 11) ^ gmul(a3, 13);
    state[2][j] = gmul(a0, 13) ^ gmul(a1, 9) ^ gmul(a2, 14) ^ gmul(a3, 11);
    state[3][j] = gmul(a0, 11) ^ gmul(a1, 13) ^ gmul(a2, 9) ^ gmul(a3, 14);
  }
}

function rotWord(word) { return word.slice(1).concat(word.slice(0, 1)); }
function subWord(word) { return word.map(value => TABLES.sBox[value]); }

function aesKeyExpansion(key) {
  const keyColumns = [];
  for (let i = 0; i < 4; i++) keyColumns.push([key[4 * i], key[4 * i + 1], key[4 * i + 2], key[4 * i + 3]]);

  let i = 4;
  while (keyColumns.length < 44) {
    let temp = keyColumns[keyColumns.length - 1].slice();
    if (i % 4 === 0) {
      temp = subWord(rotWord(temp));
      temp[0] ^= TABLES.rcon[i / 4];
    }
    const word = [];
    for (let j = 0; j < 4; j++) word.push(keyColumns[i - 4][j] ^ temp[j]);
    keyColumns.push(word);
    i++;
  }

  const roundKeys = [];
  for (let round = 0; round < 11; round++) {
    const roundKeyBytes = [];
    for (let col = 0; col < 4; col++) roundKeyBytes.push(...keyColumns[4 * round + col]);
    roundKeys.push(bytes2matrix(new Uint8Array(roundKeyBytes)));
  }
  return roundKeys;
}

function aesEncryptBlock(block, key) {
  const roundKeys = aesKeyExpansion(key);
  const state = bytes2matrix(block);
  addRoundKey(state, roundKeys[0]);
  for (let round = 1; round < 10; round++) {
    subBytes(state); shiftRows(state); mixColumns(state); addRoundKey(state, roundKeys[round]);
  }
  subBytes(state); shiftRows(state); addRoundKey(state, roundKeys[10]);
  return matrix2bytes(state);
}

function aesDecryptBlock(block, key) {
  const roundKeys = aesKeyExpansion(key);
  const state = bytes2matrix(block);
  addRoundKey(state, roundKeys[10]);
  for (let round = 9; round > 0; round--) {
    invShiftRows(state); invSubBytes(state); addRoundKey(state, roundKeys[round]); invMixColumns(state);
  }
  invShiftRows(state); invSubBytes(state); addRoundKey(state, roundKeys[0]);
  return matrix2bytes(state);
}

function aesCryptBytes(bytes, key, decrypt) {
  const workingBytes = decrypt ? bytes : padData(bytes, 16);
  const result = new Uint8Array(workingBytes.length);
  for (let i = 0; i < workingBytes.length; i += 16) {
    const block = workingBytes.slice(i, i + 16);
    result.set(decrypt ? aesDecryptBlock(block, key) : aesEncryptBlock(block, key), i);
  }
  return decrypt ? unpadData(result) : result;
}

function getKeyBytes(id, expectedLength) {
  const value = document.getElementById(id).value;
  if (value.length !== expectedLength) {
    throw new Error(`Key must be exactly ${expectedLength} characters.`);
  }
  return textEncoder.encode(value);
}

const samples = {
  DES: { message: 'My code works on my machine.', keys: ['NOBUG123'] },
  '3DES': { message: 'One more commit before demo.', keys: ['KEYONE12', 'KEYTWO34', 'KEYTHR56'] },
  AES: { message: 'TA: please ignore the printf debugging.', keys: ['FINALPROJECT2026'] }
};

const algorithmSelect = document.getElementById('algorithmSelect');
const operationSelect = document.getElementById('operationSelect');
const messageInput = document.getElementById('messageInput');
const keyFields = document.getElementById('keyFields');
const runButton = document.getElementById('runButton');
const outputBox = document.getElementById('outputBox');
const outputTitle = document.getElementById('outputTitle');
const messageLabel = document.getElementById('messageLabel');

function renderKeyFields() {
  const algorithm = algorithmSelect.value;
  keyFields.className = algorithm === '3DES' ? 'key-fields three' : 'key-fields';

  if (algorithm === '3DES') {
    keyFields.innerHTML = [1, 2, 3].map(number => `
      <label><span>3DES key ${number}, exactly 8 characters</span><input id="key${number}" value="${samples['3DES'].keys[number - 1]}"></label>
    `).join('');
  } else {
    const size = algorithm === 'AES' ? 16 : 8;
    const value = samples[algorithm].keys[0];
    keyFields.innerHTML = `<label><span>${algorithm} key, exactly ${size} characters</span><input id="key1" value="${value}"></label>`;
  }
}

function updateLabels() {
  const operation = operationSelect.value;
  runButton.textContent = operation === 'encrypt' ? 'Encrypt' : 'Decrypt';
  outputTitle.textContent = operation === 'encrypt' ? 'Ciphertext' : 'Plaintext';
  messageLabel.textContent = operation === 'encrypt' ? 'Plaintext' : 'Ciphertext hex';
  document.getElementById('modeValue').textContent = `${algorithmSelect.value} ${operation}`;
}

function useSample() {
  const algorithm = algorithmSelect.value;
  const sample = samples[algorithm];
  messageInput.value = sample.message;
  sample.keys.forEach((key, index) => document.getElementById(`key${index + 1}`).value = key);
}

function runCrypto(event) {
  event.preventDefault();
  updateLabels();

  try {
    outputBox.classList.remove('error');
    const algorithm = algorithmSelect.value;
    const operation = operationSelect.value;
    const decrypt = operation === 'decrypt';
    const inputBytes = decrypt ? hexToBytes(messageInput.value) : textEncoder.encode(messageInput.value);
    let outputBytes;

    const start = performance.now();
    if (algorithm === 'DES') {
      outputBytes = desCryptBytes(inputBytes, getKeyBytes('key1', 8), decrypt);
    } else if (algorithm === '3DES') {
      const keys = [getKeyBytes('key1', 8), getKeyBytes('key2', 8), getKeyBytes('key3', 8)];
      outputBytes = tripleDesCryptBytes(inputBytes, keys, decrypt);
    } else {
      outputBytes = aesCryptBytes(inputBytes, getKeyBytes('key1', 16), decrypt);
    }
    const end = performance.now();

    outputBox.textContent = decrypt ? textDecoder.decode(outputBytes) : bytesToHex(outputBytes);
    document.getElementById('timeValue').textContent = `${(end - start).toFixed(3)} ms`;
    document.getElementById('inputBytes').textContent = String(inputBytes.length);
    document.getElementById('outputBytes').textContent = String(outputBytes.length);
  } catch (error) {
    outputBox.classList.add('error');
    outputBox.textContent = error.message;
  }
}

algorithmSelect.addEventListener('change', () => { renderKeyFields(); useSample(); updateLabels(); });
operationSelect.addEventListener('change', updateLabels);
document.getElementById('sampleButton').addEventListener('click', useSample);
document.getElementById('clearButton').addEventListener('click', () => { messageInput.value = ''; outputBox.textContent = ''; });
document.getElementById('cryptoForm').addEventListener('submit', runCrypto);

renderKeyFields();
updateLabels();
