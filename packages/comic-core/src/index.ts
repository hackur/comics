export type ComicSource =
  | { kind: "file"; file: File }
  | { kind: "blob"; blob: Blob; name: string }
  | { kind: "url"; url: string; name?: string }
  | { kind: "directory"; handle: FileSystemDirectoryHandle };

export type ComicFormat = "cbz" | "cbr" | "cbt" | "pdf" | "images" | "unknown";

export interface ComicPage {
  id: string;
  index: number;
  name: string;
  width?: number;
  height?: number;
  getBlob(): Promise<Blob>;
  getObjectUrl(): Promise<string>;
}

export interface ComicBook {
  id: string;
  title: string;
  format: ComicFormat;
  pageCount: number;
  pages: ComicPage[];
  cover?: ComicPage;
  metadata?: Record<string, unknown>;
}

export interface ComicExtractor {
  canOpen(source: ComicSource): Promise<boolean>;
  open(source: ComicSource): Promise<ComicBook>;
}

export interface ReadingState {
  currentPage: number;
  zoom: number;
  rotation: number;
  fitMode: "width" | "height" | "best" | "original";
  readingDirection: "ltr" | "rtl";
  viewMode: "single" | "spread" | "strip";
}

export interface ComicLibraryItem {
  id: string;
  title: string;
  format: ComicFormat;
  coverUrl?: string;
  lastRead?: Date;
  progress?: number;
  fileSize?: number;
  addedAt: Date;
}