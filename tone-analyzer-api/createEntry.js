import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "dev-entries",
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      entryId: uuid.v1(),
      title: data.title,
      content: data.content,
      analysis: data.analysis,
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
}
