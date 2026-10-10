import { useEffect, useState } from "react";
import { LockKeyhole, Save, LogOut, Plus, Trash2, ExternalLink, ShieldCheck } from "lucide-react";
import { usePortfolioContent } from "@/components/PortfolioProvider";
import type { PortfolioContent, EducationItem, CertificationItem, ProjectItem } from "@/lib/portfolio-config";

const apiBase = `${import.meta.env.BASE_URL}api`;

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

function Panel({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
      {children}
    </section>
  );
}

function Login({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    const response = await fetch(`${apiBase}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ password }),
    });
    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      setError(payload.message ?? "Unable to log in.");
      return;
    }
    onLogin();
  };

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
          <Field label="Admin password" value={password} onChange={setPassword} type="password" />
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
  const { content, refresh } = usePortfolioContent();
  const [draft, setDraft] = useState<PortfolioContent>(content);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => setDraft(content), [content]);

  const updateProfile = (key: keyof PortfolioContent["profile"], value: string) => {
    setDraft((current) => ({ ...current, profile: { ...current.profile, [key]: value } }));
  };
  const updateSocial = (key: keyof PortfolioContent["social"], value: string) => {
    setDraft((current) => ({ ...current, social: { ...current.social, [key]: value } }));
  };
  const updateEducation = (index: number, key: keyof EducationItem, value: string) => {
    setDraft((current) => ({ ...current, education: current.education.map((item, i) => i === index ? { ...item, [key]: value } : item) }));
  };
  const updateCertification = (index: number, key: keyof CertificationItem, value: string) => {
    setDraft((current) => ({ ...current, certifications: current.certifications.map((item, i) => i === index ? { ...item, [key]: value } : item) }));
  };
  const updateProject = (index: number, key: keyof ProjectItem, value: string) => {
    setDraft((current) => ({ ...current, projects: current.projects.map((item, i) => i === index ? { ...item, [key]: key === "tags" ? value.split(",").map((tag) => tag.trim()).filter(Boolean) : value } : item) }));
  };

  const save = async () => {
    setSaving(true);
    setStatus("");
    const response = await fetch(`${apiBase}/admin/portfolio`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(draft),
    });
    if (response.ok) {
      await refresh();
      setStatus("Saved successfully — public portfolio is updated.");
    } else {
      setStatus("Save failed. Please sign in again and try once more.");
    }
    setSaving(false);
  };

  const logout = async () => {
    await fetch(`${apiBase}/admin/logout`, { method: "POST", credentials: "include" });
    window.location.reload();
  };

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
    setDraft((current) => ({ ...current, projects: [...current.projects, newProject] }));
  };
  const removeProject = (index: number) => setDraft((current) => ({ ...current, projects: current.projects.filter((_, i) => i !== index) }));

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <header className="mb-7 flex flex-col gap-4 rounded-3xl bg-gradient-to-r from-teal-600 to-cyan-600 p-6 text-white shadow-lg shadow-teal-100 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/70"><ShieldCheck className="h-4 w-4" /> Secure admin area</div>
            <h1 className="text-3xl font-bold">Portfolio editor</h1>
            <p className="mt-1 text-sm text-white/75">Update your public profile from one place.</p>
          </div>
          <div className="flex gap-2">
            <a href={`${import.meta.env.BASE_URL}`} className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2.5 text-sm font-semibold hover:bg-white/25"><ExternalLink className="h-4 w-4" /> View site</a>
            <button onClick={logout} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-teal-700 hover:bg-teal-50"><LogOut className="h-4 w-4" /> Log out</button>
          </div>
        </header>

        <div className="space-y-6">
          <Panel title="Profile & contact" description="These values appear in your contact section and Hire Me form.">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Email" value={draft.profile.email} onChange={(value) => updateProfile("email", value)} type="email" />
              <Field label="Primary WhatsApp number" value={draft.profile.whatsapp} onChange={(value) => updateProfile("whatsapp", value)} />
              <Field label="Second WhatsApp number" value={draft.profile.whatsappSecondary} onChange={(value) => updateProfile("whatsappSecondary", value)} />
              <Field label="Primary phone" value={draft.profile.phonePrimary} onChange={(value) => updateProfile("phonePrimary", value)} />
              <Field label="Second phone (optional)" value={draft.profile.phoneSecondary} onChange={(value) => updateProfile("phoneSecondary", value)} />
              <Field label="Location" value={draft.profile.location} onChange={(value) => updateProfile("location", value)} />
            </div>
          </Panel>

          <Panel title="Social links" description="Update links used by every matching social icon.">
            <div className="grid gap-4 sm:grid-cols-2">
              {(Object.keys(draft.social) as Array<keyof PortfolioContent["social"]>).map((key) => (
                <Field key={key} label={key} value={draft.social[key]} onChange={(value) => updateSocial(key, value)} type="url" />
              ))}
            </div>
          </Panel>

          <Panel title="Education" description="Edit the timeline cards and the public education details.">
            <div className="space-y-5">
              {draft.education.map((item, index) => (
                <div key={item.id} className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                  <div className="mb-3 flex items-center justify-between"><span className="text-sm font-bold text-teal-700">{item.short || `Education ${index + 1}`}</span><span className="text-xs text-gray-400">Timeline item</span></div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Degree" value={item.degree} onChange={(value) => updateEducation(index, "degree", value)} />
                    <Field label="Year / duration" value={item.year} onChange={(value) => updateEducation(index, "year", value)} />
                    <Field label="Status" value={item.status} onChange={(value) => updateEducation(index, "status", value)} />
                    <Field label="Institute" value={item.institute} onChange={(value) => updateEducation(index, "institute", value)} />
                    <Field label="Board / location" value={item.location} onChange={(value) => updateEducation(index, "location", value)} />
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Certifications" description="Edit certificate card titles and descriptions. Scanned document pages remain connected to each card.">
            <div className="space-y-5">
              {draft.certifications.map((item, index) => (
                <div key={item.id} className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                  <div className="mb-3 flex items-center justify-between"><span className="text-sm font-bold text-teal-700">{item.title}</span><span className="text-xs text-gray-400">Document pages: {item.documentPages.join(", ")}</span></div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Title" value={item.title} onChange={(value) => updateCertification(index, "title", value)} />
                    <Field label="Grade / label" value={item.grade} onChange={(value) => updateCertification(index, "grade", value)} />
                    <Field label="Institute" value={item.institute} onChange={(value) => updateCertification(index, "institute", value)} />
                    <Field label="Location" value={item.location} onChange={(value) => updateCertification(index, "location", value)} />
                    <div className="sm:col-span-2"><Field label="Description" value={item.details} onChange={(value) => updateCertification(index, "details", value)} multiline /></div>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Projects" description="Edit project cards, links, tags and descriptions.">
            <div className="space-y-5">
              {draft.projects.map((item, index) => (
                <div key={item.id} className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                  <div className="mb-3 flex items-center justify-between"><span className="text-sm font-bold text-teal-700">Project {index + 1}</span><button onClick={() => removeProject(index)} className="inline-flex items-center gap-1 text-xs font-semibold text-red-500 hover:text-red-700"><Trash2 className="h-3.5 w-3.5" /> Remove</button></div>
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
            <button onClick={addProject} className="mt-5 inline-flex items-center gap-2 rounded-full border-2 border-dashed border-teal-300 px-4 py-2.5 text-sm font-bold text-teal-700 hover:bg-teal-50"><Plus className="h-4 w-4" /> Add project</button>
          </Panel>

          <div className="sticky bottom-4 flex flex-col items-stretch gap-3 rounded-2xl border border-gray-200 bg-white/95 p-3 shadow-xl backdrop-blur sm:flex-row sm:items-center sm:justify-between">
            <p className={`px-2 text-sm font-medium ${status.includes("failed") ? "text-red-600" : "text-teal-700"}`}>{status || "Make your changes, then save them."}</p>
            <button onClick={save} disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-teal-200 transition hover:bg-teal-700 disabled:cursor-wait disabled:opacity-60">
              <Save className="h-4 w-4" /> {saving ? "Saving..." : "Save all changes"}
            </button>
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
    fetch(`${apiBase}/admin/session`, { credentials: "include" })
      .then((response) => response.json())
      .then((payload) => setAuthenticated(Boolean(payload.authenticated)))
      .catch(() => setAuthenticated(false));
  }, []);

  if (authenticated === null) return <main className="min-h-screen bg-gray-50" />;
  if (!authenticated) return <Login onLogin={() => setAuthenticated(true)} />;
  if (!content) return null;
  return <AdminDashboard />;
}