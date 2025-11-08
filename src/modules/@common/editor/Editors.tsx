import EditorJS from "@editorjs/editorjs";
//@ts-ignore
import ColorPlugin from "editorjs-text-color-plugin";
import { useCallback, useEffect, useRef, useState } from "react";
import Header from "@editorjs/header";
//@ts-ignore
import Embed from "@editorjs/embed";
//@ts-ignore
import Table from "@editorjs/table";
//@ts-ignore
import NestedList from "@editorjs/nested-list";
//@ts-ignore
import Code from "@editorjs/code";
//@ts-ignore
import LinkTool from "@editorjs/link";
//@ts-ignore
import uploader from "@ajite/editorjs-image-base64";
//@ts-ignore
import Quote from "@editorjs/quote";
//@ts-ignore
import RawTool from "@editorjs/raw";
//@ts-ignore
import ImageTool from "@editorjs/image";
//@ts-ignore
import Delimiter from "@editorjs/delimiter";
//@ts-ignore
import Iframe from "@hammaadhrasheedh/editorjs-iframe";
//@ts-ignore
import AlignmentTuneTool from "editorjs-text-alignment-blocktune";
//@ts-ignore
import Paragraph from "@editorjs/paragraph";

interface EditorProps {
  subredditId: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  content: string;
}

function isJSONString(str: any) {
  try {
    return JSON.parse(str);
  } catch (error) {
    return str;
  }
}
export const Editor = (props: EditorProps) => {
  //@ts-ignore
  const ref = useRef<EditorJS>();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const { setContent, content } = props;

  const initializeEditor = useCallback(async () => {
    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor;
        },
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        data: content === "" ? { blocks: [] } : isJSONString(content),
        onChange: postContents,
        tools: {
          header: {
            class: Header,
            inlineToolbar: true,
            config: {
              placeholder: "Enter a header",
              levels: [2, 3, 4],
              defaultLevel: 3,
              tunes: ["anyTuneName"],
            },
          },
          paragraph: {
            // @ts-ignore
            class: Paragraph,
            inlineToolbar: false,
            tunes: ["anyTuneName"],
          },
          anyTuneName: {
            class: AlignmentTuneTool,
            config: {
              default: "left",
              blocks: {
                header: "center",
                list: "left",
              },
            },
          },
          Color: {
            class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
            config: {
              colorCollections: [
                "#000000",
                "#EC7878",
                "#9C27B0",
                "#673AB7",
                "#3F51B5",
                "#0070FF",
                "#03A9F4",
                "#00BCD4",
                "#4CAF50",
                "#8BC34A",
                "#CDDC39",
                "#FFF",
              ],
              type: "text",
              customPicker: true, // add a button to allow selecting any colour
            },
          },
          Marker: {
            class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
            config: {
              defaultColor: "#FFBF00",
              type: "marker",
              icon: `<svg fill="#000000" height="200px" width="200px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M17.6,6L6.9,16.7c-0.2,0.2-0.3,0.4-0.3,0.6L6,23.9c0,0.3,0.1,0.6,0.3,0.8C6.5,24.9,6.7,25,7,25c0,0,0.1,0,0.1,0l6.6-0.6 c0.2,0,0.5-0.1,0.6-0.3L25,13.4L17.6,6z"></path> <path d="M26.4,12l1.4-1.4c1.2-1.2,1.1-3.1-0.1-4.3l-3-3c-0.6-0.6-1.3-0.9-2.2-0.9c-0.8,0-1.6,0.3-2.2,0.9L19,4.6L26.4,12z"></path> </g> <g> <path d="M28,29H4c-0.6,0-1-0.4-1-1s0.4-1,1-1h24c0.6,0,1,0.4,1,1S28.6,29,28,29z"></path> </g> </g></svg>`,
            },
          },
          // inlineCode:InlineCode,
          delimiter: Delimiter,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: "/api/link",
            },
          },
          image: {
            class: ImageTool,
            config: {
              uploader,
            },
          },
          iframe: Iframe,

          list: {
            //@ts-ignore
            class: NestedList,
            inlineToolbar: true,
            config: {
              defaultStyle: "unordered",
            },
          },
          code: Code,
          table: Table,
          //@ts-ignore
          embed: Embed,
          raw: RawTool,
          quote: {
            class: Quote,
            inlineToolbar: true,
            shortcut: "CMD+SHIFT+O",
            config: {
              quotePlaceholder: "Enter a quote",
              captionPlaceholder: "Quote's author",
            },
          },
        },
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();
    };

    if (isMounted) {
      init();

      return () => {
        ref.current?.destroy();
        //@ts-ignore
        ref.current = undefined;
      };
    }
  }, [isMounted, initializeEditor]);

  async function postContents() {
    const blocks = await ref.current?.save();
    const content = JSON.stringify(blocks);
    setContent(content);
  }

  if (!isMounted) {
    return (
      <div className="w-full p-4 bg-zinc-50 rounded-lg border border-zinc-200 max-h-[450px]">
        <p className="text-sm text-gray-500">
          Use{" "}
          <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
            Tab
          </kbd>{" "}
          to open the command menu.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full p-4 bg-zinc-50 rounded-lg border border-zinc-200 max-h-[450px] overflow-auto">
      <div id="editor" className="min-h-[250px]" />
      <p className="text-sm text-gray-500">
        Use{" "}
        <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
          Tab
        </kbd>{" "}
        to open the command menu.
      </p>
    </div>
  );
};
