import React from "react";
export default function LogoSTQ({ className = "h-8 w-8", title = "SouthTyrolQuests", paths }: { className?: string; title?: string; paths?: string }) {
  const hasInline = typeof paths === 'string' && paths.trim().length > 0;
  if (hasInline) {
    const sanitized = paths!.replace(/fill=("|')#?[0-9a-fA-F]{3,8}("|')/g, 'fill="currentColor"').replace(/\son[a-z]+=("|')[^"']*("|')/gi, '').replace(/<\/?script[^>]*>/gi, '');
    return (<svg viewBox="0 0 1024 1024" role="img" aria-label={title} className={className} dangerouslySetInnerHTML={{ __html: sanitized }} />);
  }
  return (<div aria-label={title} role="img" className={`grid place-items-center rounded-xl bg-[#0f766e] text-white font-extrabold ${className}`} style={{ lineHeight: 1 }}>SQ</div>);
}