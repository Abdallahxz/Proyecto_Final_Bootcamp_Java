// CKEditorComponent.js
import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '/src/components/css/CKEditorStyles.css'

const CKEditorComponent = () => {
    const [editorData, setEditorData] = useState('');

    return (
        <div>
            <CKEditor
                editor={ClassicEditor}
                data={editorData}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    setEditorData(data);
                }}
                config={{
                    toolbar: [
                        'cut', 'copy', 'paste', 'undo', 'redo', '|',
                        'bold', 'italic', 'underline', 'strikethrough', '|',
                        'bulletedList', 'numberedList', '|',
                        'link', 'blockquote', '|',
                        'heading', '|',
                        'imageUpload', 'insertTable', '|',
                        'alignment:left', 'alignment:center', 'alignment:right', '|',
                        'sourceEditing' // Para la vista de fuente HTML
                    ],
                    heading: {
                        options: [
                            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                            { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                        ]
                    },
                }}
            />
        </div>
    );
};


export default CKEditorComponent;
