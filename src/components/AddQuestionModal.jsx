import React, { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  FileQuestion,
  Code,
  BookText,
  Tag,
  MoreVertical,
  PlusCircle,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import useApiStore from "../store/useApiStore";
import { apiEndPoints } from "../services/apiConfig";

const AddQuestionModal = ({
  isAddDialogOpen,
  setIsAddDialogOpen,
  categories = [],
  onQuestionAdded,
}) => {
  const form = useForm({
    defaultValues: {
      category: "",
      question: "",
      description: "",
      type: "Theoretical",
      difficulty: "medium",
      frequency: 5,
      tags: [],
      answers: [{ text: "", codeSnippet: "", references: [] }],
      author: "Admin",
    },
  });

  const [tagInput, setTagInput] = useState("");
  const [referenceInput, setReferenceInput] = useState("");
  const [activeAnswerIndex, setActiveAnswerIndex] = useState(0);

  const { postApiData, apis, fetchApi } = useApiStore();

  const handleSubmit = async (data) => {
    try {
      await postApiData("question", apiEndPoints.question.addQuestion, data);

      // Reset form and close dialog
      form.reset();
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error("Error creating question:", error);
      // You might want to show an error message to the user here
    }
  };

  const addTag = () => {
    if (tagInput.trim() !== "") {
      const currentTags = form.getValues("tags") || [];
      if (!currentTags.includes(tagInput.trim())) {
        form.setValue("tags", [...currentTags, tagInput.trim()]);
        setTagInput("");
      }
    }
  };

  const removeTag = (tagToRemove) => {
    const currentTags = form.getValues("tags") || [];
    form.setValue(
      "tags",
      currentTags.filter((tag) => tag !== tagToRemove)
    );
  };

  const addReference = () => {
    if (referenceInput.trim() !== "") {
      const answers = form.getValues("answers");
      const updatedAnswers = [...answers];

      if (!updatedAnswers[activeAnswerIndex].references) {
        updatedAnswers[activeAnswerIndex].references = [];
      }

      updatedAnswers[activeAnswerIndex].references.push({
        source: referenceInput.trim(),
      });
      form.setValue("answers", updatedAnswers);
      setReferenceInput("");
    }
  };

  const removeReference = (answerIndex, referenceIndex) => {
    const answers = form.getValues("answers");
    const updatedAnswers = [...answers];
    updatedAnswers[answerIndex].references.splice(referenceIndex, 1);
    form.setValue("answers", updatedAnswers);
  };

  const addAnswer = () => {
    const answers = form.getValues("answers") || [];
    form.setValue("answers", [
      ...answers,
      { text: "", codeSnippet: "", references: [] },
    ]);
    // Set active answer to the newly added one
    setActiveAnswerIndex(answers.length);
  };

  const removeAnswer = (index) => {
    const answers = form.getValues("answers");
    if (answers.length > 1) {
      const updatedAnswers = answers.filter((_, i) => i !== index);
      form.setValue("answers", updatedAnswers);

      // Adjust active answer index if needed
      if (activeAnswerIndex >= updatedAnswers.length) {
        setActiveAnswerIndex(updatedAnswers.length - 1);
      } else if (activeAnswerIndex === index) {
        setActiveAnswerIndex(Math.max(0, index - 1));
      }
    }
  };

  useEffect(() => {
    fetchApi("topic", apiEndPoints.question.getAllTopics);
  }, [fetchApi]);

  console.log("topics", apis["topic"]?.data);

  return (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Question</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new question to your question bank.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter question title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter detailed description of the question"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {apis["topic"]?.data?.map((category) => (
                          <SelectItem key={category._id} value={category._id}>
                            {category?.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question Type</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Theoretical">
                          <div className="flex items-center">
                            <BookText className="mr-2 h-4 w-4" />
                            Theoretical
                          </div>
                        </SelectItem>
                        <SelectItem value="Practical">
                          <div className="flex items-center">
                            <Code className="mr-2 h-4 w-4" />
                            Practical
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Difficulty</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frequency (1-10)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        max="10"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value, 10) || 1)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {field.value?.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        <Tag className="h-3 w-3" />
                        {tag}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 ml-1"
                          onClick={() => removeTag(tag)}
                        >
                          ×
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Add a tag"
                      onKeyDown={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addTag())
                      }
                    />
                    <Button type="button" size="sm" onClick={addTag}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <FormLabel className="text-base">Answers</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addAnswer}
                  className="flex items-center gap-1"
                >
                  <PlusCircle className="h-4 w-4" /> Add Answer
                </Button>
              </div>

              <Tabs
                value={String(activeAnswerIndex)}
                onValueChange={(value) =>
                  setActiveAnswerIndex(parseInt(value, 10))
                }
                className="w-full"
              >
                <TabsList className="flex overflow-x-auto">
                  {form.getValues("answers")?.map((_, index) => (
                    <TabsTrigger
                      key={index}
                      value={String(index)}
                      className="flex items-center gap-1"
                    >
                      Answer {index + 1}
                      {form.getValues("answers").length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 ml-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeAnswer(index);
                          }}
                        >
                          ×
                        </Button>
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {form.getValues("answers")?.map((_, index) => (
                  <TabsContent
                    key={index}
                    value={String(index)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name={`answers.${index}.text`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Answer Text</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter answer text"
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`answers.${index}.codeSnippet`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Code Snippet (if applicable)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter code snippet"
                              className="font-mono min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormItem>
                      <FormLabel>References</FormLabel>
                      <Card className="p-2">
                        <CardContent className="p-0">
                          <div className="flex flex-wrap gap-2 mb-2">
                            {form
                              .getValues(`answers.${index}.references`)
                              ?.map((ref, refIndex) => (
                                <Badge
                                  key={refIndex}
                                  variant="outline"
                                  className="flex items-center gap-1"
                                >
                                  {ref.source}
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="h-4 w-4 p-0 ml-1"
                                    onClick={() =>
                                      removeReference(index, refIndex)
                                    }
                                  >
                                    ×
                                  </Button>
                                </Badge>
                              ))}
                          </div>
                          <div className="flex gap-2">
                            <Input
                              value={
                                index === activeAnswerIndex
                                  ? referenceInput
                                  : ""
                              }
                              onChange={(e) =>
                                setReferenceInput(e.target.value)
                              }
                              placeholder="Add a reference source"
                              onKeyDown={(e) =>
                                e.key === "Enter" &&
                                (e.preventDefault(), addReference())
                              }
                            />
                            <Button
                              type="button"
                              size="sm"
                              onClick={addReference}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </FormItem>
                  </TabsContent>
                ))}
              </Tabs>
            </div>

            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder="Author name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Save Question</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddQuestionModal;
