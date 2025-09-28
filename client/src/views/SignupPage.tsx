
export default function SignupPage() {
  return (
    <div style={{ padding: 32 }}>
      <h1>Sign Up</h1>
      <form style={{ display: "grid", gap: 12, maxWidth: 360 }}>
        <input placeholder="Username" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <label style={{ display: "flex", gap: 8 }}>
          <input type="checkbox" /> I agree to the Terms
        </label>
        <button type="button">Create Account</button>
      </form>
    </div>
  );
}
