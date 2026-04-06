// Hand-curated exclusions — common finance terms, index names, country/currency
// codes, and acronyms that should never be treated as tickers.
// Do NOT edit with the update script — this file is maintained manually.
const PERMANENT_EXCLUSIONS = new Set([
  // Index names and providers
  "EAFE", "FTSE", "MSCI",
  // Financial product types
  "ETC", "ETF", "ETP", "LETF", "MF", "MMF", "UCITS",
  // Country and currency codes
  "CH", "CHF", "EU", "JP", "UK", "US", "USA",
  // Account types
  "GIC", "HISA", "HSA", "IRA", "PEA", "PFIC", "RRSP", "TFSA",
  // Brokerages and fund companies
  "BMO", "CIBC", "DFA", "IB", "IBKR", "JPM", "PWL", "TD", "TDB", "UBS",
  // Finance jargon and acronyms
  "ACW", "AQR", "CCP", "COMN", "CTO", "DAF", "DM", "DMA", "FX",
  "GBM", "HML", "HV", "IMI", "IMO", "MCW", "MER", "MS", "MVL", "OR",
  "PF", "PH", "PLUS", "QI", "RAFI", "RR", "RS", "RSIT", "SCV", "SDBA",
  "SEC", "SF", "SG", "SGB", "SMA", "SP", "TDF", "TER", "WHT", "WT", "ZN", "SMB",
  // Brand/ETF provider names (not tickers themselves)
  "SPDR",
  // Common words that match ticker patterns
  "AA", "APR", "ATH", "ATL", "AV", "CAN", "CDN", "DD", "EDIT", "EM",
  "EMU", "IPS", "IT", "KB", "NG", "OAT", "RAET", "SOFIX", "SXR", "TCO",
  // Tax forms and financial statements
  "10K", "10B",
  // Miscellaneous
  "INTL", "MID"
]);
