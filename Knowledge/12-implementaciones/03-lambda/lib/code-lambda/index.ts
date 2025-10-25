export const handler = async (event: any) => {
    console.log("Evento recibido:", JSON.stringify(event, null, 2));
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Hola desde Lambda!",
            input: event,
        }),
    };
};
