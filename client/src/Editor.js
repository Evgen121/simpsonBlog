import ReactQuill from 'react-quill';


export default function Editor({ value, onChange }) {

    const modules = {
        toolbar: [
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }],
            ['link',],
            ['clean']
        ]
    };

    return (
        <ReactQuill
            onChange={onChange}
            theme={'snow'}
            value={value}
            modules={modules}

        />
    )
}