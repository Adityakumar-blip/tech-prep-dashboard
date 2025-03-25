import React, { useState } from "react";
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
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";

const AddQuestionModal = ({ isAddDialogOpen, setIsAddDialogOpen }) => {
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      topic: "",
      type: "theoretical",
      difficulty: "medium",
      companies: [],
      frequency: "medium",
      solution: "",
      tags: [],
    },
  });

  const [questions, setQuestions] = useState([]);
  const [questionType, setQuestionType] = useState("theoretical");

  const handleSubmit = (data) => {
    // In a real app, you would save this to your backend
    const newQuestion = {
      id: Date.now().toString(),
      ...data,
      companies: Array.isArray(data.companies) ? data.companies : [],
      tags: Array.isArray(data.tags) ? data.tags : [],
    };

    setQuestions([...questions, newQuestion]);
    form.reset();
    setIsAddDialogOpen(false);
  };
  return (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Question
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
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
            <Tabs
              value={questionType}
              onValueChange={setQuestionType}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                  value="theoretical"
                  onClick={() => form.setValue("type", "theoretical")}
                >
                  <BookText className="mr-2 h-4 w-4" />
                  Theoretical
                </TabsTrigger>
                <TabsTrigger
                  value="practical"
                  onClick={() => form.setValue("type", "practical")}
                >
                  <Code className="mr-2 h-4 w-4" />
                  Practical
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter question title" {...field} />
                  </FormControl>
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
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topic</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select topic" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {topicsList.map((topic) => (
                          <SelectItem key={topic.id} value={topic.name}>
                            {topic.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Difficulty</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="frequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frequency</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="solution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Solution/Answer</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={
                        questionType === "theoretical"
                          ? "Enter the answer to this question"
                          : "Enter solution code or approach"
                      }
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="companies"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Companies</FormLabel>
                    <FormDescription>
                      Select companies that have asked this question
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    {companiesList.map((company) => (
                      <FormField
                        key={company.id}
                        control={form.control}
                        name="companies"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={company.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(company.name)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          company.name,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== company.name
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {company.name}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
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
