"""Manual 3DES implementation using DES EDE mode."""

from des import des_encrypt_block_no_padding, des_decrypt_block_no_padding
from des_utils import bytes_to_hex, hex_to_bytes, pad_data, unpad_data

def triple_des_encrypt(data, key1, key2, key3):
    data = pad_data(data, 8)

    result = b""

    for i in range(0, len(data), 8):
        block = data[i:i + 8]

        # 3DES EDE mode: Encrypt, Decrypt, Encrypt
        step1 = des_encrypt_block_no_padding(block, key1)
        step2 = des_decrypt_block_no_padding(step1, key2)
        step3 = des_encrypt_block_no_padding(step2, key3)

        result = result + step3

    return result
def triple_des_decrypt(cipher_data, key1, key2, key3):
    result = b""

    for i in range(0, len(cipher_data), 8):
        block = cipher_data[i:i + 8]

        # Reverse process: Decrypt, Encrypt, Decrypt
        step1 = des_decrypt_block_no_padding(block, key3)
        step2 = des_encrypt_block_no_padding(step1, key2)
        step3 = des_decrypt_block_no_padding(step2, key1)

        result = result + step3

    result = unpad_data(result)
    return result

def encrypt_text(message, key1_text, key2_text, key3_text):
    data = message.encode("utf-8")
    key1 = key1_text.encode("utf-8")
    key2 = key2_text.encode("utf-8")
    key3 = key3_text.encode("utf-8")
    return bytes_to_hex(triple_des_encrypt(data, key1, key2, key3))


def decrypt_text(cipher_hex, key1_text, key2_text, key3_text):
    cipher_data = hex_to_bytes(cipher_hex)
    key1 = key1_text.encode("utf-8")
    key2 = key2_text.encode("utf-8")
    key3 = key3_text.encode("utf-8")
    return triple_des_decrypt(cipher_data, key1, key2, key3).decode("utf-8")


if __name__ == "__main__":
    key1 = "12345678"
    key2 = "ABCDEFGH"
    key3 = "87654321"
    message = "Triple DES test"
    cipher = encrypt_text(message, key1, key2, key3)
    plain = decrypt_text(cipher, key1, key2, key3)

    print("Message:", message)
    print("Ciphertext:", cipher)
    print("Decrypted:", plain)
