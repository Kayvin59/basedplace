export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      <h1 className="text-7xl mb-24">Based Place</h1>
      <p className="w-full flex flex-col text-left text-xl mb-12">
        <span>
          Welcome to Based Place, where pixels art meets gamified minting.
        </span>
        <span>
          Rally the troops
        </span>
      </p>
      <div className="w-full">
        <section>
          <h2>About</h2>
        </section>
        <section>
          <h2>Playground</h2>
        </section>
        <section>
          <h2>Dashboard</h2>
        </section>
      </div>
    </main>
  );
}
