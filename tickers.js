// Database of known ETF and fund tickers
// Categories: US ETFs, Canadian ETFs, International ETFs, Bond ETFs, Factor/Smart Beta
const TICKER_DB = {
  // --- US Broad Market ---
  "VTI": { name: "Vanguard Total Stock Market ETF", category: "US Equity" },
  "VOO": { name: "Vanguard S&P 500 ETF", category: "US Equity" },
  "SPY": { name: "SPDR S&P 500 ETF", category: "US Equity" },
  "IVV": { name: "iShares Core S&P 500 ETF", category: "US Equity" },
  "VTV": { name: "Vanguard Value ETF", category: "US Equity" },
  "VUG": { name: "Vanguard Growth ETF", category: "US Equity" },
  "SCHB": { name: "Schwab U.S. Broad Market ETF", category: "US Equity" },
  "ITOT": { name: "iShares Core S&P Total U.S. Stock Market ETF", category: "US Equity" },
  "VV": { name: "Vanguard Large-Cap ETF", category: "US Equity" },
  "MGC": { name: "Vanguard Mega Cap ETF", category: "US Equity" },
  "SPTM": { name: "SPDR Portfolio S&P 1500 Composite Stock Market ETF", category: "US Equity" },

  // --- US Small/Mid Cap ---
  "VB": { name: "Vanguard Small-Cap ETF", category: "US Small Cap" },
  "VBR": { name: "Vanguard Small-Cap Value ETF", category: "US Small Cap" },
  "VBK": { name: "Vanguard Small-Cap Growth ETF", category: "US Small Cap" },
  "IJR": { name: "iShares Core S&P Small-Cap ETF", category: "US Small Cap" },
  "IWM": { name: "iShares Russell 2000 ETF", category: "US Small Cap" },
  "AVUV": { name: "Avantis U.S. Small Cap Value ETF", category: "US Small Cap" },
  "AVDV": { name: "Avantis International Small Cap Value ETF", category: "Intl Small Cap" },
  "AVES": { name: "Avantis Emerging Markets Value ETF", category: "EM Equity" },
  "VO": { name: "Vanguard Mid-Cap ETF", category: "US Mid Cap" },
  "IJH": { name: "iShares Core S&P Mid-Cap ETF", category: "US Mid Cap" },
  "DFAC": { name: "Dimensional U.S. Core Equity 2 ETF", category: "US Equity" },
  "DFSV": { name: "Dimensional U.S. Small Cap Value ETF", category: "US Small Cap" },
  "DFAT": { name: "Dimensional U.S. Targeted Value ETF", category: "US Small Cap" },

  // --- International Developed ---
  "VXUS": { name: "Vanguard Total International Stock ETF", category: "Intl Equity" },
  "VEA": { name: "Vanguard FTSE Developed Markets ETF", category: "Intl Equity" },
  "IEFA": { name: "iShares Core MSCI EAFE ETF", category: "Intl Equity" },
  "EFA": { name: "iShares MSCI EAFE ETF", category: "Intl Equity" },
  "IXUS": { name: "iShares Core MSCI Total International Stock ETF", category: "Intl Equity" },
  "VGK": { name: "Vanguard FTSE Europe ETF", category: "Intl Equity" },
  "VPL": { name: "Vanguard FTSE Pacific ETF", category: "Intl Equity" },
  "SCHF": { name: "Schwab International Equity ETF", category: "Intl Equity" },
  "DFAI": { name: "Dimensional International Core Equity Market ETF", category: "Intl Equity" },
  "DFIV": { name: "Dimensional International Value ETF", category: "Intl Equity" },
  "DISV": { name: "Dimensional International Small Cap Value ETF", category: "Intl Small Cap" },

  // --- Emerging Markets ---
  "VWO": { name: "Vanguard FTSE Emerging Markets ETF", category: "EM Equity" },
  "IEMG": { name: "iShares Core MSCI Emerging Markets ETF", category: "EM Equity" },
  "EEM": { name: "iShares MSCI Emerging Markets ETF", category: "EM Equity" },
  "DFAE": { name: "Dimensional Emerging Core Equity Market ETF", category: "EM Equity" },
  "DFEV": { name: "Dimensional Emerging Markets Value ETF", category: "EM Equity" },

  // --- Global / All-World ---
  "VT": { name: "Vanguard Total World Stock ETF", category: "Global Equity" },
  "ACWI": { name: "iShares MSCI ACWI ETF", category: "Global Equity" },
  "URTH": { name: "iShares MSCI World ETF", category: "Global Equity" },

  // --- Canadian ETFs (very common on Rational Reminder) ---
  "XEQT": { name: "iShares Core Equity ETF Portfolio", category: "CA All-in-One" },
  "VEQT": { name: "Vanguard All-Equity ETF Portfolio", category: "CA All-in-One" },
  "XGRO": { name: "iShares Core Growth ETF Portfolio", category: "CA All-in-One" },
  "VGRO": { name: "Vanguard Growth ETF Portfolio", category: "CA All-in-One" },
  "XBAL": { name: "iShares Core Balanced ETF Portfolio", category: "CA All-in-One" },
  "VBAL": { name: "Vanguard Balanced ETF Portfolio", category: "CA All-in-One" },
  "XCNS": { name: "iShares Core Conservative Balanced ETF Portfolio", category: "CA All-in-One" },
  "VCNS": { name: "Vanguard Conservative ETF Portfolio", category: "CA All-in-One" },
  "XINC": { name: "iShares Core Income Balanced ETF Portfolio", category: "CA All-in-One" },
  "VCIP": { name: "Vanguard Conservative Income ETF Portfolio", category: "CA All-in-One" },

  "VCN": { name: "Vanguard FTSE Canada All Cap Index ETF", category: "CA Equity" },
  "XIC": { name: "iShares Core S&P/TSX Capped Composite Index ETF", category: "CA Equity" },
  "XIU": { name: "iShares S&P/TSX 60 Index ETF", category: "CA Equity" },
  "ZCN": { name: "BMO S&P/TSX Capped Composite Index ETF", category: "CA Equity" },
  "HXT": { name: "Horizons S&P/TSX 60 Index ETF", category: "CA Equity" },
  "XEI": { name: "iShares S&P/TSX Composite High Dividend Index ETF", category: "CA Equity" },
  "VDY": { name: "Vanguard FTSE Canadian High Dividend Yield Index ETF", category: "CA Equity" },

  "XAW": { name: "iShares Core MSCI All Country World ex Canada Index ETF", category: "CA Intl Equity" },
  "VXC": { name: "Vanguard FTSE Global All Cap ex Canada Index ETF", category: "CA Intl Equity" },
  "XEF": { name: "iShares Core MSCI EAFE IMI Index ETF", category: "CA Intl Equity" },
  "VIU": { name: "Vanguard FTSE Developed All Cap ex North America Index ETF", category: "CA Intl Equity" },
  "XEC": { name: "iShares Core MSCI Emerging Markets IMI Index ETF", category: "CA EM Equity" },
  "VEE": { name: "Vanguard FTSE Emerging Markets All Cap Index ETF", category: "CA EM Equity" },
  "ZEA": { name: "BMO MSCI EAFE Index ETF", category: "CA Intl Equity" },
  "ZEM": { name: "BMO MSCI Emerging Markets Index ETF", category: "CA EM Equity" },

  "VUN": { name: "Vanguard U.S. Total Market Index ETF", category: "CA US Equity" },
  "XUU": { name: "iShares Core S&P U.S. Total Market Index ETF", category: "CA US Equity" },
  "XUS": { name: "iShares Core S&P 500 Index ETF (CAD-Hedged)", category: "CA US Equity" },
  "VFV": { name: "Vanguard S&P 500 Index ETF", category: "CA US Equity" },
  "ZSP": { name: "BMO S&P 500 Index ETF", category: "CA US Equity" },
  "HXS": { name: "Horizons S&P 500 Index ETF", category: "CA US Equity" },

  // --- Canadian Bond ETFs ---
  "ZAG": { name: "BMO Aggregate Bond Index ETF", category: "CA Bonds" },
  "VAB": { name: "Vanguard Canadian Aggregate Bond Index ETF", category: "CA Bonds" },
  "XBB": { name: "iShares Core Canadian Universe Bond Index ETF", category: "CA Bonds" },
  "ZFL": { name: "BMO Long Federal Bond Index ETF", category: "CA Bonds" },
  "ZDB": { name: "BMO Discount Bond Index ETF", category: "CA Bonds" },
  "VSB": { name: "Vanguard Canadian Short-Term Bond Index ETF", category: "CA Bonds" },
  "XSB": { name: "iShares Core Canadian Short Term Bond Index ETF", category: "CA Bonds" },
  "CLF": { name: "iShares 1-5 Year Laddered Government Bond Index ETF", category: "CA Bonds" },
  "PSA": { name: "Purpose High Interest Savings ETF", category: "CA Cash" },
  "CASH": { name: "Horizons High Interest Savings ETF", category: "CA Cash" },
  "CSAV": { name: "CI High Interest Savings ETF", category: "CA Cash" },
  "HISA": { name: "Global X High Interest Savings ETF", category: "CA Cash" },

  // --- US Bond ETFs ---
  "BND": { name: "Vanguard Total Bond Market ETF", category: "US Bonds" },
  "AGG": { name: "iShares Core U.S. Aggregate Bond ETF", category: "US Bonds" },
  "BNDX": { name: "Vanguard Total International Bond ETF", category: "Intl Bonds" },
  "BNDW": { name: "Vanguard Total World Bond ETF", category: "Global Bonds" },
  "TLT": { name: "iShares 20+ Year Treasury Bond ETF", category: "US Bonds" },
  "IEF": { name: "iShares 7-10 Year Treasury Bond ETF", category: "US Bonds" },
  "SHY": { name: "iShares 1-3 Year Treasury Bond ETF", category: "US Bonds" },
  "VGSH": { name: "Vanguard Short-Term Treasury ETF", category: "US Bonds" },
  "VGIT": { name: "Vanguard Intermediate-Term Treasury ETF", category: "US Bonds" },
  "VGLT": { name: "Vanguard Long-Term Treasury ETF", category: "US Bonds" },
  "TIP": { name: "iShares TIPS Bond ETF", category: "US Bonds" },
  "VTIP": { name: "Vanguard Short-Term Inflation-Protected Securities ETF", category: "US Bonds" },
  "EDV": { name: "Vanguard Extended Duration Treasury ETF", category: "US Bonds" },
  "GOVT": { name: "iShares U.S. Treasury Bond ETF", category: "US Bonds" },

  // --- REITs ---
  "VNQ": { name: "Vanguard Real Estate ETF", category: "REITs" },
  "VNQI": { name: "Vanguard Global ex-U.S. Real Estate ETF", category: "REITs" },
  "SCHH": { name: "Schwab U.S. REIT ETF", category: "REITs" },

  // --- Factor / Smart Beta ---
  "NTSX": { name: "WisdomTree U.S. Efficient Core Fund", category: "Factor" },
  "PSLDX": { name: "PIMCO StocksPLUS Long Duration Fund", category: "Factor" },
  "HFEA": { name: "Hedgefundie's Excellent Adventure (not a ticker)", category: "Strategy" },
  "UPRO": { name: "ProShares UltraPro S&P 500", category: "Leveraged" },
  "TMF": { name: "Direxion Daily 20+ Year Treasury Bull 3X", category: "Leveraged" },
  "SSO": { name: "ProShares Ultra S&P 500", category: "Leveraged" },
  "QLD": { name: "ProShares Ultra QQQ", category: "Leveraged" },
  "TQQQ": { name: "ProShares UltraPro QQQ", category: "Leveraged" },
  "QQQ": { name: "Invesco QQQ Trust", category: "US Equity" },

  // --- Dimensional Fund Advisors (popular on RR) ---
  "DFUS": { name: "Dimensional U.S. Equity ETF", category: "US Equity" },
  "DFAX": { name: "Dimensional World ex U.S. Core Equity 2 ETF", category: "Intl Equity" },

  // --- Commodities / Alternatives ---
  "GLD": { name: "SPDR Gold Shares", category: "Commodities" },
  "IAU": { name: "iShares Gold Trust", category: "Commodities" },
  "GLDM": { name: "SPDR Gold MiniShares Trust", category: "Commodities" },
  "SLV": { name: "iShares Silver Trust", category: "Commodities" },
  "PDBC": { name: "Invesco Optimum Yield Diversified Commodity Strategy ETF", category: "Commodities" },
  "DJP": { name: "iPath Bloomberg Commodity Index Total Return ETN", category: "Commodities" },
  "COM": { name: "Direxion Auspice Broad Commodity Strategy ETF", category: "Commodities" },

  // --- Dividend / Income ---
  "VIG": { name: "Vanguard Dividend Appreciation ETF", category: "Dividend" },
  "SCHD": { name: "Schwab U.S. Dividend Equity ETF", category: "Dividend" },
  "VYM": { name: "Vanguard High Dividend Yield ETF", category: "Dividend" },
  "DVY": { name: "iShares Select Dividend ETF", category: "Dividend" },
  "HDV": { name: "iShares Core High Dividend ETF", category: "Dividend" },
  "DGRO": { name: "iShares Core Dividend Growth ETF", category: "Dividend" },
  "NOBL": { name: "ProShares S&P 500 Dividend Aristocrats ETF", category: "Dividend" },
};

