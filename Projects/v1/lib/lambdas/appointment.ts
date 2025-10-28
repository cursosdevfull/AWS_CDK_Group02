import { SQSClient, SendMessageCommand, SendMessageCommandInput } from "@aws-sdk/client-sqs";
import { APIGatewayEvent } from "aws-lambda";

const client = new SQSClient();

export const handler = async (event: APIGatewayEvent) => {
    console.log("Appointment Lambda invoked with event:", event);
    const body = JSON.parse(event.body!)

    console.log("body", body)

    const queues = {
        PE: process.env.QUEUE_URL_PE!,
        MX: process.env.QUEUE_URL_MX!,
        CO: process.env.QUEUE_URL_CO!,
    }

    const queueUrl = body.country === "PE" ? queues.PE :
        body.country === "MX" ? queues.MX :
            body.country === "CO" ? queues.CO : "";

    const input: SendMessageCommandInput = {
        QueueUrl: queueUrl,
        MessageBody: "Hola mundo desde la Lambda de Appointments",
    }
    console.log("url", input)

    await client.send(new SendMessageCommand(input));

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Appointment Lambda executed successfully!" }),
    };
};