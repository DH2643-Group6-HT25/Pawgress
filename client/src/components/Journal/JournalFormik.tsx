import React, { useRef, useState, useEffect } from 'react'
import { MyButton } from '../MyButton'
import type { Journal } from '../../models/journal/journalType'
import { isNil } from 'lodash/fp'
import {
  EditorContainer,
  Toolbar,
  Editor,
  ImageRow,
  ImageMyButton,
  FormatMyButton,
  JournalImage,
} from './JournalCardComponents'
import { InsideCardTitle } from '../CardComponents'
import { getImageUrl } from '../../utils/imageUrl'

interface Props {
  userId?: string
  today?: Journal | null
  loading?: boolean
  error?: string | null
  saveJournalEntry?: CallableFunction
}

interface FormatData {
  start: number
  end: number
  type: 'bold' | 'italic' | 'underline'
}

export default function JournalFormik({
  userId,
  today,
  loading,
  error,
  saveJournalEntry,
}: Props) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(
    today?.imageUrl || null
  )
  const [formatting, setFormatting] = useState<FormatData[]>([])
  const [success, setSuccess] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    setImagePreview(today?.imageUrl || null)
    if (editorRef.current) editorRef.current.innerHTML = today?.journal || ''
  }, [today])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSuccess(false)
    setShowMessage(false)
    const data = {
      journal: editorRef.current?.innerHTML || '',
      userId: userId || today?.userId || '',
      formatting,
      ...(image ? { image } : {}),
    }
    if (typeof saveJournalEntry === 'function') {
      await Promise.resolve(saveJournalEntry(data))
      setSuccess(true)
      setShowMessage(true)
      setImage(null)
      setFormatting([])
    }
  }

  useEffect(() => {
    if (showMessage || error) {
      const timer = setTimeout(() => {
        setSuccess(false)
        setShowMessage(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [showMessage, error])

  const handleFormat = (cmd: 'bold' | 'italic' | 'underline') => {
    document.execCommand(cmd, false)
    if (editorRef.current) {
      const selection = window.getSelection()
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        setFormatting((prev) => [
          ...prev,
          {
            start: range.startOffset,
            end: range.endOffset,
            type: cmd,
          },
        ])
      }
    }
  }

  const handleInput = () => {}

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0]
    if (file) {
      setImage(file)
      setImagePreview(URL.createObjectURL(file))
    } else {
      setImage(null)
      setImagePreview(null)
    }
  }

  return (
    <EditorContainer>
      <InsideCardTitle>
        {isNil(today) ? "Add today's journal" : "Edit today's Journal"}
      </InsideCardTitle>
      <form onSubmit={handleSubmit}>
        <Toolbar>
          <FormatMyButton
            type="button"
            onClick={(e) => {
              e.preventDefault()
              handleFormat('bold')
            }}
          >
            <b>B</b>
          </FormatMyButton>
          <FormatMyButton
            type="button"
            onClick={(e) => {
              e.preventDefault()
              handleFormat('italic')
            }}
          >
            <i>I</i>
          </FormatMyButton>
          <FormatMyButton
            type="button"
            onClick={(e) => {
              e.preventDefault()
              handleFormat('underline')
            }}
          >
            <u>U</u>
          </FormatMyButton>
        </Toolbar>
        <Editor
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          aria-label="Journal text editor"
        />
        <ImageRow>
          <div>
            <input
              type="file"
              accept="image/*"
              id="journal-image-upload"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
            <label htmlFor="journal-image-upload">
              <ImageMyButton
                type="button"
                as="span"
                style={{ borderWidth: '2px', boxShadow: '2px 2px 0 #000' }}
              >
                {imagePreview ? 'Change image *' : 'Upload image'}
              </ImageMyButton>
            </label>
          </div>
          <JournalImage
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '10px',
              opacity: imagePreview ? 1 : 0,
              visibility: imagePreview ? 'visible' : 'hidden',
              transition: 'opacity 0.2s',
            }}
            src={imagePreview ? getImageUrl(imagePreview) : undefined}
            alt="Preview"
          />
        </ImageRow>
        <div style={{ display: 'flex', justifyContent: 'left', marginTop: 10 }}>
          <MyButton
            primary
            style={{ borderWidth: '2px', boxShadow: '2px 2px 0 #000' }}
            type="submit"
            disabled={loading || !imagePreview}
          >
            {loading ? 'Saving...' : 'Save'}
          </MyButton>
        </div>
        {error && showMessage && (
          <div style={{ marginTop: 3, color: 'red', fontSize: '0.8em' }}>
            {error}
          </div>
        )}
        {success && !error && showMessage && (
          <div style={{ marginTop: 3, color: 'green', fontSize: '0.8em' }}>
            Journal saved!
          </div>
        )}
      </form>
    </EditorContainer>
  )
}
