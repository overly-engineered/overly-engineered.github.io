<script>
  import { onMount } from "svelte";
  import CodeMirror from "codemirror";
  import "codemirror/mode/javascript/javascript";
  import "codemirror/lib/codemirror.css";
  import "./theme.css";
  export let codeString;
  export let readOnly;
  export let key;
  export let sectionId = key + "-editor";
  console.log(sectionId);
  let editor;
  onMount(async () => {
    console.log(codeString);
    editor = CodeMirror(
      elt => {
        const e = document.getElementById(sectionId);
        e.appendChild(elt);
      },
      {
        value: codeString,
        mode: "javascript",
        theme: "dracula",
        lineNumbers: true,
        autoFocus: true,
        readOnly
      }
    );
    editor.on("change", change => {
      codeString = change.doc.getValue();
    });
  });
  $: {
    if(editor && readOnly) {
      editor.doc.setValue(codeString);
    }
  }
</script>

<section class="editor" id={sectionId} />

<style>
  .editor {
    padding: 1rem;
  }

</style>
