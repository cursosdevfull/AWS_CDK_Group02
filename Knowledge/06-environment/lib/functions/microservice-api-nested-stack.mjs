export const handler = async (event, callback) => {
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Microservice API Nested"
        })
    }
}