import fileDownload from "js-file-download";
export const downloadFunction = (buffer, filename, type) => {
  const file = new Blob([
    new Uint8Array(buffer),
    {
      type: "application/pdf",
    },
  ]);
  // const url = URL.createObjectURL(file);
  // return url;
  console.log(filename);
  fileDownload(file, `${filename}.pdf`);
};
