export const handler = async (event: any = {}): Promise<any> => {
    console.log("Evento recibido:", JSON.stringify(event, null, 2));
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "Hola desde Lambda 02",
            input: event
        })
    };
};