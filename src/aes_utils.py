"""Small helper functions used by the AES implementation."""

from aes_tables import s_box, inv_s_box

def bytes2matrix(text):
    matrix = []
    for i in range(4):
        row = []
        for j in range(4):
            row.append(text[i + 4 * j])
        matrix.append(row)
    return matrix

def matrix2bytes(matrix):
    text = []
    for j in range(4):
        for i in range(4):
            text.append(matrix[i][j])
    return bytes(text)
def aes_xor_bytes(a, b):
    result = []
    for i in range(len(a)):
        result.append(a[i] ^ b[i])
    return bytes(result)

def add_round_key(state, round_key):
    for i in range(4):
        for j in range(4):
            state[i][j] = state[i][j] ^ round_key[i][j]

def sub_bytes(state):
    for i in range(4):
        for j in range(4):
            state[i][j] = s_box[state[i][j]]

def inv_sub_bytes(state):
    for i in range(4):
        for j in range(4):
            state[i][j] = inv_s_box[state[i][j]]
def shift_rows(state):
    state[1][0], state[1][1], state[1][2], state[1][3] = \
        state[1][1], state[1][2], state[1][3], state[1][0]

    state[2][0], state[2][1], state[2][2], state[2][3] = \
        state[2][2], state[2][3], state[2][0], state[2][1]

    state[3][0], state[3][1], state[3][2], state[3][3] = \
        state[3][3], state[3][0], state[3][1], state[3][2]


def inv_shift_rows(state):
    state[1][0], state[1][1], state[1][2], state[1][3] = \
        state[1][3], state[1][0], state[1][1], state[1][2]

    state[2][0], state[2][1], state[2][2], state[2][3] = \
        state[2][2], state[2][3], state[2][0], state[2][1]

    state[3][0], state[3][1], state[3][2], state[3][3] = \
        state[3][1], state[3][2], state[3][3], state[3][0]
def gmul(a, b):
    p = 0

    for i in range(8):
        if b & 1:
            p = p ^ a

        high_bit = a & 0x80
        a = (a << 1) & 0xFF

        if high_bit:
            a = a ^ 0x1B

        b = b >> 1
    return p
def mix_single_column(a):
    t = a[0] ^ a[1] ^ a[2] ^ a[3]
    u = a[0]

    a[0] = a[0] ^ t ^ gmul(a[0] ^ a[1], 0x02)
    a[1] = a[1] ^ t ^ gmul(a[1] ^ a[2], 0x02)
    a[2] = a[2] ^ t ^ gmul(a[2] ^ a[3], 0x02)
    a[3] = a[3] ^ t ^ gmul(a[3] ^ u, 0x02)

def mix_columns(state):
    for j in range(4):
        column = [state[0][j], state[1][j], state[2][j], state[3][j]]
        mix_single_column(column)
        for i in range(4):
            state[i][j] = column[i]

def inv_mix_columns(state):
    for j in range(4):
        a0 = state[0][j]
        a1 = state[1][j]
        a2 = state[2][j]
        a3 = state[3][j]

        state[0][j] = gmul(a0, 14) ^ gmul(a1, 11) ^ gmul(a2, 13) ^ gmul(a3, 9)
        state[1][j] = gmul(a0, 9) ^ gmul(a1, 14) ^ gmul(a2, 11) ^ gmul(a3, 13)
        state[2][j] = gmul(a0, 13) ^ gmul(a1, 9) ^ gmul(a2, 14) ^ gmul(a3, 11)
        state[3][j] = gmul(a0, 11) ^ gmul(a1, 13) ^ gmul(a2, 9) ^ gmul(a3, 14)
def rot_word(word):
    return word[1:] + word[:1]

def sub_word(word):
    new_word = []
    for i in range(4):
        new_word.append(s_box[word[i]])
    return new_word
