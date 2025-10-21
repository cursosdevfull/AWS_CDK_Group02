export const handler = async (event: any) => {
    console.log("Sample L1 Function executed");

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Hello from Sample L1 Function!" }),
    }
}