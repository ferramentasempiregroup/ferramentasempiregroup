import React, { useState, useEffect } from 'react';
import { Copy, Clipboard, Target } from 'lucide-react';
import styles from './UTMGenerator.module.css';

const UTMGenerator: React.FC = () => {
  const [linkType, setLinkType] = useState('aposta');
  const [selectedSite, setSelectedSite] = useState('ESPORTIVA');

  const baseUrls = {
    'aposta': {
      'ESPORTIVA': 'https://go.aff.esportiva.bet/4l8lno49',
      'BATEUBET': 'https://go.aff.bateu.bet.br/th2j85oe',
      'BETFALCONS': 'https://go.aff.betfalcons.bet.br/2sa6o3by',
      'PAGOLBET': 'https://go.aff.pagol.bet.br/h58lf9bv'
    },
    'cadastro': {
      'ESPORTIVA': 'https://go.aff.esportiva.bet/bt5558zi',
      'BATEUBET': 'https://go.aff.bateu.bet.br/cvr0gakv',
      'BETFALCONS': 'https://go.aff.betfalcons.bet.br/x66prfmr',
      'PAGOLBET': 'https://go.aff.pagol.bet.br/xulal7rf'
    }
  };

  const campaignIds = {
    'ESPORTIVA': '18829',
    'BATEUBET': '16223',
    'BETFALCONS': '18830',
    'PAGOLBET': '18831'
  };

  const betmgmOrigins = {
    'Especiais': '8125',
    'Free': '4590',
    'Alavancagem': '9364',
    'Odds Altas': '9573'
  };

  const superbetBaseUrl = 'https://wlsuperbet.adsrv.eacdn.com/C.ashx?btag=a_12645b_431c_&affid=662&siteid=12645&adid=431&c=CampanhaGeral';

  const [shareCodeInput, setShareCodeInput] = useState('');
  const [afp, setAfp] = useState('instagram');
  const [afp6, setAfp6] = useState('reels');
  const [showDetail, setShowDetail] = useState(false);
  const [afp9, setAfp9] = useState('');
  const [betmgmOrigin, setBetmgmOrigin] = useState('Free');

  const formatDate = () => {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}_${month}_${year}`;
  };

  const [generatedUrl, setGeneratedUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const afpOptions = ['instagram', 'telegram', 'twitter', 'whatsapp', 'trafego'] as const;
  type AfpChannel = typeof afpOptions[number];

  const afp6OptionsByChannel: Record<AfpChannel, string[]> = {
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
    return `📱 ${channel}`;
  };

  const extractShareCode = (input: string): string => {
    const shareCodeMatch = input.match(/shareCode=([A-Z0-9]+)/);
    if (shareCodeMatch) {
      return shareCodeMatch[1];
    }
    const bscodeMatch = input.match(/bscode=([A-Z0-9]+)/);
    if (bscodeMatch) {
      return bscodeMatch[1];
    }
    return input.trim();
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setShareCodeInput(text);
    } catch (err) {
      console.error('Failed to read clipboard contents:', err);
    }
  };

  useEffect(() => {
    setAfp6(afp6OptionsByChannel[afp as AfpChannel][0]);
  }, [afp]);

  useEffect(() => {
    generateUrl();
  }, [linkType, selectedSite, shareCodeInput, afp, afp6, showDetail, afp9, betmgmOrigin]);

  const generateUrl = () => {
    if (selectedSite === 'BETMGM') {
      if (!shareCodeInput.trim()) {
        setGeneratedUrl('');
        return;
      }

      const pid = betmgmOrigins[betmgmOrigin as keyof typeof betmgmOrigins];
      const originalLink = shareCodeInput.trim();
      const redirectUrl = `https://ntrfr.betmgm.bet.br/redirect.aspx?pid=${pid}&lpid=10&bid=1519&redirectURL=${originalLink}`;

      setGeneratedUrl(redirectUrl);
      return;
    }

    if (selectedSite === 'SUPERBET') {
      if (linkType === 'cadastro') {
        setGeneratedUrl(superbetBaseUrl);
        return;
      }

      if (linkType === 'aposta') {
        if (!shareCodeInput.trim()) {
          setGeneratedUrl('');
          return;
        }

        const betLink = shareCodeInput.trim();
        const fullUrl = `${superbetBaseUrl}&asclurl=${betLink}`;
        setGeneratedUrl(fullUrl);
        return;
      }
    }

    let baseUrl = baseUrls[linkType as keyof typeof baseUrls][selectedSite as keyof typeof campaignIds];

    if (linkType === 'aposta' && selectedSite === 'PAGOLBET' && afp === 'telegram' && afp6 === 'NBA') {
      baseUrl = 'https://go.aff.pagol.bet.br/jenpg7is';
    }

    const url = new URL(baseUrl);

    url.searchParams.set('campaign_id', campaignIds[selectedSite as keyof typeof campaignIds]);

    if (linkType === 'aposta' && shareCodeInput) {
      const codeParam = selectedSite === 'BETFALCONS' ? 'bscode' : 'shareCode';
      url.searchParams.set(codeParam, extractShareCode(shareCodeInput));
    }

    url.searchParams.set('afp', afp.toLowerCase());
    url.searchParams.set('afp1', formatDate());
    url.searchParams.set('afp6', afp6.toLowerCase());

    if (showDetail && afp9) {
      url.searchParams.set('afp9', afp9.toLowerCase());
    }

    if (linkType === 'aposta') {
      url.searchParams.set('home', '1');
    }

    setGeneratedUrl(url.toString());
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.headerPattern}>
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,215,0,0.3) 2px, transparent 2px), radial-gradient(circle at 75% 75%, rgba(255,215,0,0.3) 2px, transparent 2px)`,
              backgroundSize: '60px 60px'
            }} />
          </div>

          <div className={styles.headerGradient} />

          <div className={styles.headerFloating}>
            <div className={styles.floatingCircle1} />
            <div className={styles.floatingCircle2} />
            <div className={styles.floatingCircle3} />
          </div>

          <div className={styles.logoContainer}>
            <img
              src="/magreen1-preto-r35oq5skhalqmndl2h3qd74v5jjzxzsk5rql0i977c.png"
              alt="MaGreen Logo"
              className={styles.logo}
            />
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.grid}>
            <div className={styles.column}>
              <div className={styles.formGroup}>
                <label htmlFor="linkType" className={styles.label}>
                  Tipo de Link
                </label>
                <select
                  id="linkType"
                  value={linkType}
                  onChange={(e) => setLinkType(e.target.value)}
                  className={styles.select}
                >
                  <option value="aposta">🎯 Aposta Pronta</option>
                  <option value="cadastro">📝 Cadastro</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="selectedSite" className={styles.label}>
                  Plataforma
                </label>
                <select
                  id="selectedSite"
                  value={selectedSite}
                  onChange={(e) => setSelectedSite(e.target.value)}
                  className={styles.select}
                >
                  {Object.keys(baseUrls.aposta).map((site) => (
                    <option key={site} value={site}>
                      {site}
                    </option>
                  ))}
                  <option value="BETMGM">BETMGM</option>
                  <option value="SUPERBET">SUPERBET</option>
                </select>
              </div>

              {(linkType === 'aposta' || selectedSite === 'BETMGM' || (selectedSite === 'SUPERBET' && linkType === 'aposta')) && (
                <div className={styles.formGroup}>
                  <label htmlFor="shareCode" className={styles.label}>
                    {selectedSite === 'BETMGM' ? 'Link Completo da BETMGM' : selectedSite === 'SUPERBET' ? 'Link do Bilhete da SUPERBET' : selectedSite === 'BETFALCONS' ? 'Código da Aposta (bscode)' : 'Código da Aposta (shareCode)'}
                  </label>
                  <textarea
                    id="shareCode"
                    value={shareCodeInput}
                    onChange={(e) => setShareCodeInput(e.target.value)}
                    placeholder={selectedSite === 'BETMGM' ? 'Cole o link completo da BETMGM aqui...' : selectedSite === 'SUPERBET' ? 'Cole o link do bilhete compartilhado da SUPERBET aqui...' : selectedSite === 'BETFALCONS' ? 'Cole o link ou bscode aqui...' : 'Cole o código ou mensagem completa aqui...'}
                    className={styles.textarea}
                  />
                  <button onClick={handlePaste} className={styles.pasteButton}>
                    <Clipboard size={16} style={{ marginRight: '8px' }} />
                    Colar da Área de Transferência
                  </button>
                </div>
              )}

              {selectedSite === 'BETMGM' && (
                <div className={styles.formGroup}>
                  <label htmlFor="betmgmOrigin" className={styles.label}>
                    Origem
                  </label>
                  <select
                    id="betmgmOrigin"
                    value={betmgmOrigin}
                    onChange={(e) => setBetmgmOrigin(e.target.value)}
                    className={styles.select}
                  >
                    {Object.keys(betmgmOrigins).map((origin) => (
                      <option key={origin} value={origin}>
                        {origin}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {selectedSite !== 'BETMGM' && selectedSite !== 'SUPERBET' && (
                <div className={styles.formGroup}>
                  <label htmlFor="afp" className={styles.label}>
                    Canal de Origem
                  </label>
                  <select
                    id="afp"
                    value={afp}
                    onChange={(e) => setAfp(e.target.value)}
                    className={styles.select}
                  >
                    {afpOptions.map((option) => (
                      <option key={option} value={option}>
                        {getChannelDisplayName(option)}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className={styles.column}>
              {selectedSite !== 'BETMGM' && selectedSite !== 'SUPERBET' && (
                <>
                  <div className={styles.formGroup}>
                    <label htmlFor="afp6" className={styles.label}>
                      Destino Específico
                    </label>
                    <select
                      id="afp6"
                      value={afp6}
                      onChange={(e) => setAfp6(e.target.value)}
                      className={styles.select}
                    >
                      {afp6OptionsByChannel[afp as AfpChannel].map((option: string) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className={styles.checkboxContainer}>
                    <input
                      type="checkbox"
                      id="showDetail"
                      checked={showDetail}
                      onChange={(e) => setShowDetail(e.target.checked)}
                      className={styles.checkbox}
                    />
                    <label htmlFor="showDetail" className={styles.checkboxLabel}>
                      Adicionar detalhes personalizados
                    </label>
                  </div>

                  {showDetail && (
                    <div className={styles.formGroup}>
                      <label htmlFor="afp9" className={styles.label}>
                        Detalhes Adicionais (AFP9)
                      </label>
                      <input
                        type="text"
                        id="afp9"
                        value={afp9}
                        onChange={(e) => setAfp9(e.target.value)}
                        placeholder="Informações extras para rastreamento..."
                        className={styles.input}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <div className={styles.urlSection}>
            <div className={styles.urlHeader}>
              <h3 className={styles.urlTitle}>
                <Target size={24} />
                Link Gerado
              </h3>
              <button onClick={handleCopyUrl} className={styles.copyButton}>
                <Copy size={18} style={{ marginRight: '8px' }} />
                {copied ? '✅ Copiado!' : 'Copiar Link'}
              </button>
            </div>

            <div className={styles.urlDisplay}>
              <div className={styles.urlBox}>
                <p className={styles.urlText}>
                  {generatedUrl || 'Configure os parâmetros acima para gerar seu link...'}
                </p>
              </div>

              {copied && (
                <div className={styles.copiedOverlay}>
                  <div className={styles.copiedMessage}>
                    <p className={styles.copiedText}>
                      <Copy size={24} />
                      Link copiado com sucesso!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UTMGenerator;
