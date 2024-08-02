const emailTemplate = (otp, email) => {
  const otpDigits = otp.split("").map((digit) =>
      `<p style="display: inline-block; padding: 10px; margin: 0 5px; width: 40px; height: 40px; font-size: 24px; font-weight: 500; color: #1E3A8A; border: 1px solid #1E3A8A; border-radius: 0.25rem;">${digit}</p>`
  );

  return `
    <div style="max-width: 42rem; padding: 2rem 1.5rem; margin: 0 auto; background-color: #ffffff;">
      <header style="text-align: center;">
        <a href="#">
          <img style="height: 2rem;" src="https://merakiui.com/images/full-logo.svg" alt="">
        </a>
      </header>

      <main style="margin-top: 2rem;">
        <h2 style="color: #1F2937;">Hi,</h2>

        <p style="margin-top: 0.5rem; color: #4B5563;">
          This is your verification code:
        </p>

        <div style="display: flex; align-items: center; margin-top: 1rem; gap: 1rem;">
          ${otpDigits}
        </div>

        <p style="margin-top: 1rem; color: #4B5563;">
          This code will only be valid for the next 5 minutes. If the code does not work
        </p>
        
        <p style="margin-top: 2rem; color: #4B5563;">
          Thanks, <br>
          Meraki UI team
        </p>
      </main>
      

      <footer style="margin-top: 2rem; text-align: center; color: #6B7280;">
        <p>
          This email was sent to <a href="mailto:${email}" style="color: #3B82F6; text-decoration: underline;">${email}</a>. 
          If you'd rather not receive this kind of email, you can <a href="#" style="color: #3B82F6; text-decoration: underline;">unsubscribe</a> or <a href="#" style="color: #3B82F6; text-decoration: underline;">manage your email preferences</a>.
        </p>

        <p style="margin-top: 0.75rem;">© ${new Date().getFullYear()} Meraki UI. All Rights Reserved.</p>
      </footer>
    </div>
  `;
}

module.exports = emailTemplate;
