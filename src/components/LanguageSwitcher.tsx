import { useTranslation } from 'react-i18next';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="w-full px-3 py-4 border-t border-sidebar-border">
      <div className="flex items-center gap-2 mb-2">
        <Globe className="h-4 w-4 text-sidebar-foreground" />
        <span className="text-xs text-sidebar-foreground font-medium">{t('language.label')}</span>
      </div>
      <Select value={i18n.language} onValueChange={changeLanguage}>
        <SelectTrigger className="w-full bg-sidebar-accent/50 border-sidebar-border text-sidebar-foreground">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pt-BR">{t('language.portuguese')}</SelectItem>
          <SelectItem value="en">{t('language.english')}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