// Common words that happen to match ticker patterns - exclude these
const TICKER_EXCLUSIONS = new Set([
  "THE", "AND", "FOR", "ARE", "BUT", "NOT", "YOU", "ALL", "CAN", "HER",
  "WAS", "ONE", "OUR", "OUT", "HAS", "HIS", "HOW", "ITS", "LET", "MAY",
  "NEW", "NOW", "OLD", "SEE", "WAY", "WHO", "BOY", "DID", "GET", "HIM",
  "SAY", "SHE", "TOO", "USE", "DAD", "MOM", "SET", "RUN", "TRY", "ASK",
  "MEN", "RAN", "OWN", "PUT", "BIG", "FEW", "END", "ANY", "GOT", "ADD",
  "TOP", "WHY", "FAR", "YES", "YET", "AGO", "RED", "TAX", "CAR", "LOW",
  "CUT", "LOT", "BAD", "SAT", "BIT", "PAY", "PER", "KEY", "JOB", "TEN",
  "SIX", "TWO", "AGE", "OFF", "AIR", "GAS", "OIL", "FUN", "FIT", "BET",
  "GAP", "RAW", "MIX", "NET", "ERA", "PRO", "CAP", "IMO", "IMI", "TSX",
  "ETF", "CAD", "USD", "GBP", "EUR", "JPY", "MER", "NAV", "AUM", "GDP",
  "CPI", "GIC", "RSP", "RIF", "CPP", "OAS", "EAT", "DOG", "CAT", "RUN",
  "MAP", "LOG", "MAX", "MIN", "AVG", "SUM", "PCT", "YOY", "MTD", "YTD",
  "QOQ", "FYI", "DIY", "FAQ", "CEO", "CFO", "COO", "CTO", "COB",
]);
