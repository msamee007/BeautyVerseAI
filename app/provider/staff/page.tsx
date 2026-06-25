"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Mock Data
const STAFF_MEMBERS = [
  {
    id: "EMP-1024",
    name: "Amit Kumar",
    role: "Senior Barber & Fade Specialist",
    efficiency: "98%",
    revenue_mtd: "₹84,500",
    appointments_completed: 142,
    qualifications: ["Vidal Sassoon Masterclass '22", "L'Oréal Pro Colorist"],
    reviews: {
      rating: 4.9,
      total: 86,
      latest: "Amit gave me the sharpest fade I've ever had. Highly recommend!",
      sentiment: "Highly Positive"
    },
    shift: "9:00 AM - 5:00 PM",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "EMP-2089",
    name: "Sneha M.",
    role: "Color & Chemical Treatment Specialist",
    efficiency: "92%",
    revenue_mtd: "₹1,12,000",
    appointments_completed: 48,
    qualifications: ["Wella Master Color Expert", "Keratin Certified Professional"],
    reviews: {
      rating: 4.7,
      total: 54,
      latest: "Sneha completely transformed my damaged hair. A bit of a wait, but worth it.",
      sentiment: "Positive / Minor Operational Delay"
    },
    shift: "11:00 AM - 8:00 PM",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
  }
];

