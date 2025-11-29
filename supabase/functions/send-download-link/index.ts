import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface DownloadLinkRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: DownloadLinkRequest = await req.json();

    if (!email) {
      throw new Error("Email is required");
    }

    // For now, just log the email. You'll need to integrate with Resend or another email service
    // to actually send the email with the download link.
    console.log(`Download link requested for: ${email}`);

    // TODO: Integrate with Resend to send the actual email
    // const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
    // await resend.emails.send({
    //   from: "Ormozy <onboarding@resend.dev>",
    //   to: [email],
    //   subject: "Download Ormozy for Desktop",
    //   html: `
    //     <h1>Thanks for your interest in Ormozy!</h1>
    //     <p>Click the link below to download Ormozy for your desktop:</p>
    //     <a href="https://ormozy.com/download">Download Ormozy</a>
    //     <p>If you have any questions, feel free to reach out!</p>
    //   `,
    // });

    return new Response(
      JSON.stringify({ success: true, message: "Download link sent successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-download-link function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
