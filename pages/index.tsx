import type { NextPage } from 'next'
import { useState } from 'react'

const Home: NextPage = () => {
  const [{ error, loading, result }, setState] = useState({ loading: false, error: false, result: "" })

  function execute() {
    setState({ error: false, loading: true, result: "" });
    fetch('/api/execute')
      .then(response => new Promise<string>(async (res, rej) => response.ok
        ? res(await response.text())
        : rej(await response.text()))
      )
      .then(result => setState({ error: false, loading: false, result }))
      .catch(result => setState({ error: true, loading: false, result }))
  }

  return (
    <div className='mx-auto max-w-lg my-8'>
      <div className='py-8 text-3xl font-bold'>
        SimpleWebAuthn Issue
      </div>
      <div className="p-3 bg-gray-200">
        <code className="whitespace-pre">{`generateRegistrationOptions({
  rpID,
  rpName,
  userID: 'userId',
  userName: 'username',
  attestationType: 'none',
});`}
        </code>
      </div>

      <div className="my-4 flex justify-center">
        <button onClick={execute} className={`w-80 py-2 text-lg text-white text-center rounded font-bold ${loading
          ? 'animate-pulse bg-gray-700'
          : 'bg-blue-700'
          }`}>
          Execute
        </button>
      </div>


      {result && <div className={`p-3 ${error ? 'bg-red-200' : 'bg-gray-200'}`}>
        <code className="whitespace-pre-wrap">{result} </code>
      </div>}

    </div >


  )
}

export default Home
