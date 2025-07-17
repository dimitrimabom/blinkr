"use client";
import { useEffect, useState } from "react";

export default function Dashboard() {
  type Link = {
    id: string | number;
    url: string;
    title: string;
  };

  const [links, setLinks] = useState<Link[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/links")
      .then(async res => {
        if (!res.ok) throw new Error("Erreur réseau");
        const text = await res.text();
        if (!text) return [];
        return JSON.parse(text);
      })
      .then(data => {
        setLinks(data);
        setError(null);
      })
      .catch(error => {
        console.error(error);
        setLinks([]);
        setError(error.message);
      });
  }, []);

  return (
    <div>
      <h1>Mes liens</h1>
      {error && <p style={{color: "red"}}>{error}</p>}
      <ul>
        {links.map(link => (
          <li key={link.id}>
            <a href={link.url} target="_blank">{link.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
