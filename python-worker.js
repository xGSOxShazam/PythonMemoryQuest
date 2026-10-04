const PYODIDE_URL = "https://cdn.jsdelivr.net/pyodide/v314.0.7/full/pyodide.js";
const PYODIDE_INDEX = "https://cdn.jsdelivr.net/pyodide/v314.0.7/full/";
let pyodide = null;
let readyPromise = null;

async function ensurePyodide() {
  if (pyodide) return pyodide;
  if (!readyPromise) {
    readyPromise = (async () => {
      importScripts(PYODIDE_URL);
      pyodide = await loadPyodide({ indexURL: PYODIDE_INDEX });
      return pyodide;
    })();
  }
  return readyPromise;
}

self.onmessage = async (event) => {
  const { id, type, code = "", setup = "" } = event.data || {};

  if (type === "warmup") {
    try {
      await ensurePyodide();
      self.postMessage({ id, type: "ready" });
    } catch (error) {
      self.postMessage({ id, type: "runtime-error", error: String(error) });
    }
    return;
  }

  if (type !== "run") return;

  try {
    const py = await ensurePyodide();
    const fullCode = setup ? setup + "\n" + code : code;
    py.globals.set("_pmq_user_code", fullCode);

    const jsonResult = await py.runPythonAsync(`
import contextlib
import io
import json
import traceback

_pmq_stdout = io.StringIO()
_pmq_stderr = io.StringIO()
_pmq_ok = True

try:
    with contextlib.redirect_stdout(_pmq_stdout), contextlib.redirect_stderr(_pmq_stderr):
        exec(compile(_pmq_user_code, "<memory-quest>", "exec"), {})
except BaseException:
    _pmq_ok = False
    traceback.print_exc(file=_pmq_stderr)

json.dumps({
    "ok": _pmq_ok,
    "stdout": _pmq_stdout.getvalue(),
    "stderr": _pmq_stderr.getvalue()
})
`);

    self.postMessage({ id, type: "result", result: JSON.parse(jsonResult) });
  } catch (error) {
    self.postMessage({ id, type: "runtime-error", error: String(error) });
  }
};

ensurePyodide()
  .then(() => self.postMessage({ type: "ready" }))
  .catch((error) => self.postMessage({ type: "runtime-error", error: String(error) }));
