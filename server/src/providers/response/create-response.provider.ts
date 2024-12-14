import { z } from "zod";
import { CreateResponseSchema } from "../../validation/response/create-response.validation";
import { UserPayload } from "../../types/user-payload";
import { Form, FormModel } from "../../models/form.model";
import { Question } from "../../models/question.model";
import { NotFoundError } from "../../errors/NotFoundError";
import { ForbiddenError } from "../../errors/ForbiddenError";
import {
  ResponseItemsType,
  ResponseItemType,
} from "../../validation/response/base-response.validation";
import { QuestionBaseSchema } from "../../validation/question/question-base.validation";
import { InternalServerError } from "../../errors/InternalServerError";
import { BadRequestError } from "../../errors/BadRequestError";
import { ResponseModel } from "../../models/response.model";
import { error } from "console";
import { ObjectId } from "mongodb";
import { ErrorMessages } from "../../utils/ErrorMessages";
type Body = z.infer<typeof CreateResponseSchema.shape.body>;
interface PopulatedForm extends Omit<Form, "questions"> {
  questions: Question[];
}

export const createResponseProvider = async (
  body: Body,
  loggedInUser: UserPayload
) => {
  const form = await FormModel.findById(body.form).populate<{
    questions: Question[];
  }>("questions");
  if (!form) {
    throw new NotFoundError(ErrorMessages.FORM_NOT_FOUND);
  }
  if (!form.isPublished) {
    throw new ForbiddenError(ErrorMessages.FORM_PERMISSION_DENIED);
  }
  const validationErrors = validateFormResponses(form, body.responses);
  if (validationErrors.length > 0) {
    throw new BadRequestError(validationErrors.join(", "));
  }
  const formResponse = await ResponseModel.create({
    form: form._id,
    respondent: loggedInUser._id,
    responses: body.responses,
  });

  if (!formResponse) {
    throw new BadRequestError(ErrorMessages.RESPONSE_SUBMIT_FAILED);
  }
  return formResponse;
};

function isQuestion(obj: unknown): obj is Question {
  const res = QuestionBaseSchema.shape.body.partial().safeParse(obj);
  return res.success;
}

function validateFormResponses(
  form: PopulatedForm,
  responses: ResponseItemsType
) {
  const validationErrors: string[] = [];

  if (responses.length !== form.questions.length) {
    validationErrors.push("Incomplete reponse");
  }

  form.questions.forEach((question) => {
    const response = responses.find((responseItem) => {
      return new ObjectId(responseItem.question).equals(question._id as string);
    });

    if (!isQuestion(question)) {
      throw new InternalServerError(ErrorMessages.POPULATE_QUESTIONS_FAILED);
    }

    if (response) {
      switch (question.type) {
        case "Text": {
          validateTextResponse(question, response, validationErrors);
          break;
        }
        case "CheckBox": {
          validateCheckBoxResponse(question, response, validationErrors);
          break;
        }
        case "Grid": {
          validateGridBoxResponse(question, response, validationErrors);
          break;
        }
      }
    }
  });

  return validationErrors;
}

const validateGridBoxResponse = (
  question: Question,
  response: ResponseItemType,
  validationErrors: string[]
) => {
  const answers = response.answer as Record<string, string>;

  const gridConfig = question.gridConfig!;
  if (
    question.isRequired &&
    (!answers || Object.keys(answers).length != gridConfig.rows.length)
  ) {
    validationErrors.push(
      `Question "${question.title}" requires selection for each option`
    );
  }
  for (let answerKey in answers) {
    if (
      !gridConfig.rows.includes(answerKey) ||
      !gridConfig.columns.includes(answers[answerKey])
    ) {
      validationErrors.push(
        `Invalid selection \`${answerKey}: ${answers[answerKey]}\` for the Question \`${question.title}\``
      );
    }
  }

  // answers.forEach((answer) => {
  //   if (!gridConfig.columns.includes(answer)) {
  //     validationErrors.push(
  //       `Invalid selection ${answer} for the Question ${question.title}`
  //     );
  //   }
  // });
};

const validateCheckBoxResponse = (
  question: Question,
  response: ResponseItemType,
  validationErrors: string[]
) => {
  const answer = response.answer as string[];
  const checkboxConfig = question.checkboxConfig!;
  console.log({ answer, question });
  if (question.isRequired && (!answer || answer.length === 0)) {
    validationErrors.push(
      `Question "${question.title}" requires at least one selection`
    );
  } else if (!checkboxConfig.selectMultiple && answer.length > 1) {
    validationErrors.push(
      `Question "${question.title}" does not allow multiple selections`
    );
  }
};

const validateTextResponse = (
  question: Question,
  response: ResponseItemType,
  validationErrors: string[]
) => {
  const answer = response.answer as string;
  const validation = question.validation!;
  if (question.isRequired && !answer) {
    validationErrors.push(`Question "${question.title}" is required`);
  }

  if (answer.length < validation.minLength!) {
    validationErrors.push(
      `Answer is Too Short, Minimum length is ${validation.minLength} characters.`
    );
  } else if (answer.length > validation.maxLength!) {
    validationErrors.push(
      `Answer is Too Long, Minimum length is ${validation.maxLength} characters.`
    );
  }
};
