"""Manual DES implementation for educational use."""

from des_tables import initial_perm, exp_d, per, sbox, final_perm, keyp, shift_table, key_comp
from des_utils import hex2bin, bin2hex, bin2dec, dec2bin, permute, shift_left, xor
from des_utils import bytes_to_hex, hex_to_bytes, pad_data, unpad_data

def generate_des_round_keys(key_hex):
    key_bin = hex2bin(key_hex)

    # Remove parity bits from 64-bit key to get 56-bit key
    key_bin = permute(key_bin, keyp, 56)

    left = key_bin[0:28]
    right = key_bin[28:56]

    round_keys_bin = []
    round_keys_hex = []

    for i in range(0, 16):
        left = shift_left(left, shift_table[i])
        right = shift_left(right, shift_table[i])

        combine_str = left + right
        round_key = permute(combine_str, key_comp, 48)

        round_keys_bin.append(round_key)
        round_keys_hex.append(bin2hex(round_key))

    return round_keys_bin, round_keys_hex
def des_encrypt_block(block_hex, round_keys_bin):
    block_bin = hex2bin(block_hex)

    # Initial permutation
    block_bin = permute(block_bin, initial_perm, 64)

    left = block_bin[0:32]
    right = block_bin[32:64]

    for i in range(0, 16):
        right_expanded = permute(right, exp_d, 48)
        xor_x = xor(right_expanded, round_keys_bin[i])
        sbox_str = ""

        for j in range(0, 8):
            row = bin2dec(xor_x[j * 6] + xor_x[j * 6 + 5])
            col = bin2dec(xor_x[j * 6 + 1] + xor_x[j * 6 + 2] +
                          xor_x[j * 6 + 3] + xor_x[j * 6 + 4])

            val = sbox[j][row][col]
            sbox_str = sbox_str + dec2bin(val)

        sbox_str = permute(sbox_str, per, 32)

        result = xor(left, sbox_str)
        left = result

        if i != 15:
            left, right = right, left

    combine = left + right
    cipher_text = permute(combine, final_perm, 64)

    return bin2hex(cipher_text)
def des_encrypt(data, key):
    data = pad_data(data, 8)

    key_hex = bytes_to_hex(key)
    round_keys_bin, round_keys_hex = generate_des_round_keys(key_hex)

    result = b""

    for i in range(0, len(data), 8):
        block = data[i:i + 8]
        block_hex = bytes_to_hex(block)
        cipher_hex = des_encrypt_block(block_hex, round_keys_bin)
        result = result + hex_to_bytes(cipher_hex)

    return result
def des_decrypt(cipher_data, key):
    key_hex = bytes_to_hex(key)
    round_keys_bin, round_keys_hex = generate_des_round_keys(key_hex)

    # Reverse round keys for decryption
    round_keys_bin = round_keys_bin[::-1]

    result = b""

    for i in range(0, len(cipher_data), 8):
        block = cipher_data[i:i + 8]
        block_hex = bytes_to_hex(block)
        plain_hex = des_encrypt_block(block_hex, round_keys_bin)
        result = result + hex_to_bytes(plain_hex)

    result = unpad_data(result)
    return result

def des_encrypt_block_no_padding(block_data, key):
    key_hex = bytes_to_hex(key)
    round_keys_bin, round_keys_hex = generate_des_round_keys(key_hex)

    block_hex = bytes_to_hex(block_data)
    cipher_hex = des_encrypt_block(block_hex, round_keys_bin)

    return hex_to_bytes(cipher_hex)


def des_decrypt_block_no_padding(block_data, key):
    key_hex = bytes_to_hex(key)
    round_keys_bin, round_keys_hex = generate_des_round_keys(key_hex)
    round_keys_bin = round_keys_bin[::-1]

    block_hex = bytes_to_hex(block_data)
    plain_hex = des_encrypt_block(block_hex, round_keys_bin)

    return hex_to_bytes(plain_hex)


def encrypt_text(message, key_text):
    data = message.encode("utf-8")
    key = key_text.encode("utf-8")
    return bytes_to_hex(des_encrypt(data, key))


def decrypt_text(cipher_hex, key_text):
    cipher_data = hex_to_bytes(cipher_hex)
    key = key_text.encode("utf-8")
    return des_decrypt(cipher_data, key).decode("utf-8")


if __name__ == "__main__":
    key = "12345678"
    message = "Hello DES"
    cipher = encrypt_text(message, key)
    plain = decrypt_text(cipher, key)

    print("Message:", message)
    print("Ciphertext:", cipher)
    print("Decrypted:", plain)
