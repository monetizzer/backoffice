import AuthLayout from "../layouts/auth";

export default function Home() {
  return (
    <AuthLayout>
      <main>
        Home
        <br/>
        <a href="/documents">documents</a>
        <br/>
        <a href="/products">products</a>
      </main>
    </AuthLayout>
  )
}
