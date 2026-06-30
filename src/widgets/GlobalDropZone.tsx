/**
 * GlobalDropZone コンポーネント
 * サイト全体でファイルのドラッグ&ドロップを受け付ける
 */

import { useState, useEffect } from 'preact/hooks';
import { ui } from '@/i18n/ui';

interface GlobalDropZoneProps {
  locale?: string;
}

/** ディレクトリの全エントリを読み切る（readEntries はバッチで返るため空になるまで反復）。 */
function readAllEntries(reader: FileSystemDirectoryReader): Promise<FileSystemEntry[]> {
  return new Promise((resolve, reject) => {
    const all: FileSystemEntry[] = [];
    const readBatch = () => {
      reader.readEntries((batch) => {
        if (batch.length === 0) {
          resolve(all);
          return;
        }
        all.push(...batch);
        readBatch();
      }, reject);
    };
    readBatch();
  });
}

function entryToFile(entry: FileSystemFileEntry): Promise<File> {
  return new Promise((resolve, reject) => entry.file(resolve, reject));
}

/** FileSystemEntry を再帰的に辿り、フォルダ階層を webkitRelativePath に載せた File を集める。 */
async function collectEntry(entry: FileSystemEntry, out: File[]): Promise<void> {
  if (entry.isFile) {
    const file = await entryToFile(entry as FileSystemFileEntry);
    const rel = entry.fullPath.replace(/^\/+/, '');
    if (rel && rel !== file.name) {
      try {
        // ドロップ由来の File は webkitRelativePath が空。ここで付与して
        // zipEngine.entryName() にフォルダ階層を伝える。
        Object.defineProperty(file, 'webkitRelativePath', { value: rel, configurable: true });
      } catch {
        // 一部環境ではプロパティが固定。その場合は名前のみ（階層なし）で続行。
      }
    }
    out.push(file);
  } else if (entry.isDirectory) {
    const children = await readAllEntries((entry as FileSystemDirectoryEntry).createReader());
    for (const child of children) await collectEntry(child, out);
  }
}

/** ドロップされた複数エントリ（ファイル/フォルダ混在）を再帰展開して File 配列にする。 */
async function filesFromEntries(entries: FileSystemEntry[]): Promise<File[]> {
  const out: File[] = [];
  for (const entry of entries) await collectEntry(entry, out);
  return out;
}

export function GlobalDropZone({ locale = 'en' }: GlobalDropZoneProps) {
  const t = (ui as any)[locale] ?? ui.en;
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileCount, setFileCount] = useState(0);

  useEffect(() => {
    let dragCounter = 0;

    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      dragCounter++;
      if (dragCounter === 1) {
        setIsDragging(true);
      }
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      dragCounter--;
      if (dragCounter === 0) {
        setIsDragging(false);
      }
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      dragCounter = 0;
      setIsDragging(false);

      const dt = e.dataTransfer;
      // ドロップ直後の同期スナップショット（dataTransfer はイベント後に無効化される）。
      const flatFiles = Array.from(dt?.files || []);

      // フォルダを含むドロップは webkitGetAsEntry で再帰展開する。
      // entry の取得はイベント生存中に同期で行う必要がある。
      const entries: FileSystemEntry[] = [];
      const items = dt?.items;
      if (items) {
        for (let i = 0; i < items.length; i++) {
          const entry =
            typeof items[i].webkitGetAsEntry === 'function' ? items[i].webkitGetAsEntry() : null;
          if (entry) entries.push(entry);
        }
      }

      const dispatch = (list: File[]) => {
        setFileCount(list.length);
        window.dispatchEvent(new CustomEvent('filesDropped', { detail: list }));
      };

      if (entries.length > 0) {
        // 処理中状態に移行（フォルダ走査中もオーバーレイを表示）
        setIsProcessing(true);
        setFileCount(flatFiles.length || entries.length);
        filesFromEntries(entries)
          .then((collected) => {
            const out = collected.length > 0 ? collected : flatFiles;
            if (out.length > 0) dispatch(out);
            else setIsProcessing(false);
          })
          .catch(() => {
            // 走査に失敗したらフラットなファイル一覧でフォールバック
            if (flatFiles.length > 0) dispatch(flatFiles);
            else setIsProcessing(false);
          });
      } else if (flatFiles.length > 0) {
        setIsProcessing(true);
        dispatch(flatFiles);
      }
    };

    // ファイル処理完了イベントを受信
    const handleFilesProcessed = () => {
      setIsProcessing(false);
      setFileCount(0);
    };

    // クリップボードからのペーストを処理
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      const files: File[] = [];
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        // ファイルのみ対象（テキストは除外）
        if (item.kind === 'file') {
          const file = item.getAsFile();
          if (file) {
            files.push(file);
          }
        }
      }

      if (files.length > 0) {
        e.preventDefault();

        // 処理中状態に移行
        setIsProcessing(true);
        setFileCount(files.length);

        // 既存のドロップと同じフローに流す
        window.dispatchEvent(
          new CustomEvent('filesDropped', { detail: files })
        );
      }
    };

    // bodyにイベントリスナーを追加
    document.body.addEventListener('dragenter', handleDragEnter);
    document.body.addEventListener('dragleave', handleDragLeave);
    document.body.addEventListener('dragover', handleDragOver);
    document.body.addEventListener('drop', handleDrop);
    window.addEventListener('filesProcessed', handleFilesProcessed);
    document.addEventListener('paste', handlePaste);

    return () => {
      document.body.removeEventListener('dragenter', handleDragEnter);
      document.body.removeEventListener('dragleave', handleDragLeave);
      document.body.removeEventListener('dragover', handleDragOver);
      document.body.removeEventListener('drop', handleDrop);
      window.removeEventListener('filesProcessed', handleFilesProcessed);
      document.removeEventListener('paste', handlePaste);
    };
  }, []);

  // ドラッグ中でも処理中でもない場合は非表示
  if (!isDragging && !isProcessing) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'var(--color-primary-alpha)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        animation: 'fadeIn 0.2s ease',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--space-4)',
          padding: 'var(--space-6)',
          background: 'var(--color-surface)',
          borderRadius: 'var(--radius-md)',
          border: '3px dashed var(--color-primary)',
          boxShadow: 'var(--shadow-2)',
        }}
      >
        {isProcessing ? (
          <>
            <div style={{ fontSize: '4rem', lineHeight: 1, animation: 'spin 1s linear infinite' }}>⏳</div>
            <div
              style={{
                fontSize: 'var(--fs-4)',
                fontWeight: 600,
                color: 'var(--color-text)',
                textAlign: 'center',
              }}
            >
              {t.dzProcessing.replace('{count}', String(fileCount))}
            </div>
            <div
              style={{
                fontSize: 'var(--fs-2)',
                color: 'var(--color-subtle)',
                textAlign: 'center',
              }}
            >
              {t.dzPleaseWait}
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize: '4rem', lineHeight: 1 }}>📁</div>
            <div
              style={{
                fontSize: 'var(--fs-4)',
                fontWeight: 600,
                color: 'var(--color-text)',
                textAlign: 'center',
              }}
            >
              {t.dzDropTitle}
            </div>
            <div
              style={{
                fontSize: 'var(--fs-2)',
                color: 'var(--color-subtle)',
                textAlign: 'center',
              }}
            >
              {t.dzDropSub}
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
