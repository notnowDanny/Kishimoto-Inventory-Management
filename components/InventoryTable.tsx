'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Filter, Plus } from "lucide-react";
import { format } from "date-fns";

export function InventoryTable() {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", type: "", quantity: "" });
  const [items, setItems] = useState<
    { name: string; type: string; quantity: number; status: "In Stock" | "Low Stock" | "Out of Stock"; isEditable: boolean }[]
  >([]);
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [date, setDate] = useState<Date | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddItem = () => {
    const quantity = parseInt(newItem.quantity, 10);
    if (newItem.name && newItem.type && !isNaN(quantity)) {
      setItems([
        ...items,
        {
          name: newItem.name,
          type: newItem.type,
          quantity,
          status: quantity > 10 ? "In Stock" : quantity === 0 ? "Out of Stock" : "Low Stock",
          isEditable: false,
        },
      ]);
      setNewItem({ name: "", type: "", quantity: "" });
      setIsCardOpen(false);
    }
  };

  const toggleRowSelection = (index: number) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(index)) {
      // Unselect the row, reset any changes made during editing
      newSelectedRows.delete(index);
      if (isEditing) {
        const updatedItems = items.map((item, idx) => {
          if (idx === index) {
            return { ...item, isEditable: false }; // Reset editable state
          }
          return item;
        });
        setItems(updatedItems);
        setIsEditing(false); // Disable editing when unchecking
      }
    } else {
      newSelectedRows.add(index);
    }
    setSelectedRows(newSelectedRows);
  };

  const enableEditing = (index: number) => {
    // Only enable editing when selected and Edit is clicked
    if (selectedRows.has(index)) {
      setIsEditing(true);
      const updatedItems = items.map((item, idx) => ({
        ...item,
        isEditable: idx === index, // Only clicked row can be edited
      }));
      setItems(updatedItems);
    }
  };

  const handleEditChange = (index: number, field: "name" | "type" | "quantity", value: string) => {
    const updatedItems = [...items];
    const updatedItem = { ...updatedItems[index] };

    if (field === "quantity") {
      const quantity = parseInt(value, 10);
      updatedItem.quantity = isNaN(quantity) ? 0 : quantity;
      updatedItem.status = updatedItem.quantity > 10 ? "In Stock" : updatedItem.quantity === 0 ? "Out of Stock" : "Low Stock";
    } else {
      updatedItem[field] = value;
    }

    updatedItems[index] = updatedItem;
    setItems(updatedItems);
  };

  const handleSaveChanges = () => {
    setIsEditing(false);
    const updatedItems = items.map((item) => ({ ...item, isEditable: false }));
    setItems(updatedItems);
    setSelectedRows(new Set()); // Reset selected rows after saving
  };

  const handleCancel = () => {
    setIsEditing(false);
    const updatedItems = items.map((item) => ({ ...item, isEditable: false }));
    setItems(updatedItems);
    setSelectedRows(new Set()); // Reset selected rows after cancelling
  };

  const filteredItems = items.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Inventory</h1>
        <div className="flex gap-2">
          <Button onClick={() => setIsCardOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Items
          </Button>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Search by Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <CalendarIcon className="w-4 h-4 mr-2" />
              {date ? format(date, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Card for Adding New Items */}
      {isCardOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Add New Item</CardTitle>
              <CardDescription>Enter item details below.</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Name of the item"
                      value={newItem.name}
                      onChange={(e) =>
                        setNewItem({ ...newItem, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="type">Type</Label>
                    <Input
                      id="type"
                      placeholder="Type of the item"
                      value={newItem.type}
                      onChange={(e) =>
                        setNewItem({ ...newItem, type: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      placeholder="Enter quantity"
                      type="number"
                      value={newItem.quantity}
                      onChange={(e) =>
                        setNewItem({ ...newItem, quantity: e.target.value })
                      }
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setIsCardOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddItem}>Add Item</Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Items Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRows(new Set(items.map((_, i) => i)));
                    } else {
                      setSelectedRows(new Set()); // Reset selection on uncheck
                    }
                  }}
                />
              </TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedRows.has(index)}
                    onChange={() => toggleRowSelection(index)}
                  />
                </TableCell>
                <TableCell>
                  {item.isEditable ? (
                    <Input
                      value={item.name}
                      onChange={(e) => handleEditChange(index, "name", e.target.value)}
                    />
                  ) : (
                    item.name
                  )}
                </TableCell>
                <TableCell>
                  {item.isEditable ? (
                    <Input
                      value={item.type}
                      onChange={(e) => handleEditChange(index, "type", e.target.value)}
                    />
                  ) : (
                    item.type
                  )}
                </TableCell>
                <TableCell>
                  {item.isEditable ? (
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleEditChange(index, "quantity", e.target.value)}
                    />
                  ) : (
                    item.quantity
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant={item.status === "In Stock" ? "inStock" : item.status === "Low Stock" ? "lowStock" : "destructive"}>
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {isEditing && selectedRows.has(index) ? (
                    <>
                      <Button variant="outline" onClick={handleSaveChanges}>
                        Save
                      </Button>
                      <Button variant="outline" onClick={handleCancel}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button variant="outline" onClick={() => enableEditing(index)}>
                      Edit
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}