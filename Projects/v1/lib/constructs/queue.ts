import { SqsEventSource } from "aws-cdk-lib/aws-lambda-event-sources";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Queue } from "aws-cdk-lib/aws-sqs";
import { Construct } from "constructs";
import { Sqs } from "../packages/sqs";

export type IQueues = {
    appointment: NodejsFunction,
    appointment_co: NodejsFunction,
    appointment_pe: NodejsFunction,
    appointment_mx: NodejsFunction
}

export class Queues extends Construct {
    queuePE: Sqs;
    queueMX: Sqs;
    queueCO: Sqs;

    constructor(scope: Construct, id: string, props: IQueues) {
        super(scope, id);

        this.queuePE = new Sqs(this, `${id}-queue-pe`)
        this.queueMX = new Sqs(this, `${id}-queue-mx`)
        this.queueCO = new Sqs(this, `${id}-queue-co`)

        this.queuePE.queue.grantSendMessages(props.appointment);
        this.queueMX.queue.grantSendMessages(props.appointment);
        this.queueCO.queue.grantSendMessages(props.appointment);

        props.appointment.addEnvironment("QUEUE_URL_PE", this.queuePE.queue.queueUrl);
        props.appointment.addEnvironment("QUEUE_URL_MX", this.queueMX.queue.queueUrl);
        props.appointment.addEnvironment("QUEUE_URL_CO", this.queueCO.queue.queueUrl);


        props.appointment_pe.addEventSource(new SqsEventSource(this.queuePE.queue, {
            batchSize: 5,
        }));
        props.appointment_mx.addEventSource(new SqsEventSource(this.queueMX.queue, {
            batchSize: 5,
        }));
        props.appointment_co.addEventSource(new SqsEventSource(this.queueCO.queue, {
            batchSize: 5,
        }));

        this.queuePE.queue.grantConsumeMessages(props.appointment_pe);
        this.queueMX.queue.grantConsumeMessages(props.appointment_mx);
        this.queueCO.queue.grantConsumeMessages(props.appointment_co);


    }
}