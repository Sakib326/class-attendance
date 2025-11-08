import { message } from "antd";
import parse from "html-react-parser";

export const copyHandler = (copiedTxt: any, msg?: string) => {
  if (!copiedTxt) return;
  navigator.clipboard.writeText(copiedTxt);
  message.success(msg || "Copied Successfully!");
};
export const splitNameWithLastDot = (name: string) => {
  const lastDotIndex = name.lastIndexOf(".");
  if (lastDotIndex !== -1) {
    const fileName = name.substring(0, lastDotIndex);
    const fileExtension = name.substring(lastDotIndex + 1);
    return [fileName, fileExtension];
  }
  // If there is no dot in the name
  return [name, ""];
};

export const formatBytes = (bytes: number) => {
  if (bytes === 0) {
    return "0 Bytes";
  }

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

//remove tags
export const remove_tags = (_html: any) => {
  let html = _html.toString();
  let strippedString = html.replace(/(<([^>]+)>)/gi, "");
  return strippedString;
};
//printe excerpt
export const excerpt = (_html: any, count = 100) => {
  const text = remove_tags(_html).toString().replaceAll("&nbsp;", " ");
  return text.slice(0, count) + (text.length > count ? "..." : "");
};

//filtered Entries
export const filteredEntries = (data: any) => {
  const filteredData = Object.fromEntries(
    Object.entries(data).filter(
      ([_, value]) =>
        value !== "" &&
        value !== null &&
        value !== undefined &&
        value !== "undefined"
    )
  );
  return filteredData;
};
//generate query string;
export const generateQueryString = (data: any) => {
  const filteredData = filteredEntries(data);

  const queryString = Object.keys(filteredData)
    .map((key) => {
      const value = data[key];
      if (
        value != null &&
        value !== "undefined" &&
        value !== undefined &&
        value !== ""
      ) {
        if (Array.isArray(value)) {
          return value
            .map((item) => `${key}[]=${encodeURIComponent(item)}`)
            .join("&");
        }
        return `${key}=${encodeURIComponent(value)}`;
      }
    })
    .join("&");

  const fullQueryString = `?${queryString}`;

  return fullQueryString;
};

export const htmlParse = (str: string) => {
  if (!str || str == "" || typeof str !== "string") return false;
  return parse(str);
};

interface OriginalItem {
  id: number;
  title: string;
  children?: OriginalItem[];
}

interface TransformedItem {
  title: string;
  value: number;
  children?: TransformedItem[];
}

interface TransformedLabel {
  label: string;
  value: number;
  children?: TransformedLabel[];
}

export const transformData = (
  originalData: any[],
  key: any = "title",
  value: string = "id"
): TransformedItem[] => {
  if (originalData && originalData.length > 0) {
    return originalData?.map((item) => {
      const transformedItem: TransformedItem = {
        title: item[key],
        value: item[value],
      };

      if (item.children && item.children.length > 0) {
        transformedItem.children = transformData(item.children, key, value);
      }
      return transformedItem;
    });
  }
  return [];
};

export const ErrorMessage = (errors: any) => {
  if (Array.isArray(errors) && errors.length > 0) {
    errors.map((item: string) => {
      message.error(item);
    });
  } else if (typeof errors === "string") {
    message.error(errors);
  }
};

export const transformLabelValue = (
  originalData: any[],
  key: any = "title",
  value: string = "id"
): TransformedLabel[] => {
  if (originalData && originalData.length > 0) {
    return originalData?.map((item) => {
      const transformedItem: TransformedLabel = {
        label: item[key],
        value: item[value],
      };

      if (item.children && item.children.length > 0) {
        transformedItem.children = transformLabelValue(
          item.children,
          key,
          value
        );
      }

      return transformedItem;
    });
  }

  return [];
};

export const findSelectedValue = (options: any[], targetValue: string): any => {
  for (const option of options) {
    if (option.value === targetValue) {
      return option;
    } else if (option.children) {
      const foundInChildren = findSelectedValue(option.children, targetValue);
      if (foundInChildren) {
        return foundInChildren;
      }
    }
  }
  return null;
};

//filter match
export const matchNode = (input: string, node: any) => {
  const labelMatch = node.title.toLowerCase().includes(input.toLowerCase());

  if (labelMatch) {
    return true;
  }

  if (node.children) {
    for (const child of node.children) {
      if (matchNode(input, child)) {
        return true;
      }
    }
  }
  return false;
};

interface Block {
  type: string;
  data: any;
}

interface ListItem {
  text: string;
  children?: ListItem[];
}
//editor

export const convertNestedListToHtml = (items: ListItem[]): string => {
  let html = "<ul>";

  items.forEach((item) => {
    html += "<li>" + item.text;
    if (item.children && item.children.length > 0) {
      html += convertNestedListToHtml(item.children); // Recursively generate HTML for nested lists
    }
    html += "</li>";
  });

  html += "</ul>";
  return html;
};

//editor
export const convertDataBlockToHtml = (blocks: Block[]): string => {
  let html = "";
  if (Array.isArray(blocks)) {
    blocks.forEach((block) => {
      switch (block.type) {
        case "paragraph":
          html += `<p>${block.data.text}</p>`;
          break;
        case "header":
          html += `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
          break;
        case "embed":
          html += `<div><iframe width="560" height="315" src="${block.data.embed}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>`;
          break;
        case "delimiter":
          html += "<hr />";
          break;
        case "image":
          html += `<img class="img-fluid" src="${block.data.file.url}" title="${block.data.caption}" /><br /><em>${block.data.caption}</em>`;
          break;
        case "list":
          html += "<ul>";
          block.data.items.forEach((item: string) => {
            // @ts-ignore
            html += `<li>${item?.content}</li>`;
          });
          html += "</ul>";
          break;
        case "nestedlist":
          html += convertNestedListToHtml(block.data);
          break;
        default:
          break;
      }
    });
  } else {
    console.error("blocks is not an array:", blocks);
  }

  return html;
};
