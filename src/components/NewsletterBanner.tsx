import { useState, type FormEvent } from 'react';

type SubmitStatus = 'idle' | 'success' | 'error';

export function NewsletterBanner() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SubmitStatus>('idle');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValid) {
      setStatus('error');
      return;
    }

    setStatus('success');
    setEmail('');
  }

  return (
    <div className="react-banner">
      <div className="container">
        <form className="react-newsletter" onSubmit={handleSubmit}>
          <p>
            <strong>Clube Pharmadroga</strong> — Receba ofertas exclusivas e cupons de desconto.
          </p>
          <div className="react-newsletter__form">
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status !== 'idle') setStatus('idle');
              }}
              className="react-newsletter__input"
              aria-label="E-mail para newsletter"
            />
            <button type="submit" className="btn btn--coral">
              Quero economizar
            </button>
          </div>
          {status === 'success' && (
            <span className="react-newsletter__feedback success">
              Inscrição realizada! Verifique seu e-mail.
            </span>
          )}
          {status === 'error' && (
            <span className="react-newsletter__feedback error">
              Informe um e-mail válido.
            </span>
          )}
        </form>
      </div>
    </div>
  );
}
