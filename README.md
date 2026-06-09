# ff

A small Node.js CLI that dispatches shell commands from a directory of scripts. You organize scripts by **object** (a namespace like `web`, `worker`, or `blog`) and **action** (the script name), then run:

```bash
ff <object> <action> [args...]
```

The runner lives in this repo. Your actual commands live in a separate scripts directory pointed to by `FF_SCRIPT_HOME`.

## Requirements

- Node.js (the project uses ES modules; no npm dependencies)
- Bash (scripts are executed with `bash`)

## Setup

### 1. Clone this repo

```bash
git clone <this-repo-url> ~/ff
cd ~/ff
```

No install step is required — there are no runtime dependencies beyond Node itself.

### 2. Create a scripts directory

`ff` does not ship with commands. Create a directory to hold your scripts, for example:

```bash
mkdir -p ~/ff-scripts
```

Each **object** is a subdirectory, and each **action** is an executable file inside it:

```
$FF_SCRIPT_HOME/
├── web/
│   ├── deploy
│   └── port
├── worker/
│   ├── deploy
│   └── port
└── .common/          # shared actions (see below)
    └── port/
        ├── check
        └── kill
```

Scripts are plain bash files. A shebang (`#!/usr/bin/env bash`) is recommended but not required — `ff` always invokes them via `bash`.

Make scripts executable if you want to run them directly; `ff` will run them either way.

### 3. Set `FF_SCRIPT_HOME`

This environment variable must point at your scripts root. If it is unset, `ff` exits immediately with an error.

### 4. Add a shell wrapper

The simplest way to wire everything up is a small wrapper script on your `PATH`. For example, save this as `~/bin/ff`:

```bash
#!/usr/bin/env bash
FF_SCRIPT_HOME=~/ff-scripts \
  node \
  ~/ff/index.js \
  "$@"
```

Adjust the paths to match where you cloned this repo and where your scripts live.

Alternatively, define a shell function or alias that sets `FF_SCRIPT_HOME` and calls `node /path/to/ff/index.js`.

## Usage

```bash
ff <object> <action> [args...]
```

Examples (assuming matching scripts exist under `FF_SCRIPT_HOME`):

```bash
ff web deploy staging
ff worker deploy production
ff web check
ff worker kill
```

### Help

| Command | Shows |
|---|---|
| `ff -h` or `ff --help` | All objects (top-level directories under `FF_SCRIPT_HOME`) |
| `ff <object> -h` | Actions for that object, plus its `README.md` if present |
| `ff <object> <action> -h` | The script source (useful to see what a command does before running it) |

### Per-object README

If `$FF_SCRIPT_HOME/<object>/README.md` exists, it is printed when you run `ff <object> -h`. Use this to document object-specific workflows (for example, which environment names `deploy` accepts).

## How dispatch works

When you run `ff object action arg1 arg2`, the runner resolves the script in this order:

1. **Object-specific action** — `$FF_SCRIPT_HOME/<object>/<action>`
   - If the file exists, run it with `arg1 arg2 ...` as arguments.

2. **Common action** — `$FF_SCRIPT_HOME/.common/<dependency>/<action>`
   - Some actions are shared across objects. A common action is available for an object only when that object already defines the **dependency** action (a file with the same name as the `.common` subdirectory).
   - When a common script runs, the object name is passed as `$1`, followed by any extra args.

3. **Not found** — print `Command not found!` and exit with code 1.

### Common actions example

Suppose you have services that each listen on their own port. Each object defines `port`, and shared scripts under `.common/port/` reuse that value:

```
$FF_SCRIPT_HOME/
├── web/
│   └── port              # echo 3000
├── worker/
│   └── port              # echo 4000
└── .common/
    └── port/
        ├── check         # probe whether the port is in use
        └── kill          # stop whatever is bound to the port
```

Because both `web/port` and `worker/port` exist, each object inherits `.common/port/check` and `.common/port/kill`:

```bash
ff web port               # runs web/port
ff web check              # runs .common/port/check with $1=web
ff worker kill            # runs .common/port/kill with $1=worker
```

Inside `.common/port/check`:

```bash
#!/usr/bin/env bash
port=$(ff "$1" port)
nc -z localhost "$port" && echo "listening on $port" || echo "nothing on $port"
```

Here `$1` is the object name (`web` or `worker`), so the common script can call back into object-specific actions.

Another common pattern is `.common/log/`, where objects define a `log` action that prints a log file path, and `.common/log/tail` or `.common/log/follow` read from that path with `$1` as the object name.

## Writing scripts

- **Location:** `$FF_SCRIPT_HOME/<object>/<action>` (no file extension).
- **Language:** Bash. Arguments are passed through unchanged (`$1`, `$2`, …).
- **Composition:** Scripts can call `ff` recursively to build higher-level commands.
- **Portability:** Your scripts will usually encode paths, tools, and workflows specific to your machine or projects — that is expected.

## Project layout (this repo)

| File | Purpose |
|---|---|
| `index.js` | CLI entry point |
| `ff.js` | Dispatch logic |
| `constants.js` | Reads `FF_SCRIPT_HOME` and parses `argv` |
| `help.js` | Help listing and script preview |
| `spawn.js` | Runs scripts via `child_process.spawn` |
| `exec.js` | Shell helpers used by help output |
| `fs.js` | Directory listing utilities |
| `console.js` | Formatted help output |
