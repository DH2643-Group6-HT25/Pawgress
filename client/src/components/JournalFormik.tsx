
import React, { useRef } from 'react';
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

function JournalFormik({ userId }: { userId?: string }) {
	const editorRef = useRef<HTMLDivElement>(null);

	const formik = useFormik({
		initialValues: { journal: '' },
		onSubmit: async (values, { resetForm }) => {
			// Skicka journalen som HTML till API
			await fetch('/api/journal', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ journal: values.journal, user: userId }),
			});
			resetForm();
			if (editorRef.current) editorRef.current.innerHTML = '';
		},
	});

	// Hantera rich text-formattering
	const handleFormat = (cmd: 'bold' | 'italic' | 'underline') => {
		document.execCommand(cmd, false);
		// Uppdatera Formik med HTML
		if (editorRef.current) {
			formik.setFieldValue('journal', editorRef.current.innerHTML);
		}
	};

	// Hantera input i contentEditable
	const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
		formik.setFieldValue('journal', e.currentTarget.innerHTML);
	};

	return (
    <EditorContainer>
      <form onSubmit={formik.handleSubmit}>
        <Toolbar>
          <MyButton style={{borderWidth: '2px', boxShadow: '2px 2px 0 #000'}} onClick={() => handleFormat('bold')}><b>B</b></MyButton>
          <MyButton style={{borderWidth: '2px', boxShadow: '2px 2px 0 #000'}} onClick={() => handleFormat('italic')}><i>I</i></MyButton>
          <MyButton style={{borderWidth: '2px', boxShadow: '2px 2px 0 #000'}} onClick={() => handleFormat('underline')}><u>U</u></MyButton>
        </Toolbar>
        <Editor
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          aria-label="Journal text editor"
        />
        <MyButton primary style={{borderWidth: '2px', boxShadow: '2px 2px 0 #000'}} type="submit" disabled={formik.isSubmitting}>
          Save
        </MyButton>
      </form>
    </EditorContainer>
	);
}

export default JournalFormik;


