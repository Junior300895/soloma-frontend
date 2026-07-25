'use client';
import { useRef, useState } from 'react';
import { ImagePlus, Loader2, X, Upload } from 'lucide-react';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUpload({ value, onChange, label = 'Image' }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState(false);

  async function handleFile(file: File) {
    if (!file.type.startsWith('image/')) {
      toast.error('Le fichier doit être une image');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image trop lourde (max 5 Mo)');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const url = res.data?.data?.url ?? res.data?.url;
      onChange(url);
      toast.success('Image uploadée');
    } catch {
      toast.error("Erreur lors de l'upload");
    } finally {
      setUploading(false);
    }
  }

  async function handleRemove() {
    if (!value) return;
    setRemoving(true);
    try {
      await api.delete('/upload', { data: { url: value } });
    } catch {
      // Si la suppression Cloudinary échoue, on efface quand même l'URL localement
    } finally {
      onChange('');
      setRemoving(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  return (
    <div>
      <label className="block text-xs font-semibold text-navy uppercase tracking-wider mb-1.5">{label}</label>

      {value ? (
        <div className="relative w-full rounded-sm overflow-hidden border border-navy/10 bg-navy/3">
          <img src={value} alt="preview" className="w-full h-48 object-cover" />
          <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-all flex items-center justify-center gap-2 opacity-0 hover:opacity-100">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={removing}
              className="bg-white text-navy px-3 py-1.5 rounded-sm text-xs font-medium flex items-center gap-1.5 shadow"
            >
              <Upload size={13} /> Changer
            </button>
            <button
              type="button"
              onClick={handleRemove}
              disabled={removing}
              className="bg-red-500 text-white px-3 py-1.5 rounded-sm text-xs font-medium flex items-center gap-1.5 shadow disabled:opacity-60"
            >
              {removing ? <Loader2 size={13} className="animate-spin" /> : <X size={13} />}
              {removing ? 'Suppression...' : 'Retirer'}
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => !uploading && inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="w-full h-36 border-2 border-dashed border-navy/20 rounded-sm flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-brand-orange hover:bg-orange-50/30 transition-all"
        >
          {uploading ? (
            <>
              <Loader2 size={22} className="text-brand-orange animate-spin" />
              <span className="text-xs text-steel">Upload en cours...</span>
            </>
          ) : (
            <>
              <ImagePlus size={22} className="text-steel" />
              <span className="text-xs text-steel">Cliquer ou glisser une image</span>
              <span className="text-[11px] text-steel/60">PNG, JPG, WEBP — max 5 Mo</span>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ''; }}
      />
    </div>
  );
}