export default function StaffPage() {
  const [staffList, setStaffList] = useState(STAFF_MEMBERS);
  const [selectedStaff, setSelectedStaff] = useState<typeof STAFF_MEMBERS[0] | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", role: "", shift: "", certifications: "" });

  const openEditModal = (staff: typeof STAFF_MEMBERS[0]) => {
    setSelectedStaff(staff);
    setEditForm({ 
      name: staff.name, 
      role: staff.role, 
      shift: staff.shift, 
      certifications: staff.qualifications.join(", ") 
    });
    setIsEditing(true);
  };

  const openAddModal = () => {
    setSelectedStaff(null);
    setEditForm({ name: "", role: "", shift: "", certifications: "" });
    setIsEditing(true);
  };

  const handleSave = () => {
    const parsedCertifications = editForm.certifications 
      ? editForm.certifications.split(",").map(c => c.trim()).filter(Boolean)
      : ["No Certifications Listed"];

    if (selectedStaff) {
      // Edit existing
      setStaffList(staffList.map(s => 
        s.id === selectedStaff.id 
          ? { ...s, name: editForm.name, role: editForm.role, shift: editForm.shift, qualifications: parsedCertifications } 
          : s
      ));
    } else {
      // Add new
      const newStaff = {
        id: `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
        name: editForm.name || "New Employee",
        role: editForm.role || "Stylist",
        efficiency: "N/A",
        revenue_mtd: "₹0",
        appointments_completed: 0,
        qualifications: parsedCertifications,
        reviews: {
          rating: 0,
          total: 0,
          latest: "No reviews yet.",
          sentiment: "Neutral"
        },
        shift: editForm.shift || "TBD",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
      };
      setStaffList([newStaff, ...staffList]);
    }
    setIsEditing(false);
  };

  return (
    <div className="space-y-8 max-w-6xl flex flex-col min-h-screen pb-12 relative">
      <div className="flex-1">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 tracking-tight">Staff Management</h1>
            <p className="text-muted-foreground">Detailed analytics, qualifications, and performance for your team.</p>
          </div>
          <button 
            onClick={openAddModal}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-bold"
          >
            + Add Staff
          </button>
        </div>
        
        <div className="space-y-8">
          {staffList.map((staff) => (
            <div key={staff.id} className="bg-card border border-border rounded-3xl p-6 shadow-sm overflow-hidden relative">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* ID & Profile Section */}
                <div className="lg:col-span-3 flex flex-col items-center justify-center p-4 bg-muted/30 rounded-2xl border border-border relative">
                  <span className="absolute top-3 left-4 text-xs font-bold text-muted-foreground tracking-widest">ID: {staff.id}</span>
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4 mt-6 border-4 border-background shadow-md">
                    <img src={staff.image} alt={staff.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-bold text-center">{staff.name}</h3>
                  <p className="text-xs text-primary font-bold text-center mt-1 uppercase tracking-wider">{staff.role}</p>
                  
                  <button 
                    onClick={() => openEditModal(staff)}
                    className="mt-6 w-full py-2 border border-border bg-background hover:border-primary hover:text-primary rounded-lg text-sm font-bold transition-all"
                  >
                    Edit ID / Profile
                  </button>
                </div>

                {/* Analytics & Reviews */}
                <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Analytics */}
                  <div className="space-y-4">
                    <h4 className="font-bold flex items-center gap-2">📊 Performance Analytics</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-background border border-border p-4 rounded-xl">
                        <p className="text-xs text-muted-foreground mb-1">AI Efficiency Rating</p>
                        <p className="text-2xl font-bold text-green-600">{staff.efficiency}</p>
                      </div>
                      <div className="bg-background border border-border p-4 rounded-xl">
                        <p className="text-xs text-muted-foreground mb-1">Revenue (MTD)</p>
                        <p className="text-2xl font-bold">{staff.revenue_mtd}</p>
                      </div>
                      <div className="bg-background border border-border p-4 rounded-xl col-span-2">
                        <p className="text-xs text-muted-foreground mb-1">Appointments Completed</p>
                        <div className="flex items-end justify-between">
                          <p className="text-2xl font-bold">{staff.appointments_completed}</p>
                          <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded">Top 10% in Salon</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Reviews & Qualifications */}
                  <div className="space-y-4">
                    <h4 className="font-bold flex items-center gap-2">⭐ Reviews & Qualifications</h4>
                    <div className="bg-background border border-border p-4 rounded-xl min-h-[100px] flex flex-col justify-center">
                      {staff.reviews.total > 0 ? (
                        <>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[#D4AF37] font-bold text-lg">★ {staff.reviews.rating}</span>
                            <span className="text-xs text-muted-foreground">({staff.reviews.total} reviews)</span>
                          </div>
                          <p className="text-sm italic text-muted-foreground mb-2">"{staff.reviews.latest}"</p>
                          <span className="text-[10px] self-start bg-primary/10 text-primary font-bold uppercase tracking-widest px-2 py-1 rounded">
                            AI Sentiment: {staff.reviews.sentiment}
                          </span>
                        </>
                      ) : (
                        <div className="text-center py-2 space-y-1">
                          <p className="text-sm font-bold text-amber-600 dark:text-amber-400">⭐ Reviews Pending</p>
                          <p className="text-xs text-muted-foreground">Reviews will be unlocked automatically after the staff member's first completed shift.</p>
                        </div>
                      )}
                    </div>

                    <div className="bg-background border border-border p-4 rounded-xl">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">Certifications</p>
                      <ul className="space-y-1">
                        {staff.qualifications.map((qual, idx) => (
                          <li key={idx} className="text-sm flex items-center gap-2">
                            <span className="text-primary">✓</span> {qual}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-card border border-border rounded-3xl p-6 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">{selectedStaff ? `Edit Staff ID: ${selectedStaff.id}` : "Add New Staff"}</h3>
                <button onClick={() => setIsEditing(false)} className="text-muted-foreground hover:text-foreground">✕</button>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-bold">Full Name</label>
                  <input 
                    type="text" 
                    value={editForm.name} 
                    onChange={e => setEditForm({...editForm, name: e.target.value})}
                    className="w-full bg-background border border-border rounded-lg px-4 py-2 outline-none focus:border-primary text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-bold">Role / Title</label>
                  <input 
                    type="text" 
                    value={editForm.role} 
                    onChange={e => setEditForm({...editForm, role: e.target.value})}
                    className="w-full bg-background border border-border rounded-lg px-4 py-2 outline-none focus:border-primary text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-bold">Shift Timings</label>
                  <input 
                    type="text" 
                    value={editForm.shift} 
                    onChange={e => setEditForm({...editForm, shift: e.target.value})}
                    className="w-full bg-background border border-border rounded-lg px-4 py-2 outline-none focus:border-primary text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-bold flex items-center gap-2">
                    Certifications <span className="text-xs text-muted-foreground font-normal">(Optional)</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. L'Oréal Colorist, Master Barber"
                    value={editForm.certifications} 
                    onChange={e => setEditForm({...editForm, certifications: e.target.value})}
                    className="w-full bg-background border border-border rounded-lg px-4 py-2 outline-none focus:border-primary text-sm"
                  />
                  <p className="text-[10px] text-muted-foreground mt-1">Separate multiple entries with commas</p>
                </div>
                
                <div className="pt-4 border-t border-border mt-6">
                  <button onClick={handleSave} className="w-full bg-foreground text-background font-bold py-3 rounded-xl hover:bg-primary transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Dynamic Technical Disclaimer */}
      <p className="text-center text-xs text-muted-foreground mt-16 pt-6 border-t border-border opacity-70">
        Staff schedules, reviews, and efficiency metrics are AI-optimized based on historical peak hours and scraped customer feedback. BeautyVerse AI can make mistakes. Verify important shift and payroll info directly with your team.
      </p>
    </div>
  );
}
