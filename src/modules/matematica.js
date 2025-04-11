// Operaciones matemáticas

export function sumar(n1, n2) {
    return n1 + n2;
}

export function restar(n1, n2) {
    return n1 - n2;
}

export function multiplicar(n1, n2) {
    return n1 * n2;
}

export function dividir(n1, n2) {
    if (n2 === 0) {
        throw new Error('El divisor no puede ser cero');
    }
    return n1 / n2;
}
