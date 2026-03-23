"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useMemo, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createBlogPostAction } from "./actions";
import { slugify } from "@/lib/data";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false }) as any;

// Register a simple horizontal rule embed so we can insert <hr />
let Quill: any = null;
if (typeof window !== "undefined") {
  // Avoid double registration during Fast Refresh
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const rq = require("react-quill");
  Quill = rq.Quill || rq.default?.Quill || null;
  if (Quill && !(Quill as any).__atibhaDividerRegistered) {
    const BlockEmbed = Quill.import("blots/block/embed");
    class DividerBlot extends BlockEmbed { }
    DividerBlot.blotName = "divider";
    DividerBlot.tagName = "hr";
    Quill.register(DividerBlot);
    (Quill as any).__atibhaDividerRegistered = true;
  }
}

const MAX_IMAGE_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED_IMAGE_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

// Helper to validate if a URL is a valid http/https URL or empty
function isValidImageUrl(url: string): boolean {
  if (!url || typeof url !== "string") return true; // Allow empty/undefined
  const trimmed = url.trim();
  if (!trimmed) return true; // Allow empty string
  // Allow any valid http:// or https:// URL
  return /^https?:\/\/.+/i.test(trimmed);
}

export default function BlogCreateForm() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [contentHtml, setContentHtml] = useState("");
  const [contentError, setContentError] = useState<string | null>(null);
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [image, setImage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const quillRef = useRef<any>(null);

  const quillModules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline"],
          [{ list: "bullet" }, { list: "ordered" }],
          ["blockquote"],
          [{ align: ["", "center", "right"] }],
          ["link", "image", "divider"],
        ],
        handlers: {
          divider: () => {
            const editor = quillRef.current?.getEditor?.();
            if (!editor) return;
            const range = editor.getSelection(true) ?? { index: editor.getLength(), length: 0 };
            editor.insertEmbed(range.index, "divider", true, "user");
            editor.setSelection(range.index + 1, 0);
          },
          image: () => {
            const url = window.prompt("Paste an image URL, or press Cancel to upload a file.");
            if (url && url.trim()) {
              const editor = quillRef.current?.getEditor?.();
              if (!editor) return;
              const range = editor.getSelection(true) ?? { index: editor.getLength(), length: 0 };
              editor.insertText(range.index, "\n");
              editor.insertEmbed(range.index + 1, "image", url.trim(), "user");
              editor.insertText(range.index + 2, "\n");
              editor.setSelection(range.index + 3, 0);
              setImageUploadError(null);
              return;
            }

            const input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/*");
            input.click();

            input.onchange = async () => {
              const file = input.files?.[0];
              if (!file) return;

              if (file.size > MAX_IMAGE_BYTES) {
                setImageUploadError("Image size must be less than 10 MB.");
                return;
              }

              if (!ALLOWED_IMAGE_MIME_TYPES.includes(file.type)) {
                setImageUploadError("Only JPG, JPEG, PNG or WEBP images are allowed.");
                return;
              }

              setImageUploadError(null);

              const reader = new FileReader();
              reader.onload = () => {
                const editor = quillRef.current?.getEditor?.();
                if (!editor) return;

                const range = editor.getSelection(true) ?? { index: editor.getLength(), length: 0 };
                const dataUrl = String(reader.result ?? "");

                editor.insertText(range.index, "\n");
                editor.insertEmbed(range.index + 1, "image", dataUrl, "user");
                editor.insertText(range.index + 2, "\n");
                editor.setSelection(range.index + 3, 0);
              };
              reader.readAsDataURL(file);
            };
          },
        },
      },
    }),
    [setImageUploadError]
  );

  const quillFormats = useMemo(
    () => [
      "header",
      "bold",
      "italic",
      "underline",
      "list",
      "bullet",
      "align",
      "blockquote",
      "link",
      "image",
      "divider",
    ],
    []
  );

  const isContentEmpty = (html: string) => {
    // Allow image-only posts (Quill stores them as <img .../> in HTML)
    if (/<img\b/i.test(html)) return false;
    const textOnly = html
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<[^>]*>/g, " ")
      .replace(/&nbsp;/g, " ")
      .trim();
    return textOnly.length === 0;
  };

  const slugPreview = useMemo(() => slugify(title), [title]);

  // Show loading state while checking session
  if (status === "loading") {
    return (
      <div className="p-4 sm:p-6 md:p-8 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
          <p className="font-body text-sm text-muted">Loading...</p>
        </div>
      </div>
    );
  }

  // Show login required message if no session
  if (status === "unauthenticated" || !session) {
    return (
      <div className="p-4 sm:p-6 md:p-8">
        <div className="max-w-3xl mx-auto w-full">
          <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 md:p-12 text-center">
            <div className="mb-6">
              <svg
                className="w-16 h-16 mx-auto text-gold"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl text-ink mb-4" style={{ fontWeight: 400 }}>
              Login Required
            </h1>
            <p className="font-body text-sm text-muted mb-8 max-w-md mx-auto">
              Login required to write a blog.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/login?callbackUrl=/admin/write-blog" className="a-btn">
                Sign In
              </Link>
              <Link href="/admin/blog" className="font-body text-xs text-gold tracking-widest uppercase hover:underline">
                Back to Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 pt-[140px] sm:pt-0" style={{ fontFamily: "var(--font-body)" }}>
      {/* Mobile Header - Only visible on mobile */}
      <div className="sm:hidden mb-4 mt-0 pt-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-display text-xl text-ink" style={{ fontWeight: 400 }}>Create Blog Post</h1>
        </div>
        <p className="font-body text-sm text-muted">Write and publish a new article</p>
      </div>

      {/* Desktop Header */}
      <div className="hidden sm:flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
        <div className="flex-1 min-w-0">
          <h1 className="font-display text-2xl sm:text-3xl text-ink break-words" style={{ fontWeight: 400 }}>Create Blog Post</h1>
          <p className="font-body text-sm text-muted mt-1">Write and publish a new article</p>
        </div>
        <Link href="/admin/blog" className="font-body text-xs text-gold tracking-widest uppercase hover:underline whitespace-nowrap">
          Back to Posts
        </Link>
      </div>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (isContentEmpty(contentHtml)) {
            setContentError("Please write some content before publishing.");
            return;
          }
          // Validate featured image URL if provided
          if (image && !isValidImageUrl(image)) {
            setImageUploadError("Please enter a valid URL starting with http:// or https://");
            return;
          }
          setContentError(null);
          setImageUploadError(null);
          setIsSubmitting(true);

          try {
            const formData = new FormData(e.currentTarget);
            const post = await createBlogPostAction(formData);
            // Navigate to the new post (now saved in Firestore)
            router.push(`/blog/${post.slug}`);
          } catch (err) {
            setContentError(err instanceof Error ? err.message : "Failed to create post. Please try again.");
            setIsSubmitting(false);
          }
        }}
        className="bg-white rounded-lg shadow-sm p-4 sm:p-6 md:p-8"
      >
        <div className="grid gap-4 sm:gap-6">
          {/* Title */}
          <div className="w-full min-w-0">
            <label className="font-body text-xs tracking-widest uppercase text-muted block mb-2">
              Title
            </label>
            <input
              name="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white border border-gray-200 px-4 py-3 font-body text-sm text-ink outline-none focus:border-gold/60 rounded-md transition-colors"
              placeholder="Your headline..."
            />
            <div className="font-body text-xs text-muted mt-2 break-words">
              Slug:{" "}
              <span className="text-ink">
                {slugPreview || <span className="text-muted/70">—</span>}
              </span>
            </div>
          </div>

          {/* Author */}
          <div className="w-full min-w-0">
            <label className="font-body text-xs tracking-widest uppercase text-muted block mb-2">
              Author
            </label>
            <input
              name="author"
              required
              className="w-full bg-white border border-gray-200 px-4 py-3 font-body text-sm text-ink outline-none focus:border-gold/60 rounded-md transition-colors"
              placeholder="Your name..."
            />
          </div>

          {/* Featured Image */}
          <div className="w-full min-w-0">
            <label className="font-body text-xs tracking-widest uppercase text-muted block mb-2">
              Featured Image (URL)
            </label>
            <input
              name="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              onBlur={() => {
                if (image && !isValidImageUrl(image)) {
                  setImageUploadError("Please enter a valid URL starting with http:// or https://");
                } else {
                  setImageUploadError(null);
                }
              }}
              className="w-full bg-white border border-gray-200 px-4 py-3 font-body text-sm text-ink outline-none focus:border-gold/60 rounded-md transition-colors"
              placeholder="https://..."
            />
            <div className="font-body text-xs text-muted mt-2 break-all">
              Optional. Enter any URL starting with http:// or https://
            </div>
          </div>

          {/* Content Editor */}
          <div className="w-full min-w-0">
            <label className="font-body text-xs tracking-widest uppercase text-muted block mb-2">
              Content
            </label>
            <input type="hidden" name="content" value={contentHtml} readOnly />
            <div className="w-full rounded-md border border-gray-200 bg-white focus-within:border-gold/60 transition-colors">
              <ReactQuill
                theme="snow"
                value={contentHtml}
                onChange={(html: string) => {
                  setContentHtml(html);
                  if (contentError) setContentError(null);
                }}
                modules={quillModules}
                formats={quillFormats}
                placeholder="Write your post..."
                className="quill-editor"
                ref={quillRef}
              />
            </div>
            {contentError ? (
              <div className="font-body text-xs text-red-700 mt-2 break-words">{contentError}</div>
            ) : null}
            {imageUploadError ? (
              <div className="font-body text-xs text-red-700 mt-2 break-words">{imageUploadError}</div>
            ) : null}
            {!contentError && !imageUploadError ? (
              <div className="font-body text-xs text-muted mt-2">
                Tip: use the toolbar to format text, add links, or insert images.
              </div>
            ) : null}
          </div>

          {/* SEO Settings */}
          <div className="pt-4 border-t border-gray-100 w-full min-w-0">
            <div className="font-body text-xs tracking-widest uppercase text-gold mb-5">SEO Settings</div>
            <div className="grid gap-4 sm:gap-6">
              {/* SEO Title */}
              <div className="w-full min-w-0">
                <label className="font-body text-xs tracking-widest uppercase text-muted block mb-2">
                  SEO Title
                </label>
                <input
                  name="seoTitle"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  className="w-full bg-white border border-gray-200 px-4 py-3 font-body text-sm text-ink outline-none focus:border-gold/60 rounded-md transition-colors"
                  placeholder="Optional (defaults to Title)"
                />
              </div>

              {/* Meta Description */}
              <div className="w-full min-w-0">
                <label className="font-body text-xs tracking-widest uppercase text-muted block mb-2">
                  Meta Description
                </label>
                <textarea
                  name="metaDescription"
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  rows={3}
                  className="w-full bg-white border border-gray-200 px-4 py-3 font-body text-sm text-ink outline-none focus:border-gold/60 resize-none rounded-md transition-colors"
                  placeholder="Optional (recommended ~150–160 characters)"
                />
              </div>

              {/* Keywords */}
              <div className="w-full min-w-0">
                <label className="font-body text-xs tracking-widest uppercase text-muted block mb-2">
                  Keywords
                </label>
                <input
                  name="keywords"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  className="w-full bg-white border border-gray-200 px-4 py-3 font-body text-sm text-ink outline-none focus:border-gold/60 rounded-md transition-colors"
                  placeholder="e.g. real estate, investment, Mumbai"
                />
                <div className="font-body text-xs text-muted mt-2">
                  Comma-separated keywords.
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 sm:gap-4 pt-4 border-t border-gray-100 w-full min-w-0">
            <Link href="/admin/blog" className="font-body text-xs text-muted tracking-widest uppercase hover:text-gold transition-colors text-center sm:text-right">Cancel</Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto font-body text-xs font-semibold tracking-widest uppercase text-black px-7 py-3 rounded-md cursor-pointer transition-all duration-300 ease-out hover:-translate-y-0.5 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(135deg, #c8a45b, #b8963d)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.25)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }}
            >
              {isSubmitting ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>
      </form>


      <style jsx global>{`
  /* Quill: make it match the site's cream/panel aesthetic */

  .quill-editor .ql-toolbar.ql-snow {
    border: none;
    border-bottom: 1px solid rgb(229 219 204); /* sand */
    background: rgb(255 251 243); /* cream */
    padding: 10px 12px;

    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
  }

  /* ✅ IMPORTANT: groups ko bhi horizontal rakho */
  .quill-editor .ql-toolbar.ql-snow .ql-formats {
    display: inline-flex;
    align-items: center;
    flex-wrap: nowrap;
    margin-right: 8px;
    margin-bottom: 0 !important;
    flex-shrink: 0;
  }

  /* buttons shrink na ho */
  .quill-editor .ql-toolbar.ql-snow button {
    flex-shrink: 0;
  }

  /* dropdown shrink na ho */
  .quill-editor .ql-toolbar.ql-snow .ql-picker {
    flex-shrink: 0;
  }

  .quill-editor .ql-container.ql-snow {
    border: none;
    background: rgb(255 251 243);
    font-family: inherit;
  }

  .quill-editor .ql-editor {
    min-height: 320px;
    padding: 18px 18px;
    color: rgb(20 18 16);
    font-size: 1.1rem;
    line-height: 1.9;
  }

  .quill-editor .ql-editor p {
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
  }

  .quill-editor .ql-editor h1 {
    font-family: var(--font-heading, inherit);
    font-size: 2.25rem;
    font-weight: 700;
    line-height: 1.1;
    margin-top: 1.75rem;
    margin-bottom: 1rem;
  }

  .quill-editor .ql-editor h2 {
    font-family: var(--font-heading, inherit);
    font-size: 1.875rem;
    font-weight: 600;
    line-height: 1.15;
    margin-top: 1.5rem;
    margin-bottom: 0.85rem;
  }

  .quill-editor .ql-editor h3 {
    font-family: var(--font-heading, inherit);
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1.2;
    margin-top: 1.25rem;
    margin-bottom: 0.75rem;
  }

  .quill-editor .ql-editor blockquote {
    border-left: 3px solid rgb(196 151 63);
    padding-left: 1rem;
    color: rgb(123 111 98);
    font-style: italic;
  }

  .quill-editor .ql-editor ul,
  .quill-editor .ql-editor ol {
    padding-left: 1.5rem;
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
  }

  .quill-editor .ql-editor li {
    margin: 0.15rem 0;
  }

  .quill-editor .ql-editor::before {
    color: rgb(123 111 98);
  }

  .quill-editor .ql-editor p img {
    max-width: 100%;
    width: 100%;
    border-radius: 0.75rem;
  }

  .quill-editor .ql-editor p.ql-align-center img {
    display: block;
    margin: auto;
  }

  .quill-editor .ql-editor p.ql-align-right img {
    display: block;
    margin-left: auto;
  }

  .quill-editor .ql-snow.ql-toolbar button {
    width: 32px;
    height: 32px;
    color: rgb(20 18 16);
  }

  .quill-editor .ql-snow .ql-stroke {
    stroke: rgb(20 18 16);
  }

  .quill-editor .ql-snow .ql-fill {
    fill: rgb(20 18 16);
  }

  .quill-editor .ql-snow .ql-picker {
    font-size: 0.95rem;
  }

  .quill-editor .ql-snow .ql-picker-options {
    background: rgb(255 251 243);
    border: 1px solid rgb(229 219 204);
  }

  .quill-editor .ql-snow .ql-tooltip {
    border: 1px solid rgb(229 219 204);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    font-size: 0.9rem;
  }
`}
      </style>
    </div>);
}