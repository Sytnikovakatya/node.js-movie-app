export const getMovies = {
  tags: ['Movies'],
  description: 'Get a list of movies',
  responses: {
    200: {
      description: 'Successfully retrieved movies',
    },
    400: {
      description: 'Bad request',
    },
    500: {
      description: 'Internal server error',
    },
  },
};

export const geMoviesByGenre = {
  tags: ['Movies'],
  description: 'Get movies by genre',
  parameters: [
    {
    in: 'path',
    name: 'genreName',
    schema: {
        type: 'string',
    },
    required: 'true',      
    }
  ],
  responses: {
    200: {
      description: 'Successfully retrieved movies',
    },
    400: {
      description: 'Bad request',
    },
    500: {
      description: 'Internal server error',
    },
  },
};



export const createMovie = {
  tags: ['Movies'],
  description: 'Create a new movie',
  requestBody: {
    content: {
        'application/json': {
            schema: {
                type: 'object',
                example: {
                    "title": "Title",
                    "description": "New Description",
                    "releaseDate": "1990-10-19T16:43:41.959Z",
                    "genre": ["653242eb994dd9b9efde00dd"]
                }
            }
        }
    }
  },
  responses: {
    201: {
      description: 'Movie created successfully',
    },
    400: {
      description: 'Bad request',
    },
    500: {
      description: 'Internal server error',
    },
  },
};

export const deleteMovie = {
  tags: ['Movies'],
  description: 'Delete movie by id',
  parameters: [
    {
    in: 'path',
    name: 'id',
    schema: {
        type: 'string',
    },
    required: 'true',
    description: "Id of movie to be deleted",      
    }
 ],
  responses: {
    204: {
      description: 'Movie deleted successfully',
    },
    400: {
      description: 'Bad request',
    },
    500: {
      description: 'Internal server error',
    },
  },
};

export const updateMovie = {
  tags: ['Movies'],
  description: 'Update movie by id',
  parameters:[
    {
    in: 'path',
    name: 'id',
    schema: {
        type: 'string',
    },
    required: 'true',
    description: "Id of movie to be updated",      
  }
 ],
  requestBody: {
    content: {
        'application/json': {
            schema: {
                type: 'object',
                example: { "title": "new title",}
            }
        }
    }
  },
  responses: {
    201: {
      description: 'Movie updated successfully',
    },
    400: {
      description: 'Bad request',
    },
    500: {
      description: 'Internal server error',
    },
  },
};