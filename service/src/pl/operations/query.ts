/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as msRest from "@azure/ms-rest-js";
import * as Models from "../models";
import * as Mappers from "../models/queryMappers";
import * as Parameters from "../models/parameters";
import { IotHubGatewayServiceAPIsContext } from "../iotHubGatewayServiceAPIsContext";

/** Class representing a Query. */
export class Query {
  private readonly client: IotHubGatewayServiceAPIsContext;

  /**
   * Create a Query.
   * @param {IotHubGatewayServiceAPIsContext} client Reference to the service client.
   */
  constructor(client: IotHubGatewayServiceAPIsContext) {
    this.client = client;
  }

  /**
   * Query an IoT Hub to retrieve information regarding device twins using a SQL-like language. See
   * https://docs.microsoft.com/azure/iot-hub/iot-hub-devguide-query-language for more information.
   * Pagination is supported. This returns information about device twins only.
   * @param querySpecification The query string. See
   * https://docs.microsoft.com/azure/iot-hub/iot-hub-devguide-query-language for more information.
   * @param [options] The optional parameters
   * @returns Promise<Models.QueryGetTwinsResponse>
   */
  getTwins(querySpecification: Models.QuerySpecification, options?: Models.QueryGetTwinsOptionalParams): Promise<Models.QueryGetTwinsResponse>;
  /**
   * @param querySpecification The query string. See
   * https://docs.microsoft.com/azure/iot-hub/iot-hub-devguide-query-language for more information.
   * @param callback The callback
   */
  getTwins(querySpecification: Models.QuerySpecification, callback: msRest.ServiceCallback<Models.Twin[]>): void;
  /**
   * @param querySpecification The query string. See
   * https://docs.microsoft.com/azure/iot-hub/iot-hub-devguide-query-language for more information.
   * @param options The optional parameters
   * @param callback The callback
   */
  getTwins(querySpecification: Models.QuerySpecification, options: Models.QueryGetTwinsOptionalParams, callback: msRest.ServiceCallback<Models.Twin[]>): void;
  getTwins(querySpecification: Models.QuerySpecification, options?: Models.QueryGetTwinsOptionalParams | msRest.ServiceCallback<Models.Twin[]>, callback?: msRest.ServiceCallback<Models.Twin[]>): Promise<Models.QueryGetTwinsResponse> {
    return this.client.sendOperationRequest(
      {
        querySpecification,
        options
      },
      getTwinsOperationSpec,
      callback) as Promise<Models.QueryGetTwinsResponse>;
  }
}

// Operation Specifications
const serializer = new msRest.Serializer(Mappers);
const getTwinsOperationSpec: msRest.OperationSpec = {
  httpMethod: "POST",
  path: "devices/query",
  queryParameters: [
    Parameters.apiVersion
  ],
  headerParameters: [
    Parameters.xMsContinuation,
    Parameters.xMsMaxItemCount
  ],
  requestBody: {
    parameterPath: "querySpecification",
    mapper: {
      ...Mappers.QuerySpecification,
      required: true
    }
  },
  responses: {
    200: {
      bodyMapper: {
        serializedName: "parsedResponse",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "Twin"
            }
          }
        }
      },
      headersMapper: Mappers.QueryGetTwinsHeaders
    },
    default: {}
  },
  serializer
};