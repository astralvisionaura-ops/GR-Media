# Shared Rules — Unternehmensweite Regeln via Symlinks

Dieses Muster erlaubt es, Rules einmal zentral zu pflegen und in beliebig viele
Projekte einzubinden — ohne Kopien und Drift.

## Setup

```bash
# 1. Zentrales Regelwerk anlegen (einmalig, company-weit)
mkdir -p ~/company-rules

# 2. Unternehmensweite Rules dort pflegen, z. B.:
#    ~/company-rules/security.md
#    ~/company-rules/code-style.md
#    ~/company-rules/compliance-baseline.md

# 3. In jedem Projekt: Symlink statt Kopie
ln -s ~/company-rules/security.md .claude/rules/security.md
ln -s ~/company-rules/code-style.md .claude/rules/code-style.md
```

## Alternativer Ansatz: Git Submodule

```bash
# Shared-Rules-Repo als Submodule einbinden
git submodule add git@github.com:myorg/claude-rules.git .claude/shared-rules

# Symlinks auf Submodule-Dateien setzen
ln -s shared-rules/security.md .claude/rules/security.md
```

## Konvention

- Unternehmensregeln werden im zentralen Repo versioniert
- Projekt-spezifische Rules liegen direkt im Projekt (keine Symlinks)
- Namenskonflikt: Projekt-Rule hat immer Vorrang (keine Merge-Logik, beide laden)
- `.gitignore` sollte Symlinks NICHT ausschließen — `git` trackt Symlinks nativ

## Hinweis für dieses Template

Die aktuellen Rules in diesem Verzeichnis sind Projekt-Templates (Platzhalter).
Beim Aufsetzen eines konkreten Projekts:
1. Unternehmensweite Rules als Symlinks einbinden
2. Projekt-spezifische Rules anpassen
3. Template-Platzhalter entfernen
