import EditableField from "../EditableField";


export default function MoodSummaryField({ value }) {
  return (
    <EditableField
      title="Skala perasaan (rata-rata)"
      value={value}
      isEditing={false}
      onChange={() => {}}
      onEditToggle={() => {}}
      editable={false}
      containerStyle="mb-8"
    />
  );
}
