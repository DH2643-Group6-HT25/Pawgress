
import React, { useRef, useState } from 'react';
import { useFormik } from 'formik';
import styled from 'styled-components';
import { MyButton } from './MyButton';

export const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  text-transform: lowercase;
  margin: 5px 0;   
  box-sizing: border-box;

  @media (max-width: 600px) {
    padding: 8px 6px;
    font-size: 0.8rem;
  }
`;

const Toolbar = styled.div`
	display: flex;
  margin-bottom: 8px;
`;

const Editor = styled.div`
	display: flex;
	width: 90%;
  height: 100%; 
	border: 2px solid ${(props) => props.theme.colors.black};
	border-radius: 6px;
	padding: 8px;
	margin-bottom: 8px;
	font-family: inherit;
	font-size: 0.75rem;
	overflow-x: hidden;
	overflow-y: auto;
	resize: none;
	background: #fff;
`;

import type { Journal } from '../models/journal/journalType';

interface Props {
	userId?: string;
	today?: Journal | null;
}

function JournalFormik({ userId, today }: Props) {
	const editorRef = useRef<HTMLDivElement>(null);
	const [image, setImage] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(today?.imageUrl || null);
	const [loading, setLoading] = useState(false);
	const [feedback, setFeedback] = useState<string | null>(null);

	const formik = useFormik({
		initialValues: { journal: today?.journal || '' },
		enableReinitialize: true,
		onSubmit: async (values, { resetForm }) => {
			setLoading(true);
			setFeedback(null);
			try {
				const formData = new FormData();
				formData.append('journal', values.journal);
				formData.append('user', userId || today?.userId || '');
				// Optionally add formatting here if you implement it
				if (image) formData.append('image', image);

				const res = await fetch('/api/journal', {
					method: 'POST',
					body: formData,
				});
				if (!res.ok) throw new Error('Could not save journal');
				setFeedback('Journal saved!');
				resetForm();
				setImage(null);
				setImagePreview(null);
				if (editorRef.current) editorRef.current.innerHTML = '';
			} catch (err: any) {
				setFeedback('Error saving journal.');
			} finally {
				setLoading(false);
			}
		},
	});

		// Hantera rich text-formattering
		const handleFormat = (cmd: 'bold' | 'italic' | 'underline') => {
			document.execCommand(cmd, false);
			if (editorRef.current) {
				formik.setFieldValue('journal', editorRef.current.innerHTML);
			}
		};

		// Hantera input i contentEditable
		const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
			formik.setFieldValue('journal', e.currentTarget.innerHTML);
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
				<form onSubmit={formik.handleSubmit}>
					<Toolbar>
						<MyButton type="button" style={{borderWidth: '2px', boxShadow: '2px 2px 0 #000'}} onClick={e => { e.preventDefault(); handleFormat('bold'); }}><b>B</b></MyButton>
						<MyButton type="button" style={{borderWidth: '2px', boxShadow: '2px 2px 0 #000'}} onClick={e => { e.preventDefault(); handleFormat('italic'); }}><i>I</i></MyButton>
						<MyButton type="button" style={{borderWidth: '2px', boxShadow: '2px 2px 0 #000'}} onClick={e => { e.preventDefault(); handleFormat('underline'); }}><u>U</u></MyButton>
					</Toolbar>
					<Editor
						ref={editorRef}
						contentEditable
						suppressContentEditableWarning
						onInput={handleInput}
						aria-label="Journal text editor"
					/>
					<div style={{ margin: '10px 0' }}>
						<input
							type="file"
							accept="image/*"
							id="journal-image-upload"
							style={{ display: 'none' }}
							onChange={handleImageChange}
						/>
						<label htmlFor="journal-image-upload">
							<MyButton type="button" as="span" style={{borderWidth: '2px', boxShadow: '2px 2px 0 #000'}}>
								{image ? 'Change Image' : 'Upload Image'}
							</MyButton>
						</label>
						{imagePreview && (
							<div style={{ marginTop: 8 }}>
								<img src={imagePreview} alt="Preview" style={{ maxWidth: 120, maxHeight: 120, borderRadius: 8, border: '1px solid #ccc' }} />
							</div>
						)}
					</div>
					<MyButton primary style={{borderWidth: '2px', boxShadow: '2px 2px 0 #000'}} type="submit" disabled={loading}>
						{loading ? 'Saving...' : 'Save'}
					</MyButton>
					{feedback && (
						<div style={{ marginTop: 8, color: feedback.includes('Error') ? 'red' : 'green', fontSize: '0.9em' }}>{feedback}</div>
					)}
				</form>
			</EditorContainer>
		);
}

export default JournalFormik;


