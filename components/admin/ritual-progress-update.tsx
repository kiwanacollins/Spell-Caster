"use client";

import { ServiceRequest, RitualProgress } from "@/lib/db/models";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";
import { FiPlus, FiCheckCircle, FiCircle, FiUpload, FiX } from "react-icons/fi";
import { GiPentacle } from "react-icons/gi";

interface RitualProgressUpdateProps {
  request: ServiceRequest;
  requestId: string;
  onProgressUpdate?: (steps: RitualProgress[]) => void;
  loading?: boolean;
}

export function RitualProgressUpdate({
  request,
  requestId,
  onProgressUpdate,
  loading = false,
}: RitualProgressUpdateProps) {
  const [isAddStepOpen, setIsAddStepOpen] = useState(false);
  const [newStepName, setNewStepName] = useState("");
  const [newStepNotes, setNewStepNotes] = useState("");
  const [uploadingStepIndex, setUploadingStepIndex] = useState<number | null>(null);
  const [previewImages, setPreviewImages] = useState<{ [key: number]: string[] }>({});

  const ritualSteps = request.ritualSteps || [];

  const handleAddStep = () => {
    if (!newStepName.trim()) return;

    const newStep: RitualProgress = {
      stepNumber: ritualSteps.length + 1,
      stepName: newStepName,
      completed: false,
      notes: newStepNotes,
      photoUrls: [],
    };

    const updatedSteps = [...ritualSteps, newStep];
    if (onProgressUpdate) {
      onProgressUpdate(updatedSteps);
    }

    setNewStepName("");
    setNewStepNotes("");
    setIsAddStepOpen(false);
  };

  const handleToggleStep = (index: number) => {
    const updatedSteps = [...ritualSteps];
    updatedSteps[index] = {
      ...updatedSteps[index],
      completed: !updatedSteps[index].completed,
      completedAt: !updatedSteps[index].completed ? new Date() : undefined,
    };

    if (onProgressUpdate) {
      onProgressUpdate(updatedSteps);
    }
  };

  const handleFileSelect = (stepIndex: number, files: FileList) => {
    const fileArray = Array.from(files);

    // Create preview URLs
    const newPreviews: string[] = [];
    let completedCount = 0;

    fileArray.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result as string);
        completedCount++;

        if (completedCount === fileArray.length) {
          setPreviewImages((prev) => ({
            ...prev,
            [stepIndex]: [...(prev[stepIndex] || []), ...newPreviews],
          }));
          
          // Upload files immediately
          uploadFiles(stepIndex, fileArray);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const uploadFiles = async (stepIndex: number, files: File[]) => {
    setUploadingStepIndex(stepIndex);
    try {
      const formData = new FormData();
      formData.append("stepIndex", stepIndex.toString());
      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch(
        `/api/service-requests/${requestId}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Clear previews after successful upload
        setPreviewImages((prev) => ({
          ...prev,
          [stepIndex]: [],
        }));
        
        // Trigger parent update
        if (onProgressUpdate && data.data?.ritualSteps) {
          onProgressUpdate(data.data.ritualSteps);
        }
      } else {
        console.error("Failed to upload files");
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setUploadingStepIndex(null);
    }
  };

  const handleRemovePreview = (stepIndex: number, previewIndex: number) => {
    setPreviewImages((prev) => ({
      ...prev,
      [stepIndex]: prev[stepIndex]?.filter((_, i) => i !== previewIndex) || [],
    }));
  };

  const completedCount = ritualSteps.filter((step) => step.completed).length;
  const progressPercentage = ritualSteps.length > 0 ? (completedCount / ritualSteps.length) * 100 : 0;

  return (
    <div className="space-y-4">
      {/* Progress Overview */}
      <Card className="bg-[#F4E8D0] border-2 border-[#8B6F47]">
        <CardHeader className="border-b-2 border-[#8B6F47]">
          <CardTitle className="font-['MedievalSharp'] text-[#1A1A1A] text-lg flex items-center gap-2">
            <GiPentacle className="text-[#B8860B]" />
            Ritual Progress
          </CardTitle>
          <CardDescription className="text-[#4A4A4A]">
            Track the steps of this sacred ritual
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {/* Progress Bar */}
          {ritualSteps.length > 0 && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-['MedievalSharp'] text-[#1A1A1A]">
                  Ritual Completion
                </p>
                <p className="text-sm text-[#4A4A4A]">
                  {completedCount} of {ritualSteps.length} steps
                </p>
              </div>
              <div className="w-full bg-[#E8DCC8] border-2 border-[#8B6F47] rounded overflow-hidden h-4">
                <div
                  className="bg-[#2C5530] h-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <p className="text-xs text-[#8B6F47] mt-2 font-['Crimson_Text']">
                {Math.round(progressPercentage)}% Complete
              </p>
            </div>
          )}

          {/* Ritual Steps */}
          {ritualSteps.length > 0 ? (
            <div className="space-y-4">
              {ritualSteps.map((step, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-[#8B6F47]/30 rounded p-4"
                >
                  {/* Step Header */}
                  <div className="flex items-start gap-3 mb-3">
                    <button
                      onClick={() => handleToggleStep(index)}
                      className="mt-1 text-2xl shrink-0 transition-colors"
                      disabled={loading}
                    >
                      {step.completed ? (
                        <FiCheckCircle className="text-[#2C5530]" />
                      ) : (
                        <FiCircle className="text-[#8B6F47]" />
                      )}
                    </button>
                    <div className="flex-1">
                      <h4 className="font-['MedievalSharp'] text-[#1A1A1A]">
                        Step {step.stepNumber}: {step.stepName}
                      </h4>
                      {step.completed && (
                        <p className="text-xs text-[#2C5530] mt-1">
                          ✓ Completed{" "}
                          {step.completedAt &&
                            `on ${step.completedAt.toLocaleDateString()}`}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Step Notes */}
                  {step.notes && (
                    <p className="text-sm text-[#4A4A4A] mb-3 ml-9 italic">
                      "{step.notes}"
                    </p>
                  )}

                  {/* Photo Gallery */}
                  {(step.photoUrls || []).length > 0 && (
                    <div className="ml-9 mb-3">
                      <p className="text-xs font-['MedievalSharp'] text-[#8B6F47] uppercase mb-2">
                        Progress Photos/Videos
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {(step.photoUrls || []).map((url, photoIndex) => (
                          <div
                            key={photoIndex}
                            className="relative group overflow-hidden rounded border-2 border-[#8B6F47]/20 aspect-square"
                          >
                            <img
                              src={url}
                              alt={`Progress ${photoIndex + 1}`}
                              className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
                            />
                            <p className="absolute inset-0 flex items-center justify-center text-xs text-white bg-black/0 group-hover:bg-black/50 transition-all">
                              Photo {photoIndex + 1}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Preview Images */}
                  {previewImages[index] && previewImages[index].length > 0 && (
                    <div className="ml-9 mb-3">
                      <p className="text-xs font-['MedievalSharp'] text-[#B8860B] uppercase mb-2">
                        Pending Upload
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {previewImages[index].map((previewUrl, previewIndex) => (
                          <div
                            key={previewIndex}
                            className="relative group overflow-hidden rounded border-2 border-[#B8860B]/50 aspect-square"
                          >
                            <img
                              src={previewUrl}
                              alt={`Preview ${previewIndex + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              onClick={() => handleRemovePreview(index, previewIndex)}
                              className="absolute top-1 right-1 bg-[#8B0000] text-[#F4E8D0] rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              disabled={loading}
                            >
                              <FiX className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* File Upload */}
                  <div className="ml-9">
                    <label className="block cursor-pointer">
                      <input
                        type="file"
                        multiple
                        accept="image/*,video/*"
                        onChange={(e) => {
                          if (e.target.files) {
                            handleFileSelect(index, e.target.files);
                          }
                        }}
                        className="hidden"
                        disabled={loading}
                      />
                      <div className="border-2 border-dashed border-[#8B6F47]/50 rounded p-3 hover:bg-[#8B6F47]/5 transition-colors text-center cursor-pointer">
                        <div className="flex items-center justify-center gap-2 text-[#8B6F47]">
                          <FiUpload className="h-4 w-4" />
                          <span className="text-xs font-['MedievalSharp']">
                            Add Photos/Videos
                          </span>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[#4A4A4A] italic text-center py-6">
              No ritual steps recorded yet
            </p>
          )}

          {/* Add Step Button */}
          <Dialog open={isAddStepOpen} onOpenChange={setIsAddStepOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full border-[#8B6F47] text-[#1A1A1A] hover:bg-[#8B6F47]/10 font-['MedievalSharp'] mt-4"
                disabled={loading}
              >
                <FiPlus className="mr-2 h-4 w-4" />
                Add Ritual Step
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#F4E8D0] border-2 border-[#8B6F47]">
              <DialogHeader>
                <DialogTitle className="text-[#1A1A1A] font-['MedievalSharp']">
                  Add Ritual Step
                </DialogTitle>
                <DialogDescription className="text-[#4A4A4A]">
                  Define the next step in this sacred ritual
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-[#8B6F47] uppercase font-['MedievalSharp'] mb-2">
                    Step Name
                  </label>
                  <Input
                    placeholder="e.g., Prepare Altar, Gather Ingredients..."
                    value={newStepName}
                    onChange={(e) => setNewStepName(e.target.value)}
                    className="border-[#8B6F47] bg-white text-[#1A1A1A]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#8B6F47] uppercase font-['MedievalSharp'] mb-2">
                    Instructions (Optional)
                  </label>
                  <Textarea
                    placeholder="Add detailed instructions for this step..."
                    value={newStepNotes}
                    onChange={(e) => setNewStepNotes(e.target.value)}
                    className="border-[#8B6F47] bg-white text-[#1A1A1A]"
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  className="border-[#8B6F47] text-[#1A1A1A]"
                  onClick={() => {
                    setNewStepName("");
                    setNewStepNotes("");
                    setIsAddStepOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-[#8B6F47] hover:bg-[#6B5435] text-[#F4E8D0]"
                  onClick={handleAddStep}
                  disabled={!newStepName.trim() || loading}
                >
                  Add Step
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* Info Alert */}
      <Alert className="bg-[#2C5530]/10 border-[#2C5530]">
        <AlertDescription className="text-[#2C5530] text-sm">
          Upload photos or videos at each step to track the ritual's progress. The client can view updates
          in their dashboard.
        </AlertDescription>
      </Alert>
    </div>
  );
}
