import React, { useEffect, useMemo, useRef, useState } from 'react';

export default function RecipeForm({ mode, initialData, onSubmit, onCancel, loading }) {
  const empty = {
    title: '', description: '', servings: '', difficulty: 'Easy',
    totalTime: '', ingredients: [''], steps: [''], imageFile: null, imageUrl: ''
  };
  const [form, setForm] = useState(initialData ?? empty);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState(null);
  const imgUrlRef = useRef(null);

  useEffect(() => { if (initialData) setForm((f) => ({ ...f, ...initialData })); }, [initialData]);

  const onField = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const setList = (key, idx, val) => setForm((f)=>{ const a=[...f[key]]; a[idx]=val; return {...f,[key]:a};});
  const addRow = (key) => setForm((f)=>({ ...f, [key]: [...f[key], ''] }));
  const removeRow = (key, idx) => setForm((f)=>({ ...f, [key]: f[key].filter((_,i)=>i!==idx) }));

  const onImage = (e) => {
    const file = e.target.files?.[0] ?? null;
    setForm((f) => ({ ...f, imageFile: file }));
    if (imgUrlRef.current) URL.revokeObjectURL(imgUrlRef.current);
    if (file) {
      imgUrlRef.current = URL.createObjectURL(file);
      setForm((f) => ({ ...f, imageUrl: imgUrlRef.current }));
    }
  };

  const isValid = useMemo(() => {
    if (!form.title.trim()) return false;
    if (String(form.totalTime).trim()==='' || isNaN(Number(form.totalTime))) return false;
    if (String(form.servings).trim()==='' || isNaN(Number(form.servings))) return false;
    if (!form.ingredients.some(x=>x.trim())) return false;
    if (!form.steps.some(x=>x.trim())) return false;
    return true;
  }, [form]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid || saving) return;
    try {
      setSaving(true); setErr(null);
      await onSubmit({
        title: form.title.trim(),
        description: form.description.trim(),
        servings: Number(form.servings),
        difficulty: form.difficulty,
        totalTime: Number(form.totalTime),
        ingredients: form.ingredients.filter(Boolean).map(s=>s.trim()),
        steps: form.steps.filter(Boolean).map(s=>s.trim()),
        imageFile: form.imageFile,
        imageUrl: form.imageUrl?.startsWith('blob:') ? '' : form.imageUrl,
      });
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
          {form.ingredients.map((v,i)=>(
            <div className="d-flex gap-2" key={i}>
              <input className="form-control" placeholder="Ingredient + Quantity"
                value={v} onChange={(e)=>setList('ingredients', i, e.target.value)} />
              <button type="button" className="btn btn-outline-secondary"
                onClick={()=>removeRow('ingredients', i)} disabled={form.ingredients.length===1}>Remove</button>
            </div>
          ))}
        </div>
        <button type="button" className="btn btn-primary mt-2" onClick={()=>addRow('ingredients')}>+ Add Ingredient</button>
      </fieldset>

      <fieldset className="mb-4">
        <legend>Steps</legend>
        <ol className="list-unstyled d-flex flex-column gap-2">
          {form.steps.map((v,i)=>(
            <li className="d-flex gap-2" key={i}>
              <textarea rows={2} className="form-control" placeholder={`Describe step ${i+1}…`}
                value={v} onChange={(e)=>setList('steps', i, e.target.value)} />
              <button type="button" className="btn btn-outline-secondary"
                onClick={()=>removeRow('steps', i)} disabled={form.steps.length===1}>Remove</button>
            </li>
          ))}
        </ol>
        <button type="button" className="btn btn-primary" onClick={()=>addRow('steps')}>+ Add Step</button>
      </fieldset>

      <fieldset className="mb-4">
        <legend>Photo (optional)</legend>
        {form.imageUrl && <img src={form.imageUrl} alt="Recipe" className="img-fluid rounded mb-2" style={{maxWidth:320}} />}
        <input type="file" accept="image/*" onChange={onImage} />
      </fieldset>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary" disabled={!isValid || loading || saving}>
          {loading || saving ? 'Saving…' : (mode === 'edit' ? 'Save Changes' : 'Save Recipe')}
        </button>
        <button type="button" className="btn btn-outline-secondary" onClick={onCancel} disabled={saving}>Cancel</button>
      </div>
    </form>
  );
}