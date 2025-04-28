import React, { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import katex from 'katex';
import { convertLatexToMathMl } from 'mathlive';


const UserAnswerEditor: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <div>Loading editor...</div>;

  const insertMathMLEquation = (editor: any, equation: string) => {
    const mathHtml = katex.renderToString(equation, {
      throwOnError: true,
      output: 'html'
    });
    const contentToInsert = `<span contenteditable="false">${mathHtml}</span>`;
    editor.insertContent(contentToInsert, { format: 'html' });
  };

  const openMathMLDialog = (editor: any) => {
    const userInput = prompt("Enter your LaTeX equation:", "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}");
    if (userInput) {
      insertMathMLEquation(editor, userInput);
    }
  };


  return (
    <>
      <div className='w-[100%] h-[200px]'>
        <Editor
          tinymceScriptSrc="/tinymce/tinymce.min.js"
          licenseKey="gpl"
          init={{
            height: 500,
            statusbar: false,
            menubar: false,
            plugins: ['lists'],
            valid_elements: '*[*]',
            content_css: [
              'https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css',
            ],
            toolbar: 'bold italic underline | bullist numlist | equation',
            setup: (editor: any) => {
              editor.ui.registry.addButton('equation', {
                text: 'Equation',
                onAction: () => openMathMLDialog(editor),
              });
            },
          }}
        />
      </div>
    </>
  );
};

export default UserAnswerEditor;
