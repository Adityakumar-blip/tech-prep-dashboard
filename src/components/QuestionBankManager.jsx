import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useForm } from "react-hook-form";
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
import AddQuestionModal from "./AddQuestionModal";
import ReusableTable from "./ReusableTable"; // Import the new component

const QuestionBankManager = ({ data }) => {
  const [view, setView] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [questionType, setQuestionType] = useState("theoretical");
  const [selectedTopic, setSelectedTopic] = useState("all");

  // Dummy data for the demo
  const topicsList = [
    { id: "1", name: "Data Structures" },
    { id: "2", name: "Algorithms" },
    { id: "3", name: "System Design" },
    { id: "4", name: "JavaScript" },
    { id: "5", name: "React" },
    { id: "6", name: "Backend" },
  ];

  const companiesList = [
    { id: "1", name: "Google" },
    { id: "2", name: "Microsoft" },
    { id: "3", name: "Amazon" },
    { id: "4", name: "Facebook" },
    { id: "5", name: "Apple" },
    { id: "6", name: "Netflix" },
  ];

  const tagsList = [
    { id: "1", name: "Arrays" },
    { id: "2", name: "Strings" },
    { id: "3", name: "Linked Lists" },
    { id: "4", name: "Trees" },
    { id: "5", name: "Graphs" },
    { id: "6", name: "Dynamic Programming" },
  ];

  const questionsList = [
    {
      id: "1",
      title: "Implement a Binary Search Tree",
      description:
        "Create a binary search tree with insertion, deletion, and search operations.",
      topic: "Data Structures",
      type: "practical",
      difficulty: "medium",
      companies: ["Google", "Microsoft"],
      frequency: "high",
      solution: "// Implementation details here",
      tags: ["Trees", "Recursion"],
    },
    {
      id: "2",
      title: "What is the time complexity of quicksort?",
      description:
        "Explain the best, average, and worst-case time complexity of the quicksort algorithm.",
      topic: "Algorithms",
      type: "theoretical",
      difficulty: "easy",
      companies: ["Amazon", "Facebook"],
      frequency: "high",
      solution: "Best/Average: O(n log n), Worst: O(n²)",
      tags: ["Sorting", "Time Complexity"],
    },
    {
      id: "3",
      title: "Design a URL shortener",
      description:
        "Design a system that converts long URLs into short aliases to save space when sharing URLs.",
      topic: "System Design",
      type: "practical",
      difficulty: "hard",
      companies: ["Google", "Microsoft", "Amazon"],
      frequency: "medium",
      solution: "Detailed design approach...",
      tags: ["Hashing", "Databases", "Distributed Systems"],
    },
  ];

  console.log("data", data);

  const filteredQuestions =
    data &&
    data.filter((question) => {
      if (selectedTopic !== "all" && question.topic !== selectedTopic)
        return false;
      if (view !== "all" && question.type !== view) return false;
      return true;
    });

  // Define table columns
  const columns = [
    { key: "question", header: "Question", className: "w-[300px]" },
    { key: "type", header: "Type" },
    { key: "category", header: "Topic" },
    { key: "difficulty", header: "Difficulty" },
    { key: "frequency", header: "Frequency" },
    { key: "companies", header: "Companies" },
    { key: "actions", header: "Actions", className: "text-right" },
  ];

  // Custom cell renderer for complex cells
  const renderCustomCell = (key, row) => {
    switch (key) {
      case "name":
        return <span className="font-medium">{row.name}</span>;

      case "type":
        return row.type === "theoretical" ? (
          <div className="flex items-center">
            <BookText className="mr-2 h-4 w-4" />
            <span>Theoretical</span>
          </div>
        ) : (
          <div className="flex items-center">
            <Code className="mr-2 h-4 w-4" />
            <span>Practical</span>
          </div>
        );

      case "difficulty":
        return (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium 
            ${row.difficulty === "easy" ? "bg-green-100 text-green-800" : ""}
            ${
              row.difficulty === "medium" ? "bg-yellow-100 text-yellow-800" : ""
            }
            ${row.difficulty === "hard" ? "bg-red-100 text-red-800" : ""}
          `}
          >
            {row.difficulty.charAt(0).toUpperCase() + row.difficulty.slice(1)}
          </span>
        );

      case "frequency":
        return (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium 
            ${row.frequency === "low" ? "bg-blue-100 text-blue-800" : ""}
            ${row.frequency === "medium" ? "bg-purple-100 text-purple-800" : ""}
            ${row.frequency === "high" ? "bg-indigo-100 text-indigo-800" : ""}
          `}
          >
            {row.frequency}
          </span>
        );

      case "category":
        console.log("row", row);
        return (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium 
              ${row.frequency === "low" ? "bg-blue-100 text-blue-800" : ""}
              ${
                row.frequency === "medium"
                  ? "bg-purple-100 text-purple-800"
                  : ""
              }
              ${row.frequency === "high" ? "bg-indigo-100 text-indigo-800" : ""}
            `}
          >
            {row.category.name}
          </span>
        );

      case "companies":
        return (
          <div className="flex flex-wrap gap-1">
            {row.companies
              ? row.companies.slice(0, 2).map((company, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                  >
                    {company}
                  </span>
                ))
              : "-"}
            {row.companies && row.companies.length > 2 && (
              <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                +{row.companies.length - 2}
              </span>
            )}
          </div>
        );

      case "actions":
        return (
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Trash2 className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuItem>Clone Question</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );

      default:
        return row[key];
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold tracking-tight">Question Bank</h2>
        <p className="text-muted-foreground">
          Manage all your interview questions here.
        </p>
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search questions..." className="pl-8" />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setView("all")}>
                All Questions
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setView("theoretical")}>
                Theoretical Only
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setView("practical")}>
                Practical Only
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Question
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4 flex h-10 overflow-x-auto">
          <TabsTrigger value="all" onClick={() => setSelectedTopic("all")}>
            All Topics
          </TabsTrigger>
          {topicsList.map((topic) => (
            <TabsTrigger
              key={topic.id}
              value={topic.name}
              onClick={() => setSelectedTopic(topic.name)}
            >
              {topic.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <ReusableTable
            columns={columns}
            data={filteredQuestions}
            emptyMessage="No questions found."
            renderCustomCell={renderCustomCell}
          />
        </TabsContent>

        {topicsList.map((topic) => (
          <TabsContent key={topic.id} value={topic.name} className="mt-0">
            <ReusableTable
              columns={columns}
              data={filteredQuestions}
              emptyMessage="No questions found."
              renderCustomCell={renderCustomCell}
            />
          </TabsContent>
        ))}
      </Tabs>

      <AddQuestionModal
        isAddDialogOpen={isAddDialogOpen}
        setIsAddDialogOpen={setIsAddDialogOpen}
        categories={topicsList}
      />
    </div>
  );
};

export default QuestionBankManager;
