"""Small helper functions used by DES, 3DES, and AES."""

# Hexadecimal to binary conversion
def hex2bin(s):
    mp = {'0': "0000",
          '1': "0001",
          '2': "0010",
          '3': "0011",
          '4': "0100",
          '5': "0101",
          '6': "0110",
          '7': "0111",
          '8': "1000",
          '9': "1001",
          'A': "1010",
          'B': "1011",
          'C': "1100",
          'D': "1101",
          'E': "1110",
          'F': "1111"}
    bin_value = ""
    s = s.upper()
    for i in range(len(s)):
        bin_value = bin_value + mp[s[i]]
    return bin_value

# Binary to hexadecimal conversion
def bin2hex(s):
    mp = {"0000": '0',
          "0001": '1',
          "0010": '2',
          "0011": '3',
          "0100": '4',
          "0101": '5',
          "0110": '6',
          "0111": '7',
          "1000": '8',
          "1001": '9',
          "1010": 'A',
          "1011": 'B',
          "1100": 'C',
          "1101": 'D',
          "1110": 'E',
          "1111": 'F'}
    hex_value = ""
    for i in range(0, len(s), 4):
        ch = s[i:i + 4]
        hex_value = hex_value + mp[ch]
    return hex_value

# Binary to decimal conversion
def bin2dec(binary):
    binary = int(binary)
    decimal = 0
    i = 0
    while binary != 0:
        dec = binary % 10
        decimal = decimal + dec * pow(2, i)
        binary = binary // 10
        i = i + 1
    return decimal

# Decimal to binary conversion
def dec2bin(num):
    res = bin(num).replace("0b", "")
    while len(res) < 4:
        res = '0' + res
    return res
# Permutation function
def permute(k, arr, n):
    permutation = ""
    for i in range(0, n):
        permutation = permutation + k[arr[i] - 1]
    return permutation

# Left circular shift
def shift_left(k, nth_shifts):
    for i in range(nth_shifts):
        k = k[1:] + k[0]
    return k

# XOR of two binary strings
def xor(a, b):
    ans = ""
    for i in range(len(a)):
        if a[i] == b[i]:
            ans = ans + "0"
        else:
            ans = ans + "1"
    return ans
# Convert bytes to hexadecimal string
def bytes_to_hex(data):
    return data.hex().upper()

# Convert hexadecimal string to bytes
def hex_to_bytes(data):
    return bytes.fromhex(data)

# PKCS7 padding for block ciphers
def pad_data(data, block_size):
    padding_len = block_size - (len(data) % block_size)
    padding = bytes([padding_len]) * padding_len
    return data + padding

# Remove PKCS7 padding
def unpad_data(data):
    padding_len = data[-1]
    return data[:-padding_len]
