import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

interface EditorTinyProps {
  currentContent: (content: string) => void;
  initialValue: string;
}

export const EditorTiny: React.FC<EditorTinyProps> = ({
  currentContent,
  initialValue,
}) => {
  // State to manage modal visibility and selected image URL
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");

  // Reference for the TinyMCE editor instance
  const editorRef = useRef<any>(null);

  // Function to handle editor content change
  const handleEditorChange = (content: string, editor: any) => {
    currentContent(content);
  };

  // Function to handle inserting the selected image into the editor
  const handleInsertImage = (imagObject: any) => {
    if (imagObject) {
      const imageHtml = `<img crossorigin="anonymous" src="${imagObject.path}" alt="${imagObject.name}" />`;
      const editor = editorRef.current;
      if (editor) {
        editor.insertContent(imageHtml);
        // editor.execCommand('mceInsertContent', false, imageHtml);
      }
    }
    setModalIsOpen(false); // Close the modal after inserting the image
  };

  // Render the EditorTiny component
  return (
    <>
      <style>
        {`
                .tox .tox-statusbar__branding svg {
                    fill: rgba(34,47,62,.8);
                    height: 1.14em;
                    vertical-align: -0.28em;
                    width: 3.6em;
                    display: none;
                }
                `}
      </style>
      <Editor
        apiKey="pp7fsduhsf10g925706refnlfw4kmx68jjynpoqpwrw7zbsv"
        initialValue={initialValue}
        init={{
          height: 600,
          menubar: false,

          plugins: [
            // 'ai',
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "lineheight",
            "wordcount",
            "imageGallery",
          ],
          toolbar:
            "undo redo | blocks | link  | lineheight  | " +
            "bold italic forecolor |" +
            "alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | " +
            "media | imageGallery | " +
            "table |" +
            "removeformat ",
          toolbar_location: "top",
          toolbar_mode: "sliding",
          content_style: "body {}",
          setup: function (editor) {
            // Register the custom plugin
            editor.ui.registry.addIcon(
              "imageGallery",
              `<svg width="24" height="24" focusable="false"><path d="m5 15.7 3.3-3.2c.3-.3.7-.3 1 0L12 15l4.1-4c.3-.4.8-.4 1 0l2 1.9V5H5v10.7ZM5 18V19h3l2.8-2.9-2-2L5 17.9Zm14-3-2.5-2.4-6.4 6.5H19v-4ZM4 3h16c.6 0 1 .4 1 1v16c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1V4c0-.6.4-1 1-1Zm6 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" fill-rule="nonzero"></path></svg>`
            );
            editor.ui.registry.addButton("imageGallery", {
              icon: "imageGallery",
              tooltip: "Image Gallery",
              onAction: () => {
                editorRef.current = editor;
                setModalIsOpen(true);
              }, // Open the modal when the button is clicked
            });
          },
        }}
        onEditorChange={handleEditorChange} // Handle editor content change
      />
    </>
  );
};
