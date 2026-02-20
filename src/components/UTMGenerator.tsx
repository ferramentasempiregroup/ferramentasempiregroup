import React, { useState, useEffect } from 'react';
import { Copy, Clipboard, Target } from 'lucide-react';

const UTMGenerator: React.FC = () => {
  const [linkType, setLinkType] = useState('aposta');
  const [selectedSite, setSelectedSite] = useState('ESPORTIVA');

  const baseUrls = {
    'aposta': {
      'ESPORTIVA': 'https://go.aff.esportiva.bet/zyr47z0k',
      'BATEUBET': 'https://go.aff.bateu.bet.br/th2j85oe',
      'BETFALCONS': 'https://go.aff.betfalcons.bet.br/2sa6o3by',
      'PAGOLBET': 'https://go.aff.pagol.bet.br/h58lf9bv'
    },
    'cadastro': {
      'ESPORTIVA': 'https://go.aff.esportiva.bet/g2442wjr',
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
    setAfp6(afp6OptionsByChannel[afp][0]);
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

      const pid = betmgmOrigins[betmgmOrigin];
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

    let baseUrl = baseUrls[linkType][selectedSite];

    if (linkType === 'aposta' && selectedSite === 'PAGOLBET' && afp === 'telegram' && afp6 === 'NBA') {
      baseUrl = 'https://go.aff.pagol.bet.br/jenpg7is';
    }

    const url = new URL(baseUrl);

    url.searchParams.set('campaign_id', campaignIds[selectedSite]);

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
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-black backdrop-blur-xl border border-[#FFD700]/30 shadow-2xl rounded-3xl overflow-hidden">
        {/* Professional Header - Mobile Optimized */}
        <div className="relative h-56 sm:h-64 overflow-hidden bg-black">
          {/* Subtle geometric pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,215,0,0.3) 2px, transparent 2px),
                               radial-gradient(circle at 75% 75%, rgba(255,215,0,0.3) 2px, transparent 2px)`,
              backgroundSize: '60px 60px'
            }} />
          </div>

          {/* Professional gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/10 via-[#F9C80E]/10 to-[#FFD700]/10" />

          {/* Floating elements */}
          <div className="absolute inset-0">
            <div className="absolute top-8 left-8 w-20 h-20 sm:w-32 sm:h-32 sm:top-12 sm:left-12 bg-gradient-to-br from-[#FFD700]/15 to-transparent rounded-full blur-2xl animate-pulse" />
            <div className="absolute bottom-8 right-8 w-16 h-16 sm:w-28 sm:h-28 sm:bottom-12 sm:right-12 bg-gradient-to-br from-[#F9C80E]/12 to-transparent rounded-full blur-xl animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/4 w-12 h-12 sm:w-20 sm:h-20 bg-gradient-to-br from-[#FFD700]/10 to-transparent rounded-full blur-lg animate-pulse delay-500" />
          </div>

          <div className="relative h-full flex items-center justify-center px-4 sm:px-8">
            <img
              src="/magreen1-preto-r35oq5skhalqmndl2h3qd74v5jjzxzsk5rql0i977c.png"
              alt="MaGreen Logo"
              className="h-40 sm:h-52 w-auto object-contain drop-shadow-2xl"
            />
          </div>
        </div>
        
        {/* Main Content - Mobile Optimized */}
        <div className="p-4 sm:p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Left Column */}
            <div className="space-y-4 sm:space-y-6">
              <div className="group">
                <label htmlFor="linkType" className="block text-sm font-bold text-[#FFD700] mb-2 sm:mb-3 group-hover:text-[#F9C80E] transition-colors">
                  Tipo de Link
                </label>
                <select
                  id="linkType"
                  value={linkType}
                  onChange={(e) => setLinkType(e.target.value)}
                  className="w-full px-4 py-3 sm:px-5 sm:py-4 bg-zinc-900 text-white border border-[#FFD700]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50 focus:border-[#FFD700] transition-all duration-200 font-semibold text-base sm:text-lg shadow-lg"
                >
                  <option value="aposta">🎯 Aposta Pronta</option>
                  <option value="cadastro">📝 Cadastro</option>
                </select>
              </div>

              <div className="group">
                <label htmlFor="selectedSite" className="block text-sm font-bold text-[#FFD700] mb-2 sm:mb-3 group-hover:text-[#F9C80E] transition-colors">
                  Plataforma
                </label>
                <select
                  id="selectedSite"
                  value={selectedSite}
                  onChange={(e) => setSelectedSite(e.target.value)}
                  className="w-full px-4 py-3 sm:px-5 sm:py-4 bg-zinc-900 text-white border border-[#FFD700]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50 focus:border-[#FFD700] transition-all duration-200 font-semibold text-base sm:text-lg shadow-lg"
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
                <div className="group">
                  <label htmlFor="shareCode" className="block text-sm font-bold text-[#FFD700] mb-2 sm:mb-3 group-hover:text-[#F9C80E] transition-colors">
                    {selectedSite === 'BETMGM' ? 'Link Completo da BETMGM' : selectedSite === 'SUPERBET' ? 'Link do Bilhete da SUPERBET' : selectedSite === 'BETFALCONS' ? 'Código da Aposta (bscode)' : 'Código da Aposta (shareCode)'}
                  </label>
                  <textarea
                    id="shareCode"
                    value={shareCodeInput}
                    onChange={(e) => setShareCodeInput(e.target.value)}
                    placeholder={selectedSite === 'BETMGM' ? 'Cole o link completo da BETMGM aqui...' : selectedSite === 'SUPERBET' ? 'Cole o link do bilhete compartilhado da SUPERBET aqui...' : selectedSite === 'BETFALCONS' ? 'Cole o link ou bscode aqui...' : 'Cole o código ou mensagem completa aqui...'}
                    className="w-full px-4 py-3 sm:px-5 sm:py-4 bg-zinc-900 text-white border border-[#FFD700]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50 focus:border-[#FFD700] transition-all duration-200 min-h-[120px] sm:min-h-[140px] resize-none font-mono text-sm shadow-lg"
                  />
                  <button
                    onClick={handlePaste}
                    className="mt-3 sm:mt-4 flex items-center px-4 py-2 sm:px-6 sm:py-3 text-sm bg-zinc-900 text-[#FFD700] rounded-xl hover:bg-zinc-800 transition-all duration-200 border border-[#FFD700]/50 font-bold hover:scale-105 active:scale-95 shadow-lg"
                  >
                    <Clipboard size={16} className="mr-2 sm:w-[18px] sm:h-[18px]" />
                    Colar da Área de Transferência
                  </button>
                </div>
              )}

              {selectedSite === 'BETMGM' && (
                <div className="group">
                  <label htmlFor="betmgmOrigin" className="block text-sm font-bold text-[#FFD700] mb-2 sm:mb-3 group-hover:text-[#F9C80E] transition-colors">
                    Origem
                  </label>
                  <select
                    id="betmgmOrigin"
                    value={betmgmOrigin}
                    onChange={(e) => setBetmgmOrigin(e.target.value)}
                    className="w-full px-4 py-3 sm:px-5 sm:py-4 bg-zinc-900 text-white border border-[#FFD700]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50 focus:border-[#FFD700] transition-all duration-200 font-semibold text-base sm:text-lg shadow-lg"
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
                <div className="group">
                  <label htmlFor="afp" className="block text-sm font-bold text-[#FFD700] mb-2 sm:mb-3 group-hover:text-[#F9C80E] transition-colors">
                    Canal de Origem
                  </label>
                  <select
                    id="afp"
                    value={afp}
                    onChange={(e) => setAfp(e.target.value)}
                    className="w-full px-4 py-3 sm:px-5 sm:py-4 bg-zinc-900 text-white border border-[#FFD700]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50 focus:border-[#FFD700] transition-all duration-200 font-semibold text-base sm:text-lg capitalize shadow-lg"
                  >
                    {afpOptions.map((option) => (
                      <option key={option} value={option} className="capitalize">
                        {getChannelDisplayName(option)}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-4 sm:space-y-6">
              {selectedSite !== 'BETMGM' && selectedSite !== 'SUPERBET' && (
                <>
                  <div className="group">
                    <label htmlFor="afp6" className="block text-sm font-bold text-[#FFD700] mb-2 sm:mb-3 group-hover:text-[#F9C80E] transition-colors">
                      Destino Específico
                    </label>
                    <select
                      id="afp6"
                      value={afp6}
                      onChange={(e) => setAfp6(e.target.value)}
                      className="w-full px-4 py-3 sm:px-5 sm:py-4 bg-zinc-900 text-white border border-[#FFD700]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50 focus:border-[#FFD700] transition-all duration-200 font-semibold text-base sm:text-lg capitalize shadow-lg"
                    >
                      {afp6OptionsByChannel[afp].map((option) => (
                        <option key={option} value={option} className="capitalize">
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center space-x-3 sm:space-x-4 p-4 sm:p-5 bg-zinc-900/40 rounded-xl border border-[#FFD700]/30 shadow-lg">
                    <input
                      type="checkbox"
                      id="showDetail"
                      checked={showDetail}
                      onChange={(e) => setShowDetail(e.target.checked)}
                      className="w-4 h-4 sm:w-5 sm:h-5 bg-zinc-900 border-[#FFD700] text-[#FFD700] rounded-md focus:ring-2 focus:ring-[#FFD700]/50 focus:ring-offset-0 transition-all duration-200"
                    />
                    <label htmlFor="showDetail" className="text-sm font-bold text-[#FFD700] cursor-pointer">
                      Adicionar detalhes personalizados
                    </label>
                  </div>

                  {showDetail && (
                    <div className="group animate-fade-in-up">
                      <label htmlFor="afp9" className="block text-sm font-bold text-[#FFD700] mb-2 sm:mb-3 group-hover:text-[#F9C80E] transition-colors">
                        Detalhes Adicionais (AFP9)
                      </label>
                      <input
                        type="text"
                        id="afp9"
                        value={afp9}
                        onChange={(e) => setAfp9(e.target.value)}
                        placeholder="Informações extras para rastreamento..."
                        className="w-full px-4 py-3 sm:px-5 sm:py-4 bg-zinc-900 text-white border border-[#FFD700]/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFD700]/50 focus:border-[#FFD700] transition-all duration-200 font-semibold shadow-lg"
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Generated URL Section - Mobile Optimized */}
          <div className="mt-8 sm:mt-12 p-4 sm:p-8 bg-zinc-900/40 rounded-2xl border border-[#FFD700]/30 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-4">
              <h3 className="text-lg sm:text-xl font-bold text-[#FFD700] flex items-center gap-2 sm:gap-3">
                <Target className="w-5 h-5 sm:w-6 sm:h-6" />
                Link Gerado
              </h3>
              <button
                onClick={handleCopyUrl}
                className="flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-sm bg-[#FFD700] text-black rounded-xl hover:bg-[#F9C80E] transition-all duration-200 font-bold hover:scale-105 active:scale-95 shadow-xl shadow-[#FFD700]/20"
              >
                <Copy size={18} className="mr-2 sm:w-5 sm:h-5" />
                {copied ? '✅ Copiado!' : 'Copiar Link'}
              </button>
            </div>

            <div className="relative">
              <div className="p-4 sm:p-6 bg-black/60 border border-[#FFD700]/30 rounded-xl overflow-auto shadow-inner">
                <p className="text-xs sm:text-sm text-[#FFD700]/90 font-mono break-all leading-relaxed">
                  {generatedUrl || 'Configure os parâmetros acima para gerar seu link...'}
                </p>
              </div>

              {copied && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/95 rounded-xl animate-fade-out">
                  <div className="px-6 py-4 sm:px-8 sm:py-6 bg-zinc-900/90 border border-[#FFD700]/50 rounded-xl shadow-2xl">
                    <p className="text-[#FFD700] font-bold flex items-center gap-2 sm:gap-3 text-base sm:text-lg">
                      <Copy className="w-5 h-5 sm:w-6 sm:h-6" />
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