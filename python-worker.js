const PYODIDE_URL = "https://cdn.jsdelivr.net/pyodide/v314.0.7/full/pyodide.mjs";
const PYODIDE_INDEX = "https://cdn.jsdelivr.net/pyodide/v314.0.7/full/";
let pyodide = null;
let readyPromise = null;

async function ensurePyodide() {
  if (pyodide) return pyodide;
  if (!readyPromise) {
    readyPromise = (async () => {
      const { loadPyodide } = await import(PYODIDE_URL);
      pyodide = await loadPyodide({ indexURL: PYODIDE_INDEX });
      return pyodide;
    })();
  }
  return readyPromise;
}

self.onmessage = async (event) => {
  const { id, type, code = "", setup = "", verify = "", display = "" } = event.data || {};

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
    py.globals.set("_pmq_verify", verify);
    py.globals.set("_pmq_display", display);

    const jsonResult = await py.runPythonAsync(`
import contextlib
import io
import json
import traceback

_pmq_stdout = io.StringIO()
_pmq_stderr = io.StringIO()
_pmq_ok = True
_pmq_verified = True
_pmq_namespace = {}

try:
    with contextlib.redirect_stdout(_pmq_stdout), contextlib.redirect_stderr(_pmq_stderr):
        exec(compile(_pmq_user_code, "<memory-quest>", "exec"), _pmq_namespace)
        if _pmq_verify:
            _pmq_verified = bool(eval(_pmq_verify, _pmq_namespace))
        if _pmq_verified and _pmq_display:
            exec(_pmq_display, _pmq_namespace)
except BaseException:
    _pmq_ok = False
    traceback.print_exc(file=_pmq_stderr)

# Only simple, bounded game values leave the isolated Python namespace.
import math

def _pmq_safe(value, depth=0):
    if type(value) in (str, bool, int) or value is None:
        return value[:200] if type(value) is str else (value if type(value) is not int or abs(value) < 10**100 else None)
    if type(value) is float:
        return value if math.isfinite(value) else None
    if depth < 2 and type(value) in (list, tuple):
        return [_pmq_safe(item, depth+1) for item in value[:12]]
    if depth < 2 and type(value) is dict:
        return {str(key)[:40]: _pmq_safe(item, depth+1) for key, item in list(value.items())[:12] if type(key) in (str, int)}
    return None

_pmq_world = {key: _pmq_safe(_pmq_namespace[key]) for key in
    ('energy', 'hp', 'coins', 'pet', 'name', 'tools', 'inventory', 'bag', 'shield', 'gate_open')
    if key in _pmq_namespace} if _pmq_ok else {}

json.dumps({
    "ok": _pmq_ok,
    "verified": _pmq_verified,
    "stdout": _pmq_stdout.getvalue(),
    "stderr": _pmq_stderr.getvalue(),
    "world": _pmq_world
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
