export const handler = async (event, callback) => {
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "L2 Construct: API Call Successful"
        })
    }
}