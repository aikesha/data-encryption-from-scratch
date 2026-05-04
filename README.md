# Data Encryption From Scratch

ECE 6357 final project demo for DES, 3DES, and AES-128 encryption/decryption.

The Python code is written in a clear student-style format and follows the original notebook logic. The `demo/` folder is a static website that can be hosted with GitHub Pages.

## Project Structure

```text
data-encryption-from-scratch/
|-- README.md
|-- requirements.txt
|-- .gitignore
|-- src/
|   |-- des.py
|   |-- des_utils.py
|   |-- des_tables.py
|   |-- 3des.py
|   |-- aes.py
|   |-- aes_utils.py
|   `-- aes_tables.py
|-- demo/
|   |-- index.html
|   |-- style.css
|   `-- app.js
|-- tests/
|   `-- test.py
`-- examples/
    `-- sample_run.ipynb
```

## Run Tests

```bash
pip install -r requirements.txt
pytest tests/test.py
```

## Run Python Examples

```bash
python src/des.py
python src/aes.py
python src/3des.py
```

## Open the Demo Website

Open `demo/index.html` in a browser, or host the repository with GitHub Pages and set the Pages source to the repository branch. The demo supports DES, 3DES, and AES-128 encryption/decryption and displays the time spent for each operation.

## Notes

- DES uses an 8-character key.
- 3DES uses three 8-character keys and the EDE process: encrypt, decrypt, encrypt.
- AES uses a 16-character AES-128 key.
- Ciphertext is shown as hexadecimal text so it is easy to copy back into the decrypt operation.
