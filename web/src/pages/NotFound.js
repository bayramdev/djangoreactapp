function NotFound() {
  return (
    <main className="bg-form-neutral-medium h-full flex justify-center">
      <section className="flex flex-col w-full max-w-xl p-4 gap-4">
        <h1 className="form-header">
          404 Error: Not Found <span className="font-mono">:(</span>
        </h1>
        <p>The page you requested couldn't found in known route patterns</p>
      </section>
    </main>
  );
}

export default NotFound;
