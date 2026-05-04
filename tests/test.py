import importlib.util
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
SRC = ROOT / "src"
sys.path.insert(0, str(SRC))

from des import encrypt_text as des_encrypt_text, decrypt_text as des_decrypt_text
from aes import encrypt_text as aes_encrypt_text, decrypt_text as aes_decrypt_text


def load_3des_module():
    module_path = SRC / "3des.py"
    spec = importlib.util.spec_from_file_location("triple_des_module", module_path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def test_des_encrypt_decrypt_text():
    key = "12345678"
    message = "Hello DES"
    cipher = des_encrypt_text(message, key)
    plain = des_decrypt_text(cipher, key)
    assert plain == message


def test_3des_encrypt_decrypt_text():
    triple_des = load_3des_module()
    message = "Triple DES test"
    cipher = triple_des.encrypt_text(message, "12345678", "ABCDEFGH", "87654321")
    plain = triple_des.decrypt_text(cipher, "12345678", "ABCDEFGH", "87654321")
    assert plain == message


def test_aes_encrypt_decrypt_text():
    key = "1234567890ABCDEF"
    message = "Modern AES example"
    cipher = aes_encrypt_text(message, key)
    plain = aes_decrypt_text(cipher, key)
    assert plain == message
