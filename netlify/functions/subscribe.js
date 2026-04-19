export async function handler(event) {
    try {
        if (event.httpMethod !== "POST") {
            return { statusCode: 405, body: "Method not allowed" };
        }

        const { name, email } = JSON.parse(event.body);

        if (!name || !email) {
            return { statusCode: 400, body: "Missing fields" };
        }

        // 🔥 EMAIL AUTOMATICA
        await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                from: "100 OTTANI PLEASE <crew@100ottaniplease.com>",
                to: email,
                subject: "WELCOME TO THE CREW — 100 OTTANI PLEASE™",
                html: `
                <div style="background:#f2f2f2;padding:40px;font-family:monospace;text-transform:uppercase;">
                    <div style="max-width:600px;margin:auto;background:#fff;padding:40px;border:2px solid #111;">
                        
                        <h2>ACCESS CONFIRMED</h2>

                        <p style="font-size:12px;">
                        ${name}, YOU ARE NOW INSIDE THE SYSTEM.
                        <br><br>
                        EXPECT SIGNALS. EXPECT DROPS.
                        </p>

                        <div style="margin:20px 0;height:2px;background:#111;"></div>

                        <p style="font-size:10px;">
                        STAY FAST. STAY WIRED.
                        </p>

                        <p style="font-size:10px;margin-top:30px;">
                        © 100 OTTANI PLEASE™
                        </p>

                    </div>
                </div>
                `
            })
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true })
        };

    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Server error" })
        };
    }
}
