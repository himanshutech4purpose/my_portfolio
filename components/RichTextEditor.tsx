'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { useEffect } from 'react'
import { Bold, Italic, List, ListOrdered, Link as LinkIcon, Image as ImageIcon, Heading1, Heading2, Heading3, Quote } from 'lucide-react'

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

const RichTextEditor = ({ content, onChange, placeholder = 'Start writing your blog post...' }: RichTextEditorProps) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none min-h-[400px] px-4 py-3',
      },
    },
  })

  // Update editor content when content prop changes (e.g., when editing existing blog)
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content)
    }
  }, [content, editor])

  if (!editor) {
    return <div className="border border-gray-300 rounded-lg min-h-[400px] bg-white p-4">Loading editor...</div>
  }

  return (
    <div className="border border-gray-300 rounded-lg bg-white overflow-hidden">
      {/* Toolbar */}
      <div className="border-b border-gray-200 p-2 flex flex-wrap gap-2 bg-gray-50">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${
            editor.isActive('bold') ? 'bg-primary/20 text-primary' : 'text-gray-700'
          }`}
          aria-label="Bold"
        >
          <Bold size={18} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${
            editor.isActive('italic') ? 'bg-primary/20 text-primary' : 'text-gray-700'
          }`}
          aria-label="Italic"
        >
          <Italic size={18} aria-hidden="true" />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${
            editor.isActive('heading', { level: 1 }) ? 'bg-primary/20 text-primary' : 'text-gray-700'
          }`}
          aria-label="Heading 1"
        >
          <Heading1 size={18} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${
            editor.isActive('heading', { level: 2 }) ? 'bg-primary/20 text-primary' : 'text-gray-700'
          }`}
          aria-label="Heading 2"
        >
          <Heading2 size={18} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${
            editor.isActive('heading', { level: 3 }) ? 'bg-primary/20 text-primary' : 'text-gray-700'
          }`}
          aria-label="Heading 3"
        >
          <Heading3 size={18} aria-hidden="true" />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${
            editor.isActive('bulletList') ? 'bg-primary/20 text-primary' : 'text-gray-700'
          }`}
          aria-label="Bullet List"
        >
          <List size={18} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${
            editor.isActive('orderedList') ? 'bg-primary/20 text-primary' : 'text-gray-700'
          }`}
          aria-label="Ordered List"
        >
          <ListOrdered size={18} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${
            editor.isActive('blockquote') ? 'bg-primary/20 text-primary' : 'text-gray-700'
          }`}
          aria-label="Quote"
        >
          <Quote size={18} aria-hidden="true" />
        </button>
        <div className="w-px h-6 bg-gray-300 mx-1" />
        <button
          type="button"
          onClick={() => {
            const url = window.prompt('Enter URL:')
            if (url) {
              editor.chain().focus().setLink({ href: url }).run()
            }
          }}
          className={`p-2 rounded hover:bg-gray-200 transition-colors ${
            editor.isActive('link') ? 'bg-primary/20 text-primary' : 'text-gray-700'
          }`}
          aria-label="Add Link"
        >
          <LinkIcon size={18} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => {
            const url = window.prompt('Enter image URL:')
            if (url) {
              editor.chain().focus().setImage({ src: url }).run()
            }
          }}
          className="p-2 rounded hover:bg-gray-200 transition-colors text-gray-700"
          aria-label="Add Image"
        >
          <ImageIcon size={18} aria-hidden="true" />
        </button>
      </div>

      {/* Editor Content */}
      <div className="prose-wrapper">
        <EditorContent editor={editor} />
      </div>

      <style jsx global>{`
        .ProseMirror {
          outline: none;
          min-height: 400px;
          padding: 1rem;
        }
        .ProseMirror p {
          margin: 0.75rem 0;
        }
        .ProseMirror h1 {
          font-size: 2rem;
          font-weight: bold;
          margin: 1.5rem 0 1rem 0;
        }
        .ProseMirror h2 {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 1.25rem 0 0.75rem 0;
        }
        .ProseMirror h3 {
          font-size: 1.25rem;
          font-weight: bold;
          margin: 1rem 0 0.5rem 0;
        }
        .ProseMirror ul, .ProseMirror ol {
          padding-left: 1.5rem;
          margin: 0.75rem 0;
        }
        .ProseMirror blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          color: #6b7280;
        }
        .ProseMirror img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1rem 0;
        }
        .ProseMirror a {
          color: #ec4899;
          text-decoration: underline;
        }
        .ProseMirror .is-empty::before {
          content: attr(data-placeholder);
          float: left;
          color: #9ca3af;
          pointer-events: none;
          height: 0;
        }
      `}</style>
    </div>
  )
}

export default RichTextEditor

