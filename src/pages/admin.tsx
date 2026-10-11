import { useEffect, useState } from "react";
import { LockKeyhole, Save, LogOut, Plus, Trash2, ExternalLink, ShieldCheck, Download, Key, AlertCircle, RotateCcw } from "lucide-react";
import { usePortfolioContent } from "@/components/PortfolioProvider";
import type { PortfolioContent, EducationItem, CertificationItem, ProjectItem } from "@/lib/portfolio-config";

const ADMIN_PASSWORD_KEY = 'portfolio_admin_password';
const DEFAULT_PASSWORD = 'admin123';
const SESSION_KEY = 'portfolio_admin_session';

function Field({ label, value, onChange, multiline = false, type = "text" }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  type?: string;
}) {
  const className = "w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-800 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100";
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-gray-500">{label}</span>
      {multiline ? (
        <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={3} className={`${className} resize-y`} />
      ) : (
        <input type={type} autoComplete={type === "password" ? "current-password" : undefined} value={value} onChange={(event) => onChange(event.target.value)} className={className} />
      )}
    </label>
  );
}

function Panel({ title, description, children, action }: { title: string; description: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="mb-5 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-lg font-bold text-gray-800">{title}</h2>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
      {children}
    </section>
  );
}

function Login({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(ADMIN_PASSWORD_KEY);
    if (!stored) {
      setIsFirstTime(true);
    }
  }, []);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    const stored = localStorage.getItem(ADMIN_PASSWORD_KEY);
    const validPassword = stored || DEFAULT_PASSWORD;
    
    if (password === validPassword) {
      localStorage.setItem(SESSION_KEY, 'true');
      onLogin();
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  const setNewPassword = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    if (password.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }
    localStorage.setItem(ADMIN_PASSWORD_KEY, password);
    localStorage.setItem(SESSION_KEY, 'true');
    onLogin();
  };

  if (isFirstTime) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 px-5 py-20">
        <div className="mx-auto max-w-md rounded-3xl border border-gray-200 bg-white p-7 shadow-xl sm:p-10">
          <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 shadow-lg shadow-teal-200">
            <Key className="h-7 w-7 text-white" />
          </div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-teal-600">Tarun's Portfolio</p>
          <h1 className="text-3xl font-bold text-gray-900">First-time Setup</h1>
          <p className="mt-2 text-sm leading-relaxed text-gray-500">Set a password to secure your admin panel.</p>
          <form onSubmit={setNewPassword} className="mt-7 space-y-4">
            <Field label="New admin password" value={password} onChange={setPassword} type={showPassword ? "text" : "password"} />
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" checked={showPassword} onChange={(e) => setShowPassword(e.target.checked)} className="rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
                Show password
              </label>
            </div>
            {error && <p className="rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-600">{error}</p>}
            <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-3 font-bold text-white shadow-lg shadow-teal-200 transition hover:bg-teal-700">
              <LockKeyhole className="h-4 w-4" /> Set password & enter
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 px-5 py-20">
      <div className="mx-auto max-w-md rounded-3xl border border-gray-200 bg-white p-7 shadow-xl sm:p-10">
        <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 shadow-lg shadow-teal-200">
          <LockKeyhole className="h-7 w-7 text-white" />
        </div>
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-teal-600">Tarun's Portfolio</p>
        <h1 className="text-3xl font-bold text-gray-900">Admin panel</h1>
        <p className="mt-2 text-sm leading-relaxed text-gray-500">Sign in to update your portfolio content.</p>
        <form onSubmit={submit} className="mt-7 space-y-4">
          <input type="text" name="username" autoComplete="username" tabIndex={-1} aria-hidden="true" className="hidden" />
          <Field label="Admin password" value={password} onChange={setPassword} type={showPassword ? "text" : "password"} />
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input type="checkbox" checked={showPassword} onChange={(e) => setShowPassword(e.target.checked)} className="rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
              Show password
            </label>
          </div>
          {error && <p className="rounded-xl bg-red-50 px-3 py-2 text-sm font-medium text-red-600">{error}</p>}
          <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-3 font-bold text-white shadow-lg shadow-teal-200 transition hover:bg-teal-700">
            <LockKeyhole className="h-4 w-4" /> Sign in
          </button>
        </form>
      </div>
    </main>
  );
}

