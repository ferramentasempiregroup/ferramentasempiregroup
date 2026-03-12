import React, { useState, useEffect } from 'react';
import './UTMGenerator.css';

const UTMGenerator: React.FC = () => {
  const [baseUrl, setBaseUrl] = useState('https://go.aff.esportiva.bet/4l8lno49');
  const [afp, setAfp] = useState('');
  const [afp6, setAfp6] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const afpOptions = ['instagram', 'telegram', 'twitter', 'whatsapp', 'trafego'];
  const afp6OptionsByChannel = {
    instagram: ['reels', 'storys', 'linkbio', 'comunidade', 'impulsionar'],
    telegram: ['free', 'vip', 'bingo', 'channelhelp', 'sendpulse', 'fixado', 'ODDsAltas', 'Alavancagem', 'Especiais', 'NBA', 'Regalo'],
    twitter: ['post'],
    whatsapp: ['comunidade', 'fixado', 'descricao'],
    trafego: ['superodd', 'bingo']
  };

  const getChannelDisplayName = (channel: string) => {
    if (channel === 'trafego') {
      return '🌐 Tráfego';
    }
    const channelEmojis: { [key: string]: string } = {
      instagram: '📷',
      telegram: '✈️',
      twitter: '🐦',
      whatsapp: '💬'
    };
    const emoji = channelEmojis[channel] || '';
    return `${emoji} ${channel.charAt(0).toUpperCase() + channel.slice(1)}`;
  };

  const getDestinationDisplayName = (destination: string) => {
    if (destination === 'ODDsAltas') return '🎯 ODDs Altas';
    if (destination === 'NBA') return '🏀 NBA';
    return destination.charAt(0).toUpperCase() + destination.slice(1);
  };

  useEffect(() => {
    if (afp && afp6) {
      const url = new URL(baseUrl);
      url.searchParams.set('afp', afp);
      url.searchParams.set('afp6', afp6);
      setGeneratedUrl(url.toString());
    } else {
      setGeneratedUrl('');
    }
  }, [baseUrl, afp, afp6]);

  const handleCopy = async () => {
    if (generatedUrl) {
      await navigator.clipboard.writeText(generatedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setBaseUrl('https://go.aff.esportiva.bet/4l8lno49');
    setAfp('');
    setAfp6('');
    setGeneratedUrl('');
    setCopied(false);
  };

  const handleAfpChange = (value: string) => {
    setAfp(value);
    setAfp6('');
  };

  return (
    <div className="utm-generator">
      <div className="card">
        <h1 className="title">⚽ Gerador de UTM</h1>
        <p className="subtitle">Esportiva Bet</p>

        <div className="form-group">
          <label htmlFor="baseUrl">Link Base:</label>
          <select
            id="baseUrl"
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value)}
            className="select"
          >
            <option value="https://go.aff.esportiva.bet/4l8lno49">
              🎯 Aposta Pronta
            </option>
            <option value="https://go.aff.esportiva.bet/bt5558zi">
              📝 Cadastro
            </option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="afp">Canal de Origem (AFP):</label>
          <select
            id="afp"
            value={afp}
            onChange={(e) => handleAfpChange(e.target.value)}
            className="select"
          >
            <option value="">Selecione um canal</option>
            {afpOptions.map((option) => (
              <option key={option} value={option}>
                {getChannelDisplayName(option)}
              </option>
            ))}
          </select>
        </div>

        {afp && (
          <div className="form-group">
            <label htmlFor="afp6">Destino Específico (AFP6):</label>
            <select
              id="afp6"
              value={afp6}
              onChange={(e) => setAfp6(e.target.value)}
              className="select"
            >
              <option value="">Selecione um destino</option>
              {afp6OptionsByChannel[afp as keyof typeof afp6OptionsByChannel]?.map((option) => (
                <option key={option} value={option}>
                  {getDestinationDisplayName(option)}
                </option>
              ))}
            </select>
          </div>
        )}

        {generatedUrl && (
          <div className="result-container">
            <label>URL Gerada:</label>
            <div className="url-display">
              <input
                type="text"
                value={generatedUrl}
                readOnly
                className="url-input"
              />
              <button onClick={handleCopy} className="copy-button">
                {copied ? '✓ Copiado!' : '📋 Copiar'}
              </button>
            </div>
          </div>
        )}

        <button onClick={handleReset} className="reset-button">
          🔄 Resetar
        </button>
      </div>
    </div>
  );
};

export default UTMGenerator;
