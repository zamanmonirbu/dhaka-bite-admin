"use client";

import React, { useState } from "react";
import {
  useGetMealsQuery,
  useAddMealMutation,
  useUpdateMealMutation,
  useDeleteMealMutation,
} from "@/lib/features/meal/mealApi";
import { useGetPackagesQuery } from "@/lib/features/package/packageApi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

const defaultIngredient = { name: "", quantity: "", unit: "g" };
const unitOptions = ["g", "kg", "ml", "l", "pcs"];
const weekDays = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];
const mealTimes = ["lunch", "dinner"];

const MealManageByAdmin = () => {
  const { toast } = useToast();

  // Alert state for fallback messaging
  const [alert, setAlert] = useState<{
    type: 'success' | 'error';
    message: string;
    show: boolean;
  }>({ type: 'success', message: '', show: false });

  const { data: packagesData, isError: packagesError } = useGetPackagesQuery();
  const packages = packagesData?.data || [];

  const { data: mealsData, isLoading, isError: mealsError } = useGetMealsQuery();
  const meals = mealsData?.data || [];

  const [editingMealId, setEditingMealId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [prefilledData, setPrefilledData] = useState({
    foodPackage: "",
    availability: "",
    time: "",
  });
  const [formData, setFormData] = useState<any>(getInitialFormState());

  const [addMeal] = useAddMealMutation();
  const [updateMeal] = useUpdateMealMutation();
  const [deleteMeal] = useDeleteMealMutation();

  // Show error toasts for API errors
  React.useEffect(() => {
    if (packagesError) {
      const message = "Failed to load packages";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      setAlert({
        type: 'error',
        message: message,
        show: true
      });
    }
    if (mealsError) {
      const message = "Failed to load meals";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      setAlert({
        type: 'error',
        message: message,
        show: true
      });
    }
  }, [packagesError, mealsError, toast]);

  function getInitialFormState() {
    return {
      name: "",
      time: "",
      foodPackage: "",
      description: "",
      image: null,
      ingredients: [defaultIngredient],
      price: 0,
      availability: "sunday",
      deliveryCharges: 0,
    };
  }

  const handleIngredientChange = (index: number, field: string, value: string) => {
    const updated = [...formData.ingredients];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, ingredients: updated });
  };

  const handlePackageChange = (id: string) => {
    const selectedPkg = packages.find((pkg) => pkg._id === id);
    setFormData({
      ...formData,
      foodPackage: id,
      price: selectedPkg?.discountedPrice || 0,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const resetForm = () => {
    setFormData(getInitialFormState());
    setEditingMealId(null);
    setIsAddModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "ingredients") {
        payload.append("ingredients", JSON.stringify(value));
      } else if (key === "image" && value) {
        payload.append("image", value);
      } else if (value !== null && value !== undefined) {
        payload.append(key, value as any);
      }
    });

    try {
      let response;
      if (editingMealId) {
        response = await updateMeal({ id: editingMealId, data: payload }).unwrap();
        const message = response.message || "Meal updated successfully";
        toast({
          title: "Success",
          description: message,
          className: "bg-green-500 text-white",
        });
        setAlert({
          type: 'success',
          message: message,
          show: true
        });
      } else {
        response = await addMeal(payload as any).unwrap();
        const message = response.message || "Meal created successfully";
        toast({
          title: "Success",
          description: message,
          className: "bg-green-500 text-white",
        });
        setAlert({
          type: 'success',
          message: message,
          show: true
        });
      }
      resetForm();
    } catch (err: any) {
      const message = err.data?.message || err.message || "Something went wrong";
      console.error("Submission error:", err);
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      setAlert({
        type: 'error',
        message: message,
        show: true
      });
    }
  };

  const handleEdit = (meal: any) => {
    setEditingMealId(meal._id);
    setFormData({
      ...meal,
      ingredients: meal.ingredients || [defaultIngredient],
      image: null,
    });
    setIsAddModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteMeal(id).unwrap();
      const message = response.message || "Meal deleted successfully";
      toast({
        title: "Success",
        description: message,
        className: "bg-green-500 text-white",
      });
      setAlert({
        type: 'success',
        message: message,
        show: true
      });
    } catch (err: any) {
      const message = err.data?.message || err.message || "Failed to delete meal";
      console.error("Delete error:", err);
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      setAlert({
        type: 'error',
        message: message,
        show: true
      });
    }
  };

  const openAddMealModal = (pkgId: string, day: string, time: string) => {
    setPrefilledData({
      foodPackage: pkgId,
      availability: day,
      time: time,
    });
    setFormData({
      ...getInitialFormState(),
      foodPackage: pkgId,
      availability: day,
      time: time,
    });
    setEditingMealId(null);
    setIsAddModalOpen(true);
  };

  const renderMealDetails = (meal: any) => {
    return (
      <div className="space-y-1 text-sm">
        <div className="font-medium">{meal.name}</div>
        <div>${meal.price.toFixed(2)}</div>
        {meal.description && (
          <div className="text-gray-500 line-clamp-2">{meal.description}</div>
        )}
        {meal.ingredients?.length > 0 && (
          <div className="mt-1">
            <div className="font-medium text-xs">Ingredients:</div>
            <ul className="list-disc list-inside">
              {meal.ingredients.map((ing: any, i: number) => (
                <li key={i} className="text-xs">
                  {ing.name} - {ing.quantity} {ing.unit}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  const getTimeBgColor = (time: string) => {
    return time === "lunch"
      ? "bg-amber-50 hover:bg-amber-100"
      : "bg-blue-50 hover:bg-blue-100";
  };

  const getTimeTextColor = (time: string) => {
    return time === "lunch" ? "text-amber-800" : "text-blue-800";
  };

  const getAddButtonVariant = (time: string) => {
    return time === "lunch" ? "outline" : "default";
  };


  return (
    <div className="p-6 min-w-8xl mx-auto space-y-8">
      {/* Add/Edit Meal Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {editingMealId ? "Edit Meal" : "Add New Meal"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="font-medium">Meal Name</Label>
                <Input
                  id="name"
                  placeholder="Meal name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="focus-visible:ring-2"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time" className="font-medium">Time</Label>
                <Select
                  value={formData.time}
                  onValueChange={(value) =>
                    setFormData({ ...formData, time: value })
                  }
                  required
                >
                  <SelectTrigger className="focus-visible:ring-2">
                    <SelectValue placeholder="Select Time" />
                  </SelectTrigger>
                  <SelectContent>
                    {mealTimes.map((time) => (
                      <SelectItem key={time} value={time} className="capitalize">
                        {time.charAt(0).toUpperCase() + time.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="package" className="font-medium">Package</Label>
                <Select
                  value={formData.foodPackage}
                  onValueChange={handlePackageChange}
                  required
                >
                  <SelectTrigger className="focus-visible:ring-2">
                    <SelectValue placeholder="Select Package" />
                  </SelectTrigger>
                  <SelectContent>
                    {packages.map((pkg) => (
                      <SelectItem key={pkg._id} value={pkg._id}>
                        {pkg.packageName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price" className="font-medium">Price</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: parseFloat(e.target.value) })
                  }
                  required
                  className="focus-visible:ring-2"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="delivery" className="font-medium">Delivery Charges</Label>
                <Input
                  id="delivery"
                  type="number"
                  placeholder="Delivery Charges"
                  value={formData.deliveryCharges}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      deliveryCharges: parseFloat(e.target.value),
                    })
                  }
                  className="focus-visible:ring-2"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="availability" className="font-medium">Available Day</Label>
                <Select
                  value={formData.availability}
                  onValueChange={(value) =>
                    setFormData({ ...formData, availability: value })
                  }
                >
                  <SelectTrigger className="focus-visible:ring-2">
                    <SelectValue placeholder="Select Day" />
                  </SelectTrigger>
                  <SelectContent>
                    {weekDays.map((day) => (
                      <SelectItem key={day} value={day} className="capitalize">
                        {day.charAt(0).toUpperCase() + day.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description" className="font-medium">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                  className="focus-visible:ring-2 min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image" className="font-medium">Image</Label>
                <Input
                  id="image"
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="focus-visible:ring-2"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-medium">Ingredients</Label>
              <div className="space-y-2">
                {formData.ingredients.map((ing: any, i: number) => (
                  <div key={i} className="grid grid-cols-12 gap-2 items-center">
                    <div className="col-span-5">
                      <Input
                        placeholder="Name"
                        value={ing.name}
                        onChange={(e) =>
                          handleIngredientChange(i, "name", e.target.value)
                        }
                        className="focus-visible:ring-2"
                      />
                    </div>
                    <div className="col-span-3">
                      <Input
                        placeholder="Quantity"
                        value={ing.quantity}
                        onChange={(e) =>
                          handleIngredientChange(i, "quantity", e.target.value)
                        }
                        className="focus-visible:ring-2"
                      />
                    </div>
                    <div className="col-span-3">
                      <Select
                        value={ing.unit}
                        onValueChange={(value) =>
                          handleIngredientChange(i, "unit", value)
                        }
                      >
                        <SelectTrigger className="focus-visible:ring-2">
                          <SelectValue placeholder="Unit" />
                        </SelectTrigger>
                        <SelectContent>
                          {unitOptions.map((u) => (
                            <SelectItem key={u} value={u}>
                              {u}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-1">
                      {i > 0 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => {
                            const updated = [...formData.ingredients];
                            updated.splice(i, 1);
                            setFormData({ ...formData, ingredients: updated });
                          }}
                        >
                          ×
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-dashed"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      ingredients: [...formData.ingredients, defaultIngredient],
                    })
                  }
                >
                  + Add Ingredient
                </Button>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => resetForm()}
                className="border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700"
              >
                {editingMealId ? "Update Meal" : "Create Meal"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Meals Table */}
      <Card className="border shadow-sm">
        <CardHeader className="bg-gray-50 rounded-t-lg">
          <CardTitle className="text-xl font-semibold">All Meals</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
            </div>
          ) : meals.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <p className="text-gray-500 text-lg">No meals available yet.</p>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => setIsAddModalOpen(true)}
              >
                + Add First Meal
              </Button>
            </div>
          ) : (
            <div className="space-y-6 p-4">
              {meals.map((pkg: any) => (
                <div key={pkg._id} className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    {pkg.packageInfo.packageName}
                  </h3>
                  <ScrollArea className="w-full whitespace-nowrap rounded-md border">
                    <Table className="min-w-[700px]">
                      <TableHeader className="bg-gray-100">
                        <TableRow>
                          <TableHead className="w-[120px] font-semibold text-gray-700">Day</TableHead>
                          <TableHead className="font-semibold text-gray-700">Lunch</TableHead>
                          <TableHead className="font-semibold text-gray-700">Dinner</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {weekDays.map((day) => (
                          <TableRow key={day} className="hover:bg-gray-50">
                            <TableCell className="font-medium capitalize text-gray-700">
                              {day.charAt(0).toUpperCase() + day.slice(1)}
                            </TableCell>
                            {mealTimes.map((time) => {
                              const meal = pkg.days[day]?.find(
                                (m: any) => m.time === time
                              );
                              return (
                                <TableCell
                                  key={time}
                                  className={`${getTimeBgColor(time)} border`}
                                >
                                  {meal ? (
                                    <div className="flex justify-between items-start gap-4">
                                      <div className="flex-1">
                                        {renderMealDetails(meal)}
                                      </div>
                                      <div className="flex gap-1">
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Button
                                              size="sm"
                                              variant="outline"
                                              className="hover:bg-gray-200"
                                              onClick={() => handleEdit(meal)}
                                            >
                                              Edit
                                            </Button>
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            Edit {meal.name}
                                          </TooltipContent>
                                        </Tooltip>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Button
                                              size="sm"
                                              variant="destructive"
                                              onClick={() => handleDelete(meal._id)}
                                            >
                                              Delete
                                            </Button>
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            Delete {meal.name}
                                          </TooltipContent>
                                        </Tooltip>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="flex justify-center">
                                      <Button
                                        size="sm"
                                        variant={getAddButtonVariant(time)}
                                        className={`${time === 'lunch' ? 'bg-amber-500 hover:bg-amber-600' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
                                        onClick={() => openAddMealModal(pkg._id, day, time)}
                                      >
                                        + Add {time.charAt(0).toUpperCase() + time.slice(1)}
                                      </Button>
                                    </div>
                                  )}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                </div>
              ))}
            </div>
          )}
        </CardContent>

      </Card>



    </div>
  );
};

export default MealManageByAdmin;