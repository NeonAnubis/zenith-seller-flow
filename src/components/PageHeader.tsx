interface PageHeaderProps {
  title: string;
  description?: string;
  backgroundImage: string;
}

export function PageHeader({ title, description, backgroundImage }: PageHeaderProps) {
  return (
    <div className="relative h-64 overflow-hidden">
      <img
        src={backgroundImage}
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 flex items-center">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-white mb-2">{title}</h1>
          {description && (
            <p className="text-white/90 text-lg">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
