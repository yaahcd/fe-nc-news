export default function Error({ message }) {
  return (
    <main className="errorCard">
      {message ? message : "Something went wrong, please try again."}
    </main>
  );
}
