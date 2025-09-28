
export default function LoginPage() {
  return (
    <div style={{ padding: 32 }}>
      <h1>Log In</h1>
      <form style={{ display: "grid", gap: 12, maxWidth: 360 }}>
        <input placeholder="Email or Username" />
        <input type="password" placeholder="Password" />
        <button type="button">Log In</button>
      </form>
    </div>
  );
}
