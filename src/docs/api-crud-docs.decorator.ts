import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiBody, ApiQuery } from '@nestjs/swagger';

interface ApiCrudDocsOptions {
  summary: string;
  paramName?: string;
  paramType?: any;
  paramDescription?: string;
  paramExample?: any;
  bodyType?: any;
  bodyExamples?: any;
  responses: Array<{ status: number; description: string }>;
  queries?: Array<{ name: string; type: any; example?: any; description?: string; required?: boolean; isArray?: boolean }>;
}

export function ApiCrudDocs(options: ApiCrudDocsOptions) {
  const decorators = [
    ApiOperation({ summary: options.summary }),
    ...(options.queries
      ? options.queries.map(q =>
        ApiQuery({
          name: q.name,
          required: q.required ?? false,
          type: q.type,
          example: q.example,
          description: q.description,
          isArray: q.isArray,
        }),
      )
      : []),
    ...(options.paramName
      ? [
        ApiParam({
          name: options.paramName,
          type: options.paramType,
          description: options.paramDescription,
          example: options.paramExample,
        }),
      ]
      : []),
    ...(options.bodyType
      ? [
        ApiBody({
          type: options.bodyType,
          examples: options.bodyExamples,
        }),
      ]
      : []),
    ...options.responses.map(r => ApiResponse({ status: r.status, description: r.description })),
  ];

  return applyDecorators(...decorators);
}