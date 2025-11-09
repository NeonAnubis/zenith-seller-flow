import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const currentLanguage = i18n.language;

  return (
    <div className="w-full px-3 py-4 border-t border-sidebar-border">
      <div className="flex items-center justify-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => changeLanguage('pt-BR')}
          className={`p-1 h-auto rounded-md transition-all ${
            currentLanguage === 'pt-BR'
              ? 'ring-2 ring-primary ring-offset-2 ring-offset-sidebar'
              : 'opacity-60 hover:opacity-100'
          }`}
          title="Português (Brasil)"
        >
          <img
            src="/flags/brazil.jpg"
            alt="Português (Brasil)"
            className="w-8 h-6 object-cover rounded"
          />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => changeLanguage('en')}
          className={`p-1 h-auto rounded-md transition-all ${
            currentLanguage === 'en'
              ? 'ring-2 ring-primary ring-offset-2 ring-offset-sidebar'
              : 'opacity-60 hover:opacity-100'
          }`}
          title="English (US)"
        >
          <img
            src="/flags/us.jpg"
            alt="English (US)"
            className="w-8 h-6 object-cover rounded"
          />
        </Button>
      </div>
    </div>
  );
}
