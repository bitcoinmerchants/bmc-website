import { NextResponse } from "next/server";

// Turnstile test secret key (always passes) — replace with real key in production
const TURNSTILE_SECRET =
  process.env.TURNSTILE_SECRET_KEY || "1x0000000000000000000000000000000AA";
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "hello@bitcoinmerchantcommunity.org";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      location,
      involvement,
      distribution,
      anythingElse,
      turnstileToken,
    } = body;

    // Validate required fields
    if (!name || !email || !location || !involvement || !distribution) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    // Verify Turnstile token
    const turnstileRes = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: TURNSTILE_SECRET,
          response: turnstileToken,
        }),
      }
    );
    const turnstileData = await turnstileRes.json();

    if (!turnstileData.success) {
      return NextResponse.json(
        { error: "Verification failed. Please try again." },
        { status: 400 }
      );
    }

    // Send email via Resend
    if (RESEND_API_KEY) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "BMC Local Champion <onboarding@resend.dev>",
          to: [NOTIFY_EMAIL],
          subject: `New Local Champion Application: ${name}`,
          html: `
            <h2>New Local Champion Application</h2>
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Location:</strong> ${escapeHtml(location)}</p>
            <hr />
            <p><strong>Community Involvement:</strong></p>
            <p>${escapeHtml(involvement).replace(/\n/g, "<br/>")}</p>
            <hr />
            <p><strong>Distribution Plan:</strong></p>
            <p>${escapeHtml(distribution).replace(/\n/g, "<br/>")}</p>
            ${
              anythingElse
                ? `<hr /><p><strong>Additional Info:</strong></p><p>${escapeHtml(anythingElse).replace(/\n/g, "<br/>")}</p>`
                : ""
            }
          `,
          reply_to: email,
        }),
      });
    } else {
      // Log to console if no Resend key (development)
      console.log("=== NEW LOCAL CHAMPION APPLICATION ===");
      console.log({ name, email, location, involvement, distribution, anythingElse });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
