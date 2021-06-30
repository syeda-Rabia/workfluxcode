/* eslint-disable react/no-multi-comp */
import React, { Component } from "react";

import Editor, { createEditorStateWithText } from "@draft-js-plugins/editor";
import { EditorState, convertToRaw, ContentState } from "draft-js";

import createInlineToolbarPlugin, {
  Separator,
} from "@draft-js-plugins/inline-toolbar";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from "@draft-js-plugins/buttons";
import "./editorStyles.css";
import "@draft-js-plugins/inline-toolbar/lib/plugin.css";

const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;
const plugins = [inlineToolbarPlugin];

export default class InlineToolbarTextEditor extends Component {
  constructor(props) {
    super(props);
    const html = props.initialState || "";
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      this.state = {
        editorState,
      };
    }
  }
  //   state = {
  //     editorState: createEditorStateWithText(text),
  //   };

  componentDidMount() {
    // fixing issue with SSR https://github.com/facebook/draft-js/issues/2332#issuecomment-761573306
    // eslint-disable-next-line react/no-did-mount-set-state
    // this.setState({
    //   editorState: createEditorStateWithText(text),
    // });
  }

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
    this.props.returnHtml(
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
  };

  focus = () => {
    this.editor.focus();
  };

  render() {
    return (
      <div className={"editor"} onClick={this.focus}>
        <Editor
          editorKey="CustomInlineToolbarEditor"
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={plugins}
          ref={(element) => {
            this.editor = element;
          }}
        />
        <InlineToolbar>
          {
            // may be use React.Fragment instead of div to improve perfomance after React 16
            (externalProps) => (
              <>
                <BoldButton {...externalProps} />
                <ItalicButton {...externalProps} />
                <UnderlineButton {...externalProps} />
                <Separator {...externalProps} />
                <UnorderedListButton {...externalProps} />
                <OrderedListButton {...externalProps} />
                <BlockquoteButton {...externalProps} />
                <CodeBlockButton {...externalProps} />
              </>
            )
          }
        </InlineToolbar>
      </div>
    );
  }
}
