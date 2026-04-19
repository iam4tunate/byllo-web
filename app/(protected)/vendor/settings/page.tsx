"use client";

import { Card } from "@/components";
import { Avatar, AvatarFallback } from "@/components/Avatar";
import { Button } from "@/components/Button";
import { Users, X, Edit2, Lock } from "lucide-react";
import { Input } from "@/components/Input";
import React, { useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "security">("profile");

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col max-md:items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-primary tracking-tight mb-2">
          Settings
        </h1>
        <p className="text-sm font-medium text-muted max-md:text-center">
          Manage your account preferences and security.
        </p>
      </div>

      <div className="flex gap-6 border-b border-surface-border">
        <button 
          onClick={() => setActiveTab("profile")}
          className={`pb-4 text-sm font-bold transition-all relative max-md:w-1/2 ${
            activeTab === "profile" 
              ? "text-brand" 
              : "text-ink-tertiary hover:text-ink-secondary"
          }`}
        >
          My Profile
          {activeTab === "profile" && (
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-brand rounded-t-full" />
          )}
        </button>
        <button 
          onClick={() => setActiveTab("security")}
          className={`pb-4 text-sm font-bold transition-all relative max-md:w-1/2 ${
            activeTab === "security" 
              ? "text-brand" 
              : "text-ink-tertiary hover:text-ink-secondary"
          }`}
        >
          Security & Password
          {activeTab === "security" && (
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-brand rounded-t-full" />
          )}
        </button>
      </div>

      {/* ── Tab Content ── */}
      <div className="pt-2">
        {activeTab === "profile" && <ProfileTab />}
        {activeTab === "security" && <SecurityTab />}
      </div>
    </div>
  );
}

function ProfileTab() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+234 812 345 6789",
    businessName: "JD Enterprises",
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
      {/* Avatar Section */}
      <div className="md:col-span-4 space-y-6">
        <Card className="p-6 flex flex-col items-center text-center relative">
           <div className="absolute top-0 left-0 w-full h-24 bg-linear-to-br from-brand/20 to-indigo-500/20" />
           <Avatar className="w-24 h-24 border-4 border-surface shadow-sm rounded-3xl relative z-10 mb-4 mt-8">
              <AvatarFallback className="bg-linear-to-br from-indigo-500 to-brand rounded-3xl">
                <span className="text-white text-2xl font-extrabold top-1">JD</span>
              </AvatarFallback>
           </Avatar>
           <h3 className="text-base md:text-lg font-bold text-primary">{formData.firstName} {formData.lastName}</h3>
           <p className="text-sm font-medium text-muted mt-1">{formData.email}</p>
           
           <Button variant="outline" className="w-full mt-6 border-surface-border shadow-none">
             Change Avatar
           </Button>
        </Card>
      </div>

      {/* Personal Info Section */}
      <Card className="md:col-span-8">
        <div className="p-6 border-b border-surface-border bg-surface-raised flex items-center justify-between">
           <div>
              <h3 className="font-bold text-primary flex items-center gap-2">
                <Users size={18} className="text-brand" strokeWidth={2.5} />
                Personal Information
              </h3>
              <p className="text-xs font-medium text-muted mt-1">Review and update your personal details.</p>
           </div>
           
           <button 
             onClick={() => setIsEditing(!isEditing)}
             className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
               isEditing ? "bg-brand text-white shadow-md shadow-brand/20" : "bg-surface text-ink-tertiary border border-surface-border hover:text-primary hover:bg-surface-raised"
             }`}
           >
             {isEditing ? <X size={18} /> : <Edit2 size={18} />}
           </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-primary uppercase tracking-widest block">First Name</label>
              <Input 
                value={formData.firstName} 
                onChange={e => setFormData({...formData, firstName: e.target.value})}
                disabled={!isEditing} 
                className={!isEditing ? "bg-surface-raised border-transparent text-ink-secondary font-bold" : "font-bold text-primary"}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-primary uppercase tracking-widest block">Last Name</label>
              <Input 
                value={formData.lastName} 
                onChange={e => setFormData({...formData, lastName: e.target.value})}
                disabled={!isEditing} 
                className={!isEditing ? "bg-surface-raised border-transparent text-ink-secondary font-bold" : "font-bold text-primary"}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-primary uppercase tracking-widest block">Email Address</label>
              <Input 
                value={formData.email} 
                onChange={e => setFormData({...formData, email: e.target.value})}
                disabled={!isEditing} 
                className={!isEditing ? "bg-surface-raised border-transparent text-ink-secondary font-bold" : "font-bold text-primary"}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-primary uppercase tracking-widest block">Phone Number</label>
              <Input 
                value={formData.phone} 
                onChange={e => setFormData({...formData, phone: e.target.value})}
                disabled={!isEditing} 
                className={!isEditing ? "bg-surface-raised border-transparent text-ink-secondary font-bold" : "font-bold text-primary"}
              />
            </div>
          </div>
          
          <div className="pt-2 border-t border-surface-border">
             <div className="space-y-2 mt-4">
              <label className="text-[13px] font-bold text-primary uppercase tracking-widest block">Business Name</label>
              <Input 
                value={formData.businessName} 
                onChange={e => setFormData({...formData, businessName: e.target.value})}
                disabled={!isEditing} 
                className={!isEditing ? "bg-surface-raised border-transparent text-ink-secondary font-bold" : "font-bold text-primary"}
              />
            </div>
          </div>
        </div>
        
        {isEditing && (
          <div className="px-8 py-5 border-t border-surface-border bg-surface-raised/50 flex justify-end gap-3 fade-in duration-200">
             <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
             <Button className="pl-4">
               Save Changes
             </Button>
          </div>
        )}
      </Card>
    </div>
  );
}

function SecurityTab() {
  return (
    <div className="max-w-3xl">
      <Card className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        <div className="p-6 border-b border-surface-border bg-surface-raised flex items-center justify-between">
           <div>
              <h3 className="font-bold text-primary flex items-center gap-2">
                <Lock size={18} className="text-brand" strokeWidth={2.5} />
                Change Password
              </h3>
              <p className="text-xs font-medium text-muted mt-1">Ensure your account is using a long, random password to stay secure.</p>
           </div>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-primary uppercase tracking-widest block">Current Password</label>
            <Input type="password" placeholder="••••••••" className="font-medium max-w-md" />
          </div>
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-primary uppercase tracking-widest block">New Password</label>
            <Input type="password" placeholder="••••••••" className="font-medium max-w-md" />
            <p className="text-[11px] font-bold text-muted mt-1">Minimum 8 characters long, uppercase & symbol.</p>
          </div>
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-primary uppercase tracking-widest block">Confirm New Password</label>
            <Input type="password" placeholder="••••••••" className="font-medium max-w-md" />
          </div>
        </div>
        
        <div className="px-8 py-5 border-t border-surface-border bg-surface-raised/50 flex justify-end">
           <Button>
             Update Password
           </Button>
        </div>
      </Card>
    </div>
  );
}
