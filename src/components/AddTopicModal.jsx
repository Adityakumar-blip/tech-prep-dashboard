import React from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useApiStore from "@/store/useApiStore.js";
import { apiEndPoints } from "../services/apiConfig";

const AddTopicModal = ({ isOpen, setIsOpen, topic = null, onSave }) => {
  const isEditing = !!topic;

  const { postApiData } = useApiStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: topic?.name || "",
      description: topic?.description || "",
      color: topic?.color || "#3b82f6", // Default blue color
    },
  });

  const onSubmit = (data) => {
    console.log("heree");
    onSave({
      ...data,
      // createdAt: topic?.createdAt || new Date().toISOString(),
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Topic" : "Add New Topic"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Make changes to the existing topic."
              : "Create a new topic to organize your questions."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Topic Name</Label>
            <Input
              id="name"
              placeholder="e.g., Data Structures, Algorithms"
              {...register("name", {
                required: "Topic name is required",
                minLength: {
                  value: 2,
                  message: "Topic name must be at least 2 characters",
                },
              })}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Brief description of this topic"
              rows={3}
              {...register("description")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="color">Topic Color</Label>
            <div className="flex items-center gap-4">
              <Input
                id="color"
                type="color"
                className="h-10 w-20"
                {...register("color")}
              />
              <span className="text-sm text-gray-500">
                Choose a color to identify this topic
              </span>
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isEditing ? "Save Changes" : "Create Topic"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTopicModal;
