import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import fallback from "../../assets/fallback.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate, TELANGANA_DISTRICTS } from "@/constants/helper";
function EmployeeForm({ initialData, onSubmit }) {
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [state, setState] = useState("");
  const [active, setActive] = useState(true);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (initialData) {
      setId(initialData.id || null);
      setEmail(initialData.email || "");
      setName(initialData.full_name || "");
      setGender(initialData.gender || "");
      setDob(initialData.dob || "");
      setState(initialData.state || "");
      setActive(initialData.is_active ?? true);
      setPreview(initialData.image_url || null);
    }
  }, [initialData]);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };
  const handleSubmit = () => {
    if (!name || !gender || !dob || !state || !email) {
      setError("All fields are required");
      return;
    }

    setError("");

    const formData = new FormData();
    formData.append("id",id);
    formData.append("email", email);
    formData.append("name", name);
    formData.append("gender", gender);
    formData.append("dob", dob);
    formData.append("state", state);
    formData.append("active", active);

    if (image) {
      formData.append("image", image); // File object
    }

    onSubmit(formData);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <img
          src={preview || fallback}
          alt="Preview"
          className="h-40 w-40 rounded-full"
          lazy
        />
      </div>

      <Input
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Select value={gender} onValueChange={setGender}>
        <SelectTrigger>
          <SelectValue placeholder="Select Gender" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="M">Male</SelectItem>
          <SelectItem value="F">Female</SelectItem>
          <SelectItem value="O">Others</SelectItem>
        </SelectContent>
      </Select>

      <Select value={state} onValueChange={setState}>
        <SelectTrigger className="md:w-100">
          <SelectValue placeholder="Select State" />
        </SelectTrigger>
        <SelectContent>
          {TELANGANA_DISTRICTS.map((state, index) => (
            <SelectItem value={state} key={index}>
              {state}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex items-center justify-between">
        <Input
          type="date"
          className="w-min"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />

        <span>Activate or InActivate? </span>
        <Switch checked={active} onCheckedChange={setActive} />
      </div>

      <div>
        <Input type="file" onChange={handleImageChange} />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <Button className="w-full" onClick={handleSubmit}>
        Save Employee
      </Button>
    </div>
  );
}

export default EmployeeForm;
