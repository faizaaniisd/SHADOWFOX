import {
    DynamoDBClient,
    PutItemCommand,
    ScanCommand
} from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});

export const handler = async (event) => {
    try {
        const method =
            event?.requestContext?.http?.method ||
            event?.httpMethod ||
            "";

        // CORS preflight
        if (method === "OPTIONS") {
            return {
                statusCode: 204,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                    "Access-Control-Allow-Headers": "content-type"
                },
                body: ""
            };
        }

        // GET - retrieve all inquiries
        if (method === "GET") {
            const result = await client.send(
                new ScanCommand({
                    TableName: "inquiry-table"
                })
            );

            const items = (result.Items || []).map(item => ({
                inquiryId: item.inquiryId?.S || "",
                name: item.name?.S || "",
                email: item.email?.S || "",
                message: item.message?.S || ""
            }));

            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(items)
            };
        }

        // POST - save inquiry
        if (method === "POST") {
            const body = typeof event.body === "string"
                ? JSON.parse(event.body)
                : event.body || event;

            if (
                !body.inquiryId ||
                !body.name ||
                !body.email ||
                !body.message
            ) {
                return {
                    statusCode: 400,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        message: "Missing required fields"
                    })
                };
            }

            const params = {
                TableName: "inquiry-table",
                Item: {
                    inquiryId: { S: body.inquiryId },
                    name: { S: body.name },
                    email: { S: body.email },
                    message: { S: body.message }
                }
            };

            await client.send(new PutItemCommand(params));

            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: "Inquiry submitted successfully",
                    inquiryId: body.inquiryId
                })
            };
        }

        return {
            statusCode: 405,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                message: "Method not allowed"
            })
        };

    } catch (error) {
        console.error(error);

        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: "Internal server error"
            })
        };
    }
};