function AdminDashboard() {
  const { content, updateContent, setDraft, draft } = usePortfolioContent();
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [showDraftBanner, setShowDraftBanner] = useState(false);

  // Initialize draft from localStorage or content
  const [draftState, setDraftState] = useState<PortfolioContent>(() => draft || content);

  // Sync draftState with draft prop (from localStorage on load)
  useEffect(() => {
    if (draft && draft !== draftState) {
      setDraftState(draft);
    }
  }, [draft]);

  // Auto-save draft to localStorage on any change
  useEffect(() => {
    setDraft(draftState);
  }, [draftState, setDraft]);

  const updateProfile = (key: keyof PortfolioContent["profile"], value: string) => {
    setDraftState((current) => ({ ...current, profile: { ...current.profile, [key]: value } }));
  };
  const updateSocial = (key: keyof PortfolioContent["social"], value: string) => {
    setDraftState((current) => ({ ...current, social: { ...current.social, [key]: value } }));
  };
  const updateEducation = (index: number, key: keyof EducationItem, value: string) => {
    setDraftState((current) => ({ ...current, education: current.education.map((item, i) => i === index ? { ...item, [key]: value } : item) }));
  };
  const updateCertification = (index: number, key: keyof CertificationItem, value: string) => {
    setDraftState((current) => ({ ...current, certifications: current.certifications.map((item, i) => {
      if (i !== index) return item;
      if (key === "documentPages") {
        return { ...item, [key]: value.split(",").map((n) => parseInt(n.trim(), 10)).filter((n) => !isNaN(n)) };
      }
      return { ...item, [key]: value };
    }) }));
  };
  const updateProject = (index: number, key: keyof ProjectItem, value: string) => {
    setDraftState((current) => ({ ...current, projects: current.projects.map((item, i) => i === index ? { ...item, [key]: key === "tags" ? value.split(",").map((tag) => tag.trim()).filter(Boolean) : value } : item) }));
  };

  // Add/Remove functions
  const addEducation = () => {
    const newEdu: EducationItem = {
      id: `edu-${Date.now()}`,
      degree: "New Degree",
      short: "Short",
      status: "Currently Pursuing",
      year: "2025 - 2028",
      institute: "Institute Name",
      location: "Location",
    };
    setDraftState((current) => ({ ...current, education: [...current.education, newEdu] }));
  };
  const removeEducation = (index: number) => setDraftState((current) => ({ ...current, education: current.education.filter((_, i) => i !== index) }));

  const addCertification = () => {
    const newCert: CertificationItem = {
      id: `cert-${Date.now()}`,
      title: "New Certification",
      grade: "Grade",
      institute: "Institute",
      location: "Location",
      details: "Description...",
      documentPages: [],
    };
    setDraftState((current) => ({ ...current, certifications: [...current.certifications, newCert] }));
  };
  const removeCertification = (index: number) => setDraftState((current) => ({ ...current, certifications: current.certifications.filter((_, i) => i !== index) }));

  const addProject = () => {
    const newProject: ProjectItem = {
      id: `project-${Date.now()}`,
      title: "New Project",
      category: "Project Category",
      shortDesc: "Short project description.",
      fullDesc: "Add the complete project description here.",
      tags: ["New"],
      live: "",
      github: "",
    };
    setDraftState((current) => ({ ...current, projects: [...current.projects, newProject] }));
  };
  const removeProject = (index: number) => setDraftState((current) => ({ ...current, projects: current.projects.filter((_, i) => i !== index) }));

  const save = () => {
    setSaving(true);
    setStatus("");
    updateContent(draftState);
    setStatus("✅ Preview updated! Changes are live in this browser session.");
    setShowDraftBanner(true);
    setTimeout(() => setShowDraftBanner(false), 5000);
    setSaving(false);
  };

  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(draftState, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setStatus("📥 portfolio.json downloaded. Replace src/data/portfolio.json in your code editor to make changes permanent.");
  };

  const resetDraft = () => {
    setDraftState(content);
    setStatus("🔄 Reset to saved version.");
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    window.location.reload();
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-7 flex flex-col gap-4 rounded-3xl bg-gradient-to-r from-teal-600 to-cyan-600 p-6 text-white shadow-lg shadow-teal-100 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/70"><ShieldCheck className="h-4 w-4" /> Secure admin area</div>
            <h1 className="text-3xl font-bold">Portfolio editor</h1>
            <p className="mt-1 text-sm text-white/75">Edit content. Changes apply instantly to preview. <strong>Download JSON to make permanent.</strong></p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <a href="/" className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2.5 text-sm font-semibold hover:bg-white/25"><ExternalLink className="h-4 w-4" /> View site</a>
            <button onClick={downloadJson} className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/25"><Download className="h-4 w-4" /> Download JSON</button>
            <button onClick={resetDraft} className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/25"><RotateCcw className="h-4 w-4" /> Reset</button>
            <button onClick={logout} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-teal-700 hover:bg-teal-50"><LogOut className="h-4 w-4" /> Log out</button>
          </div>
        </header>

        {/* Draft banner */}
        {showDraftBanner && (
          <div className="mb-6 flex items-center gap-3 rounded-xl bg-teal-50 border border-teal-200 p-4 text-teal-800">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            <div>
              <p className="font-semibold">Preview saved successfully!</p>
              <p className="text-sm text-teal-700">This is an in-memory preview. Click <strong>Download JSON</strong> and replace <code className="bg-teal-100 px-1.5 rounded">src/data/portfolio.json</code> in your codebase to persist changes permanently.</p>
            </div>
          </div>
        )}

        {/* Draft indicator */}
        <div className="mb-6 flex items-center gap-3 rounded-xl bg-yellow-50 border border-yellow-200 p-4 text-yellow-800">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-semibold">Draft auto-saved to browser</p>
            <p>Your edits are saved in this browser's localStorage. They survive page refresh but <strong>won't persist after deploy</strong> without downloading JSON.</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Profile */}
          <Panel title="Profile & contact" description="These values appear in your contact section and Hire Me form.">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Email" value={draftState.profile.email} onChange={(value) => updateProfile("email", value)} type="email" />
              <Field label="Primary WhatsApp number" value={draftState.profile.whatsapp} onChange={(value) => updateProfile("whatsapp", value)} />
              <Field label="Second WhatsApp number" value={draftState.profile.whatsappSecondary} onChange={(value) => updateProfile("whatsappSecondary", value)} />
              <Field label="Primary phone" value={draftState.profile.phonePrimary} onChange={(value) => updateProfile("phonePrimary", value)} />
              <Field label="Second phone (optional)" value={draftState.profile.phoneSecondary} onChange={(value) => updateProfile("phoneSecondary", value)} />
              <Field label="Location" value={draftState.profile.location} onChange={(value) => updateProfile("location", value)} />
            </div>
          </Panel>

          {/* Social */}
          <Panel title="Social links" description="Update links used by every matching social icon.">
            <div className="grid gap-4 sm:grid-cols-2">
              {(Object.keys(draftState.social) as Array<keyof PortfolioContent["social"]>).map((key) => (
                <Field key={key} label={key} value={draftState.social[key]} onChange={(value) => updateSocial(key, value)} type="url" />
              ))}
            </div>
          </Panel>

          {/* Education */}
          <Panel
            title="Education"
            description="Edit the timeline cards. Add/remove education entries."
            action={
              <button onClick={addEducation} className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-teal-300 px-4 py-2 text-sm font-bold text-teal-700 hover:bg-teal-50 transition-colors"><Plus className="h-4 w-4" /> Add education</button>
            }
          >
            <div className="space-y-5">
              {draftState.education.map((item, index) => (
                <div key={item.id} className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-bold text-teal-700">{item.short || `Education ${index + 1}`}</span>
                    <button onClick={() => removeEducation(index)} className="inline-flex items-center gap-1 text-xs font-semibold text-red-500 hover:text-red-700"><Trash2 className="h-3.5 w-3.5" /> Remove</button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Degree" value={item.degree} onChange={(value) => updateEducation(index, "degree", value)} />
                    <Field label="Short name" value={item.short} onChange={(value) => updateEducation(index, "short", value)} />
                    <Field label="Year / duration" value={item.year} onChange={(value) => updateEducation(index, "year", value)} />
                    <Field label="Status" value={item.status} onChange={(value) => updateEducation(index, "status", value)} />
                    <Field label="Institute" value={item.institute} onChange={(value) => updateEducation(index, "institute", value)} />
                    <Field label="Board / location" value={item.location} onChange={(value) => updateEducation(index, "location", value)} />
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          {/* Certifications */}
          <Panel
            title="Certifications"
            description="Edit certificate cards. Add/remove certifications. For images: add files to public/assets/certificates/page-XX.png, then enter page numbers in 'Document pages'."
            action={
              <button onClick={addCertification} className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-teal-300 px-4 py-2 text-sm font-bold text-teal-700 hover:bg-teal-50 transition-colors"><Plus className="h-4 w-4" /> Add certification</button>
            }
          >
            <div className="space-y-5">
              {draftState.certifications.map((item, index) => (
                <div key={item.id} className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-bold text-teal-700">{item.title}</span>
                    <button onClick={() => removeCertification(index)} className="inline-flex items-center gap-1 text-xs font-semibold text-red-500 hover:text-red-700"><Trash2 className="h-3.5 w-3.5" /> Remove</button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Title" value={item.title} onChange={(value) => updateCertification(index, "title", value)} />
                    <Field label="Grade / label" value={item.grade} onChange={(value) => updateCertification(index, "grade", value)} />
                    <Field label="Institute" value={item.institute} onChange={(value) => updateCertification(index, "institute", value)} />
                    <Field label="Location" value={item.location} onChange={(value) => updateCertification(index, "location", value)} />
                    <Field label="Document pages (comma separated)" value={item.documentPages.join(", ")} onChange={(value) => updateCertification(index, "documentPages", value)} />
                    <div className="sm:col-span-2"><Field label="Description" value={item.details} onChange={(value) => updateCertification(index, "details", value)} multiline /></div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          {/* Projects */}
          <Panel
            title="Projects"
            description="Edit project cards, links, tags and descriptions."
            action={
              <button onClick={addProject} className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-teal-300 px-4 py-2 text-sm font-bold text-teal-700 hover:bg-teal-50 transition-colors"><Plus className="h-4 w-4" /> Add project</button>
            }
          >
            <div className="space-y-5">
              {draftState.projects.map((item, index) => (
                <div key={item.id} className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-sm font-bold text-teal-700">Project {index + 1}</span>
                    <button onClick={() => removeProject(index)} className="inline-flex items-center gap-1 text-xs font-semibold text-red-500 hover:text-red-700"><Trash2 className="h-3.5 w-3.5" /> Remove</button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Title" value={item.title} onChange={(value) => updateProject(index, "title", value)} />
                    <Field label="Category" value={item.category} onChange={(value) => updateProject(index, "category", value)} />
                    <Field label="Live link" value={item.live} onChange={(value) => updateProject(index, "live", value)} type="url" />
                    <Field label="GitHub link" value={item.github} onChange={(value) => updateProject(index, "github", value)} type="url" />
                    <Field label="Tags (comma separated)" value={item.tags.join(", ")} onChange={(value) => updateProject(index, "tags", value)} />
                    <Field label="Short description" value={item.shortDesc} onChange={(value) => updateProject(index, "shortDesc", value)} />
                    <div className="sm:col-span-2"><Field label="Full description" value={item.fullDesc} onChange={(value) => updateProject(index, "fullDesc", value)} multiline /></div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          {/* Bottom bar */}
          <div className="sticky bottom-4 flex flex-col items-stretch gap-3 rounded-2xl border border-gray-200 bg-white/95 p-3 shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">
            <p className={`px-2 text-sm font-medium ${status.includes("failed") ? "text-red-600" : "text-teal-700"}`}>{status || "Make your changes. Auto-saved to browser. Click Download JSON when done."}</p>
            <div className="flex gap-2">
              <button onClick={downloadJson} className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-100 px-6 py-3 text-sm font-bold text-gray-700 shadow transition hover:bg-gray-200"><Download className="h-4 w-4" /> Download JSON</button>
              <button onClick={save} disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-teal-200 transition hover:bg-teal-700 disabled:cursor-wait disabled:opacity-60">
                <Save className="h-4 w-4" /> {saving ? "Saving..." : "Save preview (in-memory)"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const { content } = usePortfolioContent();

  useEffect(() => {
    const session = localStorage.getItem(SESSION_KEY);
    if (session === 'true') {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, []);

  if (authenticated === null) return <main className="min-h-screen bg-gray-50" />;
  if (!authenticated) return <Login onLogin={() => setAuthenticated(true)} />;
  if (!content) return null;
  return <AdminDashboard />;
}