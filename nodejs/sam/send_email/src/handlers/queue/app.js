const _ = require("lodash");

exports.handler = async (event) => {
  const _ = require("lodash");

  exports.handler = async (event) => {
    const body = JSON.stringify(_.get(event, "Records.0.body"));
    const fs = require('fs')
    data = fs.readFileSync("demo.pdf");

    const SOURCE_EMAIL = body.email;
    const toEmail = "example1@gmail.com"
    var ses_mail = "From: <" + SOURCE_EMAIL + ">\n";
    ses_mail += "To: " + toEmail + "\n";
    ses_mail += "Subject: example title\n";
    ses_mail += "MIME-Version: 1.0\n";
    ses_mail += "Content-Type: multipart/mixed; boundary=\"NextPart\"\n\n";
    ses_mail += "--NextPart\n";
    ses_mail += "Content-Type: text/html\n\n";
    ses_mail += '<p>Hello world</p>\n\n'
    ses_mail += "--NextPart\n";
    ses_mail += "Content-Type: application/octet-stream; name=\"demo.pdf\"\n";
    ses_mail += "Content-Transfer-Encoding: base64\n";
    ses_mail += "Content-Disposition: attachment\n\n";
    ses_mail += data.toString("base64").replace(/([^\0]{76})/g, "$1\n") + "\n\n";
    ses_mail += "--NextPart--";

    var params = {
      RawMessage: { Data: ses_mail },
      Source: "'AWS SES Attchament Configuration' <" + SOURCE_EMAIL + ">'"
    };

    var AWS = require('aws-sdk');

    // Create the promise and SES service object
    let ses = new AWS.SES({
      apiVersion: '2010-12-01',
      region: 'ap-southeast-1',
    })

    const a = await ses.sendRawEmail(params).promise();
    return {
      body: "demo",
      statusCode: 200
    };
  };
};
