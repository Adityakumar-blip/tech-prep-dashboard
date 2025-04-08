import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  MoreVertical,
  Folder,
  FileQuestion,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ReusableTable from "./ReusableTable";
import AddTopicModal from "./AddTopicModal"; // You'll need to create this component
import useApiStore from "../store/useApiStore";
import { apiEndPoints } from "../services/apiConfig";

const TopicManager = ({
  topics = [],
  questions = [],
  onAddTopic,
  onEditTopic,
  onDeleteTopic,
}) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingTopic, setEditingTopic] = useState(null);
  const [addTopic, setAddTopic] = useState(false);

  const { fetchApi, apis, postApiData } = useApiStore();

  // Filter topics based on search query
  const filteredTopics = apis.topics?.data?.filter((topic) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        topic.name.toLowerCase().includes(query) ||
        topic.description?.toLowerCase().includes(query)
      );
    }
    return true;
  });

  // Count questions per topic
  const getQuestionCount = (topicId) => {
    return questions.filter(
      (q) => q.category?.id === topicId || q.topicId === topicId
    ).length;
  };

  // Define columns for the table
  const columns = [
    { key: "name", header: "Topic Name", className: "w-[250px]" },
    { key: "description", header: "Description", className: "w-[350px]" },
    { key: "questionCount", header: "Questions" },
    { key: "createdAt", header: "Created" },
    { key: "actions", header: "Actions", className: "text-right w-[150px]" },
  ];

  // Custom cell renderer
  const renderCustomCell = (key, topic) => {
    switch (key) {
      case "name":
        return (
          <div className="flex items-center gap-2">
            <Folder className="h-4 w-4 text-blue-500" />
            <span className="font-medium">{topic.name}</span>
          </div>
        );

      case "description":
        return (
          <div className="line-clamp-2 text-sm text-gray-600">
            {topic.description || "No description provided"}
          </div>
        );

      case "questionCount":
        return (
          <div className="flex items-center gap-2">
            <FileQuestion className="h-4 w-4 text-gray-500" />
            <span>{getQuestionCount(topic.id)}</span>
          </div>
        );

      case "createdAt":
        return topic.createdAt ? (
          <span className="text-sm text-gray-500">
            {new Date(topic.createdAt).toLocaleDateString()}
          </span>
        ) : (
          <span className="text-sm text-gray-500">--</span>
        );

      case "actions":
        return (
          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setEditingTopic(topic);
                setIsAddDialogOpen(true);
              }}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDeleteTopic && onDeleteTopic(topic.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Questions</DropdownMenuItem>
                <DropdownMenuItem>Duplicate Topic</DropdownMenuItem>
                <DropdownMenuItem>Archive Topic</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );

      default:
        return topic[key];
    }
  };

  // Group topics for summary display
  const topicsWithMostQuestions = [...topics]
    .sort((a, b) => getQuestionCount(b.id) - getQuestionCount(a.id))
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold tracking-tight">Topic Manager</h2>
        <p className="text-muted-foreground">
          Create and manage topics for organizing your questions.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex flex-col gap-2 p-6">
            <h3 className="text-lg font-medium">Total Topics</h3>
            <p className="text-3xl font-bold">{apis.topics?.data?.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col gap-2 p-6">
            <h3 className="text-lg font-medium">Total Questions</h3>
            <p className="text-3xl font-bold">{questions.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col gap-2 p-6">
            <h3 className="text-lg font-medium">Top Topics</h3>
            <div className="flex flex-wrap gap-2 pt-2">
              {topicsWithMostQuestions.map((topic) => (
                <Badge
                  key={topic.id}
                  variant="outline"
                  className="flex items-center gap-1"
                >
                  {topic.name}
                  <span className="ml-1 rounded-full bg-gray-200 px-1.5 py-0.5 text-xs">
                    {getQuestionCount(topic.id)}
                  </span>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Actions */}
      <div className="flex items-center justify-between gap-2">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search topics..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          onClick={() => {
            setEditingTopic(null);
            setIsAddDialogOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Topic
        </Button>
      </div>

      {/* Topics Table */}
      <ReusableTable
        columns={columns}
        data={filteredTopics || []}
        emptyMessage="No topics found. Create your first topic to get started."
        renderCustomCell={renderCustomCell}
      />

      {/* Add/Edit Topic Modal */}
      {isAddDialogOpen && (
        <AddTopicModal
          isOpen={isAddDialogOpen}
          setIsOpen={setIsAddDialogOpen}
          topic={editingTopic}
          onSave={async (topicData) => {
            console.log("inside onsave");
            try {
              if (editingTopic) {
                await postApiData("editTopic", apiEndPoints.topic.updateTopic, {
                  ...topicData,
                  id: editingTopic.id,
                });
              } else {
                await postApiData(
                  "addTopic",
                  apiEndPoints.topic.createTopic,
                  topicData
                );
              }
              setIsAddDialogOpen(false);
              setEditingTopic(null);
            } catch (error) {
              console.error("Failed to save topic:", error);
            }
          }}
        />
      )}
    </div>
  );
};

export default TopicManager;
