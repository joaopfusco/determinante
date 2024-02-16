import numpy as np

def prod_diagonal_principal(matriz):
    diag = np.diag(matriz)
    return np.prod(diag)

def valores_matriz_triangular(matriz):
    matriz_triangular = np.tril(matriz, k=-1)
    posicoes_nao_nulas  = np.argwhere(matriz_triangular != 0)
    return posicoes_nao_nulas

ordem = int(input("Ordem: "))
matriz = np.random.rand(ordem, ordem)

for i in range(ordem):
    for j in range(ordem):
        matriz[i, j] = int(input(f"Valor ({i}, {j}): "))

matriz_triangular = valores_matriz_triangular(matriz)

for p in matriz_triangular:
    linha_triangular = p[0]
    coluna_triangular = p[1]
    valor_triangular = matriz[linha_triangular, coluna_triangular]

    linha = coluna_triangular
    coluna = coluna_triangular
    valor = matriz[linha, coluna]

    k = -1 * (if valor != 0 valor_triangular / valor else valor_triangular)

    matriz[linha_triangular] = matriz[linha_triangular] + (k * matriz[linha])

det = prod_diagonal_principal(matriz)
print(det)
