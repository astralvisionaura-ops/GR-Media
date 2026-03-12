# Setup — Neues Projekt starten

Kurzanleitung: Master Template → neues Projekt in 5 Schritten.

---

## Schritt 1 — Projektverzeichnis anlegen

```bash
mkdir ~/MeinProjekt
cp -r ~/ClaudeCode/. ~/MeinProjekt/
cd ~/MeinProjekt
```

> Falls das Template als Git-Repo vorliegt:
> ```bash
> git clone git@github.com:astralvisionaura-ops/Master-Template.git MeinProjekt
> cd MeinProjekt
> rm -rf .git          # Git-History des Templates entfernen
> git init             # Neues Repo für das Projekt starten
> ```

---

## Schritt 2 — Claude Code starten

```bash
claude
```

Beim ersten Start: **"1. Yes, I trust this folder"** wählen.

**Erwartete Ausgabe** (unsichtbar — wird als Kontext injiziert, nicht angezeigt):
```
[SESSION START] [PROJECT NAME] | Class: [...] | Phase: INIT | Domain: [...] | Last session: —
```
→ Wenn Claude auf `Was ist das aktuelle Projekt?` mit den CLAUDE.md-Werten antwortet: Hook funktioniert. ✓

---

## Schritt 3 — Projekt initialisieren

Im Claude-Chat:

```
/init-project
```

> **Hinweis**: Beim ersten Aufruf erscheint kurz `Unknown skill: init-project` — das ist kosmetisch.
> Der Skill läuft trotzdem korrekt durch.

---

## Schritt 4 — Init-Workflow durchlaufen (8 Steps)

| Step | Was passiert | Deine Eingabe |
|------|--------------|---------------|
| 1 | Strukturvalidierung | — (automatisch) |
| 2 | Strategischer Kontext | `Ja` oder `Nein` |
| 3 | Discovery (Stack, Domain, Regulatory) | Projektbeschreibung bestätigen |
| 4 | Best Practices T1 | — (automatisch) |
| 5 | Compliance-Audit | — (automatisch) |
| 6 | CLAUDE.md + Audit-Log schreiben | Edits bestätigen |
| 7 | Integritätsprüfung | — (automatisch) |
| 8 | Handover | Projektname + Class bestätigen |

Am Ende von Step 8 bist du in **Phase: SPECIFICATION** und kannst mit der Architektur beginnen.

---

## Schritt 5 — PRD-Grundlage befüllen

Zwei Dateien sind für GATE-02 Pflicht:

```
docs/prd/prd_spec-overview.md     ← Scope, Vision, Out-of-Scope
docs/prd/prd_spec-requirements.md ← Funktionale Anforderungen
```

Empfohlener Einstieg:

```
/team-consult requirements — Hilf mir prd_spec-overview.md auszufüllen
```

---

## Nächste Schritte nach Init

```
/gate-check 01     → Architektur-Review (nach core_arch-*.md befüllen)
/gate-check 02     → Scope-Bestätigung (nach PRD finalisieren)
/team-consult      → Architektur-, Backend-, Frontend-Entscheidungen
/compliance-audit  → Vollständiges Compliance-Audit bei Bedarf
```

---

## Troubleshooting

| Problem | Ursache | Fix |
|---------|---------|-----|
| `Unknown skill: init-project` | Skills noch nicht im Index | Ignorieren — Skill läuft |
| SessionStart Hook zeigt nichts | Korrekt — Output geht an Claude, nicht Terminal | Claude nach Projekt fragen |
| `Error editing file` beim Init | Datei gesperrt oder leer | Retry — Claude versucht es erneut |
| Agent-Tool nicht verfügbar | `context: fork` Limitation | Inline-Fallback aktiv, Qualität gleich |
