import { NextResponse } from "next/server";
import { ADMIN_EMAIL } from "@/lib/auth";
import { generateResetToken } from "@/lib/auth-utils";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // In a real app, you would check if the user exists in the database
    // and then send a real email. For this minimal implementation:
    if (email.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
      const token = generateResetToken();
      
      // Simulate sending email
      console.log(`[PASS_RESET] Reset token for ${email}: ${token}`);
      console.log(`[PASS_RESET] Reset link: ${process.env.NEXTAUTH_URL}/reset-password?token=${token}`);
      
      return NextResponse.json({
        success: true,
        message: "Reset link sent successfully",
      });
    }

    // For security, usually you'd return success even if the email doesn't exist
    // but here we follow the "minimal" and "show error" requirements if needed.
    return NextResponse.json(
      { error: "Email address not found" },
      { status: 404 }
    );
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
