// Database of known ETF and fund tickers
// Auto-updated by scripts/update_tickers.py
const TICKER_DB = {
  // --- Commodities Broad Basket ---
  "CMCI": { name: "VanEck CMCI Commodity Strategy ETF", category: "Commodities Broad Basket", family: "VanEck", expenseRatio: 0.65, totalAssets: 2568276 },

  // --- Commodities Focused ---
  "GLD": { name: "SPDR Gold Shares", category: "Commodities Focused", family: "State Street Investment Management", expenseRatio: 0.4, totalAssets: 184864325632 },
  "IAUM": { name: "iShares Gold Trust Micro", category: "Commodities Focused", family: "iShares", expenseRatio: 0.09, totalAssets: 8271016960 },

  // --- Derivative Income ---
  "SPYI": { name: "Neos S&P 500(R) High Income ETF", category: "Derivative Income", family: "Neos Funds", expenseRatio: 0.68, totalAssets: 8058512896 },

  // --- Digital Assets ---
  "BTGD": { name: "STKd 100% Bitcoin & 100% Gold ETF", category: "Digital Assets", family: "Quantify Funds", expenseRatio: 1.05, totalAssets: 74733056 },

  // --- Diversified Emerging Mkts ---
  "AVEM": { name: "Avantis Emerging Markets Equity ETF", category: "Diversified Emerging Mkts", family: "Avantis Investors", expenseRatio: 0.33, totalAssets: 21913593856 },
  "AVES": { name: "Avantis Emerging Markets Value ETF", category: "Diversified Emerging Mkts", family: "Avantis Investors", expenseRatio: 0.36, totalAssets: 1393086336 },
  "DFEM": { name: "Dimensional Emerging Markets Core Equity 2 ETF", category: "Diversified Emerging Mkts", family: "Dimensional Fund Advisors", expenseRatio: 0.39, totalAssets: 8328917504 },
  "DFEV": { name: "Dimensional Emerging Markets Value ETF", category: "Diversified Emerging Mkts", family: "Dimensional Fund Advisors", expenseRatio: 0.43, totalAssets: 1603019648 },
  "DGS": { name: "WisdomTree Emerging Markets SmallCap Dividend Fund", category: "Diversified Emerging Mkts", family: "WisdomTree", expenseRatio: 0.58, totalAssets: 1813873536 },
  "EMXC": { name: "iShares MSCI Emerging Markets ex China ETF", category: "Diversified Emerging Mkts", family: "iShares", expenseRatio: 0.25, totalAssets: 18039654400 },
  "FEM": { name: "First Trust Emerging Markets AlphaDEX Fund", category: "Diversified Emerging Mkts", family: "First Trust", expenseRatio: 0.8, totalAssets: 652156864 },
  "FEMS": { name: "First Trust Emerging Markets Small Cap AlphaDEX Fund", category: "Diversified Emerging Mkts", family: "First Trust", expenseRatio: 0.8, totalAssets: 272579168 },
  "FNDE": { name: "Schwab Fundamental Emerging Markets Equity ETF", category: "Diversified Emerging Mkts", family: "Schwab ETFs", expenseRatio: 0.39, totalAssets: 9415808000 },
  "FRDM": { name: "Freedom 100 Emerging Markets ETF", category: "Diversified Emerging Mkts", family: "Life + Liberty Investments, LLC", expenseRatio: 0.49, totalAssets: 2940200960 },
  "IEMG": { name: "iShares Core MSCI Emerging Markets ETF", category: "Diversified Emerging Mkts", family: "iShares", expenseRatio: 0.09, totalAssets: 148632256512 },

  // --- ETF ---
  "ACWIS": { name: "UBS MSCI ACWI SF UCITS ETF hCHF acc", category: "ETF", family: "UBS Fund Management (Ireland) Ltd.", expenseRatio: 0.21, totalAssets: null },
  "AVEU": { name: "Avantis Europe Equity UCITS ETF USD Acc", category: "ETF", family: "Waystone Management Company (IE) Limited", expenseRatio: null, totalAssets: null },
  "AVWC": { name: "Avantis Global Equity UCITS ETF USD Acc", category: "ETF", family: "American Century Investments", expenseRatio: 0.35, totalAssets: 469542144 },
  "AVWS": { name: "Avantis Global Small Cap Value UCITS ETF USD Acc", category: "ETF", family: "American Century Investments", expenseRatio: 0.39, totalAssets: 939360896 },
  "BCOM": { name: "L&G All Commodities UCITS ETF", category: "ETF", family: "LGIM Managers (Europe) Limited", expenseRatio: 0.15, totalAssets: 163605296 },
  "CBIL": { name: "Global X 0-3 Month T-Bill ETF CAD", category: "ETF", family: "Global X Investments Canada Inc.", expenseRatio: null, totalAssets: 1758352256 },
  "COSIC": { name: "UBS CMCI Commodity Carry SF UCITS ETF hCHF acc", category: "ETF", family: "UBS Fund Management (Ireland) Ltd.", expenseRatio: 0.34, totalAssets: null },
  "CRRY": { name: "WisdomTree Enhanced Commodity Carry", category: "ETF", family: "WisdomTree Multi Asset Issuer PLC", expenseRatio: null, totalAssets: null },
  "DEGC": { name: "Global Core Equity UCITS ETF USD Acc", category: "ETF", family: "Dimensional Ireland Limited", expenseRatio: null, totalAssets: null },
  "FTSE": { name: "Amundi MSCI UK IMI SRI Climate Paris Aligned - UCITS ETF DR - GBP (C)", category: "ETF", family: "Amundi Luxembourg S.A.", expenseRatio: 0.18, totalAssets: null },
  "IBCI": { name: "iShares € Inflat Lnkd GovtBd ETF EUR Acc", category: "ETF", family: "BlackRock Asset Management Ireland - ETF", expenseRatio: 0.25, totalAssets: 1267018880 },
  "IWDS": { name: "iShrs MSCI WdSp UCITS ETF US A", category: "ETF", family: "BlackRock Asset Management Ireland - ETF", expenseRatio: 0.12, totalAssets: null },
  "IWHC": { name: "iShs Wor Swp UCIT ETF CHF H A", category: "ETF", family: "", expenseRatio: null, totalAssets: null },
  "JPGL": { name: "JPM Global Equity Multi-Factor UCITS ETF USD Acc", category: "ETF", family: "JPMorgan Asset Management (Europe) S.à r.l.", expenseRatio: 0.19, totalAssets: 236973296 },
  "MVOL": { name: "iShares Edge MSCI Wld Min Vol ETF $ Acc", category: "ETF", family: "BlackRock Asset Management Ireland - ETF", expenseRatio: 0.3, totalAssets: null },
  "UEQC": { name: "UBS CMCI Commodity Carry SF UCITS ETF USD acc", category: "ETF", family: "UBS Fund Management (Ireland) Ltd.", expenseRatio: 0.34, totalAssets: null },
  "VAB": { name: "Vanguard Canadian Aggregate Bond Index ETF", category: "ETF", family: "Vanguard Investments Canada Inc", expenseRatio: null, totalAssets: 6851576832 },
  "VCN": { name: "Vanguard FTSE Canada All Cap Index ETF", category: "ETF", family: "Vanguard Investments Canada Inc", expenseRatio: null, totalAssets: 13234407424 },
  "VDET": { name: "Vanguard USD Emerging Markets G", category: "ETF", family: "", expenseRatio: null, totalAssets: null },
  "VEQT": { name: "Vanguard All-Equity ETF Portfolio", category: "ETF", family: "Vanguard Investments Canada Inc", expenseRatio: null, totalAssets: 11224197120 },
  "VGGX": { name: "VGGlbGovBdUCITSETFCHFHedgedAcc", category: "ETF", family: "Vanguard Group (Ireland) Limited", expenseRatio: null, totalAssets: null },
  "VGVF": { name: "Vanguard FTSE Developed World UCITS ETF USD Accumulation", category: "ETF", family: "Vanguard Group (Ireland) Limited", expenseRatio: null, totalAssets: 10045339648 },
  "VUN": { name: "Vanguard U.S. Total Market Index ETF", category: "ETF", family: "Vanguard Investments Canada Inc", expenseRatio: null, totalAssets: 14998651904 },
  "VWCE": { name: "Vanguard FTSE All-World UCITS ETF USD Accumulation", category: "ETF", family: "Vanguard Group (Ireland) Limited", expenseRatio: null, totalAssets: 56810098688 },
  "VWRL": { name: "Vanguard FTSE All-World ETF", category: "ETF", family: "Vanguard Group (Ireland) Limited", expenseRatio: null, totalAssets: 2210020352 },
  "WIG": { name: "Multi Units Luxembourg - Lyxor WIG20 UCITS ETF", category: "ETF", family: "", expenseRatio: null, totalAssets: null },
  "XAW": { name: "iShares Core MSCI All Country World ex Canada Index ETF", category: "ETF", family: "BlackRock Asset Management Canada Ltd", expenseRatio: null, totalAssets: null },
  "XDEM": { name: "Xtrackers MSCI World Momentum UCITS ETF 1C", category: "ETF", family: "DWS Investment S.A. (ETF)", expenseRatio: 0.25, totalAssets: 1890184448 },
  "XEC": { name: "iShares Core MSCI Emerging Markets IMI Index ETF", category: "ETF", family: "BlackRock Asset Management Canada Ltd", expenseRatio: null, totalAssets: null },
  "XEF": { name: "iShares Core MSCI EAFE IMI Index ETF", category: "ETF", family: "BlackRock Asset Management Canada Ltd", expenseRatio: null, totalAssets: 17921644544 },
  "XIC": { name: "iShares Core S&P/TSX Capped Composite Index ETF", category: "ETF", family: "BlackRock Asset Management Canada Ltd", expenseRatio: null, totalAssets: 23078295552 },
  "XNAS": { name: "Xtrackers NASDAQ 100 UCITS ETF 1C", category: "ETF", family: "DWS Investment S.A. (ETF)", expenseRatio: 0.2, totalAssets: 1905254656 },
  "ZAG": { name: "BMO Aggregate Bond Index ETF", category: "ETF", family: "BMO Asset Management Inc", expenseRatio: null, totalAssets: 12144076800 },
  "ZCN": { name: "BMO S&P/TSX Capped Composite Index ETF", category: "ETF", family: "BMO Asset Management Inc", expenseRatio: null, totalAssets: 13981966336 },
  "ZCS": { name: "BMO Short Corporate Bond Index ETF", category: "ETF", family: "BMO Asset Management Inc", expenseRatio: null, totalAssets: 4136359936 },
  "ZPRV": { name: "SPDR MSCI USA Small Cap Value W", category: "ETF", family: "", expenseRatio: null, totalAssets: null },
  "ZPRX": { name: "SPDR MSCI Europe Small Cap Valu", category: "ETF", family: "", expenseRatio: null, totalAssets: null },

  // --- Equity Hedged ---
  "AAVM": { name: "Alpha Architect Global Factor Equity ETF", category: "Equity Hedged", family: "Alpha Architect", expenseRatio: 0.38, totalAssets: 22387792 },
  "VMOT": { name: "Alpha Architect Global Factor Equity ETF", category: "Equity Hedged", family: "Alpha Architect", expenseRatio: 0.41, totalAssets: 18661356 },

  // --- Foreign Large Blend ---
  "AVDE": { name: "Avantis International Equity ETF", category: "Foreign Large Blend", family: "Avantis Investors", expenseRatio: 0.23, totalAssets: 15023426560 },
  "AVNM": { name: "Avantis All International Markets Equity ETF", category: "Foreign Large Blend", family: "Avantis Investors", expenseRatio: 0.31, totalAssets: 591438400 },
  "DFIC": { name: "Dimensional International Core Equity 2 ETF", category: "Foreign Large Blend", family: "Dimensional Fund Advisors", expenseRatio: 0.22, totalAssets: 13734567936 },
  "EXUS": { name: "Nomura Focused International Core ETF", category: "Foreign Large Blend", family: "Nomura", expenseRatio: 0.59, totalAssets: 69414480 },
  "IDMO": { name: "Invesco S&P International Developed Momentum ETF", category: "Foreign Large Blend", family: "Invesco", expenseRatio: 0.25, totalAssets: 3374728192 },
  "IEFA": { name: "iShares Core MSCI EAFE ETF", category: "Foreign Large Blend", family: "iShares", expenseRatio: 0.07, totalAssets: 182588440576 },
  "IMOM": { name: "Alpha Architect International Quantitative Momentum ETF", category: "Foreign Large Blend", family: "Alpha Architect", expenseRatio: 0.38, totalAssets: 154350512 },
  "IMTM": { name: "iShares MSCI Intl Momentum Factor ETF", category: "Foreign Large Blend", family: "iShares", expenseRatio: 0.3, totalAssets: 3849783040 },
  "INTL": { name: "Main International ETF", category: "Foreign Large Blend", family: "Main Management ETFs", expenseRatio: 0.89, totalAssets: 211146960 },
  "VEA": { name: "Vanguard FTSE Developed Markets Index Fund ETF Shares", category: "Foreign Large Blend", family: "Vanguard", expenseRatio: 0.03, totalAssets: 307323502592 },
  "VXUS": { name: "Vanguard Total International Stock Index Fund ETF Shares", category: "Foreign Large Blend", family: "Vanguard", expenseRatio: 0.05, totalAssets: 636672409600 },

  // --- Foreign Large Value ---
  "AVIV": { name: "Avantis International Large Cap Value ETF", category: "Foreign Large Value", family: "Avantis Investors", expenseRatio: 0.25, totalAssets: 1219972864 },
  "AVNV": { name: "Avantis All International Markets Value ETF", category: "Foreign Large Value", family: "Avantis Investors", expenseRatio: 0.34, totalAssets: 47644240 },
  "DFIV": { name: "Dimensional International Value ETF", category: "Foreign Large Value", family: "Dimensional Fund Advisors", expenseRatio: 0.27, totalAssets: 18951092224 },
  "GVAL": { name: "Cambria Global Value ETF", category: "Foreign Large Value", family: "Cambria Investment Management", expenseRatio: 0.66, totalAssets: 597678976 },
  "IVAL": { name: "Alpha Architect International Quantitative Value ETF", category: "Foreign Large Value", family: "Alpha Architect", expenseRatio: 0.38, totalAssets: 216335216 },

  // --- Foreign Small/Mid Value ---
  "AVDV": { name: "Avantis International Small Cap Value ETF", category: "Foreign Small/Mid Value", family: "Avantis Investors", expenseRatio: 0.36, totalAssets: 18822412288 },
  "DXIV": { name: "Dimensional International Vector Equity ETF", category: "Foreign Small/Mid Value", family: "Dimensional Fund Advisors", expenseRatio: 0.3, totalAssets: 150103472 },

  // --- Global Large-Stock Blend ---
  "ACWI": { name: "iShares MSCI ACWI ETF", category: "Global Large-Stock Blend", family: "iShares", expenseRatio: 0.32, totalAssets: 29157464064 },
  "VT": { name: "Vanguard Total World Stock Index Fund ETF Shares", category: "Global Large-Stock Blend", family: "Vanguard", expenseRatio: 0.06, totalAssets: 83530907648 },

  // --- Global Real Estate ---
  "AVRE": { name: "Avantis Real Estate ETF", category: "Global Real Estate", family: "Avantis Investors", expenseRatio: 0.17, totalAssets: 777147392 },

  // --- Global Small/Mid Stock ---
  "AVGV": { name: "Avantis ALL Equity Markets Value ETF", category: "Global Small/Mid Stock", family: "Avantis Investors", expenseRatio: 0.26, totalAssets: 287872544 },

  // --- Intermediate Core Bond ---
  "AGG": { name: "iShares Core U.S. Aggregate Bond ETF", category: "Intermediate Core Bond", family: "iShares", expenseRatio: 0.03, totalAssets: 141223149568 },
  "BND": { name: "Vanguard Total Bond Market Index Fund", category: "Intermediate Core Bond", family: "Vanguard", expenseRatio: 0.03, totalAssets: 395346083840 },

  // --- Intermediate Government ---
  "VGIT": { name: "Vanguard Intermediate-Term Treasury Index Fund ETF Shares", category: "Intermediate Government", family: "Vanguard", expenseRatio: 0.03, totalAssets: 48798519296 },

  // --- Large Blend ---
  "FOMO": { name: "AXS FOMO ETF", category: "Large Blend", family: "AXS", expenseRatio: 0.9, totalAssets: 3702324 },
  "QMJ": { name: "Direxion S&P 500 High minus Low Quality ETF", category: "Large Blend", family: "Direxion Funds", expenseRatio: 0.36, totalAssets: 10081848 },
  "RESP": { name: "WisdomTree U.S. ESG Fund", category: "Large Blend", family: "WisdomTree", expenseRatio: 0.28, totalAssets: 66001364 },
  "VOO": { name: "Vanguard S&P 500 ETF", category: "Large Blend", family: "Vanguard", expenseRatio: 0.03, totalAssets: 1512901836800 },
  "VTI": { name: "Vanguard Total Stock Market Index Fund ETF Shares", category: "Large Blend", family: "Vanguard", expenseRatio: 0.03, totalAssets: 2088924610560 },

  // --- Large Growth ---
  "LCG": { name: "Sterling Capital Focus Equity ETF", category: "Large Growth", family: "Sterling Capital Funds", expenseRatio: 0.59, totalAssets: 30537030 },

  // --- Long Government ---
  "ZROZ": { name: "PIMCO 25+ Year Zero Coupon U.S. Treasury Index Exchange-Traded Fund", category: "Long Government", family: "PIMCO", expenseRatio: 0.15, totalAssets: 1521743360 },

  // --- MUTUALFUND ---
  "ACW": { name: "Accuride Corporation", category: "MUTUALFUND", family: "", expenseRatio: null, totalAssets: null },
  "ADA": { name: "Adams Plc", category: "MUTUALFUND", family: "", expenseRatio: 0.0, totalAssets: 5105073 },
  "AI": { name: "19881", category: "MUTUALFUND", family: "", expenseRatio: null, totalAssets: null },
  "AIMOX": { name: "AQR International Momentum Style I", category: "MUTUALFUND", family: "", expenseRatio: 0.7, totalAssets: 229214704 },
  "ATH": { name: "16445", category: "MUTUALFUND", family: "", expenseRatio: null, totalAssets: null },
  "ATL": { name: "Atlatsa Resources Corporation", category: "MUTUALFUND", family: "", expenseRatio: null, totalAssets: null },
  "AV": { name: "5517517", category: "MUTUALFUND", family: "", expenseRatio: null, totalAssets: null },
  "BDMIX": { name: "BlackRock Global Equity Market Neutral Fund", category: "MUTUALFUND", family: "", expenseRatio: 1.34, totalAssets: 9440806912 },
  "BLNDX": { name: "Standpoint Multi-Asset Institutional", category: "MUTUALFUND", family: "", expenseRatio: 1.26, totalAssets: 759742912 },
  "BMO": { name: "Moninger Holding AG", category: "MUTUALFUND", family: "", expenseRatio: null, totalAssets: null },
  "CBYYX": { name: "Victory Pioneer CAT Bond Y", category: "MUTUALFUND", family: "", expenseRatio: 1.44, totalAssets: 1856814592 },
  "CCP": { name: "Care Capital Properties, Inc.", category: "MUTUALFUND", family: "", expenseRatio: null, totalAssets: null },
  "CDN": { name: "Cloud Data Holdings Corp", category: "MUTUALFUND", family: "", expenseRatio: null, totalAssets: null },
  "CH": { name: "15152", category: "MUTUALFUND", family: "", expenseRatio: null, totalAssets: null },
  "CHF": { name: "22732", category: "MUTUALFUND", family: "", expenseRatio: null, totalAssets: null },
  "DAF": { name: "Be Think, Solve, Execute S.p.A.", category: "MUTUALFUND", family: "", expenseRatio: null, totalAssets: null },
  "DFIVX": { name: "DFA International Value I", category: "MUTUALFUND", family: "", expenseRatio: 0.28, totalAssets: 13953002496 },
  "DMA": { name: "52903", category: "MUTUALFUND", family: "", expenseRatio: null, totalAssets: null },
  "ETC": { name: "7474", category: "MUTUALFUND", family: "", expenseRatio: null, totalAssets: null },
  "ETF": { name: "19955", category: "MUTUALFUND", family: "", expenseRatio: null, totalAssets: null },
  "ETP": { name: "Energy Transfer Partners, L.P.", category: "MUTUALFUND", family: "", expenseRatio: null, totalAssets: null },
  "GBM": { name: "1501189", category: "MUTUALFUND", family: "", expenseRatio: null, totalAssets: null },
  "IMI": { name: "IMI plc", category: "MUTUALFUND", family: "", expenseRatio: null, totalAssets: null },
  "IPS": { name: "SPDR S&amp;P Intl Cnsmr Stapl Sect ETF", category: "MUTUALFUND", family: "", expenseRatio: null, totalAssets: null },
  "MER": { name: "Meren Energy Inc.", category: "MUTUALFUND", family: "", expenseRatio: null, totalAssets: null },
  "MF": { name: "7", category: "MUTUALFUND", family: "", expenseRatio: null, totalAssets: null },
  "MS": { name: "134", category: "MUTUALFUND", family: "", expenseRatio: null, totalAssets: null },
  "MVL": { name: "907838", category: "MUTUALFUND", family: "", expenseRatio: null, totalAssets: null },
  "OR": { name: "L'Oréal S.A.", category: "MUTUALFUND", family: "", expenseRatio: null, totalAssets: null },
  "PF": { name: "Pinnacle Foods Inc.", category: "MUTUALFUND", family: "", expenseRatio: null, totalAssets: null },
  "PQTIX": { name: "PIMCO TRENDS Managed Futures Strat Instl", category: "MUTUALFUND", family: "", expenseRatio: 1.54, totalAssets: 1470480256 },
  "QGMIX": { name: "AQR Macro Opportunities I", category: "MUTUALFUND", family: "", expenseRatio: 1.45, totalAssets: 830847808 },
  "QHFIX": { name: "AQR MS Fusion HV I", category: "MUTUALFUND", family: "", expenseRatio: 6.69, totalAssets: 64271596 },
  "QLEIX": { name: "AQR Long-Short Equity I", category: "MUTUALFUND", family: "", expenseRatio: 5.33, totalAssets: 8198253568 },
  "QLENX": { name: "AQR Long-Short Equity N", category: "MUTUALFUND", family: "", expenseRatio: 5.58, totalAssets: 8198253568 },
  "QMHIX": { name: "AQR Managed Futures Strategy HV I", category: "MUTUALFUND", family: "", expenseRatio: 3.87, totalAssets: 1127916672 },
  "QMNIX": { name: "AQR Equity Market Neutral I", category: "MUTUALFUND", family: "", expenseRatio: 5.48, totalAssets: 3193233152 },
  "QNZIX": { name: "AQR Trend Total Return Class I", category: "MUTUALFUND", family: "", expenseRatio: 2.82, totalAssets: 189856736 },
  "QRPIX": { name: "AQR Alternative Risk Premia I", category: "MUTUALFUND", family: "", expenseRatio: 5.04, totalAssets: 458647872 },
  "QRPNX": { name: "AQR Alternative Risk Premia N", category: "MUTUALFUND", family: "", expenseRatio: 5.29, totalAssets: 458647872 },
  "QSPIX": { name: "AQR Style Premia Alternative I", category: "MUTUALFUND", family: "", expenseRatio: 5.89, totalAssets: 2105540864 },
  "RR": { name: "9", category: "MUTUALFUND", family: "", expenseRatio: null, totalAssets: null },
  "SMA": { name: "SmarTone Telecommunications Holdings Ltd.", category: "MUTUALFUND", family: "", expenseRatio: null, totalAssets: null },
  "SOFIX": { name: "Opportunistic Credit Interval Fund", category: "MUTUALFUND", family: "", expenseRatio: null, totalAssets: null },
  "SSGLX": { name: "State Street Glb All Cap Eq ex-US Idx K", category: "MUTUALFUND", family: "", expenseRatio: 0.065, totalAssets: 4315173376 },
  "SXR": { name: "233571", category: "MUTUALFUND", family: "", expenseRatio: null, totalAssets: null },
  "TER": { name: "1", category: "MUTUALFUND", family: "", expenseRatio: null, totalAssets: null },
  "USA": { name: "Lyxor MSCI USA UCITS ETF Dist", category: "MUTUALFUND", family: "", expenseRatio: null, totalAssets: null },

  // --- Macro Trading ---
  "HFGM": { name: "Unlimited HFGM Global Macro ETF", category: "Macro Trading", family: "Unlimited", expenseRatio: 1.01, totalAssets: 111279104 },

  // --- Mid-Cap Blend ---
  "VFMO": { name: "Vanguard U.S. Momentum Factor ETF ETF Shares", category: "Mid-Cap Blend", family: "Vanguard", expenseRatio: 0.13, totalAssets: 1396117760 },

  // --- Mid-Cap Growth ---
  "QMOM": { name: "Alpha Architect U.S. Quantitative Momentum ETF", category: "Mid-Cap Growth", family: "Alpha Architect", expenseRatio: 0.28, totalAssets: 388719328 },

  // --- Mid-Cap Value ---
  "DXUV": { name: "Dimensional US Vector Equity ETF", category: "Mid-Cap Value", family: "Dimensional Fund Advisors", expenseRatio: 0.25, totalAssets: 364018112 },
  "VFMF": { name: "Vanguard U.S. Multifactor ETF Shares", category: "Mid-Cap Value", family: "Vanguard", expenseRatio: 0.18, totalAssets: 558569472 },

  // --- Miscellaneous Region ---
  "DAX": { name: "Global X DAX Germany ETF", category: "Miscellaneous Region", family: "Global X Funds", expenseRatio: 0.2, totalAssets: 296113312 },
  "EWG": { name: "iShares MSCI Germany ETF", category: "Miscellaneous Region", family: "iShares", expenseRatio: 0.49, totalAssets: 1793942016 },

  // --- Multi-Asset Leveraged ---
  "GDE": { name: "WisdomTree Efficient Gold Plus Equity Strategy Fund", category: "Multi-Asset Leveraged", family: "WisdomTree", expenseRatio: 0.2, totalAssets: 689874816 },
  "MATE": { name: "Man Active Trend Enhanced ETF", category: "Multi-Asset Leveraged", family: "Man Group PLC", expenseRatio: 0.97, totalAssets: 36159556 },
  "NTSI": { name: "WisdomTree International Efficient Core Fund", category: "Multi-Asset Leveraged", family: "WisdomTree", expenseRatio: 0.26, totalAssets: 507670656 },
  "RSBA": { name: "Return Stacked Bonds & Merger Arbitrage ETF", category: "Multi-Asset Leveraged", family: "Return stacked ETFs", expenseRatio: 0.96, totalAssets: 61814084 },
  "RSBT": { name: "Return Stacked Bonds & Managed Futures ETF", category: "Multi-Asset Leveraged", family: "Return stacked ETFs", expenseRatio: 1.02, totalAssets: 114519536 },
  "RSBY": { name: "Return Stacked Bonds & Futures Yield ETF", category: "Multi-Asset Leveraged", family: "Return stacked ETFs", expenseRatio: 0.98, totalAssets: 78360072 },
  "RSSB": { name: "Return Stacked Global Stocks & Bonds ETF", category: "Multi-Asset Leveraged", family: "Return stacked ETFs", expenseRatio: 0.4, totalAssets: 466160544 },
  "RSST": { name: "Return Stacked U.S. Stocks & Managed Futures ETF", category: "Multi-Asset Leveraged", family: "Return stacked ETFs", expenseRatio: 0.99, totalAssets: 633757696 },
  "RSSX": { name: "Return Stacked U.S. Stocks & Gold/Bitcoin ETF", category: "Multi-Asset Leveraged", family: "Return stacked ETFs", expenseRatio: 0.68, totalAssets: 64557336 },

  // --- Muni National Long ---
  "BAB": { name: "Invesco Taxable Municipal Bond ETF", category: "Muni National Long", family: "Invesco", expenseRatio: 0.28, totalAssets: 1062256512 },

  // --- Muni National Short ---
  "SMB": { name: "VanEck Short Muni ETF", category: "Muni National Short", family: "VanEck", expenseRatio: 0.07, totalAssets: 303696096 },

  // --- Small Value ---
  "AVUV": { name: "Avantis US Small Cap Value ETF", category: "Small Value", family: "Avantis Investors", expenseRatio: 0.25, totalAssets: 23535656960 },

  // --- Systematic Trend ---
  "CTA": { name: "Simplify Managed Futures Strategy ETF", category: "Systematic Trend", family: "Simplify Asset Management", expenseRatio: 0.75, totalAssets: 1360046976 },
  "DBMF": { name: "iMGP DBi Managed Futures Strategy ETF", category: "Systematic Trend", family: "iM Global Partner Fund Management", expenseRatio: 0.85, totalAssets: 3151832064 },
  "KMLM": { name: "KraneShares Mount Lucas Managed Futures Index Strategy ETF", category: "Systematic Trend", family: "KraneShares", expenseRatio: 0.9, totalAssets: 194482928 },

  // --- Trading--Leveraged Commodities ---
  "UGL": { name: "ProShares Ultra Gold", category: "Trading--Leveraged Commodities", family: "ProShares", expenseRatio: 0.95, totalAssets: 1459693440 },

  // --- Trading--Leveraged Debt ---
  "TMF": { name: "Direxion Daily 20+ Year Treasury Bull 3X Shares", category: "Trading--Leveraged Debt", family: "Direxion Funds", expenseRatio: 0.9, totalAssets: 3313183744 },

  // --- Trading--Leveraged Equity ---
  "TQQQ": { name: "ProShares UltraPro QQQ", category: "Trading--Leveraged Equity", family: "ProShares", expenseRatio: 0.82, totalAssets: 27316506624 },
  "UPRO": { name: "ProShares UltraPro S&P500", category: "Trading--Leveraged Equity", family: "ProShares", expenseRatio: 0.89, totalAssets: 4453546496 },
  "USD": { name: "ProShares Ultra Semiconductors", category: "Trading--Leveraged Equity", family: "ProShares", expenseRatio: 0.95, totalAssets: 1662842880 },

  // --- Ultrashort Bond ---
  "VBIL": { name: "Vanguard 0-3 Month Treasury Bill ETF", category: "Ultrashort Bond", family: "Vanguard", expenseRatio: 0.06, totalAssets: 5554289152 },

};
