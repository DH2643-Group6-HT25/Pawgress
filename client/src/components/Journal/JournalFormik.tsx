
import React, { useRef, useState } from 'react';
import { MyButton } from '../MyButton';
import type { Journal } from '../../models/journal/journalType';
import { 
	EditorContainer, 
	Toolbar, 
	Editor,
	PreviewImage, 
	ImageRow, 
	ImageMyButton, 
	FormatMyButton, 
	PLACEHOLDER} from './JournalCardComponents';
import { InsideCardTitle } from '../CardComponents';

interface Props {
	userId?: string;
	today?: Journal | null;
	loading?: boolean;
	error?: string | null;
	saveJournalEntry?: (data: any) => void;
}


export default function JournalFormik({ userId, today, loading, error, saveJournalEntry }: Props) {
	const editorRef = useRef<HTMLDivElement>(null);
	const [image, setImage] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(today?.imageUrl || null);
	const [formatting, setFormatting] = useState<any[]>([]); // [{start, end, type}]
	const [success, setSuccess] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setSuccess(false);
		const data = {
			journal: editorRef.current?.innerHTML || '',
			userId: userId || today?.userId || '',
			formatting,
			...(image ? { image } : {}),
		};
		if (typeof saveJournalEntry === 'function') {
			Promise.resolve(saveJournalEntry(data)).then(() => {
				setSuccess(true);
				setImage(null);
				setImagePreview(null);
				setFormatting([]);
				if (editorRef.current) editorRef.current.innerHTML = '';
			});
		}
	};

	// Hantera rich text-formattering
	const handleFormat = (cmd: 'bold' | 'italic' | 'underline') => {
		document.execCommand(cmd, false);
		if (editorRef.current) {
			// Spara formateringsinfo (exempel: hela texten får formatet)
			const selection = window.getSelection();
			if (selection && selection.rangeCount > 0) {
				const range = selection.getRangeAt(0);
				setFormatting(prev => ([
					...prev,
					{
						start: range.startOffset,
						end: range.endOffset,
						type: cmd
					}
				]));
			}
		}
	};

	// Hantera input i contentEditable (kan användas för framtida validering)
	const handleInput = (_e: React.FormEvent<HTMLDivElement>) => {
		// Kan lägga till validering här om du vill
	};

	// Hantera bildval och preview
	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files && e.target.files[0];
		if (file) {
			setImage(file);
			setImagePreview(URL.createObjectURL(file));
		} else {
			setImage(null);
			setImagePreview(null);
		}
	};

		return (
			<EditorContainer>
				<InsideCardTitle>Edit today's Journal</InsideCardTitle>
				<form onSubmit={handleSubmit}>
					<Toolbar>
						<FormatMyButton type="button" onClick={e => { e.preventDefault(); handleFormat('bold'); }}><b>B</b></FormatMyButton>
						<FormatMyButton type="button" onClick={e => { e.preventDefault(); handleFormat('italic'); }}><i>I</i></FormatMyButton>
						<FormatMyButton type="button" onClick={e => { e.preventDefault(); handleFormat('underline'); }}><u>U</u></FormatMyButton>
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
								<ImageMyButton type='button' as='span' style={{borderWidth: '2px', boxShadow: '2px 2px 0 #000'}}>
									{image ? 'Change image' : 'Upload image'}
								</ImageMyButton>
							</label>
						</div>
						<PreviewImage src={imagePreview || PLACEHOLDER} alt="Preview" />
					</ImageRow>
					<div style={{ display: 'flex', justifyContent: 'left', marginTop: 10 }}>
						<MyButton primary style={{borderWidth: '2px', boxShadow: '2px 2px 0 #000'}} type="submit" disabled={loading}>
							{loading ? 'Saving...' : 'Save'}
						</MyButton>
					</div>
					{error && (
						<div style={{ marginTop: 3, color: 'red', fontSize: '0.8em' }}>{error}</div>
					)}
					{success && !error && (
						<div style={{ marginTop: 3, color: 'green', fontSize: '0.8em' }}>Journal saved!</div>
					)}
				</form>
			</EditorContainer>
		);
}

