// Spoločné pomôcky a šablóna pre e-maily k rezerváciám BSGA Performance Center.
export const esc = (v: unknown) =>
  String(v ?? "").replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!,
  );

export const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("sk-SK", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Bratislava",
  });

export const fmtTime = (iso: string) =>
  new Date(iso).toLocaleTimeString("sk-SK", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Bratislava",
  });

type Layout = {
  badge: string;
  heading: string;
  intro: string;
  rows: [string, string][];
  note?: string;
  cta?: { label: string; url: string };
  secondary?: { label: string; url: string };
};

/** Ivory/gold šablóna zhodná s dizajnom potvrdzovacieho e-mailu. */
export const renderBookingEmail = (l: Layout) => `<!DOCTYPE html>
<html lang="sk"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width" />
<title>${esc(l.heading)}</title></head>
<body style="margin:0;padding:0;background-color:#efe9de;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#efe9de;padding:32px 12px;">
<tr><td align="center">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:24px;overflow:hidden;">
    <tr><td style="padding:36px 40px 8px 40px;font-family:Helvetica,Arial,sans-serif;">
      <span style="display:inline-block;background:#C5A059;color:#ffffff;font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;padding:7px 14px;border-radius:999px;">${esc(l.badge)}</span>
      <h1 style="margin:20px 0 6px;font-size:28px;line-height:34px;color:#1c1a17;font-weight:normal;">${esc(l.heading)}</h1>
      <div style="height:2px;width:64px;background:#C5A059;"></div>
      <p style="margin:20px 0 0;font-size:15px;line-height:24px;color:#4a453d;">${l.intro}</p>
    </td></tr>
    <tr><td style="padding:24px 40px 0 40px;font-family:Helvetica,Arial,sans-serif;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#faf7f2;border-radius:16px;">
        ${l.rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:10px 18px;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#a09786;width:40%;">${esc(k)}</td><td style="padding:10px 18px;font-size:15px;color:#1c1a17;font-weight:bold;">${esc(v)}</td></tr>`,
          )
          .join("")}
      </table>
    </td></tr>
    ${
      l.cta
        ? `<tr><td style="padding:26px 40px 0 40px;font-family:Helvetica,Arial,sans-serif;">
      <a href="${l.cta.url}" style="display:inline-block;background:#1c1a17;color:#ffffff;text-decoration:none;font-size:14px;font-weight:bold;padding:13px 26px;border-radius:999px;">${esc(l.cta.label)}</a>
      ${l.secondary ? `<a href="${l.secondary.url}" style="display:inline-block;margin-left:10px;border:1px solid #C5A059;color:#1c1a17;text-decoration:none;font-size:14px;font-weight:bold;padding:12px 24px;border-radius:999px;">${esc(l.secondary.label)}</a>` : ""}
    </td></tr>`
        : ""
    }
    ${l.note ? `<tr><td style="padding:24px 40px 0 40px;font-family:Helvetica,Arial,sans-serif;font-size:14px;line-height:22px;color:#4a453d;">${l.note}</td></tr>` : ""}
    <tr><td style="padding:28px 40px 36px 40px;font-family:Helvetica,Arial,sans-serif;font-size:12px;line-height:19px;color:#a09786;">
      BSGA Performance Center · Zuzany Chalupovej 12, 851 07 Bratislava<br />
      <a href="mailto:info@bsga.sk" style="color:#C5A059;text-decoration:none;">info@bsga.sk</a> · <a href="https://www.bsga.sk" style="color:#C5A059;text-decoration:none;">www.bsga.sk</a>
    </td></tr>
  </table>
</td></tr></table>
</body></html>`;
