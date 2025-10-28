import { SQSEvent } from "aws-lambda";

export const handler = async (event: SQSEvent): Promise<any> => {
    //console.log("Event received destination:", JSON.stringify(event, null, 2));

    for (const record of event.Records) {
        console.log(`Processing message ID: ${record.messageId}`);
        console.log(`Message body: ${record.body}`);
    }

    return {
        statusCode: 200,
        body: JSON.stringify({ message: "Lambda destination executed successfully" }),
    }
}