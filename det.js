function prodDiagonalPrincipal(matriz) {
    const diag = matriz.map((row, i) => row[i]);
    const value = diag.reduce((acc, val) => acc * val, 1);
    return value == 0 ? Math.abs(value) : value;
}

function valoresMatrizTriangular(matriz) {
    const matrizTriangular = [];
    matriz.forEach((row, rowIndex) => {
        row.forEach((val, colIndex) => {
            if (rowIndex > colIndex) {
                matrizTriangular.push([rowIndex, colIndex]);
            }
        });
    });
    return matrizTriangular;
}

function obter_matriz() {
    const tabela = document.getElementById("matrizDisplay");
    const linhas = tabela.getElementsByTagName("tr");
    const matriz = [];

    for (let i = 0; i < linhas.length; i++) {
        const celulas = linhas[i].getElementsByTagName("td");
        matriz[i] = [];
        for (let j = 0; j < celulas.length; j++) {
            const input = celulas[j].querySelector("input");
            matriz[i][j] = parseFloat(input.value);
        }
    }

    return matriz;
}

function gerar_matriz() {
    const ordem = document.getElementById("ordem").value;
    const tabela = document.getElementById("matrizDisplay");
    tabela.innerHTML = '';

    for (let i = 0; i < ordem; i++) {
        const linha = document.createElement("tr");
        for (let j = 0; j < ordem; j++) {
            const celula = document.createElement("td");
            const input = document.createElement("input");
            //input.type = "number";

            celula.appendChild(input);
            linha.appendChild(celula);
            celula.classList.add("input-cell");
        }
        tabela.appendChild(linha);
    }
}

function calcular() {
    const matriz = obter_matriz();
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "";
    if (matriz.length != 0) {    
        const matrizTriangular = valoresMatrizTriangular(matriz);
        for (const pos of matrizTriangular) {
            const [linhaTriangular, colunaTriangular] = pos;
            const valorTriangular = matriz[linhaTriangular][colunaTriangular];

            const linha = colunaTriangular;
            const coluna = colunaTriangular;
            const valor = matriz[linha][coluna];

            const k = -1 * (valor != 0 ? valorTriangular / valor : valorTriangular);

            matriz[linhaTriangular] = matriz[linhaTriangular].map((el, index) => el + k * matriz[linha][index]);

            const message = `L${linhaTriangular + 1} -> L${linhaTriangular + 1} + (${k.toFixed(2)}) * L${linha + 1}:`;
            outputDiv.innerHTML += `<p>${message}</p>`;
            outputDiv.innerHTML += formatarMatriz(matriz);
        }

        const det = Math.round(prodDiagonalPrincipal(matriz), 2);
        window.alert(det);
    }
}

function formatarMatriz(matriz) {
    let html = "<table>";
    matriz.forEach(row => {
        html += "<tr>";
        row.forEach(cell => {
            html += `<td>${cell.toFixed(2)}</td>`;
        });
        html += "</tr>";
    });
    html += "</table>";
    return html;
}
