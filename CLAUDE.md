# CLAUDE.md — Instruktioner til Claude Code

## Projektbeskrivelse

Dette er en React + Supabase SPA (Single Page Application) bygget som eksamensopgave på 2. semester multimediedesign. Projektet er en "bettor"-app hvor brugere kan lave og følge bets.

Stack: React 19, React Router 7, Vite, Supabase (via REST API med fetch — ikke supabase-js klienten).

---

## Kodestil — match lærerens stil (Rasmus Cederdorff)

### Generelle regler

- Brug **function declarations** til page-komponenter, **arrow functions** til simple komponenter kan bruges men ikke blandes tilfældigt
- Brug **named exports** til komponenter i `components/`, **default exports** til pages i `pages/`
- Skriv **dansk** i UI-tekster og kommentarer hvis nødvendigt
- Filnavne: PascalCase til komponenter (`BetCard.jsx`), camelCase til utilities
- Hold det simpelt — ingen TypeScript, ingen komplekse abstraktioner

### Supabase / fetch-mønster

Brug **fetch direkte mod Supabase REST API** (ikke supabase-js klienten), sådan som det allerede er sat op i `BetsPage.jsx`:

```js
const URL = import.meta.env.VITE_SUPABASE_URL;
const headers = {
  apikey: import.meta.env.VITE_SUPABASE_APIKEY,
  "Content-Type": "application/json",
};
```

Fetch-kald skal altid ligge i **async functions inde i `useEffect`**:

```js
useEffect(() => {
  async function getData() {
    const response = await fetch(URL + "/tabel", { headers });
    const data = await response.json();
    setState(data);
  }
  getData();
}, []);
```

Til POST/PATCH/DELETE:

```js
async function handleSubmit(event) {
  event.preventDefault();
  const response = await fetch(URL + "/tabel", {
    method: "POST",
    headers,
    body: JSON.stringify({ felt: værdi }),
  });
  // naviger videre eller opdater state
}
```

### Formularer — kontrollerede inputs

Brug altid **controlled forms** med `useState`:

```jsx
const [title, setTitle] = useState("");

<input value={title} onChange={e => setTitle(e.target.value)} />
```

### Routing

Brug React Router med `<Routes>` og `<Route>` i `App.jsx`. Links bruger `<NavLink>` i nav og `<Link>` andre steder. Parametre hentes med `useParams()`.

---

## Projektstruktur

```
src/
  App.jsx              # Routes + navbar
  main.jsx             # BrowserRouter setup
  supabaseClient.js    # (ikke i brug — brug fetch direkte)
  components/
    BetCard.jsx        # Kort-visning af et bet
  pages/
    HomePage.jsx
    BetsPage.jsx       # Henter og viser alle bets
  css/
    App.css
    index.css
```

---

## Arbejdsmetode — vigtigt

**Lav altid ændringer i SMÅ bidder** så der kan committes hyppigt. En typisk bid er:

1. Én ny komponent ELLER
2. Én ny side ELLER
3. Ét nyt feature på en eksisterende side (f.eks. tilføj form, tilføj delete-knap)

Sig aldrig "her er hele løsningen" og dump al koden på én gang. Spørg hvad næste lille skridt er, eller lav kun det allernødvendigste og stop.

---

## Studerende-stil

Koden skal se ud som om en studerende har skrevet den — ikke en senior dev. Det betyder:

- Ingen fancy abstraktioner eller custom hooks (medmindre læreren har vist det)
- Inline styling undgås — brug CSS-klasser
- State og logik lever direkte i komponenterne, ikke udtrukket i utilities
- Kommentarer må gerne mangle eller være korte og direkte
- Det er OK at gentage sig lidt (f.eks. kopiere headers til hver fil der bruger fetch)
- Ingen error boundaries, ingen suspense, ingen avanceret state management
- `console.log` til debugging er helt fint at efterlade

---

## Hvad må ikke ændres

- `.env` og `.env.example` — rør dem ikke
- `supabaseClient.js` — ignoreres, brug fetch-pattern i stedet
- Eksisterende CSS-struktur — tilføj nye klasser, omdøb ikke gamle

---

## Datamodel (kort reference)

### Vigtigste tabeller

**`bets`**: `id`, `creator_id` (FK users), `group_id` (nullable), `description`, `status` (`pending`/`active`/`resolved`/`rejected`/`cancelled`)

**`bet_participants`**: `bet_id`, `user_id`, `role` (`creator`/`counterparty`), `acceptance` (`pending`/`accepted`/`rejected`), `is_winner`

**`stakes`**: `bet_id` (unique — 1:1 med bet), `description`, `emoji`, `kind`, `amount`, `is_custom`

**`stake_templates`**: genbrugelige indsatser, `owner_id` (null = global), `description`, `emoji`, `kind`

**`users`**: `id`, `username`, `name`, `avatar`

**`groups`**: `id`, `name`, `owner_id`

### Opret bet — rækkefølge af kald

```
1. POST /bets           → { creator_id, description, status: "pending" }  → få id retur
2. POST /bet_participants → [{ bet_id, user_id: creator_id, role: "creator", acceptance: "accepted" },
                             { bet_id, user_id: modstander_id, role: "counterparty", acceptance: "pending" }]
3. POST /stakes         → { bet_id, description, emoji, kind }
```

Brug `Prefer: return=representation` header ved POST for at få den nye række retur (inkl. `id`).

### REST-filter eksempler

```
/users?select=id,username,name,avatar&order=name.asc
/stake_templates?owner_id=is.null&select=*        # globale templates
/bets?id=eq.5&select=*,stake:stakes(*)
```
