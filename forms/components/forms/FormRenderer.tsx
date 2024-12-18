import { useFormStore } from "@/stores/form-store";
import { Form } from "@/types/form.type";
import { Text, View, ScrollView, Image } from "react-native";
import { Button } from "../common";
import { useForm } from "react-hook-form";
import { useSubmitForm } from "@/hooks/use-form-submission";
import { showAlert } from "@/utils/notify";
import { router } from "expo-router";
import { TextQuestion, CheckboxQuestion, GridQuestion } from "./questions";
import { Question } from "@/types/question.type";
import { CreateFormSubmissionData } from "@/types/form-submission.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { formSchema } from "@/schemas/form.schema";
import { formSubmissionSchema } from "@/schemas/form-submission.schema";
import { useEffect } from "react";

// Custom schema for form validation
const formValidationSchema = z.object({
  responses: z.record(
    z.string(),
    z.object({
      answer: z.union([
        // Text answer
        z.string(),
        // Checkbox answer (object with option keys and boolean values)
        z.record(
          z.string({ required_error: "Please Select checkbox" }),
          z.boolean()
        ),
        // Grid answer (object with row indices and selected column values)
        z.record(
          z.string({ required_error: "Please Select checkbox" }),
          z.string()
        ),
      ]),
    })
  ),
});

type FormValidationData = z.infer<typeof formValidationSchema>;

interface FormRendererProps {
  form: Form;
  isPreview?: boolean;
}

export const FormRenderer = ({
  form,
  isPreview = false,
}: FormRendererProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValidationData>({
    resolver: zodResolver(formValidationSchema),
    defaultValues: {
      responses: form.questions.reduce(
        (acc, question) => ({
          ...acc,
          [question.id]: { answer: undefined },
        }),
        {}
      ),
    },
  });

  const {
    mutate: submitForm,
    isPending,
    isError,
    isSuccess,
    error,
  } = useSubmitForm();

  const transformToSubmissionData = (data: FormValidationData) => {
    // ):  |  => {
    return form.questions.map((question) => {
      const selectedAnswer = data.responses[question.id];
      if (question.type === "Text") {
        return {
          question: question.id,
          answer: selectedAnswer,
        };
      } else if (question.type === "CheckBox") {
        return {
          question: question.id,
          answer: question.checkboxConfig.options.filter(
            (option) => selectedAnswer.answer[option]
          ),
        };
      } else if (question.type === "Grid") {
        const res: Record<string, string | number> = {};
        question.gridConfig.rows.forEach((row, index) => {
          // [row]: selectedAnswer.answer[index],
          res[row] = selectedAnswer.answer[index];
        });
        return {
          question: question.id,
          answer: res,
        };
      }
    });
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      showAlert({
        type: "success",
        title: "Form Submitted",
        description: "Thank you for your response",
      });
      router.back();
    } else if (!isPending && isError) {
      showAlert({
        type: "error",
        title: "Submission Failed",
        description: error?.errors[0].message,
      });
    }
  }, [isError, isSuccess, isPending, error]);

  const onSubmit = async (data: FormValidationData) => {
    if (isPreview) {
      showAlert({
        type: "info",
        title: "Preview Mode",
        description: "Form submission is disabled in preview mode",
      });
      return;
    }
    const transformedData = transformToSubmissionData(data);
    const parse = formSubmissionSchema.safeParse({
      form: form.id,
      responses: transformedData,
    });
    if (parse.success) {
      submitForm(parse.data);
    } else {
      showAlert({
        type: "error",
        title: "Validation Error",
        description: parse.error.message,
      });
    }
  };

  const renderQuestion = (question: Question, index: number) => {
    const error = errors?.responses?.[question.id]?.answer;
    const errorMessage = error?.message || (error && "This field is required");

    switch (question.type) {
      case "Text":
        return (
          <TextQuestion
            index={index}
            question={question}
            control={control}
            error={errorMessage}
          />
        );
      case "CheckBox":
        return (
          <CheckboxQuestion
            question={question}
            control={control}
            error={errorMessage as string}
          />
        );
      case "Grid":
        return (
          <GridQuestion
            question={question}
            control={control}
            error={errorMessage}
          />
        );
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      className="flex-1"
    >
      <View className="pt-4">
        <Image src={form.headerImageUrl} className="w-full h-36" />
        <View className="flex bg-white p-4 my-4 border-b-[8px] rounded-lg shadow-lg border-accent-hover ">
          <Text className="text-2xl font-bold text-accent-hover">
            {form.title}
          </Text>
          {form.description && (
            <Text className="mt-2 text-base">{form.description}</Text>
          )}
        </View>

        <View className="gap-1">
          {form.questions.map((question, index) => (
            <View
              key={index}
              className="flex p-5 mb-4 bg-white rounded-lg shadow drop-shadow-2xl shadow-slate-300 border-border-muted"
            >
              {renderQuestion(question, index)}
            </View>
          ))}
        </View>

        <Button
          className="mt-6"
          onPress={handleSubmit(onSubmit)}
          isLoading={isPending}
        >
          {isPreview ? "Test Submit" : "Submit"}
        </Button>
      </View>
    </ScrollView>
  );
};
