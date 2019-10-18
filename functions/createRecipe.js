import uuid from 'uuid';
import * as dynamoDbLib from '../libs/dynamodb-lib';
import { success, failure } from '../libs/response-lib';
import { normalizeText } from '../libs/utils';

export async function main(event, context, callback) {
  const { attachments, name, category } = JSON.parse(
    event.body
  );

  const params = {
    TableName: 'recipes',
    Item: {
      id: uuid.v1(),
      name,
      searchName: normalizeText(name),
      category,
      attachments,
      createdAt: Date.now(),
    },
  };

  try {
    await dynamoDbLib.call('put', params);
    return success(params.Item);
  } catch (err) {
    console.log(err);
    return failure({ status: false });
  }
}
