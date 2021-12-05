function ErrorInfo({ errors }) {
  if (!errors || !errors.length) {
    return null;
  }

  return (
    <article className="flex flex-col">
      {errors.map((err, i) => (
        <span className="text-sm text-red-700 text-center" key={i}>
          {err}
        </span>
      ))}
    </article>
  );
}

export default ErrorInfo;
