class EmailError extends Error {
  constructor(cause) {
    super('Error al notificar el booking.');
    this.name = 'EmailError';
    this.error = cause.message;
    this.status = 500;

    console.error(cause.stack);
  }

  errorDto() {
    return {
      status: this.status,
      message: this.message,
      error: this.error,
    };
  }
}

module.exports = EmailError;
