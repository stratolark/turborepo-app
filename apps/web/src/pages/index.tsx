import Head from "next/head";
import { useEffect, useState } from "react";
import { Button } from "ui";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || "http://localhost:3001";

export default function Web() {
  const [name, setName] = useState<string>("");
  const [response, setResponse] = useState<{ message: string } | null>(null);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    setResponse(null);
    setError(undefined);
  }, [name]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await fetch(`${API_HOST}/message/${name}`);
      const response = await result.json();
      setResponse(response);
    } catch (err) {
      console.error(err);
      setError("Unable to fetch response");
    }
  };

  const onReset = () => {
    setName("");
  };

  return (
    <>
      <Head>
        <title>Turborepo Next.js, Tailwind CSS example</title>
      </Head>
      <div className="m-12 text-white">
        <h1 className="mb-4 text-xl font-bold">Web</h1>
        <form onSubmit={onSubmit} className="grid">
          <label htmlFor="name" className="mb-2 text-lg">
            Enter your Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={onChange}
            placeholder="Bob"
            className="mb-4 rounded p-2.5 text-black"
          ></input>
          <Button
            className="rounded-md bg-blue-500 p-4 hover:bg-blue-600"
            type="submit"
          >
            Submit
          </Button>
        </form>
        {error && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-rose-400">
              Oops an Error occurred!:
            </h3>
            <p className="mt-2 rounded-md bg-red-400 p-4 text-black">{error}</p>
          </div>
        )}
        {response && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-teal-400">Greetings:</h3>
            <p className="text- mt-2 rounded-md bg-teal-400 p-4 text-black">
              {response?.message ?? "Bob"}
            </p>
            <Button
              className="mt-4 rounded-md bg-slate-500 p-2.5"
              onClick={onReset}
            >
              Reset
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
