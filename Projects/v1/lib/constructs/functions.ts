import { Construct } from "constructs";
import * as path from "path";
import { NodeJsLambda } from "../packages/node-js-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import * as cdk from 'aws-cdk-lib';

export class Functions extends Construct {
    appointment: NodejsFunction
    appointment_co: NodejsFunction
    appointment_pe: NodejsFunction
    appointment_mx: NodejsFunction

    constructor(scope: Construct, id: string) {
        super(scope, id);

        this.appointment = new NodeJsLambda(this, "Appointment", {
            description: "Lambda que envía mensajes a SQS",
            entry: path.join(__dirname, "../lambdas/appointment.ts"),
            timeout: cdk.Duration.minutes(2),
        });

        this.appointment_co = new NodeJsLambda(this, "AppointmentCO", {
            description: "Lambda que procesa mensajes de SQS",
            entry: path.join(__dirname, "../lambdas/appointment-co.ts"),
            timeout: cdk.Duration.minutes(2),
        });

        this.appointment_pe = new NodeJsLambda(this, "AppointmentPE", {
            description: "Lambda que procesa mensajes de SQS",
            entry: path.join(__dirname, "../lambdas/appointment-pe.ts"),
            timeout: cdk.Duration.minutes(2),
        });

        this.appointment_mx = new NodeJsLambda(this, "AppointmentMX", {
            description: "Lambda que procesa mensajes de SQS",
            entry: path.join(__dirname, "../lambdas/appointment-mx.ts"),
            timeout: cdk.Duration.minutes(2),
        });

    }
}