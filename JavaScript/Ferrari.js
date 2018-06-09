//GitHub: HenriqueIni
//https://www.blogcyberini.com/

/*
Resolve uma equação do quarto grau com coeficientes reais e retorna uma lista com as raízes.
Se a equação for biquadrática, resolve via substituição y = x^2. Senão, resolve via fórmula de Ferrari
*/
function ferrari(a, b, c, d, e) {
    if (!a instanceof Number) {
        throw "a não é um número";
    }
    if (!b instanceof Number) {
        throw "b não é um número";
    }
    if (!c instanceof Number) {
        throw "c não é um número";
    }
    if (!d instanceof Number) {
        throw "d não é um número";
    }
    if (!e instanceof Number) {
        throw "e não é um número";
    }
    if (a == 0) {
        throw "a == 0";
    }
    //normaliza os coeficientes
    var A = b / a;
    var B = c / a;
    var C = d / a;
    var D = e / a;

    //lista de resultados
    var results = [];

    if (A == 0 && C == 0) {
        //equação biquadrática: resolve com a substituição y = x^2
        var delta = B * B - 4 * D;
        if (delta >= 0) {
            //x1 e x2
            var aux1 = (-B + Math.sqrt(delta)) / 2;
            if (aux1 >= 0) {
                results.push(toString(Math.sqrt(aux1)));
                results.push(toString(-Math.sqrt(aux1)));
            } else {
                results.push(formatComplex(0, Math.sqrt(Math.abs(aux1))));
                results.push(formatComplex(0, -Math.sqrt(Math.abs(aux1))));
            }
            //x3 e x4
            var aux2 = (-B - Math.sqrt(delta)) / 2;
            if (aux2 >= 0) {
                results.push(toString(Math.sqrt(aux2)));
                results.push(toString(-Math.sqrt(aux2)));
            } else {
                results.push(formatComplex(0, Math.sqrt(Math.abs(aux2))));
                results.push(formatComplex(0, -Math.sqrt(Math.abs(aux2))));
            }
        } else {
            //quando delta < 0, então é necessário lidar com números complexos                
            var rho = Math.sqrt(D);
            var theta = Math.atan2(Math.sqrt(Math.abs(delta)) / 2, -B / 2);

            var reAux = Math.sqrt(rho) * Math.cos(theta / 2);
            var imAux = Math.sqrt(rho) * Math.sin(theta / 2);

            results.push(formatComplex(reAux, imAux));
            results.push(formatComplex(reAux, -imAux));
            results.push(formatComplex(-reAux, imAux));
            results.push(formatComplex(-reAux, -imAux));
        }
    } else {
        //Fórmula de Ferrari

        //coeficientes da equação reduzida
        var p = B - 3 * A * A / 8;
        var q = A * A * A / 8 - A * B / 2 + C;
        var r = -3 * A * A * A * A / 256 + A * A * B / 16 - A * C / 4 + D;

        //raiz da equação auxiliar
        var u = cardanoRealPositive(1, 2 * p, p * p - 4 * r, -q * q);

        //discriminantes
        var delta1 = -u - 2 * p - 2 * q / Math.sqrt(u);
        var delta2 = -u - 2 * p + 2 * q / Math.sqrt(u);

        //adiciona as raízes à lista de resultados
        if (delta1 >= 0) {
            results.push(toString(-A / 4 + Math.sqrt(u) / 2 + Math.sqrt(delta1) / 2));
            results.push(toString(-A / 4 + Math.sqrt(u) / 2 - Math.sqrt(delta1) / 2));
        } else {
            results.push(formatComplex(-A / 4 + Math.sqrt(u) / 2, Math.sqrt(Math.abs(delta1)) / 2));
            results.push(formatComplex(-A / 4 + Math.sqrt(u) / 2, -Math.sqrt(Math.abs(delta1)) / 2));
        }
        if (delta2 >= 0) {
            results.push(toString(-A / 4 - Math.sqrt(u) / 2 + Math.sqrt(delta2) / 2));
            results.push(toString(-A / 4 - Math.sqrt(u) / 2 - Math.sqrt(delta2) / 2));
        } else {
            results.push(formatComplex(-A / 4 - Math.sqrt(u) / 2, Math.sqrt(Math.abs(delta2)) / 2));
            results.push(formatComplex(-A / 4 - Math.sqrt(u) / 2, -Math.sqrt(Math.abs(delta2)) / 2));
        }
    }
    return results;    
}

/*
Tenta retornar a primeira raiz real positiva da equação do terceiro grau passada como parâmetro.
Se não for possível, retorna uma raiz real qualquer.
*/
function cardanoRealPositive(a, b, c, d){
    /*
     * Valida os coeficientes
     */
    if(!a instanceof Number){
        throw "a não é um número";
    }
    if(!b instanceof Number){
        throw "b não é um número";
    }
    if(!c instanceof Number){
        throw "c não é um número";
    }
    if(!d instanceof Number){
        throw "d não é um número";
    }
    if(a == 0){
        throw "a == 0";
    }
    
   //normaliza os coeficientes
    var A = b / a;
    var B = c / a;
    var C = d / a;
    
    //constants of the conversion to y³+py+q=0
    var p = B - A * A / 3;
    var q = C + 2 * A * A * A / 27 - A * B / 3;
    
    //discriminante
    var delta = q * q / 4 + p * p * p / 27;
    
    //raiz
    var x;
    
    if (delta >= 0) {
        var y1 = Math.cbrt(-q / 2.0 + Math.sqrt(delta)) + Math.cbrt(-q / 2.0 - Math.sqrt(delta));
        x = y1 - A / 3.0;
        if (x > 0) {
            return x;
        } else {
            var delta2 = -3.0 * y1 * y1 - 4.0 * p;
            if (delta2 >= 0) {
                x = (-y1 + Math.sqrt(delta2)) / 2.0 - A / 3.0;
                if (x > 0) {
                    return x;
                } else {
                    return (-y1 - Math.sqrt(delta2)) / 2.0 - A / 3.0;
                }
            } else {
                return x;
            }
        }

    } else {
        var rho = Math.sqrt(q * q / 4.0 + Math.abs(delta));
        var theta = Math.acos(-q / (2.0 * rho));
        x = 2.0 * Math.cbrt(rho) * Math.cos(theta / 3.0) - A / 3.0;
        if (x > 0) {
            return x;
        } else {
            x = 2.0 * Math.cbrt(rho) * Math.cos((theta + 2.0 * Math.PI) / 3.0) - A / 3.0;
            if (x > 0) {
                return x;
            } else {
                return 2.0 * Math.cbrt(rho) * Math.cos((theta + 4.0 * Math.PI) / 3.0) - A / 3.0;
            }
        }
    }
    return x;
}

//Formata o número complexo na forma "a + bi"
function formatComplexResult(realPart, imPart){
    //Validações
    if(!realPart instanceof Number){throw "realPart must be a Number!";}
    if(!imPart instanceof Number){throw "imPart must be a Number!";}
    
    if(realPart == 0 && imPart == 0) return "0";
    
    var number = "";
    if(realPart != 0){
        number += realPart;
        if(imPart > 0){
            number += "+" + imPart + "i";
        }else if(imPart < 0){
            number += imPart + "i";
        }
    }else{
        number += imPart + "i";
    }
    return number;
}