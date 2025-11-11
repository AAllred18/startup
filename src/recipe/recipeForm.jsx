import React, { useEffect, useMemo, useRef, useState } from 'react';

export default function RecipeForm({ mode, initialData, onSubmit, onCancel, loading }) {
  // -- helpers to coerce incoming props into form-friendly shape --
  const normalizeFromProps = (r = {}) => {
    const toMinutesNumber = (v) => {
      if (v === null || v === undefined) return '';
      if (typeof v === 'number' && Number.isFinite(v)) return v;
      const m = String(v).match(/\d+/);
      return m ? Number(m[0]) : '';
    };
    return {
      title: r.title ?? '',
      description: r.description ?? '',
      servings: Number.isFinite(Number(r.servings)) ? Number(r.servings) : '',
      difficulty: r.difficulty ?? 'Easy',
      totalTime: toMinutesNumber(r.totalTime), // expect a number input (minutes)
      ingredients: Array.isArray(r.ingredients) && r.ingredients.length ? r.ingredients : [''],
      steps: Array.isArray(r.steps) && r.steps.length ? r.steps : [''],
      imageFile: null,
      imageUrl: r.imageUrl ?? '',
    };
  };

  const empty = {
    title: '', description: '', servings: '', difficulty: 'Easy',
    totalTime: '', ingredients: [''], steps: [''], imageFile: null, imageUrl: ''
  };

  const [form, setForm] = useState(initialData ? normalizeFromProps(initialData) : empty);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState(null);
  const imgUrlRef = useRef(null);

  // when the parent gives us new initialData (edit page after fetch), normalize it
  useEffect(() => {
    if (initialData) setForm(prev => ({ ...prev, ...normalizeFromProps(initialData) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData]);

  // ----- field setters -----
  const onField = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const setList = (key, idx, val) => setForm((f) => {
    const base = Array.isArray(f[key]) ? f[key] : [''];
    const a = [...base];
    a[idx] = val;
    return { ...f, [key]: a };
  });

  const addRow = (key) => setForm((f) => {
    const base = Array.isArray(f[key]) ? f[key] : [''];
    return { ...f, [key]: [...base, ''] };
  });

  const removeRow = (key, idx) => setForm((f) => {
    const base = Array.isArray(f[key]) ? f[key] : [''];
    const a = base.filter((_, i) => i !== idx);
    return { ...f, [key]: a.length ? a : [''] };
  });

  const onImage = (e) => {
    const file = e.target.files?.[0] ?? null;
    setForm((f) => ({ ...f, imageFile: file }));
    if (imgUrlRef.current) URL.revokeObjectURL(imgUrlRef.current);
    if (file) {
      imgUrlRef.current = URL.createObjectURL(file);
      setForm((f) => ({ ...f, imageUrl: imgUrlRef.current }));
    }
  };

  // protect against undefined arrays at render-time too
  const safeIngredients = Array.isArray(form.ingredients) && form.ingredients.length ? form.ingredients : [''];
  const safeSteps = Array.isArray(form.steps) && form.steps.length ? form.steps : [''];

  // ----- validation -----
  const isValid = useMemo(() => {
    if (!String(form.title).trim()) return false;
    if (String(form.totalTime).trim() === '' || isNaN(Number(form.totalTime))) return false;
    if (String(form.servings).trim() === '' || isNaN(Number(form.servings))) return false;
    if (!safeIngredients.some(x => String(x).trim())) return false;
    if (!safeSteps.some(x => String(x).trim())) return false;
    return true;
  }, [form, safeIngredients, safeSteps]);

  // ----- submit -----
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid || saving) return;
    try {
      setSaving(true); setErr(null);

      const payload = {
        title: String(form.title).trim(),
        description: String(form.description).trim(),
        servings: Number(form.servings),
        difficulty: form.difficulty,
        totalTime: Number(form.totalTime), // minutes
        ingredients: safeIngredients.filter(Boolean).map(s => String(s).trim()),
        steps: safeSteps.filter(Boolean).map(s => String(s).trim()),
        imageFile: form.imageFile,
        // if user selected a file, imageUrl will be a blob; let backend ignore blob: and keep old URL
        imageUrl: form.imageUrl?.startsWith('blob:') ? '' : form.imageUrl,
      };

      await onSubmit(payload);
    } catch (e) {
      setErr(e?.message || 'Failed to save recipe.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {err && <div className="alert alert-danger mb-3">{err}</div>}

      <fieldset className="mb-4">
        <legend>Basics</legend>

        <div className="mb-3">
          <label htmlFor="title">Recipe Title <span>*</span></label>
          <input id="title" className="form-control" placeholder="Recipe Name"
            value={form.title} onChange={onField('title')} required />
        </div>

        <div className="mb-3">
          <label htmlFor="desc">Short Description</label>
          <textarea id="desc" className="form-control" maxLength={200}
            placeholder="Enter a short description"
            value={form.description} onChange={onField('description')} />
        </div>

        <div className="mb-3">
          <label htmlFor="servings">Servings</label>
          <input id="servings" type="number" min={1} step={1}
            className="form-control mb-3" value={form.servings} onChange={onField('servings')} />

          <label htmlFor="difficulty">Difficulty</label>
          <select id="difficulty" className="form-select mb-3"
            value={form.difficulty} onChange={onField('difficulty')}>
            <option>Easy</option><option>Medium</option><option>Hard</option>
          </select>

          <label htmlFor="totalTime">Total Time (min)</label>
          <input id="totalTime" type="number" min={0} step={1}
            className="form-control mb-3" value={form.totalTime} onChange={onField('totalTime')} />
        </div>
      </fieldset>

      <fieldset className="mb-4">
        <legend>Ingredients</legend>
        <div className="d-flex flex-column gap-2">
          {safeIngredients.map((v, i) => (
            <div className="d-flex gap-2" key={i}>
              <input
                className="form-control"
                placeholder="Ingredient + Quantity"
                value={v}
                onChange={(e) => setList('ingredients', i, e.target.value)}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => removeRow('ingredients', i)}
                disabled={safeIngredients.length === 1}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button type="button" className="btn btn-primary mt-2" onClick={() => addRow('ingredients')}>
          + Add Ingredient
        </button>
      </fieldset>

      <fieldset className="mb-4">
        <legend>Steps</legend>
        <ol className="list-unstyled d-flex flex-column gap-2">
          {safeSteps.map((v, i) => (
            <li className="d-flex gap-2" key={i}>
              <textarea
                rows={2}
                className="form-control"
                placeholder={`Describe step ${i + 1}…`}
                value={v}
                onChange={(e) => setList('steps', i, e.target.value)}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => removeRow('steps', i)}
                disabled={safeSteps.length === 1}
              >
                Remove
              </button>
            </li>
          ))}
        </ol>
        <button type="button" className="btn btn-primary" onClick={() => addRow('steps')}>
          + Add Step
        </button>
      </fieldset>

      <fieldset className="mb-4">
        <legend>Photo (optional)</legend>
        {form.imageUrl && (
          <img
            src={form.imageUrl}
            alt="Recipe"
            className="img-fluid rounded mb-2"
            style={{ maxWidth: 320 }}
          />
        )}
        <input type="file" accept="image/*" onChange={onImage} />
      </fieldset>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary" disabled={!isValid || loading || saving}>
          {loading || saving ? 'Saving…' : (mode === 'edit' ? 'Save Changes' : 'Save Recipe')}
        </button>
        <button type="button" className="btn btn-outline-secondary" onClick={onCancel} disabled={saving}>
          Cancel
        </button>
      </div>
    </form>
  );
}
