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
import { formSubmissionSchema } from "@/schemas/form-submission.schema";

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
  } = useForm<CreateFormSubmissionData>({
    defaultValues: {
      form: form.id,
    },
  });
  const { mutateAsync: submitForm, isPending } = useSubmitForm();
  console.log(errors);

  const onSubmit = async (data: any) => {
    console.log({ data });
    if (isPreview) {
      showAlert({
        type: "info",
        title: "Preview Mode",
        description: "Form submission is disabled in preview mode",
      });
      return;
    }

    try {
      // await submitForm({
      //   form: form.id as string,
      //   responses: formattedResponses,
      // });
      showAlert({
        type: "success",
        title: "Form Submitted",
        description: "Thank you for your response",
      });
      router.back();
    } catch (error) {
      showAlert({
        type: "error",
        title: "Submission Failed",
        description: "Please try again",
      });
    }
  };

  const renderQuestion = (question: Question, index: number) => {
    switch (question.type) {
      case "Text":
        return (
          <TextQuestion index={index} question={question} control={control} />
        );
      case "CheckBox":
        return <CheckboxQuestion question={question} control={control} />;
      case "Grid":
        return <GridQuestion question={question} control={control} />;
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      className="flex-1"
    >
      <View className="pt-4">
        <Image src={form.headerImageUrl} className="w-full h-20" />
        <View className="flex bg-white p-4 my-4 border-b-[8px] rounded-lg shadow-lg border-accent-hover ">
          <Text className="text-2xl font-bold text-accent-hover">
            {form.title}
          </Text>
          {form.description && (
            <Text className="mt-2 text-base">{form.description}</Text>
          )}
        </View>

        <View className="gap-1 ">
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
