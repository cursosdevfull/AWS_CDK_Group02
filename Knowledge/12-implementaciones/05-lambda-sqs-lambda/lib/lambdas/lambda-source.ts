import { SQSClient, SendMessageCommand, SendMessageCommandInput } from "@aws-sdk/client-sqs";

const client = new SQSClient();

export const handler = async (event: any): Promise<any> => {
    console.log("Event received source:", JSON.stringify(event, null, 2));

    const input: SendMessageCommandInput = {
        QueueUrl: process.env.QUEUE_URL!,
        MessageBody: JSON.stringify({ timestamp: new Date().toISOString() }),
    }

    await client.send(new SendMessageCommand(input));

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Lambda source executed successfully" }),
    }
}