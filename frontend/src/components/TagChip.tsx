// TagChip.tsx

interface TagChipProps {
  label: string;
}

export default function TagChip({ label }: TagChipProps) {
  return (
    <span
      className="
      inline-flex items-center 
      px-2.5 py-0.5 
      rounded-full 
      text-[10px] font-semibold tracking-wider uppercase 
      bg-white/50 backdrop-blur-sm
      text-slate-500 
      border border-slate-200
      hover:bg-white hover:border-slate-300 hover:text-slate-800
      transition-all duration-200
      whitespace-nowrap
    "
    >
      {label}
    </span>
  );
}
