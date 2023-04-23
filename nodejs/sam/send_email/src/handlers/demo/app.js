const aws = require('aws-sdk');
aws.config.update({ region: 'ap-southeast-1' })
const sqs = new aws.SQS({ apiVersion: '2012-11-05' });
const QueueUrl = process.env.Endpoint;
const uuid = require('uuid').v4;

exports.handler = async (event) => {
    const email = "example@gmail.com";
    const params = {
        MessageAttributes: {
            "email": {
                DataType: "String",
                StringValue: "example@gmail.com"
            },
        },
        MessageBody: JSON.stringify({ email }),
        MessageDeduplicationId: uuid(),  // Required for FIFO queues
        MessageGroupId: email,  // Required for FIFO queues
        QueueUrl: QueueUrl
    };

    sqs.sendMessage(params, function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data.MessageId);
        }
    });

    return {
        body: "demo",
        statusCode: 200
    };
};
