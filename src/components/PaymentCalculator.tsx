import { useState } from 'react';
import type { PaymentMethod } from '@/types';

const PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'visa', name: 'Visa', installments: 6, interestFree: true },
  { id: 'master', name: 'Mastercard', installments: 6, interestFree: true },
  { id: 'elo', name: 'Elo', installments: 6, interestFree: true },
  { id: 'amex', name: 'American Express', installments: 6, interestFree: true },
  { id: 'hiper', name: 'Hipercard', installments: 6, interestFree: true },
  { id: 'pix', name: 'PIX', installments: 1, interestFree: true },
];

function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function PaymentCalculator() {
  const [amount, setAmount] = useState(150);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(PAYMENT_METHODS[0]);

  const pixDiscount = 0.05;
  const finalAmount = selectedMethod.id === 'pix' ? amount * (1 - pixDiscount) : amount;
  const installmentValue = finalAmount / selectedMethod.installments;

  return (
    <section className="react-payment-calc">
      <div className="container">
        <div className="react-payment-calc__inner">
          <div className="react-payment-calc__header">
            <span className="react-payment-calc__badge">React + TypeScript</span>
            <h2 className="react-payment-calc__title font-display">
              Simulador de Parcelamento
            </h2>
            <p className="react-payment-calc__desc">
              Calcule em tempo real quanto ficará sua compra em até 6x sem juros.
            </p>
          </div>

          <div className="react-payment-calc__body">
            <div className="react-payment-calc__input-group">
              <label htmlFor="amount" className="react-payment-calc__label">
                Valor da compra
              </label>
              <input
                id="amount"
                type="range"
                min={10}
                max={1000}
                step={10}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="react-payment-calc__range"
              />
              <span className="react-payment-calc__amount font-price">
                {formatCurrency(amount)}
              </span>
            </div>

            <div className="react-payment-calc__methods">
              {PAYMENT_METHODS.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  className={`react-payment-calc__method ${
                    selectedMethod.id === method.id ? 'active' : ''
                  }`}
                  onClick={() => setSelectedMethod(method)}
                >
                  {method.name}
                </button>
              ))}
            </div>

            <div className="react-payment-calc__result">
              {selectedMethod.id === 'pix' ? (
                <>
                  <span className="react-payment-calc__result-label">Com desconto PIX (5%)</span>
                  <span className="react-payment-calc__result-value font-price">
                    {formatCurrency(finalAmount)}
                  </span>
                  <span className="react-payment-calc__result-installment">
                    Economia de {formatCurrency(amount - finalAmount)}
                  </span>
                </>
              ) : (
                <>
                  <span className="react-payment-calc__result-label">
                    {selectedMethod.installments}x sem juros no {selectedMethod.name}
                  </span>
                  <span className="react-payment-calc__result-value font-price">
                    {formatCurrency(installmentValue)}
                  </span>
                  <span className="react-payment-calc__result-installment">
                    Total: {formatCurrency(finalAmount)}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
