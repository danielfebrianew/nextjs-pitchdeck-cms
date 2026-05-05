type SectionMetaProps = {
  index: number;
  total: number;
  label: string;
};

export function SectionMeta({ index, total, label }: SectionMetaProps) {
  return (
    <div className="section-meta">
      <span>Daniel x PT KUDAMAS - {label}</span>
      <span>
        {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
    </div>
  );
}
