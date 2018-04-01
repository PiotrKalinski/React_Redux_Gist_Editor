import React from 'react';
import CodeMirror from 'react-codemirror';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/ruby/ruby';
import 'codemirror/mode/python/python';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/markdown/markdown';

export default ({ editing, file, onChange }) => {
  const options = {
    lineNumbers: true,
    readOnly: !editing,
    type: file.type
  };
  return (
      <CodeMirror
        value={file.content}
        options={options}
        onChange={onChange.bind(null, 'content')}
      />
  );
};

