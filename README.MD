# Forms API Documentation

## Base URL
`https://form-rosy-one.vercel.app`

## Authentication
Most endpoints require authentication using a JWT token. Include the token in the Authorization header:
```
Authorization: Bearer <your_token>
```

## Error Handling
All errors follow this structure:
```typescript
{
  errors: [{
    success: false,
    message: string
  }]
}
```

Common error status codes:
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Endpoints

### Authentication

#### Sign Up
```
POST /api/auth/sign-up
```

Request Body:
```typescript
{
  firstName: string,  // min 2 chars, max 255 chars
  lastName: string,   // min 2 chars, max 255 chars
  email: string,      // valid email format
  password: string    // min 6 chars, must include letter, number, and special char
}
```

Response (201):
```typescript
{
  success: true,
  message: "User registered successfully",
  data: {
    user: {
      _id: string,
      firstName: string,
      lastName: string,
      email: string,
      createdAt: string
    }
  }
}
```

#### Login
```
POST /api/auth/login
```

Request Body:
```typescript
{
  email: string,
  password: string
}
```

Response (200):
```typescript
{
  success: true,
  message: "Login successful",
  data: {
    token: string,
    user: {
      _id: string,
      firstName: string,
      lastName: string,
      email: string
    }
  }
}
```

### Forms

#### Create Form
```
POST /api/form
```

Request Body:
```typescript
{
  title: string,
  description?: string,
  headerImageUrl?: string,  // must be valid URL
  questions?: string[]      // array of question IDs
}
```

Response (201):
```typescript
{
  success: true,
  message: "Form created successfully",
  data: {
    form: {
      _id: string,
      title: string,
      description?: string,
      headerImageUrl?: string,
      questions: string[],
      createdBy: string,
      shareableLink: string,
      isPublished: boolean,
      createdAt: string,
      updatedAt: string
    }
  }
}
```

#### Get My Forms
```
GET /api/form
```

Response (200):
```typescript
{
  success: true,
  message: "Forms retrieved successfully",
  data: {
    forms: Array<{
      _id: string,
      title: string,
      description?: string,
      headerImageUrl?: string,
      questions: string[],
      createdBy: string,
      shareableLink: string,
      isPublished: boolean,
      createdAt: string,
      updatedAt: string
    }>
  }
}
```

#### Get Form
```
GET /api/form/:formId
```

Response (200):
```typescript
{
  success: true,
  message: "Form retrieved successfully",
  data: {
    form: {
      _id: string,
      title: string,
      description?: string,
      headerImageUrl?: string,
      questions: Array<Question>,
      createdBy: string,
      shareableLink: string,
      isPublished: boolean,
      createdAt: string,
      updatedAt: string
    }
  }
}
```

#### Update Form
```
PATCH /api/form/:formId
```

Request Body (all fields optional):
```typescript
{
  title?: string,
  description?: string,
  headerImageUrl?: string,
  questions?: string[]
}
```

Response (200):
```typescript
{
  success: true,
  message: "Form updated successfully",
  data: {
    updatedForm: {
      // Updated form object
    }
  }
}
```

#### Delete Form
```
DELETE /api/form/:formId
```

Response (200):
```typescript
{
  success: true,
  message: "Form deleted successfully",
  data: {
    form: {
      // Deleted form object
    }
  }
}
```

#### Publish Form
```
PATCH /api/form/:formId/publish
```

Response (200):
```typescript
{
  success: true,
  message: "Form published successfully",
  data: {
    shareableLink: string
  }
}
```

### Questions

#### Create Question
```
POST /api/question/form/:formId
```

Request Body:
```typescript
{
  type: "Text" | "Grid" | "CheckBox",
  title: string,
  description?: string,
  isRequired?: boolean,
  imageUrl?: string,
  gridConfig?: {
    rows?: string[],
    columns?: string[]
  },
  checkboxConfig?: {
    options?: string[],
    selectMultiple?: boolean
  },
  validation?: {
    minLength?: number,
    maxLength?: number,
    pattern?: string
  }
}
```

Response (201):
```typescript
{
  success: true,
  message: "Question added successfully",
  data: {
    question: {
      // Created question object
    }
  }
}
```

### Responses

#### Submit Response
```
POST /api/response
```

Request Body:
```typescript
{
  form: string,  // Form ID
  responses: Array<{
    question: string,  // Question ID
    answer: string | number | boolean | any[] | Record<string, any>
  }>
}
```

Response (201):
```typescript
{
  success: true,
  message: "Form response submitted successfully",
  data: {
    responseId: string
  }
}
```

#### Get Form Responses
```
GET /api/response/form/:formId
```

Response (200):
```typescript
{
  success: true,
  message: "Form responses retrieved successfully",
  data: {
    responses: Array<{
      _id: string,
      form: string,
      respondent: string,
      responses: Array<{
        question: string,
        answer: any
      }>,
      submittedAt: string
    }>
  }
}
```

## Models

### Form Model
Reference:

```1:44:server/src/models/form.model.ts
import mongoose, { InferSchemaType } from "mongoose";

const FormSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  headerImageUrl: {
    type: String,
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  shareableLink: {
    type: String,
    unique: true,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export type Form = InferSchemaType<typeof FormSchema>;

export const FormModel = mongoose.model("Form", FormSchema);
```


### Question Model
Reference:

```1:49:server/src/models/question.model.ts
import mongoose, { InferSchemaType, ObjectId } from "mongoose";

export const QuestionSchema = new mongoose.Schema({
  form: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Form",
    required: true,
  },
  type: {
    type: String,
    enum: ["Text", "Grid", "CheckBox"],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  isRequired: {
    type: Boolean,
    default: false,
  },
  imageUrl: {
    type: String,
  },
  // Specific configurations for different question types
  gridConfig: {
    rows: [String],
    columns: [String],
  },
  checkboxConfig: {
    options: [String],
    selectMultiple: Boolean,
  },
  validation: {
    minLength: Number,
    maxLength: Number,
    pattern: String,
  },
});

// export type Question = InferSchemaType<typeof QuestionSchema>;
export interface Question extends InferSchemaType<typeof QuestionSchema> {
  _id: mongoose.Schema.Types.ObjectId | string;
}

export const QuestionModel = mongoose.model("Question", QuestionSchema);
```


### Response Model
Reference:

```1:32:server/src/models/response.model.ts
import mongoose from "mongoose";

export const ResponseSchema = new mongoose.Schema({
  form: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Form",
    required: true,
  },
  respondent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  responses: [
    {
      question: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      answer: {
        type: mongoose.Schema.Types.Mixed, // Flexible to handle different answer types
        required: true,
      },
    },
  ],
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

export const ResponseModel = mongoose.model("Response", ResponseSchema);
```


### User Model
Reference:

```1:32:server/src/models/user.model.ts
import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdForms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Form",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const UserModel = mongoose.model("User", UserSchema);
```