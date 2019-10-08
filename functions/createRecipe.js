import uuid from 'uuid';
import * as dynamoDbLib from '../libs/dynamodb-lib';
import { success, failure } from '../libs/response-lib';

export async function main(event, context, callback) {
  const { attachment, name, category, notes, isFavorite, tags } = JSON.parse(
    event.body
  );

  const params = {
    TableName: 'recipes',
    Item: {
      id: uuid.v1(),
      name,
      category,
      notes,
      isFavorite,
      tags,
      attachment,
      createdAt: Date.now(),
    },
  };

  try {
    await dynamoDbLib.call('put', params);
    return success(params.Item);
  } catch (err) {
    return failure({ status: false });
  }
}
