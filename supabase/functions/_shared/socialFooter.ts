/** Ikony sociálnych sietí BSGA do pätičky rezervačných e-mailov. */
const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/bsga.sk/",
    img: "https://bsga.sk/assets/emails/social/instagram.png",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/p/Best-Swing-Golf-Academy-100057246887696/?locale=sk_SK",
    img: "https://bsga.sk/assets/emails/social/facebook.png",
  },
  {
    label: "Linktree",
    href: "https://linktr.ee/BSGAmedia",
    img: "https://bsga.sk/assets/emails/social/linktree.png",
  },
  {
    label: "Google Drive",
    href: "https://drive.google.com/drive/folders/1XOqhY_QPTgG02WjEoDbi-Zb5JJH6R8Jd?usp=sharing",
    img: "https://bsga.sk/assets/emails/social/googledrive.png",
  },
];

export const SOCIAL_ICONS_HTML = `<table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin:0 auto;"><tr>${SOCIALS.map(
  (s) =>
    `<td style="padding:0 6px;"><a href="${s.href}" target="_blank" rel="noopener noreferrer" style="text-decoration:none;"><img src="${s.img}" width="36" height="36" alt="${s.label}" title="${s.label}" style="display:block;width:36px;height:36px;border:0;border-radius:18px;" /></a></td>`,
).join("")}</tr></table>`;
