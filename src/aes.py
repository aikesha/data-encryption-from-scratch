"""Manual AES-128 implementation for educational use."""

from aes_tables import s_box, rcon
from aes_utils import bytes2matrix, matrix2bytes, add_round_key, sub_bytes, inv_sub_bytes
from aes_utils import shift_rows, inv_shift_rows, mix_columns, inv_mix_columns, rot_word, sub_word
from des_utils import bytes_to_hex, hex_to_bytes, pad_data, unpad_data

def aes_key_expansion(key):
    # AES-128 uses 16-byte key and produces 11 round keys
    key_columns = []

    for i in range(4):
        key_columns.append([key[4 * i], key[4 * i + 1], key[4 * i + 2], key[4 * i + 3]])

    i = 4

    while len(key_columns) < 44:
        temp = key_columns[-1].copy()

        if i % 4 == 0:
            temp = rot_word(temp)
            temp = sub_word(temp)
            temp[0] = temp[0] ^ rcon[i // 4]

        word = []
        for j in range(4):
            word.append(key_columns[i - 4][j] ^ temp[j])

        key_columns.append(word)
        i = i + 1

    round_keys = []

    for r in range(11):
        round_key_bytes = []
        for c in range(4):
            round_key_bytes = round_key_bytes + key_columns[4 * r + c]

        round_keys.append(bytes2matrix(bytes(round_key_bytes)))

    return round_keys
def aes_encrypt_block(block, key):
    round_keys = aes_key_expansion(key)

    state = bytes2matrix(block)

    add_round_key(state, round_keys[0])

    for round_num in range(1, 10):
        sub_bytes(state)
        shift_rows(state)
        mix_columns(state)
        add_round_key(state, round_keys[round_num])

    sub_bytes(state)
    shift_rows(state)
    add_round_key(state, round_keys[10])

    return matrix2bytes(state)

def aes_decrypt_block(block, key):
    round_keys = aes_key_expansion(key)

    state = bytes2matrix(block)

    add_round_key(state, round_keys[10])

    for round_num in range(9, 0, -1):
        inv_shift_rows(state)
        inv_sub_bytes(state)
        add_round_key(state, round_keys[round_num])
        inv_mix_columns(state)

    inv_shift_rows(state)
    inv_sub_bytes(state)
    add_round_key(state, round_keys[0])

    return matrix2bytes(state)
def aes_encrypt(data, key):
    data = pad_data(data, 16)

    result = b""

    for i in range(0, len(data), 16):
        block = data[i:i + 16]
        cipher_block = aes_encrypt_block(block, key)
        result = result + cipher_block

    return result
def aes_decrypt(cipher_data, key):
    result = b""

    for i in range(0, len(cipher_data), 16):
        block = cipher_data[i:i + 16]
        plain_block = aes_decrypt_block(block, key)
        result = result + plain_block

    result = unpad_data(result)
    return result

def encrypt_text(message, key_text):
    data = message.encode("utf-8")
    key = key_text.encode("utf-8")
    return bytes_to_hex(aes_encrypt(data, key))


def decrypt_text(cipher_hex, key_text):
    cipher_data = hex_to_bytes(cipher_hex)
    key = key_text.encode("utf-8")
    return aes_decrypt(cipher_data, key).decode("utf-8")


if __name__ == "__main__":
    key = "1234567890ABCDEF"
    message = "Modern AES example"
    cipher = encrypt_text(message, key)
    plain = decrypt_text(cipher, key)

    print("Message:", message)
    print("Ciphertext:", cipher)
    print("Decrypted:", plain)
