export const errorMessage = error => {
    let statusCode = 500;
    let errorMessage = error.message;

    if (error.status) {
        statusCode = error.status;
    }

    if (error.response && error.response.status) {
        statusCode = error.response.status;
    }

    if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
    }

    return { statusCode, errorMessage };
};
