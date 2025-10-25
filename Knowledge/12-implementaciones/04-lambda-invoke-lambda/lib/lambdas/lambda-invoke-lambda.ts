import { LambdaClient, InvokeCommand, InvokeCommandInput } from "@aws-sdk/client-lambda";

export const handler = async (event: any) => {
    console.log("Evento recibido:", JSON.stringify(event, null, 2));

    const { option } = event

    const lambdas = {
        lambda01: process.env.LAMBDA_01_NAME!,
        lambda02: process.env.LAMBDA_02_NAME!,
        lambda03: process.env.LAMBDA_03_NAME!,
    }

    type LambdaOption = keyof typeof lambdas;

    try {
        const lambdaClient = new LambdaClient({});
        const opt: LambdaOption = `lambda0${option}` as LambdaOption;
        const input: InvokeCommandInput = {
            InvocationType: "RequestResponse",
            FunctionName: lambdas[opt],
            Payload: JSON.stringify(event)
        };

        const command = new InvokeCommand(input);
        const response = await lambdaClient.send(command);

        console.log(`Respuesta de ${lambdas[opt]}:`, response);
    } catch (error) {
        console.error("Error al invocar la función Lambda:", error);
    }
}