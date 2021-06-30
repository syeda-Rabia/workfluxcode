import React from "react";
import {
  EditorState,
  convertToRaw,
  KeyBindingUtil,
  getDefaultKeyBinding,
  ContentState,
} from "draft-js";
import Editor, { createEditorStateWithText } from "@draft-js-plugins/editor";

// import Editor from "draft-js-plugins-editor";
import createMentionPlugin, {
  defaultSuggestionsFilter,
} from "draft-js-mention-plugin";
import editorStyles from "./editorStyles.module.css";
import mentions from "./mentions";
import "draft-js-mention-plugin/lib/plugin.css";
import isHotkey from "is-hotkey";

class TextInput extends React.Component {
  constructor(props) {
    super(props);

    this.mentionPlugin = createMentionPlugin();
    // this.state = {
    //   editorState: EditorState.createEmpty(),
    //   suggestions: mentions,
    // };
  }
  state = {
    editorState: createEditorStateWithText("text"),
    suggestions: mentions,
  };

  //   state = {
  //     editorState: EditorState.createEmpty(),
  //     suggestions: mentions,
  //   };

  myKeyBindingFn = (e) => {
    if (e.keyCode === 13) {
      console.log("enter");
      this.props.onPressEnter(
        this.state.editorState.getCurrentContent().getPlainText()
      );
      const editorState = EditorState.push(
        this.state.editorState,
        ContentState.createFromText(""),
        "remove-range"
      );
      this.setState({ editorState });
    }
  };

  onChange = (editorState) => {
    this.setState({ editorState });
    // this.onKeyDown(this.state.editorState.getCurrentContent().getPlainText());
    // const blocks = convertToRaw(this.state.editorState.getCurrentContent())
    //   .blocks;
    // const value = blocks
    //   .map((block) => (!block.text.trim() && "\n") || block.text)
    //   .join("\n");
    // console.log(value);
  };

  onSearchChange = ({ value }) => {
    this.setState({
      suggestions: defaultSuggestionsFilter(value, mentions),
    });
  };

  onExtractData = () => {
    const contentState = this.state.editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    console.log(raw);
  };

  onExtractMentions = () => {
    const contentState = this.state.editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    let mentionedUsers = [];
    for (let key in raw.entityMap) {
      const ent = raw.entityMap[key];
      if (ent.type === "mention") {
        mentionedUsers.push(ent.data.mention);
      }
    }
    console.log(mentionedUsers);
  };

  render() {
    const { MentionSuggestions } = this.mentionPlugin;
    const plugins = [this.mentionPlugin];
    console.log(
      "on chnage receive ------- > ",
      this.state.editorState.getCurrentContent().getPlainText()
    );
    return (
      <div>
        <div className={editorStyles.editor}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            keyBindingFn={this.myKeyBindingFn}
          />
          <MentionSuggestions
            onSearchChange={this.onSearchChange}
            suggestions={this.state.suggestions}
            onAddMention={(e) => {
              console.log(e);
            }}
          />
        </div>
        {/* <div>
          <button onClick={() => this.onExtractData()}>Extract data</button>
          <button onClick={() => this.onExtractMentions()}>
            Extract mentions
          </button>
        </div> */}
      </div>
    );
  }
}

export default TextInput;
