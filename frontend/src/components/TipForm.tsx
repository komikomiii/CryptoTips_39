import { useState } from 'react';
import { web3Service } from '../utils/web3';

interface TipFormProps {
  recipientAddress: string;
  onSuccess?: (txHash: string) => void;
}

export const TipForm = ({ recipientAddress, onSuccess }: TipFormProps) => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const presetAmounts = ['0.001', '0.005', '0.01', '0.05'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const txHash = await web3Service.sendTip(recipientAddress, amount);

      onSuccess?.(txHash);
      setAmount('');
      setMessage('');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Transaction failed';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-xl p-8 shadow-2xl">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Amount (ETH)
        </label>
        <input
          type="number"
          step="0.001"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.01"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          disabled={loading}
        />
        <div className="flex gap-2 mt-3">
          {presetAmounts.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setAmount(preset)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
              disabled={loading}
            >
              {preset} ETH
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Message (Optional)
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Say something nice..."
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          disabled={loading}
        />
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !amount}
        className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 font-semibold text-lg"
      >
        {loading ? 'Processing...' : 'Send Tip'}
      </button>
    </form>
  );
};
