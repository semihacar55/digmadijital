import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';

interface FormLoadingProps {
    message?: string;
}

export const FormLoading = ({ message = 'Gönderiliyor...' }: FormLoadingProps) => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
        <p className="text-text-muted">{message}</p>
    </div>
);

interface FormSuccessProps {
    title?: string;
    message?: string;
    onReset?: () => void;
    resetLabel?: string;
}

export const FormSuccess = ({
    title = 'Mesajınız Alındı!',
    message = 'En kısa sürede size dönüş yapacağız.',
    onReset,
    resetLabel = 'Yeni Mesaj Gönder'
}: FormSuccessProps) => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 mb-6">
            <CheckCircle2 size={40} />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-text-muted mb-8">{message}</p>
        {onReset && (
            <Button variant="outline" onClick={onReset}>
                {resetLabel}
            </Button>
        )}
    </div>
);

interface FormErrorProps {
    title?: string;
    message: string;
    onRetry?: () => void;
    retryLabel?: string;
}

export const FormError = ({
    title = 'Bir Hata Oluştu',
    message,
    onRetry,
    retryLabel = 'Tekrar Dene'
}: FormErrorProps) => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center text-red-400 mb-6">
            <AlertCircle size={40} />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-text-muted mb-8">{message}</p>
        {onRetry && (
            <Button variant="default" onClick={onRetry}>
                {retryLabel}
            </Button>
        )}
    </div>
);

interface FormInlineErrorProps {
    message: string;
}

export const FormInlineError = ({ message }: FormInlineErrorProps) => (
    <div className="text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20 flex items-start gap-2">
        <AlertCircle size={16} className="shrink-0 mt-0.5" />
        <span>{message}</span>
    </div>
);
