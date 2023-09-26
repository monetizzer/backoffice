export default function Login() {
  return (
    <>
      <button onClick={() => {
        window.location.replace(import.meta.env['VITE_DISCORD_REDIRECT_URL']!)
      }}>Discord</button>
    </>
  )
}