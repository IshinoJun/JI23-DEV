interface PreviewData {
  draftKey: string;
  id: string;
}

const isPreviewData = (item: unknown): item is PreviewData => {
  const target = item as PreviewData;

  return (
    "id" in target &&
    typeof target.id === "string" &&
    "draftKey" in target &&
    typeof target.draftKey === "string"
  );
};

export { isPreviewData };
