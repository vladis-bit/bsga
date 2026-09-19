import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;

const ROLES = ["admin", "moderator", "user"] as const;
type Role = (typeof ROLES)[number];

const BAN_DURATION = "876000h"; // ~100 rokov = trvalá deaktivácia

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json; charset=utf-8" },
  });

const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const isDeactivated = (user: { banned_until?: string | null }) => {
  const until = user.banned_until;
  if (!until) return false;
  return new Date(until).getTime() > Date.now();
};

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return json({ error: "Nepodporovaná požiadavka." }, 405);

  const authHeader = request.headers.get("Authorization") ?? "";
  if (!authHeader.startsWith("Bearer ")) return json({ error: "Chýba prihlásenie." }, 401);

  // Overenie volajúceho: musí byť prihlásený a mať rolu admin.
  const caller = createClient(SUPABASE_URL, ANON_KEY, {
    global: { headers: { Authorization: authHeader } },
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: userData, error: userError } = await caller.auth.getUser();
  if (userError || !userData.user) return json({ error: "Neplatné prihlásenie." }, 401);

  const callerId = userData.user.id;
  const { data: isAdmin, error: roleError } = await caller.rpc("has_role", {
    _user_id: callerId,
    _role: "admin",
  });
  if (roleError || isAdmin !== true) return json({ error: "Nemáte oprávnenie." }, 403);

  let body: Record<string, unknown> = {};
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    body = {};
  }

  const action = typeof body.action === "string" ? body.action : "list";
  const userId = typeof body.userId === "string" ? body.userId : "";

  try {
    if (action === "list") {
      const { data, error } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
      if (error) throw error;

      const { data: roleRows, error: rolesErr } = await admin
        .from("user_roles")
        .select("user_id, role");
      if (rolesErr) throw rolesErr;

      const rolesByUser = new Map<string, Role[]>();
      for (const row of roleRows ?? []) {
        const list = rolesByUser.get(row.user_id as string) ?? [];
        list.push(row.role as Role);
        rolesByUser.set(row.user_id as string, list);
      }

      const users = data.users.map((u) => ({
        id: u.id,
        email: u.email ?? "",
        created_at: u.created_at,
        last_sign_in_at: u.last_sign_in_at ?? null,
        email_confirmed: Boolean(u.email_confirmed_at),
        deactivated: isDeactivated(u as { banned_until?: string | null }),
        roles: (rolesByUser.get(u.id) ?? []).sort(),
        is_self: u.id === callerId,
      }));

      users.sort((a, b) => a.email.localeCompare(b.email));
      return json({ users });
    }

    if (!userId) return json({ error: "Chýba používateľ." }, 400);

    if (action === "set_roles") {
      const requested = Array.isArray(body.roles) ? body.roles : [];
      const roles = [...new Set(requested.filter((r): r is Role => ROLES.includes(r as Role)))];

      if (userId === callerId && !roles.includes("admin")) {
        return json({ error: "Nemôžete si odobrať vlastnú admin rolu." }, 400);
      }

      const { error: delErr } = await admin.from("user_roles").delete().eq("user_id", userId);
      if (delErr) throw delErr;

      if (roles.length > 0) {
        const { error: insErr } = await admin
          .from("user_roles")
          .insert(roles.map((role) => ({ user_id: userId, role })));
        if (insErr) throw insErr;
      }
      return json({ success: true, roles });
    }

    if (action === "set_active") {
      const active = body.active === true;
      if (userId === callerId && !active) {
        return json({ error: "Nemôžete deaktivovať vlastný účet." }, 400);
      }
      const { error } = await admin.auth.admin.updateUserById(userId, {
        ban_duration: active ? "none" : BAN_DURATION,
      });
      if (error) throw error;
      return json({ success: true, active });
    }

    return json({ error: "Neznáma akcia." }, 400);
  } catch (error) {
    console.error("admin-users error", error);
    const message = error instanceof Error ? error.message : "Neznáma chyba.";
    return json({ error: message }, 500);
  }
});
