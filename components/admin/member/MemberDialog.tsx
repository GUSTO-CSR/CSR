import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn, convertObjectToBase64 } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IMember } from "@/Schemas/MemberSchema";
import Image from "next/image";

interface MemberDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (member: Partial<IMember>) => void;
  member?: IMember;
}

const roleOptions = [
  "Founder",
  "Finance",
  "Content Writer",
  "Digital Graphic",
  "Volunteer Head",
  "Facilitator",
  "Volunteer",
  "Designer",
  "Developer",
];

export function MemberDialog({
  isOpen,
  onClose,
  onSave,
  member,
}: MemberDialogProps) {
  const [formData, setFormData] = useState<Partial<IMember>>({
    Name: "",
    Batch: "",
    Role: "Volunteer",
    Email: "",
    Photo: "",
    StartDate: new Date(),
    EndDate: undefined,
  });
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  useEffect(() => {
    if (member) {
      setFormData({
        ...member,
        StartDate: member.StartDate ? new Date(member.StartDate) : new Date(),
        EndDate: member.EndDate ? new Date(member.EndDate) : undefined,
      });
      setPhotoPreview(member.Photo || null);
    } else {
      setFormData({
        Name: "",
        Batch: "",
        Role: "Volunteer",
        Email: "",
        Photo: "",
        StartDate: new Date(),
        EndDate: undefined,
      });
      setPhotoPreview(null);
    }
  }, [member]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, Role: value as IMember["Role"] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData((prev) => ({ ...prev, Photo: base64String.split(",")[1] }));
        setPhotoPreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{member ? "Edit Member" : "New Member"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="photo" className="text-right">
                Photo
              </Label>
              <div className="col-span-3">
                {photoPreview && (
                  <div className="mb-2">
                    <Image
                      src={`data:image/png;base64,${convertObjectToBase64(
                        photoPreview
                      )}`}
                      alt="Member photo preview"
                      width={100}
                      height={100}
                      className="rounded-full object-cover"
                    />
                  </div>
                )}
                <Input
                  id="photo"
                  name="photo"
                  type="file"
                  onChange={handleFileChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="batch" className="text-right">
                Batch
              </Label>
              <Input
                id="batch"
                name="Batch"
                value={formData.Batch}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Select
                name="Role"
                value={formData.Role}
                onValueChange={handleRoleChange}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {roleOptions.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="Email"
                type="email"
                value={formData.Email}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dateRange" className="text-right">
                Date Range
              </Label>
              <div className="col-span-3 flex flex-col gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !formData.StartDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.StartDate ? (
                        format(formData.StartDate, "PPP")
                      ) : (
                        <span>Start date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.StartDate}
                      onSelect={(date) =>
                        setFormData((prev) => ({
                          ...prev,
                          StartDate: date || new Date(),
                        }))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !formData.EndDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.EndDate ? (
                        format(formData.EndDate, "PPP")
                      ) : (
                        <span>End date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.EndDate || undefined}
                      onSelect={(date) =>
                        setFormData((prev) => ({ ...prev, EndDate: date }))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
