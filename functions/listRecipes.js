import * as dynamoDbLib from '../libs/dynamodb-lib';
import { success, failure } from '../libs/response-lib';
import { normalizeText } from '../libs/utils';

export async function main(event, context) {
  const {
    pathParameters: { value },
  } = event;
  const params = {
    TableName: 'recipes',
    FilterExpression: 'contains(#sname, :value)',
    ExpressionAttributeNames: {
      '#sname': 'searchName',
    },
    ExpressionAttributeValues: { ':value': normalizeText(value) },
  };

  try {
    const result = await dynamoDbLib.call('scan', params);
    if (result.Items) return success(result.Items);
    return failure({ status: false, error: 'Items not found.' });
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
