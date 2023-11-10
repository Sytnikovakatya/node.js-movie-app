export const getGenre = {
  tags: ['Genres'],
  description: 'Get a list of genres',
  responses: {
    200: {
      description: 'Successfully retrieved genres',
    },
    400: {
      description: 'Bad request',
    },
    500: {
      description: 'Internal server error',
    },
  },
};

export const createGenre = {
  tags: ['Genres'],
  description: 'Create a new genre',
  requestBody: {
    content: {
        'application/json': {
            schema: {
                type: 'object',
                example: { "name": "new name"}
            }
        }
    }
  },
  responses: {
    201: {
      description: 'Genre created successfully',
    },
    400: {
      description: 'Bad request',
    },
    500: {
      description: 'Internal server error',
    },
  },
};

export const deleteGenre = {
  tags: ['Genres'],
  description: 'Delete genre by id',
  parameters: [
    {
    in: 'path',
    name: 'id',
    schema: {
        type: 'string',
    },
    required: 'true',
    description: "Id of genre to be deleted",      
  }
 ],
  responses: {
    204: {
      description: 'Genre deleted successfully',
    },
    400: {
      description: 'Bad request',
    },
    500: {
      description: 'Internal server error',
    },
  },
};

export const updateGenre = {
  tags: ['Genres'],
  description: 'Update genre by id',
  parameters: [
    {
    in: 'path',
    name: 'id',
    schema: {
        type: 'string',
    },
    required: 'true',
    description: "Id of genre to be updated",      
  }],
  requestBody: {
    content: {
        'application/json': {
            schema: {
                type: 'object',
                example: { "name": "comedy"}
            }
        }
    }
  },
  responses: {
    200: {
      description: 'Genre updated successfully',
    },
    400: {
      description: 'Bad request',
    },
    500: {
      description: 'Internal server error',
    },
  },
};