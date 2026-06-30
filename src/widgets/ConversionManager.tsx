/**
 * ConversionManager (create-zip).
 * 複数ファイルを集めて 1 つの .zip を作る。画像変換ツールとは UX が異なるため、
 * 画像用 frozen 部品（SettingsPanel / ToastNotification / ConversionJob）は使わず自前。
 * すべてメインスレッド（@zip.js、サーバー不要）。
 */

import { useState, useEffect, useCallback, useRef } from 'preact/hooks';
import { AppCard } from './AppCard';
import { AppButton } from './AppButton';
import { ErrorToast } from './ErrorToast';
import { createZip } from '@/utils/zipEngine';
import { ui } from '@/i18n/ui';

interface ErrorToastItem {
  id: string;
  message: string;
}

function humanSize(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

interface ConversionManagerProps {
  locale?: string;
}

export function ConversionManager({ locale = 'en' }: ConversionManagerProps) {
  const t = (ui as any)[locale] ?? ui.en;
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<{ index: number; total: number } | null>(null);
  const [errorToasts, setErrorToasts] = useState<ErrorToastItem[]>([]);
  const filesRef = useRef<File[]>([]);
  filesRef.current = files;

  const showErrorToast = useCallback((message: string) => {
    const id = `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setErrorToasts((prev) => [...prev, { id, message }]);
  }, []);
  const removeErrorToast = useCallback((id: string) => {
    setErrorToasts((prev) => prev.filter((e) => e.id !== id));
  }, []);

  // ハイドレーション完了シグナル（E2E）
  useEffect(() => {
    (globalThis as Record<string, unknown>).__toolReady = true;
  }, []);

  const addFiles = useCallback((incoming: File[]) => {
    if (incoming.length === 0) return;
    setFiles((prev) => [...prev, ...incoming]);
    window.dispatchEvent(new CustomEvent('filesProcessed'));
  }, []);

  useEffect(() => {
    const handler = (e: Event) => addFiles((e as CustomEvent<File[]>).detail);
    window.addEventListener('filesDropped', handler);
    return () => window.removeEventListener('filesDropped', handler);
  }, [addFiles]);

  const removeAt = (i: number) => setFiles((prev) => prev.filter((_, idx) => idx !== i));
  const clearAll = () => setFiles([]);

  const handleCreate = useCallback(async () => {
    const current = filesRef.current;
    if (current.length === 0 || busy) return;
    setBusy(true);
    setProgress({ index: 0, total: current.length });
    try {
      const blob = await createZip(current, (p) => setProgress({ index: p.index, total: p.total }));
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'archive.zip';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      showErrorToast(error instanceof Error ? error.message : (t.errConversionFailed ?? 'Failed'));
    } finally {
      setBusy(false);
      setProgress(null);
    }
  }, [busy, showErrorToast, t]);

  const totalSize = files.reduce((s, f) => s + f.size, 0);

  return (
    <div>
      <AppCard>
        <div style="margin-bottom: var(--space-4);">
          <h3 style="margin: 0 0 var(--space-1) 0; font-size: var(--fs-4); font-weight: 600;">
            {t.uploadHeading}
          </h3>
          <p style="margin: 0; font-size: var(--fs-2); color: var(--color-subtle);">
            {t.uploadSubtitle}
          </p>
        </div>

        <div
          style={{
            padding: 'var(--space-6)',
            border: '2px dashed var(--color-border)',
            borderRadius: 'var(--radius-md)',
            background: 'var(--color-surface)',
            textAlign: 'center',
            marginBottom: 'var(--space-4)',
            cursor: 'pointer',
          }}
          onClick={() => document.getElementById('file-input')?.click()}
        >
          <div style="font-size: 3rem; margin-bottom: var(--space-2);">🗜️</div>
          <div style="font-size: var(--fs-3); font-weight: 600; margin-bottom: var(--space-2);">
            {t.dropClick}
          </div>
          <div style="font-size: var(--fs-1); color: var(--color-subtle);">{t.dropOr}</div>
          <div style="font-size: var(--fs-1); color: var(--color-subtle); margin-top: var(--space-1);">
            {t.dropSupported}
          </div>
          <input
            id="file-input"
            type="file"
            multiple
            onChange={(e) => {
              addFiles(Array.from(e.currentTarget.files || []));
              e.currentTarget.value = '';
            }}
            style="display: none;"
          />
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; gap: var(--space-3); margin-bottom: var(--space-4);">
          <span style="font-size: var(--fs-2); color: var(--color-subtle);">
            <span class="num">{files.length}</span> · <span class="num">{humanSize(totalSize)}</span>
          </span>
          <span style="display: flex; gap: var(--space-2);">
            {files.length > 0 && (
              <AppButton variant="secondary" onClick={clearAll}>{t.clearAll}</AppButton>
            )}
            <button
              id="create-zip-action"
              onClick={handleCreate}
              disabled={files.length === 0 || busy}
              class="app-button app-button--primary"
            >
              {busy && progress
                ? `${t.creatingZip ?? 'Creating'} ${progress.index + 1}/${progress.total}`
                : (t.createZipButton ?? 'Create ZIP')}
            </button>
          </span>
        </div>

        {files.length > 0 && (
          <div style="display: flex; flex-direction: column; gap: var(--space-2);">
            {files.map((f, i) => (
              <div
                key={`${f.name}-${i}`}
                style="display: flex; justify-content: space-between; align-items: center; padding: var(--space-2) var(--space-3); background: var(--color-bg); border: 1px solid var(--color-border); border-radius: var(--radius-sm);"
              >
                <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{f.name}</span>
                <span style="display: flex; gap: var(--space-3); align-items: center; flex-shrink: 0;">
                  <span style="font-size: var(--fs-1); color: var(--color-subtle);" class="num">{humanSize(f.size)}</span>
                  <button
                    aria-label={t.removeFile ?? 'Remove'}
                    onClick={() => removeAt(i)}
                    style="background: none; border: none; cursor: pointer; color: var(--color-danger); font-size: var(--fs-3);"
                  >×</button>
                </span>
              </div>
            ))}
          </div>
        )}
      </AppCard>

      {errorToasts.length > 0 && (
        <div className="error-toast-container" aria-label={t.notificationsAria}>
          {errorToasts.map((toast) => (
            <ErrorToast key={toast.id} id={toast.id} message={toast.message} onClose={removeErrorToast} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}
