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
const mealTimes = ["breakfast", "lunch", "dinner"];

const MealManageByAdmin = () => {
  const { data: packagesData } = useGetPackagesQuery();
  const packages = packagesData?.data || [];

  const { data: mealsData, isLoading } = useGetMealsQuery();
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
      if (editingMealId) {
        await updateMeal({ id: editingMealId, data: payload }).unwrap();
      } else {
        await addMeal(payload as any).unwrap();
      }
      resetForm();
      alert(editingMealId ? "Meal updated successfully" : "Meal created successfully");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
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
    if (!confirm("Are you sure you want to delete this meal?")) return;
    try {
      await deleteMeal(id).unwrap();
      alert("Meal deleted successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to delete meal");
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

  return (
    <div className="p-6 min-w-8xl mx-auto space-y-8">
      {/* Add/Edit Meal Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingMealId ? "Edit Meal" : "Add New Meal"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Meal Name</Label>
                <Input
                  id="name"
                  placeholder="Meal name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Select
                  value={formData.time}
                  onValueChange={(value) =>
                    setFormData({ ...formData, time: value })
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Time" />
                  </SelectTrigger>
                  <SelectContent>
                    {mealTimes.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time.charAt(0).toUpperCase() + time.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="package">Package</Label>
                <Select
                  value={formData.foodPackage}
                  onValueChange={handlePackageChange}
                  required
                >
                  <SelectTrigger>
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
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: parseFloat(e.target.value) })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="delivery">Delivery Charges</Label>
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
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="availability">Available Day</Label>
                <Select
                  value={formData.availability}
                  onValueChange={(value) =>
                    setFormData({ ...formData, availability: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Day" />
                  </SelectTrigger>
                  <SelectContent>
                    {weekDays.map((day) => (
                      <SelectItem key={day} value={day}>
                        {day.charAt(0).toUpperCase() + day.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <Input
                  id="image"
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Ingredients</Label>
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
                      />
                    </div>
                    <div className="col-span-3">
                      <Input
                        placeholder="Quantity"
                        value={ing.quantity}
                        onChange={(e) =>
                          handleIngredientChange(i, "quantity", e.target.value)
                        }
                      />
                    </div>
                    <div className="col-span-3">
                      <Select
                        value={ing.unit}
                        onValueChange={(value) =>
                          handleIngredientChange(i, "unit", value)
                        }
                      >
                        <SelectTrigger>
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
              >
                Cancel
              </Button>
              <Button type="submit">
                {editingMealId ? "Update Meal" : "Create Meal"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Meals Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Meals</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <div className="space-y-6">
              {meals.map((pkg: any) => (
                <div key={pkg._id} className="space-y-4">
                  <h3 className="text-xl font-bold">{pkg.packageInfo.packageName}</h3>
                  <ScrollArea className="w-full whitespace-nowrap rounded-md border">
                    <Table className="min-w-[800px]">
                      <TableHeader>
                        <TableRow>
                          <TableHead>Day</TableHead>
                          <TableHead>Breakfast</TableHead>
                          <TableHead>Lunch</TableHead>
                          <TableHead>Dinner</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {weekDays.map((day) => (
                          <TableRow key={day}>
                            <TableCell className="font-medium capitalize min-w-[120px]">
                              {day}
                            </TableCell>
                            {mealTimes.map((time) => {
                              const meal = pkg.days[day]?.find(
                                (m: any) => m.time === time
                              );
                              return (
                                <TableCell key={time} className="min-w-[250px]">
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
                                    <div className="flex justify-end">
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => openAddMealModal(pkg._id, day, time)}
                                      >
                                        + Add {time}
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