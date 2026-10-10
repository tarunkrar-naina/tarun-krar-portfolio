import { Router, type Request, type Response } from "express";
import { promises as fs } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const router = Router();
const SESSION_COOKIE = "portfolio_admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

type PortfolioContent = Record<string, unknown>;

const dataCandidates = [
  path.resolve(process.cwd(), "artifacts/api-server/src/data/portfolio.json"),
  path.resolve(process.cwd(), "src/data/portfolio.json"),
  path.resolve(process.cwd(), "data/portfolio.json"),
];

async function resolveDataPath() {
  for (const candidate of dataCandidates) {
    try {
      await fs.access(candidate);
      return candidate;
    } catch {
      // Try the next service/workspace location.
    }
  }
  throw new Error("Portfolio data file not found.");
}

async function readContent(): Promise<PortfolioContent> {
  const raw = await fs.readFile(await resolveDataPath(), "utf8");
  return JSON.parse(raw) as PortfolioContent;
}

async function writeContent(content: PortfolioContent) {
  await fs.writeFile(await resolveDataPath(), `${JSON.stringify(content, null, 2)}\n`, "utf8");
}

function getCookie(req: Request, name: string) {
  const cookies = req.headers.cookie?.split(";") ?? [];
  const entry = cookies.find((cookie) => cookie.trim().startsWith(`${name}=`));
  return entry ? decodeURIComponent(entry.trim().slice(name.length + 1)) : undefined;
}

function signSession(payload: string) {
  const secret = process.env.SESSION_SECRET;
  if (!secret) return "";
  return crypto.createHmac("sha256", secret).update(payload).digest("base64url");
}

function createSession() {
  const issuedAt = Math.floor(Date.now() / 1000);
  const payload = `${issuedAt}.${crypto.randomBytes(18).toString("base64url")}`;
  return `${payload}.${signSession(payload)}`;
}

function isValidSession(token?: string) {
  if (!token || !process.env.SESSION_SECRET) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const issuedAt = Number(parts[0]);
  if (!Number.isFinite(issuedAt) || Math.floor(Date.now() / 1000) - issuedAt > SESSION_MAX_AGE_SECONDS) return false;
  const expected = signSession(`${parts[0]}.${parts[1]}`);
  return expected.length === parts[2].length && crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(parts[2]));
}

function isAdmin(req: Request) {
  return isValidSession(getCookie(req, SESSION_COOKIE));
}

function setSessionCookie(res: Response, token: string) {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  res.setHeader(
    "Set-Cookie",
    `${SESSION_COOKIE}=${encodeURIComponent(token)}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${SESSION_MAX_AGE_SECONDS}${secure}`,
  );
}

router.get("/portfolio", async (_req, res) => {
  try {
    res.json(await readContent());
  } catch (error) {
    res.status(500).json({ message: "Portfolio content is unavailable." });
  }
});

router.get("/admin/session", (req, res) => {
  res.json({ authenticated: isAdmin(req) });
});

router.post("/admin/login", (req, res) => {
  const password = typeof req.body?.password === "string" ? req.body.password : "";
  const configuredPassword = process.env.ADMIN_PASSWORD;
  if (!configuredPassword) {
    return res.status(503).json({ message: "Admin password is not configured." });
  }
  const supplied = Buffer.from(password);
  const expected = Buffer.from(configuredPassword);
  const matches = supplied.length === expected.length && crypto.timingSafeEqual(supplied, expected);
  if (!matches) return res.status(401).json({ message: "Incorrect password." });
  setSessionCookie(res, createSession());
  return res.json({ authenticated: true });
});

router.post("/admin/logout", (_req, res) => {
  res.setHeader("Set-Cookie", `${SESSION_COOKIE}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`);
  res.json({ authenticated: false });
});

router.put("/admin/portfolio", async (req, res) => {
  if (!isAdmin(req)) return res.status(401).json({ message: "Admin login required." });
  const content = req.body;
  if (!content || typeof content !== "object" || Array.isArray(content)) {
    return res.status(400).json({ message: "Invalid portfolio content." });
  }
  try {
    await writeContent(content as PortfolioContent);
    return res.json(await readContent());
  } catch (error) {
    return res.status(500).json({ message: "Portfolio content could not be saved." });
  }
});

export default router;