
import React, { useRef, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import styled from 'styled-components';
import { MyButton } from './MyButton';
import { useDispatch, useSelector } from 'react-redux';
import { saveJournalEntry } from '../models/journal/journalThunks';

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
  height: 30%; 
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
	const [formatting, setFormatting] = useState<any[]>([]); // [{start, end, type}]
	const dispatch = useDispatch();
	const loading = useSelector((state: any) => state.journal.loading);
	const error = useSelector((state: any) => state.journal.error);
	const [success, setSuccess] = useState(false);

	const formik = useFormik({
		initialValues: { journal: today?.journal || '' },
		enableReinitialize: true,
		onSubmit: async (values, { resetForm }) => {
			setSuccess(false);
			const data = {
				journal: values.journal,
				userId: userId || today?.userId || '',
				formatting,
				...(image ? { image } : {}),
			};
			const result = await dispatch<any>(saveJournalEntry(data));
			if (saveJournalEntry.fulfilled.match(result)) {
				setSuccess(true);
				resetForm();
				setImage(null);
				setImagePreview(null);
				setFormatting([]);
				if (editorRef.current) editorRef.current.innerHTML = '';
			}
		},
	});

			// Hantera rich text-formattering
			const handleFormat = (cmd: 'bold' | 'italic' | 'underline') => {
				document.execCommand(cmd, false);
				if (editorRef.current) {
					formik.setFieldValue('journal', editorRef.current.innerHTML);
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
						{error && (
							<div style={{ marginTop: 8, color: 'red', fontSize: '0.9em' }}>{error}</div>
						)}
						{success && !error && (
							<div style={{ marginTop: 8, color: 'green', fontSize: '0.9em' }}>Journal saved!</div>
						)}
					</form>
				</EditorContainer>
			);
}

export default JournalFormik;


