import { ContentState, convertToRaw, EditorState, Modifier } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
const htmlToDraft =
  typeof window === 'object' && require('html-to-draftjs').default;
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { EditorProps } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

interface WYSIWYGEditorProps {
  onChange: (value: string) => void;
  value?: string;
  placeholder?: string;
}

const Editor = dynamic<EditorProps>(
  () =>
    import('react-draft-wysiwyg').then(
      (mod) => mod.Editor as React.ComponentType<EditorProps>
    ),
  { ssr: false }
);

const WYSIWYGEditor: React.FC<WYSIWYGEditorProps> = ({
  onChange,
  value,
  placeholder,
}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    if (!updated) {
      const defaultValue = value ? value : '';
      const blocksFromHtml = htmlToDraft(defaultValue);
      const contentState = ContentState.createFromBlockArray(
        blocksFromHtml.contentBlocks,
        blocksFromHtml.entityMap
      );
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    }
  }, [value, updated]);

  const onEditorStateChange = (editorState: EditorState) => {
    setUpdated(true);
    setEditorState(editorState);

    return onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  return (
    //   @ts-ignore
    <Editor
      spellCheck
      editorState={editorState}
      onEditorStateChange={onEditorStateChange}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      toolbar={{
        options: [
          'inline',
          'blockType',
          'fontSize',
          'fontFamily',
          'list',
          'textAlign',
          'colorPicker',
          'link',
          'embedded',
          'emoji',
          'remove',
          'history',
        ],
      }}
      placeholder={placeholder}
    />
  );
};

export default WYSIWYGEditor;
