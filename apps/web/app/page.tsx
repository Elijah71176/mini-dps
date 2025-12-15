'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [result, setResult] = useState<string>('(not called yet)');
  const [loading, setLoading] = useState(false);
  const [clicks, setClicks] = useState(0);


useEffect(() => {
  console.log(' Page hydrated (client JS running)');
}, []);


  const callHealth = async () => {
    console.log(' Button clicked');
    setClicks((c) => c + 1);

    try {
      setLoading(true);
      const base = process.env.NEXT_PUBLIC_API_URL || '';
      console.log('Base URL:', base);

      const res = await fetch(`${base}/health`);
      const data = await res.json();
      setResult(JSON.stringify(data));
    } catch (e: any) {
      console.error(e);
      setResult(`Error: ${e?.message ?? e}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: 24 }}>
      <h1>Mini-DPS Web</h1>
      <p>Clicks: {clicks}</p>
      <p>API health result: {result}</p>
      <button onClick={callHealth}>
        {loading ? 'Calling...' : 'Call /health'}
      </button>
    </main>
  );
}

