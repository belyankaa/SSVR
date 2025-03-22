class ErrorUtils {
    static newError(message = 'Сгенерированная ошибка') {
        throw new Error(message)
    }
}

module.exports = ErrorUtils;