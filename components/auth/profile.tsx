"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Upload } from "lucide-react"
import Image from "next/image"

interface ProfileData {
  firstName: string
  lastName: string
  email: string
  password: string
  age: string
  bio: string
  profilePhoto: string | null
  height: string
  weight: string
  emergencyContact: string
  country: string
  state: string
  consentToShare: boolean
}
type UserProps = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null | undefined;
};
export default function Profile({ user }: { user: UserProps }) {
  // Split full name into first and last
  const [firstName, lastName] = user.name
    ? user.name.split(" ")
    : ["", ""];
  const [formData, setFormData] = useState<ProfileData>({
    firstName: firstName,
    lastName: lastName,
    email: user.email,
    password: "",
    age: "--",
    bio: "I love cookies and ",
    profilePhoto: user.image || "CN",
    height: "--",
    weight: "--",
    emergencyContact: "--",
    country: "--",
    state: "--",
    consentToShare: false,
  })

  const [isEditing, setIsEditing] = useState(false)
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null)
  const [showConsentDialog, setShowConsentDialog] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      if (name === "consentToShare" && !formData.consentToShare) {
        setShowConsentDialog(true)
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: (e.target as HTMLInputElement).checked,
        }))
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleConsentConfirm = () => {
    setFormData((prev) => ({
      ...prev,
      consentToShare: true,
    }))
    setShowConsentDialog(false)
  }

  const handleConsentCancel = () => {
    setShowConsentDialog(false)
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewPhoto(reader.result as string)
        setFormData((prev) => ({
          ...prev,
          profilePhoto: reader.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    console.log("Profile saved:", formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setPreviewPhoto(null)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-4 rounded-none">
      <div className="mb-3">
        <h1 className="text-2xl font-bold text-foreground mb-2">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your profile information</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 font-mono">
        {/* Main Form Section */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-6 border border-border bg-card">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
                  <Input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="bg-input border-border text-foreground disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                  <Input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="bg-input border-border text-foreground disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="bg-input border-border text-foreground disabled:opacity-50"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Your email address is used for account recovery and notifications
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Password</label>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="••••••••"
                  className="bg-input border-border text-foreground disabled:opacity-50"
                />
                <p className="text-xs text-muted-foreground mt-1">Leave blank to keep your current password</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Age</label>
                <Input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="bg-input border-border text-foreground disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
                <Textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Tell us about yourself..."
                  className="bg-input border-border text-foreground disabled:opacity-50 min-h-24"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  You can @mention other users and organizations to link to them
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Height (cm)</label>
                  <Input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="bg-input border-border text-foreground disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Weight (kg)</label>
                  <Input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="bg-input border-border text-foreground disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Emergency Contact Number</label>
                <Input
                  type="tel"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="bg-input border-border text-foreground disabled:opacity-50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Country</label>
                  <Input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="bg-input border-border text-foreground disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">State</label>
                  <Input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="bg-input border-border text-foreground disabled:opacity-50"
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Profile Photo Section */}
        <div className="lg:col-span-1 flex flex-col gap-4">
          <Card className="p-6 border border-border bg-card">
            <h2 className="text-lg  text-foreground mb-4">Profile picture</h2>
            <div className="relative mb-4">
              <div className="relative w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-border bg-muted">
                {formData.profilePhoto && (
                  <Image
                    src={formData.profilePhoto || "/placeholder.svg"}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors">
                  <Upload size={20} />
                  <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                </label>
              )}
            </div>
            {isEditing && (
              <p className="text-xs text-muted-foreground text-center">
                Click the upload button to change your profile picture
              </p>
            )}
          </Card>

          <Card className="p-4 border border-border bg-card">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="consentToShare"
                name="consentToShare"
                checked={formData.consentToShare}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="mt-1 w-4 h-4 rounded border-border cursor-pointer disabled:opacity-50"
              />
              <label htmlFor="consentToShare" className="text-sm text-foreground cursor-pointer">
                I consent to my personal data being shared with the agent for improved service delivery and
                personalization
              </label>
            </div>
          </Card>

          <Card className="p-4 border border-border bg-card">
            <div className="flex flex-col gap-2">
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button
                    onClick={handleSave}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Save Changes
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    className="w-full border-border text-foreground hover:bg-muted bg-transparent"
                  >
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </Card>
        </div>
      </div>

      {showConsentDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md border border-border bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">Confirm Data Sharing Consent</h3>
            <p className="text-sm text-muted-foreground mb-6">
              By checking this box, you consent to your personal data (name, email, age, bio, physical information,
              location, and emergency contact) being shared with the agent for improved service delivery and
              personalization. This data will be handled securely and in accordance with our privacy policy.
            </p>
            <div className="flex gap-3">
              <Button
                onClick={handleConsentCancel}
                variant="outline"
                className="flex-1 border-border text-foreground hover:bg-muted bg-transparent"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConsentConfirm}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                I Agree
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
